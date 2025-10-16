import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"

import { Menu } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { SafeProfile } from "@/types";

interface MobileSidebarProps {
    currentProfile?: SafeProfile | null;
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({ currentProfile }) => {

    
    return (

        <Sheet>
            <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
                <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <Sidebar currentProfile={currentProfile} />
            </SheetContent>
        </Sheet>

    )
}