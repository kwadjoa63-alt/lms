import { Category, Course, User } from "@prisma/client";

export type CourseWithProgressWithCategory = Course & {
    category: Category | null;
    chapters: { id: string }[];
    progress: number | null;
};

export type SafeProfile = Omit<
  User,
  "createdAt" | "updatedAt" | "password"
> & {
  createdAt: string;
  updatedAt: string;
};
