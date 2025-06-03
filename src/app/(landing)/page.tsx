import Navbar from "@/components/ui-home/Navbar";
import HeroSection from "@/components/ui-home/HeroSection";
import About from "@/components/ui-home/About";
import Program from "@/components/ui-home/Program";
import Langganan from "@/components/ui-home/Langganan";
import Footer from "@/components/ui-home/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <About />
      <Program />
      <Langganan />
      <Footer />
    </main>
  );
}
