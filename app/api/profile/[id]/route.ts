import { db } from "@/lib/db";
import { auth } from "@/lib/auth-new";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const { ...values } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if the user making the request is an admin
    const requestingUser = await db.user.findUnique({
      where: { id: userId },
      select: { role: true }
    });

    if (requestingUser?.role !== "ADMIN") {
      return new NextResponse("Forbidden - Admin access required", { status: 403 });
    }

    // Update user role
    const user = await db.user.update({
      where: {
        id: params.id,
      },
      data: {
        ...values,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[PROFILE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
