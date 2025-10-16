import { auth } from "@/lib/auth-new";
import { redirect } from "next/navigation";

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  try {
    const session = await auth();
    
    if (!session?.user) {
      redirect("/sign-in");
    }
    
    redirect("/dashboard");
  } catch (error) {
    console.error('HomePage error:', error);
    // Fallback redirect to sign-in
    redirect("/sign-in");
  }
}


