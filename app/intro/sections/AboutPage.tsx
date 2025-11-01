import {Box} from "@mui/material";
import Image from "next/image";

import {PageTitle} from "@/app/components/PageTitle";

export const AboutPage = () => (
    <div className={"bg-white flex flex-col pb-25 px-10"}>
        <PageTitle title={"About"} css={"xl:mb-20"} />
        <Box className={"flex flex-col xl:flex-row gap-10 justify-center items-center"}>
            <Image src={"/fantasy.jpg"} alt={"Fantasy"} width={700} height={500} />
            <p className={"bg-[#FFE0AE] w-[500px] p-10 text-lg"}>At Bookshelf we believe in the importance of reading.
                Reading expands people’s creativity, perspective, and improves different areas of our lives. <br /><br />
                We are happy to provide a platform for people to start or continue their reading journey.
                We will dedicate our efforts to give everyone the best experience for their journey.
            </p>
        </Box>
    </div>
)