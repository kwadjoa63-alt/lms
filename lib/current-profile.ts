import { auth } from "@/lib/auth-new";
import { db } from "@/lib/db";

export const currentProfile = async () => {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return null;
    }

    const profile = await db.user.findUnique({
      where: {
        id: userId
      }
    });

    return profile;
  } catch (error) {
    console.error("CURRENT_PROFILE_ERROR", error);
    return null;
  }
};
