import { auth } from "@/lib/auth-new";
import { redirect } from "next/navigation";
import { CheckCircle, Clock, InfoIcon, Users, BookOpen, Award, Shield, GraduationCap } from "lucide-react";

import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";
import { db } from "@/lib/db";

import { InfoCard } from "../(root)/_components/info-card";
import { BannerCard } from "../(root)/_components/banner-card";

export default async function DashboardPage() {
  const session = await auth();
  const userId = session?.user?.id;
  const userRole = session?.user?.role;

  if (!userId) {
    redirect("/sign-in");
  }

  // Get user's enrolled courses
  const {
    completedCourses,
    coursesInProgress
  } = await getDashboardCourses(userId);

  // Admin-specific data
  let totalUsers = 0;
  let totalCourses = 0;
  let totalTeachers = 0;
  let totalStudents = 0;

  if (userRole === "ADMIN") {
    totalUsers = await db.user.count();
    totalCourses = await db.course.count();
    totalTeachers = await db.user.count({ where: { role: "TEACHER" } });
    totalStudents = await db.user.count({ where: { role: "STUDENT" } });
  }

  // Teacher-specific data
  let myCourses = 0;
  let publishedCourses = 0;
  let totalStudentsEnrolled = 0;

  if (userRole === "TEACHER" || userRole === "ADMIN") {
    myCourses = await db.course.count({ where: { userId } });
    publishedCourses = await db.course.count({ 
      where: { userId, isPublished: true } 
    });
    totalStudentsEnrolled = await db.purchase.count({
      where: {
        course: {
          userId,
        },
      },
    });
  }

  // Render different dashboards based on role
  if (userRole === "ADMIN") {
    return (
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <BannerCard
            icon={Shield}
            label="Admin Dashboard"
            description="Welcome to your admin control panel. Manage users, oversee all courses, and monitor platform activity. You have full access to all platform features."
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <InfoCard
            icon={Users}
            label="Total Users"
            numberOfItems={totalUsers}
          />
          <InfoCard
            icon={GraduationCap}
            label="Students"
            numberOfItems={totalStudents}
            variant="success"
          />
          <InfoCard
            icon={BookOpen}
            label="Teachers"
            numberOfItems={totalTeachers}
          />
          <InfoCard
            icon={Award}
            label="Total Courses"
            numberOfItems={totalCourses}
          />
        </div>
      </div>
    );
  }

  if (userRole === "TEACHER") {
    return (
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <BannerCard
            icon={GraduationCap}
            label="Teacher Dashboard"
            description="Welcome to your teaching dashboard. Create and manage your courses, track student enrollment, and view your teaching analytics. Access Teacher Mode to manage your courses."
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InfoCard
            icon={BookOpen}
            label="My Courses"
            numberOfItems={myCourses}
          />
          <InfoCard
            icon={CheckCircle}
            label="Published"
            numberOfItems={publishedCourses}
            variant="success"
          />
          <InfoCard
            icon={Users}
            label="Students Enrolled"
            numberOfItems={totalStudentsEnrolled}
          />
        </div>
      </div>
    );
  }

  // Student dashboard (default)
  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <BannerCard
          icon={InfoIcon}
          label="Welcome to Kwadjo Learning Platform"
          description={`This is where you can track your learning progress 
            and continue your educational journey. Access your courses, monitor your achievements, 
            and unlock new skills. For support or admin access, contact us at kwadjo@learning.com`}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={completedCourses.length}
          variant="success"
        />
      </div>
      <CoursesList
        items={[...coursesInProgress, ...completedCourses]}
      />
    </div>
  )
}

