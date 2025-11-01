import Link from "next/link";

export const Footer = () => (
    <div className={"h-[200px] bg-zinc-800 flex flex-col sm:flex-row items-center justify-between p-10"}>
        <Link href={"/"} className={"text-white text-4xl"}>Book<span className={"text-[#FFAE00]"}>Shelf</span></Link>
        <div className={"flex text-xl text-white gap-10"}>
            <Link href={"/auth/login"}>Login</Link>
            <Link href={"/auth/signup"}>Sign Up</Link>
        </div>
    </div>
);

