"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Award, FileQuestion, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizPlayerProps {
  quizzes: any[];
  courseId: string;
  chapterId: string;
}

interface QuizAttempt {
  id: string;
  score: number;
  passed: boolean;
  createdAt: string;
  answers: any[];
}

export const QuizPlayer = ({
  quizzes,
  courseId,
  chapterId,
}: QuizPlayerProps) => {
  const router = useRouter();
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);
  const [answers, setAnswers] = useState<{ [questionId: string]: string }>({});
  const [result, setResult] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizAttempts, setQuizAttempts] = useState<{ [quizId: string]: QuizAttempt }>({});
  const [loadingAttempts, setLoadingAttempts] = useState(true);

  const quiz = quizzes.find((q) => q.id === activeQuiz);

  // Fetch existing quiz attempts on component mount
  useEffect(() => {
    const fetchQuizAttempts = async () => {
      try {
        const attempts: { [quizId: string]: QuizAttempt } = {};
        
        for (const quiz of quizzes) {
          const response = await axios.get(
            `/api/courses/${courseId}/chapters/${chapterId}/quizzes/${quiz.id}/attempts`
          );
          if (response.data && response.data.length > 0) {
            // Get the latest attempt
            const latestAttempt = response.data[0];
            attempts[quiz.id] = latestAttempt;
          }
        }
        
        setQuizAttempts(attempts);
      } catch (error) {
        console.error('Failed to fetch quiz attempts:', error);
      } finally {
        setLoadingAttempts(false);
      }
    };

    if (quizzes.length > 0) {
      fetchQuizAttempts();
    } else {
      setLoadingAttempts(false);
    }
  }, [quizzes, courseId, chapterId]);

  const handleStartQuiz = (quizId: string) => {
    setActiveQuiz(quizId);
    setAnswers({});
    setResult(null);
  };

  const handleSelectAnswer = (questionId: string, optionId: string) => {
    if (result) return; // Don't allow changes after submission
    setAnswers({ ...answers, [questionId]: optionId });
  };

  const handleSubmit = async () => {
    if (!quiz) return;

    // Check if all questions answered
    const unansweredCount = quiz.questions.filter(
      (q: any) => !answers[q.id]
    ).length;

    if (unansweredCount > 0) {
      toast.error(`Please answer all questions (${unansweredCount} remaining)`);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `/api/courses/${courseId}/chapters/${chapterId}/quizzes/${quiz.id}/submit`,
        { answers }
      );

      setResult(response.data);
      
      // Update the quiz attempts with the new result
      setQuizAttempts(prev => ({
        ...prev,
        [quiz.id]: {
          id: response.data.attemptId,
          score: response.data.score,
          passed: response.data.passed,
          createdAt: new Date().toISOString(),
          answers: response.data.answers
        }
      }));
      
      if (response.data.passed) {
        toast.success(`Congratulations! You scored ${response.data.score.toFixed(1)}%`);
      } else {
        toast.error(`You scored ${response.data.score.toFixed(1)}%. Passing score is ${response.data.passingScore}%`);
      }
    } catch (error) {
      toast.error("Failed to submit quiz");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setResult(null);
  };

  const handleExit = () => {
    setActiveQuiz(null);
    setAnswers({});
    setResult(null);
  };

  const handleViewResult = (quizId: string) => {
    const attempt = quizAttempts[quizId];
    if (attempt) {
      setActiveQuiz(quizId);
      setResult({
        score: attempt.score,
        passed: attempt.passed,
        earnedPoints: Math.round((attempt.score / 100) * quiz?.questions.length || 0),
        totalPoints: quiz?.questions.length || 0,
        answers: attempt.answers,
        passingScore: quiz?.passingScore || 70
      });
    }
  };

  if (!activeQuiz) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <FileQuestion className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Chapter Quizzes</h3>
        </div>
        {loadingAttempts ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Loading quiz attempts...</p>
          </div>
        ) : quizzes.length === 0 ? (
          <p className="text-sm text-slate-500 italic">No quizzes available</p>
        ) : (
          quizzes.map((quiz) => {
            const attempt = quizAttempts[quiz.id];
            const hasAttempt = !!attempt;
            
            return (
              <div
                key={quiz.id}
                className={cn(
                  "border rounded-lg p-4 bg-white dark:bg-gray-800",
                  hasAttempt && attempt.passed && "border-green-200 bg-green-50 dark:bg-green-950/20",
                  hasAttempt && !attempt.passed && "border-orange-200 bg-orange-50 dark:bg-orange-950/20"
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{quiz.title}</h4>
                    {quiz.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {quiz.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>{quiz.questions?.length || 0} questions</span>
                      <span>•</span>
                      <span>Pass with {quiz.passingScore}%</span>
                    </div>
                    
                    {hasAttempt && (
                      <div className="mt-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                          {attempt.passed ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <XCircle className="h-4 w-4 text-orange-600" />
                          )}
                          <span className="font-medium">
                            {attempt.passed ? "Passed" : "Not Passed"}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            • {attempt.score.toFixed(1)}%
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Completed {new Date(attempt.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2 ml-4">
                    {hasAttempt ? (
                      <>
                        <Button 
                          onClick={() => handleViewResult(quiz.id)}
                          variant="outline"
                          size="sm"
                        >
                          View Result
                        </Button>
                        <Button 
                          onClick={() => handleStartQuiz(quiz.id)}
                          size="sm"
                        >
                          Retake Quiz
                        </Button>
                      </>
                    ) : (
                      <Button onClick={() => handleStartQuiz(quiz.id)}>
                        Start Quiz
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }

  // Quiz taking interface
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">{quiz.title}</h2>
        {quiz.description && (
          <p className="text-gray-600 dark:text-gray-400 mt-2">{quiz.description}</p>
        )}
        <div className="flex items-center gap-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
          <span>{quiz.questions.length} questions</span>
          <span>•</span>
          <span>Passing score: {quiz.passingScore}%</span>
        </div>
      </div>

      {result ? (
        <div className="space-y-6">
          <div className={cn(
            "border-2 rounded-lg p-6 text-center",
            result.passed
              ? "border-green-500 bg-green-50 dark:bg-green-950"
              : "border-red-500 bg-red-50 dark:bg-red-950"
          )}>
            {result.passed ? (
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            ) : (
              <XCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
            )}
            <h3 className="text-2xl font-bold mb-2">
              {result.passed ? "Congratulations!" : "Keep Trying!"}
            </h3>
            <p className="text-xl mb-4">
              Score: {result.score.toFixed(1)}%
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {result.earnedPoints} / {result.totalPoints} points
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Review Your Answers</h3>
            {quiz.questions.map((question: any, index: number) => {
              const userAnswer = result.answers.find((a: any) => a.questionId === question.id);
              const correctOption = question.options.find((o: any) => o.isCorrect);

              return (
                <div
                  key={question.id}
                  className={cn(
                    "border rounded-lg p-4",
                    userAnswer?.isCorrect
                      ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                      : "border-red-500 bg-red-50 dark:bg-red-950/20"
                  )}
                >
                  <div className="flex items-start gap-2">
                    {userAnswer?.isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 mt-1" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">
                        {index + 1}. {question.question}
                      </p>
                      <div className="mt-2 space-y-1">
                        {question.options.map((option: any) => (
                          <div
                            key={option.id}
                            className={cn(
                              "text-sm p-2 rounded",
                              option.id === userAnswer?.answer && "font-semibold",
                              option.isCorrect && "text-green-600",
                              option.id === userAnswer?.answer && !option.isCorrect && "text-red-600"
                            )}
                          >
                            {option.text}
                            {option.isCorrect && " ✓ (Correct)"}
                            {option.id === userAnswer?.answer && !option.isCorrect && " (Your answer)"}
                          </div>
                        ))}
                      </div>
                      {question.explanation && (
                        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950 rounded text-sm">
                          <strong>Explanation:</strong> {question.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-4">
            <Button onClick={handleRetake} variant="outline" className="flex-1">
              Retake Quiz
            </Button>
            <Button onClick={handleExit} className="flex-1">
              Back to Chapter
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {quiz.questions.map((question: any, index: number) => (
            <div key={question.id} className="border rounded-lg p-6 bg-white dark:bg-gray-800">
              <h3 className="font-semibold text-lg mb-4">
                {index + 1}. {question.question}
              </h3>
              <div className="space-y-2">
                {question.options.map((option: any) => (
                  <button
                    key={option.id}
                    onClick={() => handleSelectAnswer(question.id, option.id)}
                    className={cn(
                      "w-full text-left p-4 rounded-lg border-2 transition-all",
                      answers[question.id] === option.id
                        ? "border-blue-600 bg-blue-50 dark:bg-blue-950"
                        : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "h-5 w-5 rounded-full border-2 flex items-center justify-center",
                          answers[question.id] === option.id
                            ? "border-blue-600 bg-blue-600"
                            : "border-gray-300"
                        )}
                      >
                        {answers[question.id] === option.id && (
                          <div className="h-2 w-2 rounded-full bg-white" />
                        )}
                      </div>
                      <span>{option.text}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="flex gap-4 sticky bottom-0 bg-white dark:bg-gray-900 p-4 border-t">
            <Button
              onClick={handleExit}
              variant="outline"
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1"
              disabled={isSubmitting || Object.keys(answers).length !== quiz.questions.length}
            >
              {isSubmitting ? "Submitting..." : "Submit Quiz"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

