import {InitialPage} from "@/app/intro/sections/InitialPage";
import {AboutPage} from "@/app/intro/sections/AboutPage";
import {ServicesPage} from "@/app/intro/sections/ServicesPage";
import {Footer} from "@/app/intro/sections/Footer";

const Intro = () => (
        <div>
            <InitialPage />
            <AboutPage />
            <ServicesPage />
            <Footer />
        </div>
);

export default Intro;