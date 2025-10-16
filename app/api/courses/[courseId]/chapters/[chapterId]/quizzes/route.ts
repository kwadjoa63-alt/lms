import { auth } from "@/lib/auth-new";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const { title, description, passingScore } = await req.json();

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

    // Get the last quiz position
    const lastQuiz = await db.quiz.findFirst({
      where: {
        chapterId: params.chapterId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastQuiz ? lastQuiz.position + 1 : 0;

    const quiz = await db.quiz.create({
      data: {
        title,
        description,
        passingScore: passingScore || 70,
        chapterId: params.chapterId,
        position: newPosition,
      },
    });

    return NextResponse.json(quiz);
  } catch (error) {
    console.log("[QUIZZES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const quizzes = await db.quiz.findMany({
      where: {
        chapterId: params.chapterId,
      },
      include: {
        questions: {
          include: {
            options: true,
          },
          orderBy: {
            position: "asc",
          },
        },
      },
      orderBy: {
        position: "asc",
      },
    });

    return NextResponse.json(quizzes);
  } catch (error) {
    console.log("[QUIZZES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

