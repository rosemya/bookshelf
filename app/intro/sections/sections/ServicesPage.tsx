import {SectionContainer} from "@/app/components/SectionContainer";
import {SectionTitle} from "@/app/components/SectionTitle";
import {IconType} from "react-icons";
import {PiBellRingingThin, PiCalendarCheckThin, PiMagnifyingGlassThin, PiStarThin} from "react-icons/pi";

const ServicesPage = () => {
    const sectionItem = (Icon: IconType, title: string, text: string) => (
        <div className={`flex flex-col items-center justify-center w-1/2 h-1/2 gap-5`}>
            <Icon size={50} color={"#892602"} />
            <p className={" text-xl text-zinc-900 text-center"}>{title}</p>
            <p className={"text-[#7C7C7C] xl:w-[300px] text-center"}>{text}</p>
        </div>
    );

   return (
       <SectionContainer>
            <SectionTitle title={"Services"}/>
            <div className={"h-[90%] flex flex-col xl:flex-row flex-wrap items-center gap-25 xl:gap-0"}>
                {sectionItem(PiMagnifyingGlassThin, "Discover New Books", "Find new books to read through our search feature and recommendations")}
                {sectionItem(PiCalendarCheckThin, "Track reading Progress", "Set which books you are currently reading, see how often and how much you’ve read")}
                {sectionItem(PiBellRingingThin, "Reading Reminders", "Preserve your reading goals by setting reminders to get you keep on track")}
                {sectionItem(PiStarThin, "Save Favorite Books", "Collect your favorite books in one place by creating custom book lists")}
            </div>
        </SectionContainer>
   )
};

export default ServicesPage;