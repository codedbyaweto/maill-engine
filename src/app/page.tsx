
import {Hero} from "@/components/home/hero";
import {Carousel1} from "@/components/home/carousel11";
import {Footer} from "@/components/home/footer";
import {Section} from "@/components/home/section1";
import {FAQ1} from "@/components/home/faq";
import {Header} from "@/components/shared/HomeHeader";
import {MetricsSection} from "@/components/home/section2";
import {Features} from "@/components/home/features";
import {PricingSection} from "@/components/home/PricingSection";


export default function Home() {
    return (
        <>
            <Header />
            <Hero/>
            <Features/>
            <Carousel1/>
            <Section/>
            <MetricsSection />
            <PricingSection/>
            <FAQ1/>
            <Footer/>
        </>
    );
}
