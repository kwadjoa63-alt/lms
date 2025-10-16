import { auth } from "@/lib/auth-new";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string; quizId: string } }
) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get quiz attempts for this user and quiz, ordered by most recent first
    const attempts = await db.quizAttempt.findMany({
      where: {
        userId,
        quizId: params.quizId,
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
      orderBy: {
        createdAt: "desc",
      },
    });

    // Transform the data to match what the frontend expects
    const transformedAttempts = attempts.map((attempt) => ({
      id: attempt.id,
      score: attempt.score,
      passed: attempt.passed,
      createdAt: attempt.createdAt.toISOString(),
      answers: attempt.answers.map((answer) => ({
        questionId: answer.questionId,
        answer: answer.optionId,
        isCorrect: answer.isCorrect,
      })),
    }));

    return NextResponse.json(transformedAttempts);
  } catch (error) {
    console.log("[QUIZ_ATTEMPTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
