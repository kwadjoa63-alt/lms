import { auth } from "@/lib/auth-new";
import { Chapter, Course, UserProgress } from "@prisma/client"
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { CourseProgress } from "@/components/course-progress";

import { CourseSidebarItem } from "./course-sidebar-item";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
      quizzes: {
        id: string;
        isPublished: boolean;
      }[];
    })[]
  };
  progressCount: number;
};

export const CourseSidebar = async ({
  course,
  progressCount,
}: CourseSidebarProps) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return redirect("/sign-in");
  }

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      }
    }
  });

  // Check quiz completion for each chapter
  const chaptersWithQuizStatus = await Promise.all(
    course.chapters.map(async (chapter) => {
      const hasVideoProgress = !!chapter.userProgress?.[0]?.isCompleted;
      const publishedQuizzes = chapter.quizzes.filter(quiz => quiz.isPublished);
      
      if (!hasVideoProgress || publishedQuizzes.length === 0) {
        return {
          ...chapter,
          isFullyCompleted: hasVideoProgress,
        };
      }

      // Check if all quizzes are passed
      const quizIds = publishedQuizzes.map(quiz => quiz.id);
      const passedQuizzes = await db.quizAttempt.findMany({
        where: {
          userId,
          quizId: {
            in: quizIds,
          },
          passed: true,
        },
        select: {
          quizId: true,
        },
      });

      const isFullyCompleted = passedQuizzes.length === quizIds.length;
      
      return {
        ...chapter,
        isFullyCompleted,
        hasQuizzes: publishedQuizzes.length > 0,
      };
    })
  );

  return (
    <div className="flex flex-col h-full overflow-y-auto border-r shadow-sm">
      <div className="flex flex-col p-8 border-b">
        <h1 className="font-semibold">
          {course.title}
        </h1>
        {purchase && (
          <div className="mt-10">
            <CourseProgress
              variant="success"
              value={progressCount}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {chaptersWithQuizStatus.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={chapter.isFullyCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
            hasQuizzes={chapter.quizzes.length > 0}
          />
        ))}
      </div>
    </div>
  )
}