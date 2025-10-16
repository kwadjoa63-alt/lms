import { auth } from "@/lib/auth-new";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string; quizId: string } }
) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const { answers } = await req.json(); // answers: { questionId: selectedOptionId }

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get quiz with questions and correct answers
    const quiz = await db.quiz.findUnique({
      where: {
        id: params.quizId,
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    if (!quiz) {
      return new NextResponse("Quiz not found", { status: 404 });
    }

    // Create quiz attempt
    const attempt = await db.quizAttempt.create({
      data: {
        userId,
        quizId: params.quizId,
        completed: true,
        score: 0,
        passed: false,
      },
    });

    let totalPoints = 0;
    let earnedPoints = 0;

    // Process each answer
    for (const question of quiz.questions) {
      totalPoints += question.points;
      const userAnswer = answers[question.id];

      if (userAnswer) {
        // Find the correct answer
        const correctOption = question.options.find((opt) => opt.isCorrect);
        const isCorrect = userAnswer === correctOption?.id;

        if (isCorrect) {
          earnedPoints += question.points;
        }

        // Save the answer
        await db.quizAnswer.create({
          data: {
            userId,
            questionId: question.id,
            attemptId: attempt.id,
            answer: userAnswer,
            isCorrect,
          },
        });
      }
    }

    // Calculate score percentage
    const score = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
    const passed = score >= quiz.passingScore;

    // Update attempt with final score
    const updatedAttempt = await db.quizAttempt.update({
      where: {
        id: attempt.id,
      },
      data: {
        score,
        passed,
      },
      include: {
        answers: {
          include: {
            question: {
              include: {
                options: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({
      attemptId: updatedAttempt.id,
      score,
      passed,
      totalPoints,
      earnedPoints,
      passingScore: quiz.passingScore,
      answers: updatedAttempt.answers,
    });
  } catch (error) {
    console.log("[QUIZ_SUBMIT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

