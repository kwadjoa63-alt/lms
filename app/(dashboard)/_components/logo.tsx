import Link  from "next/link"
import Image from "next/image"


export const Logo = () => {
    return (<>
        <Link href="/">
            <div className="flex items-center gap-2">
                <Image
                    src="/logo.svg"
                    alt="Kwadjo Learning Platform"
                    width={40}
                    height={40}
                />
                <span className="text-xl font-bold text-slate-700 dark:text-slate-300">
                    Kwadjo Learning
                </span>
            </div>
        </Link>
    </>);
}