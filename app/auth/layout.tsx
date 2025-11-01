import Image from "next/image";
import {ReactNode} from "react";
import {Box} from "@mui/material";

export default function AuthLayout({children}: { children: ReactNode }) {
    return (
        <div>
            <Box  className={"w-[45%] h-screen hidden xl:block xl:fixed left-0"}>
                <Image src={"/library.jpg"} alt={"Library"} fill priority />
            </Box>
            <Box className={"xl:w-[55%] h-screen xl:fixed xl:right-0 flex justify-center"}>
                {children}
            </Box>
        </div>
    )
}