import {Box} from "@mui/material";
import {IconType} from "react-icons";
import {PiListHeartThin, PiPencilSimpleLineThin, PiMagnifyingGlassThin, PiStarThin} from "react-icons/pi";

import {PageTitle} from "@/app/components/PageTitle";

export const ServicesPage = () => {
    const sectionItem = (Icon: IconType, title: string, text: string) => (
        <div className={`flex flex-col items-center justify-center text-center w-1/2 h-1/2 gap-5`}>
            <Icon size={50} color={"892602"} />
            <p className={" text-xl text-zinc-900"}>{title}</p>
            <p className={"text-[#7C7C7C] lg:w-[250px]"}>{text}</p>
        </div>
    );

   return (
        <div className={"h-full lg:h-[100vh] pb-25 bg-white"}>
            <PageTitle title={"Services"}/>

            <Box className={"w-full h-full  flex flex-col lg:flex-row lg:flex-wrap justify-center items-center gap-25 lg:gap-0 px-10"}>
                {sectionItem(PiMagnifyingGlassThin, "Discover New Books", "Find new books to read through the NYT Best Sellers and a variety of categories")}
                {sectionItem(PiStarThin, "Save Favorite Books", "Collect your favorite books in one place by creating custom book lists")}
                {sectionItem(PiPencilSimpleLineThin, "Write Reviews", "Let others know how you feel about the books you read")}
                {sectionItem(PiListHeartThin, "Create Lists", "Save and organize books in customized lists")}
            </Box>
        </div>
   );
}