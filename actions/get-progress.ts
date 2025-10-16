import { db } from "@/lib/db";

export const getProgress = async (
  userId: string,
  courseId: string
): Promise<number | null> => {
  try {
    const publishedChapters = await db.chapter.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
      select: {
        id: true,
        quizzes: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
      },
    });

    // create an array of chapter ids
    const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);

    // Get chapters with completed video progress
    const chaptersWithVideoProgress = await db.userProgress.findMany({
      where: {
        userId: userId,
        chapterId: {
          in: publishedChapterIds,
        },
        isCompleted: true,
      },
      select: {
        chapterId: true,
      },
    });

    // Check quiz completion for chapters that have quizzes
    let fullyCompletedChapters = 0;
    
    for (const chapter of publishedChapters) {
      const hasVideoProgress = chaptersWithVideoProgress.some(
        (progress) => progress.chapterId === chapter.id
      );
      
      if (!hasVideoProgress) continue;
      
      // If chapter has no quizzes, it's complete with just video
      if (chapter.quizzes.length === 0) {
        fullyCompletedChapters++;
        continue;
      }
      
      // Check if all quizzes for this chapter are completed
      const quizIds = chapter.quizzes.map((quiz) => quiz.id);
      const completedQuizzes = await db.quizAttempt.findMany({
        where: {
          userId: userId,
          quizId: {
            in: quizIds,
          },
          passed: true,
        },
        select: {
          quizId: true,
        },
      });
      
      // Get unique quiz IDs that have been passed
      const passedQuizIds = Array.from(new Set(completedQuizzes.map(q => q.quizId)));
      
      // Chapter is complete only if all quizzes are passed
      if (passedQuizIds.length === quizIds.length) {
        fullyCompletedChapters++;
      }
    }

    //calculate progress percentage:
    // fully completed chapters (video + quizzes) / total published chapters
    const progressPercentage =
      (fullyCompletedChapters / publishedChapters.length) * 100;

    return progressPercentage;
  } catch (error) {
    console.log("[GET_PROGRESS]", error);
    return 0;
  }
};