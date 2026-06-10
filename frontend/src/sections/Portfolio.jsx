import { useState } from "react";
import { MapPin, Ruler } from "lucide-react";
import { PORTFOLIO } from "@/data/mockData";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";

export const Portfolio = () => {
  const [active, setActive] = useState(0);
  const project = PORTFOLIO[active];

  return (
    <section className="py-24 lg:py-32 bg-background" id="portofoliu" data-testid="portfolio-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-end mb-12">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground rounded-full px-4 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              <span className="text-xs font-medium tracking-wide uppercase">Portofoliu</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-tight">
              Transformări reale, grădini de poveste
            </h2>
          </div>
          <p className="lg:col-span-5 text-base text-muted-foreground leading-relaxed">
            Trage de bară pentru a vedea transformarea spectaculoasă a fiecărei curți pe care am amenajat-o.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <BeforeAfterSlider
              before={project.before}
              after={project.after}
              label={`project-${project.id}`}
            />
            <div className="mt-6 flex flex-wrap items-center gap-6">
              <h3 className="font-heading text-2xl font-semibold text-foreground" data-testid="portfolio-active-title">
                {project.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={16} className="text-primary" />
                {project.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Ruler size={16} className="text-primary" />
                {project.surface} mp
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-heading text-sm uppercase tracking-widest text-muted-foreground mb-2">
              Alte proiecte
            </h4>
            {PORTFOLIO.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setActive(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  active === idx
                    ? "border-primary bg-secondary/50"
                    : "border-border bg-white hover:border-primary/40"
                }`}
                data-testid={`portfolio-project-${p.id}`}
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={p.after}
                    alt={p.title}
                    className="w-20 h-20 object-cover rounded-lg shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-heading font-semibold text-sm text-foreground truncate">
                      {p.title}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{p.location}</div>
                    <div className="text-xs text-primary font-medium mt-1">{p.surface} mp</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
