import Button from "@mui/material/Button";
import Image from "next/image";

const InitialPage = () => (
    <div>
        <div className="fixed bg-center bg-cover w-screen h-screen overflow-hidden -z-1 brightness-30">
            <Image
                src={"/bookshelf.jpg"}
                alt={"Bookshelf"}
                fill
                priority
            />
        </div>

        <div className={"w-screen h-screen flex flex-col justify-center items-center text-white text-center gap-20 px-10"}>
            <p className={"text-7xl xl:text-9xl"}>Book<span className={"text-[#FFAE00]"}>Shelf</span></p>
            <p className={"text-[#FFAE00] text-4xl sm:text-5xl xl:text-7xl font-bold"}>Expand your book collection</p>
            <p className={"text-xl sm:text-2xl"}>Browse through thousands of books to start, manage, and grow your book collection</p>
            <div className={"flex flex-col gap-7"}>
                <Button href={"/auth/signup"} variant={"contained"} sx={{paddingX: '50px', paddingY: '15px', bgcolor: "primary.light"}}>Create A Free Account</Button>
                <Button href={"/auth/login"}>Sign In</Button>
            </div>
        </div>
    </div>
)

export default InitialPage;