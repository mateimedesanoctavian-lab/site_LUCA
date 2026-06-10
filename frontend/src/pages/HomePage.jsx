import { Navbar } from "@/sections/Navbar";
import { Hero } from "@/sections/Hero";
import { Services } from "@/sections/Services";
import { Calculator } from "@/sections/Calculator";
import { Portfolio } from "@/sections/Portfolio";
import { BookingForm } from "@/sections/BookingForm";
import { Footer } from "@/sections/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background" data-testid="home-page">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Calculator />
        <BookingForm />
      </main>
      <Footer />
    </div>
  );
}
