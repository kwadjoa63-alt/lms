import { db } from "@/lib/db";
import { SafeProfile } from "@/types";
import { auth } from "@/lib/auth-new";
import { redirect } from "next/navigation";

export default async function getSafeProfile() {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return redirect("/sign-in");
    }

    const currentProfile = await db.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          name: true,
          imageUrl: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      
      if (!currentProfile) {
        return null;
      }
      
      // Convert createdAt and updatedAt to ISO strings
      const safeProfile: SafeProfile = {
        ...currentProfile,
        createdAt: currentProfile.createdAt.toISOString(),
        updatedAt: currentProfile.updatedAt.toISOString(),
      };

        // currentProfile is passed to client component and client components
        // can only pass stringified JSON objects. So we need to convert   
        // Date objects to ISO strings.
        // The ... operator is used to copy all properties from currentProfile
        // to a new object. We then overwrite the createdAt, updatedAt and
        // emailVerified properties with their ISO string values.
    return safeProfile;
  } catch (error: any) {
    return null;
  }
}

