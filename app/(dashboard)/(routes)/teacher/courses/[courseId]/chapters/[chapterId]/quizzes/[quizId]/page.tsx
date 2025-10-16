import React from "react";
import { auth } from "@/lib/auth-new";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";
import { QuizTitleForm } from "./_components/quiz-title-form";
import { QuizDescriptionForm } from "./_components/quiz-description-form";
import { QuizPassingScoreForm } from "./_components/quiz-passing-score-form";
import { QuestionsForm } from "./_components/questions-form";
import { QuizActions } from "./_components/quiz-actions";

interface QuizIdPageProps {
  params: {
    courseId: string;
    chapterId: string;
    quizId: string;
  };
}

const QuizIdPage: React.FC<QuizIdPageProps> = async ({ params }) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return redirect("/sign-in");
  }

  const quiz = await db.quiz.findUnique({
    where: {
      id: params.quizId,
      chapterId: params.chapterId,
    },
    include: {
      questions: {
        include: {
          options: {
            orderBy: {
              position: "asc",
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!quiz) {
    return redirect("/");
  }

  const requiredFields = [
    quiz.title,
    quiz.questions.length > 0,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!quiz.isPublished && (
        <Banner
          variant="warning"
          label="This quiz is unpublished. It will not be visible to students"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}/chapters/${params.chapterId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to chapter setup
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Quiz Setup</h1>
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  Complete all fields {completionText}
                </span>
              </div>
              <QuizActions
                disabled={!isComplete}
                courseId={params.courseId}
                chapterId={params.chapterId}
                quizId={params.quizId}
                isPublished={quiz.isPublished}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={FileQuestion} />
                <h2 className="text-xl font-medium">Customize your quiz</h2>
              </div>
              <QuizTitleForm
                initialData={quiz}
                courseId={params.courseId}
                chapterId={params.chapterId}
                quizId={params.quizId}
              />
              <QuizDescriptionForm
                initialData={quiz}
                courseId={params.courseId}
                chapterId={params.chapterId}
                quizId={params.quizId}
              />
              <QuizPassingScoreForm
                initialData={quiz}
                courseId={params.courseId}
                chapterId={params.chapterId}
                quizId={params.quizId}
              />
            </div>
          </div>
          <div className="space-y-4">
            <QuestionsForm
              initialData={quiz.questions}
              courseId={params.courseId}
              chapterId={params.chapterId}
              quizId={params.quizId}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizIdPage;

