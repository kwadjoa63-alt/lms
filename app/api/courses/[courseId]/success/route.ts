import { db } from "@/lib/db";
import { auth } from "@/lib/auth-new";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function GET(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { searchParams, origin } = new URL(req.url);
    const sessionId = searchParams.get('session_id');

    // Get base URL from request origin or environment variable
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || origin || 'http://localhost:3000';

    const authSession = await auth();
    const userId = authSession?.user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!sessionId) {
      return new NextResponse("Session ID required", { status: 400 });
    }

    // Verify the session with Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Check if payment was successful
    if (session.payment_status !== "paid") {
      return NextResponse.redirect(
        new URL(`/courses/${params.courseId}?canceled=1`, baseUrl)
      );
    }

    // Check if purchase already exists
    const existingPurchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: params.courseId,
        },
      },
    });

    // If purchase doesn't exist, create it
    if (!existingPurchase) {
      await db.purchase.create({
        data: {
          userId,
          courseId: params.courseId,
        },
      });
    }

    // Redirect to course with success message
    return NextResponse.redirect(
      new URL(`/courses/${params.courseId}?success=1`, baseUrl)
    );
  } catch (error) {
    console.log("[COURSE_SUCCESS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

