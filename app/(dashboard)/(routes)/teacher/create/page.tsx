import { requireTeacher } from "@/lib/auth";
import CreatePageContent from "./_components/create-page-wrapper";

const CreatePage = async () => {
    // Require teacher/admin access
    await requireTeacher();

    return <CreatePageContent />;
}

export default CreatePage;