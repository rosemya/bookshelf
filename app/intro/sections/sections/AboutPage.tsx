import {SectionContainer} from "@/app/components/SectionContainer";
import {SectionTitle} from "@/app/components/SectionTitle";
import Image from "next/image";

const AboutPage = () => (
    <SectionContainer>
        <SectionTitle title={"About"} />
        <div className={"flex justify-center items-center h-full gap-20 flex-col xl:flex-row"}>
            <Image src={"/fantasy.jpg"} alt={"Fantasy"} width={900} height={400} />
            <p className={"bg-[#FFE0AE] sm:w-[500px] p-10 text-lg"}>At Bookshelf we believe in the importance of reading. Reading expands people’s creativity, perspective, and improves different areas of our lives. <br /><br />
                We are happy to provide a platform for people to start or continue their reading journey. We will dedicate our efforts to give users the best experience for their story.</p>
        </div>
    </SectionContainer>
)

export default AboutPage;