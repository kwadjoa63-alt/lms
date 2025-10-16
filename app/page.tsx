import { auth } from "@/lib/auth-new";
import { redirect } from "next/navigation";

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


