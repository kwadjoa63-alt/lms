import { db } from "@/lib/db";
import { auth } from "@/lib/auth-new";
import { NextResponse } from "next/server";

// This endpoint is called from the client to verify if a purchase exists
// Useful for checking after payment completion
export async function GET(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const authSession = await auth();
    const userId = authSession?.user?.id;

    if (!userId) {
      return NextResponse.json({ purchased: false }, { status: 401 });
    }

    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: params.courseId,
        },
      },
    });

    return NextResponse.json({ purchased: !!purchase });
  } catch (error) {
    console.log("[VERIFY_PURCHASE]", error);
    return NextResponse.json({ purchased: false }, { status: 500 });
  }
}

