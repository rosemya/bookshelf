import Image from "next/image";
import {Button} from "@mui/material";

export const InitialPage = () => (
    <div className={"flex items-center justify-center w-screen h-screen"}>
        {/* Background Image */}
        <div className={"fixed bg-center bg-cover w-screen h-screen brightness-30 -z-1"}>
            <Image src={"/bookshelf.jpg"} alt={"Bookshelf"} fill priority />
        </div>

        {/* Body */}
        <div className={"flex flex-col items-center gap-10 text-white text-center px-10"}>
            <p className={"text-7xl"}>Book<span className={"text-[#FFAE00]"}>Shelf</span></p>
            <p className={"text-[#F4B850] text-5xl font-bold"}>Expand your book collection</p>
            <p className={"text-2xl"}>Browse through thousands of books to start, manage, and grow your book collection</p>

            <div className={"flex flex-col gap-5"}>
                <Button href={"/auth/signup"} variant={"contained"} sx={{paddingX: '50px', paddingY: '15px', bgcolor: "primary.light"}}>Create A Free Account</Button>
                {/* @ts-ignore */}
                <Button href={"/auth/login"} color={"white"}>Sign In</Button>
            </div>
        </div>
    </div>
)