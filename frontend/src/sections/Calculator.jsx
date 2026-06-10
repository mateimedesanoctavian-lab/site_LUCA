import { useState, useMemo } from "react";
import { Calculator as CalcIcon, Info, ArrowRight } from "lucide-react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { Button } from "../components/ui/button";
import { CALCULATOR_OPTIONS } from "@/data/mockData";

export const Calculator = () => {
  const [surface, setSurface] = useState(150);
  const [selected, setSelected] = useState({
    "lawn-install": true,
    "irrigation": false,
    "design3d": false,
    "planting": false,
    "maintenance": false,
  });

  const toggle = (id) => setSelected((prev) => ({ ...prev, [id]: !prev[id] }));

  const { low, high } = useMemo(() => {
    const sqm = Math.max(0, Number(surface) || 0);
    let base = 0;
    CALCULATOR_OPTIONS.forEach((opt) => {
      if (selected[opt.id]) {
        if (opt.flatPrice) base += opt.flatPrice;
        else base += sqm * opt.pricePerSqm;
      }
    });
    return {
      low: Math.round(base * 0.9),
      high: Math.round(base * 1.15),
    };
  }, [surface, selected]);

  const formatRON = (n) => new Intl.NumberFormat("ro-RO").format(n) + " RON";

  const scrollToBooking = () => {
    document.querySelector("#programare")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 lg:py-32 bg-secondary/40" id="calculator" data-testid="calculator-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 mb-5 border border-border">
              <CalcIcon size={14} className="text-primary" />
              <span className="text-xs font-medium tracking-wide uppercase text-primary">Calculator preț</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-tight mb-5">
              Estimează costul amenajării tale
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-6">
              Introdu suprafața curții tale și selectează serviciile dorite pentru a primi instant un interval estimativ de preț. Calculul se actualizează automat.
            </p>
            <div className="flex items-start gap-2 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <Info size={18} className="text-amber-700 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 leading-relaxed">
                <strong>Acesta este un preț estimativ.</strong> Costul final depinde de complexitatea terenului, materialele alese și accesibilitatea locației. Pentru o ofertă personalizată, te rugăm să soliciți o vizită la fața locului.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white border border-border rounded-2xl p-8 lg:p-10 shadow-sm">
              <div className="mb-8">
                <Label htmlFor="surface-input" className="text-sm font-semibold text-foreground mb-3 block">
                  Suprafață curte (mp)
                </Label>
                <div className="relative">
                  <Input
                    id="surface-input"
                    type="number"
                    min="0"
                    value={surface}
                    onChange={(e) => setSurface(e.target.value)}
                    className="h-14 text-lg pr-16 border-border focus-visible:ring-primary"
                    data-testid="calculator-surface-input"
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">mp</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="1500"
                  step="10"
                  value={surface}
                  onChange={(e) => setSurface(e.target.value)}
                  className="w-full mt-4 accent-primary"
                  data-testid="calculator-surface-slider"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>20 mp</span>
                  <span>1500 mp</span>
                </div>
              </div>

              <div className="mb-8">
                <Label className="text-sm font-semibold text-foreground mb-4 block">
                  Servicii dorite
                </Label>
                <div className="space-y-3">
                  {CALCULATOR_OPTIONS.map((opt) => (
                    <label
                      key={opt.id}
                      htmlFor={`calc-${opt.id}`}
                      className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                        selected[opt.id]
                          ? "border-primary bg-secondary/50"
                          : "border-border bg-white hover:border-primary/40"
                      }`}
                      data-testid={`calculator-option-${opt.id}`}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id={`calc-${opt.id}`}
                          checked={selected[opt.id]}
                          onCheckedChange={() => toggle(opt.id)}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          data-testid={`calculator-checkbox-${opt.id}`}
                        />
                        <span className="text-sm font-medium text-foreground">{opt.label}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {opt.flatPrice ? `${opt.flatPrice} RON` : `${opt.pricePerSqm} RON/mp`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Estimare totală</span>
                  <span className="text-xs text-muted-foreground">± marjă de variație</span>
                </div>
                <div
                  className="font-heading text-3xl sm:text-4xl font-bold text-primary mb-6"
                  data-testid="calculator-price-result"
                >
                  {formatRON(low)} <span className="text-muted-foreground font-medium">–</span> {formatRON(high)}
                </div>
                <Button
                  onClick={scrollToBooking}
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-full h-12 group"
                  data-testid="calculator-cta-booking"
                >
                  Rezervă o consultație gratuită
                  <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
