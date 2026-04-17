import Hero from "@/components/HeroComponent";
import Modren from "@/components/Modren";
import RealTimeWork from "@/components/RealTimeWork";
import Testimonials  from "@/components/Testimonials";
import Features from "@/components/Features";
import OurTeam from "@/components/OurTeam";
import FAQ from "@/components/ui/faq-2";

const Home = () => {
  return (
    <main>
      <Hero />
      <Features />
      <Modren />
      <RealTimeWork />
      <OurTeam />
      <FAQ />
      <Testimonials />
    </main>
  );
};

export default Home;
