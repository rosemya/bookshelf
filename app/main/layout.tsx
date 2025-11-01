'use client';

import Link from "next/link"
import {Button} from "@mui/material"
import {useRouter} from "next/navigation";

import {auth} from "@/app/config";

export default function MainLayout({children,}: { children: React.ReactNode; }) {
    const router = useRouter();

    const signOut = () => {
        auth.signOut().then(() => {
            router.push("/");
        }).catch((error) => {
                console.log(error);
        })
    }

    return (
        <div>
            <div className={"flex w-screen bg-white z-10 px-10 py-5 justify-between shadow-md mb-5"}>
                <Link href={"/main"} className={"text-3xl font-bold"}>Book<span className={"text-[#FFAE00]"}>Shelf</span></Link>
                <div className={"flex items-center gap-5"}>
                    <Link href="/main" className={"hidden md:block"}>Explore</Link>
                    <Link href="/main/bookshelf">Bookshelf</Link>
                    <Button onClick={signOut} className={"cursor-pointer"}>Sign Out</Button>
                </div>
            </div>
            {children}
        </div>
    )
}