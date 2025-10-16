import { auth } from "@/lib/auth-new";
import { redirect } from "next/navigation";
import { CheckCircle, Clock, InfoIcon } from "lucide-react";

import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";

import { InfoCard } from "./_components/info-card";
import { BannerCard } from "./_components/banner-card";

export default async function Dashboard() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/sign-in");
  }

  const {
    completedCourses,
    coursesInProgress
  } = await getDashboardCourses(userId);

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
