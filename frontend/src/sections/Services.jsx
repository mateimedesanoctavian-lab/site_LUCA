import { Sprout, Droplets, TreePine, Scissors, ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/data/mockData";

const ICONS = { Sprout, Droplets, TreePine, Scissors };

export const Services = () => {
  return (
    <section className="py-24 lg:py-32 bg-background" id="servicii" data-testid="services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-end mb-16">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground rounded-full px-4 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              <span className="text-xs font-medium tracking-wide uppercase">Servicii complete</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-tight">
              Tot ce ai nevoie pentru o grădină de invidiat
            </h2>
          </div>
          <p className="lg:col-span-5 text-base text-muted-foreground leading-relaxed">
            Oferim soluții complete de amenajare și întreținere, de la proiectarea inițială la mentenanța lunară. Echipa noastră îți garantează rezultate excepționale și durabile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SERVICES.map((service, idx) => {
            const Icon = ICONS[service.icon];
            return (
              <div
                key={service.id}
                className="group relative bg-white border border-border rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                data-testid={`service-card-${service.id}`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-md">
                    <Icon className="w-6 h-6 text-primary" strokeWidth={1.75} />
                  </div>
                </div>

                <div className="p-7">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-heading text-xl font-semibold text-foreground leading-snug">
                      {service.title}
                    </h3>
                    <ArrowUpRight
                      size={20}
                      className="text-muted-foreground shrink-0 mt-1 transition-all group-hover:text-primary group-hover:rotate-45"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {service.description}
                  </p>
                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">De la</span>
                    <span className="font-heading text-lg font-bold text-primary">
                      {service.pricePerSqm} RON / mp
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
