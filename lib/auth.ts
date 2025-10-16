import { auth } from "./auth-new";
import { redirect } from "next/navigation";
import { db } from "./db";

export const getCurrentUser = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  
  if (!userId) {
    return null;
  }

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
};

export const requireAuth = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  
  if (!userId) {
    redirect("/sign-in");
  }

  return userId;
};

export const requireTeacher = async () => {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/sign-in");
  }

  if (user.role !== "TEACHER" && user.role !== "ADMIN") {
    redirect("/");
  }

  return user;
};

export const requireAdmin = async () => {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/sign-in");
  }

  if (user.role !== "ADMIN") {
    redirect("/");
  }

  return user;
};

export const isTeacher = (role: string) => {
  return role === "TEACHER" || role === "ADMIN";
};

export const isAdmin = (role: string) => {
  return role === "ADMIN";
};
