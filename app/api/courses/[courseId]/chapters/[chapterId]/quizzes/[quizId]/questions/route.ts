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
    const { question, type, points, explanation, options } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verify course ownership
    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get the last question position
    const lastQuestion = await db.question.findFirst({
      where: {
        quizId: params.quizId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastQuestion ? lastQuestion.position + 1 : 0;

    const newQuestion = await db.question.create({
      data: {
        question,
        type: type || "multiple-choice",
        points: points || 1,
        explanation,
        quizId: params.quizId,
        position: newPosition,
      },
    });

    // Create options if provided
    if (options && options.length > 0) {
      await Promise.all(
        options.map((option: any, index: number) =>
          db.questionOption.create({
            data: {
              text: option.text,
              isCorrect: option.isCorrect || false,
              position: index,
              questionId: newQuestion.id,
            },
          })
        )
      );
    }

    // Fetch the complete question with options
    const questionWithOptions = await db.question.findUnique({
      where: {
        id: newQuestion.id,
      },
      include: {
        options: {
          orderBy: {
            position: "asc",
          },
        },
      },
    });

    return NextResponse.json(questionWithOptions);
  } catch (error) {
    console.log("[QUESTIONS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

