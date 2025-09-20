
import AboutUs from "@/component/aboutuscontent";
import Hero from "@/component/Hero";
import Navbar from "@/component/Navbar";
import Partners from "@/component/Partners";
import Features from "@/component/Features";
import CtaOne from "@/component/ctaone";
import Pricing from "@/component/pricing";
import Testimonials from "@/component/Testimonials";
import Footer from "@/component/Footer";
import Membership from "@/component/whyoutmail";
import Faq from "@/component/faq";
import { StaggerTestimonials } from "@/component/ui/stagger-testimonials";
import { Card } from "@/component/ui/container-scroll-animation";
import MissionValues from "@/component/visionmission";
import FlipMaskCard from "@/component/flipmask";




export default function Home() {
  return (
    <div >
    <Navbar/>
    <Hero/>
    <Features/>
    <Partners/>
   
    <CtaOne/>
    <AboutUs/>
    <Pricing/>
    <Testimonials/>

    {/* <Membership/> */}
    <Faq/>
   
    <Footer/>
   
    
   


    </div>

  );
}
