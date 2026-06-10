import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../components/ui/button";

export const Hero = () => {
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-start overflow-hidden pt-20"
      data-testid="hero-section"
    >
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1594498653385-d5172c532c00?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxiYWNreWFyZCUyMGdhcmRlbnxlbnwwfHx8fDE3ODExMDU5NjN8MA&ixlib=rb-4.1.0&q=85"
          alt="Grădină verde"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl py-20 animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <Sparkles size={14} className="text-amber-300" />
            <span className="text-xs text-white font-medium tracking-wide">Amenajări premium din 2010</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-6">
            Transformăm curtea ta într-o <span className="text-emerald-300">oază de verdeață</span>
          </h1>

          <p className="text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl mb-10">
            De la gazon impecabil la sisteme inteligente de irigații, creăm spații verzi care îți schimbă casa. Cu peste 500 de proiecte finalizate în toată România.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => scrollTo("#servicii")}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-base font-medium group shadow-lg"
              data-testid="hero-view-services-btn"
            >
              Vezi Serviciile
              <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              onClick={() => scrollTo("#programare")}
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-md border-white/40 text-white hover:bg-white hover:text-primary rounded-full px-8 py-6 text-base font-medium"
              data-testid="hero-request-offer-btn"
            >
              Cere o Ofertă
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-16 max-w-lg">
            <div data-testid="hero-stat-projects">
              <div className="font-heading text-3xl font-bold text-white">500+</div>
              <div className="text-xs text-white/70 mt-1">Proiecte finalizate</div>
            </div>
            <div data-testid="hero-stat-years">
              <div className="font-heading text-3xl font-bold text-white">15+</div>
              <div className="text-xs text-white/70 mt-1">Ani experiență</div>
            </div>
            <div data-testid="hero-stat-clients">
              <div className="font-heading text-3xl font-bold text-white">98%</div>
              <div className="text-xs text-white/70 mt-1">Clienți mulțumiți</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
