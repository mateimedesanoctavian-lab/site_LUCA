import { useState } from "react";
import { Check, Calendar as CalendarIcon, User, Sparkles, ArrowRight, ArrowLeft, Sprout, Droplets, TreePine, Scissors, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Calendar } from "../components/ui/calendar";
import { toast } from "sonner";
import { useApp } from "@/context/AppContext";
import { SERVICES, TIME_SLOTS } from "@/data/mockData";

const ICONS = { Sprout, Droplets, TreePine, Scissors };

const STEPS = [
  { num: 1, label: "Serviciu", icon: Sparkles },
  { num: 2, label: "Data & Ora", icon: CalendarIcon },
  { num: 3, label: "Detalii", icon: User },
  { num: 4, label: "Confirmare", icon: Check },
];

export const BookingForm = () => {
  const { addAppointment } = useApp();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [serviceId, setServiceId] = useState("");
  const [date, setDate] = useState(undefined);
  const [time, setTime] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", location: "", surface: "", notes: "" });
  const [errors, setErrors] = useState({});

  const updateForm = (key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validateStep3 = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 3) e.name = "Numele este obligatoriu (min. 3 caractere)";
    if (!/^[\d\s+()-]{9,}$/.test(form.phone.trim())) e.phone = "Număr de telefon invalid";
    if (!form.location.trim() || form.location.trim().length < 5) e.location = "Adresa este obligatorie";
    if (!form.surface || Number(form.surface) <= 0) e.surface = "Suprafața trebuie să fie un număr pozitiv";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && !serviceId) {
      toast.error("Te rugăm să selectezi un serviciu");
      return;
    }
    if (step === 2 && (!date || !time)) {
      toast.error("Te rugăm să alegi data și ora");
      return;
    }
    if (step === 3) {
      if (!validateStep3()) return;
      handleSubmit();
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => setStep(Math.max(1, step - 1));

  const handleSubmit = () => {
    setSubmitting(true);
    const service = SERVICES.find((s) => s.id === serviceId);
    const dateStr = date ? date.toISOString().split("T")[0] : "";
    setTimeout(() => {
      addAppointment({
        client: form.name,
        phone: form.phone,
        service: service?.title || "Necunoscut",
        serviceId,
        date: dateStr,
        time,
        location: form.location,
        surface: Number(form.surface),
        notes: form.notes,
      });
      setSubmitting(false);
      setStep(4);
      toast.success("Programarea a fost trimisă cu succes!");
    }, 800);
  };

  const handleReset = () => {
    setStep(1);
    setServiceId("");
    setDate(undefined);
    setTime("");
    setForm({ name: "", phone: "", location: "", surface: "", notes: "" });
    setErrors({});
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <section className="py-24 lg:py-32 bg-secondary/30" id="programare" data-testid="booking-section">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 mb-5 border border-border">
            <CalendarIcon size={14} className="text-primary" />
            <span className="text-xs font-medium tracking-wide uppercase text-primary">Programare rapidă</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-tight mb-4">
            Rezervă o consultație gratuită
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Completează formularul în 4 pași simpli. Te contactăm în maxim 24 de ore pentru confirmare.
          </p>
        </div>

        {/* Steps Indicator */}
        <div className="hidden sm:flex items-center justify-center mb-10" data-testid="booking-steps-indicator">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            const isActive = step === s.num;
            const isDone = step > s.num;
            return (
              <div key={s.num} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isDone
                        ? "bg-primary text-white"
                        : isActive
                        ? "bg-primary text-white ring-4 ring-primary/20"
                        : "bg-white border-2 border-border text-muted-foreground"
                    }`}
                    data-testid={`booking-step-indicator-${s.num}`}
                  >
                    {isDone ? <Check size={20} /> : <Icon size={18} />}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${isActive || isDone ? "text-foreground" : "text-muted-foreground"}`}>
                    {s.label}
                  </span>
                </div>
                {idx < STEPS.length - 1 && (
                  <div className={`w-16 lg:w-24 h-0.5 mx-2 -mt-6 ${isDone ? "bg-primary" : "bg-border"}`}></div>
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-white border border-border rounded-2xl p-6 sm:p-10 shadow-sm">
          {/* Step 1: Service Selection */}
          {step === 1 && (
            <div data-testid="booking-step-1">
              <h3 className="font-heading text-2xl font-semibold mb-2">Ce serviciu te interesează?</h3>
              <p className="text-sm text-muted-foreground mb-6">Selectează unul dintre serviciile noastre.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SERVICES.map((s) => {
                  const Icon = ICONS[s.icon];
                  const isSelected = serviceId === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setServiceId(s.id)}
                      className={`text-left p-5 rounded-xl border-2 transition-all ${
                        isSelected
                          ? "border-primary bg-secondary/50 ring-2 ring-primary/20"
                          : "border-border bg-white hover:border-primary/40"
                      }`}
                      data-testid={`booking-service-${s.id}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected ? "bg-primary text-white" : "bg-muted text-primary"
                        }`}>
                          <Icon size={20} strokeWidth={1.75} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-heading font-semibold text-base text-foreground mb-1">{s.title}</div>
                          <div className="text-xs text-muted-foreground line-clamp-2">{s.description}</div>
                        </div>
                        {isSelected && <Check size={20} className="text-primary shrink-0" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Date & Time */}
          {step === 2 && (
            <div data-testid="booking-step-2">
              <h3 className="font-heading text-2xl font-semibold mb-2">Alege data și ora preferată</h3>
              <p className="text-sm text-muted-foreground mb-6">Selectează un slot disponibil pentru consultație.</p>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(d) => d < today || d.getDay() === 0}
                    className="rounded-md border border-border bg-white"
                    data-testid="booking-calendar"
                  />
                </div>
                <div>
                  <Label className="text-sm font-semibold text-foreground mb-3 block">
                    Sloturi disponibile {date ? `(${date.toLocaleDateString("ro-RO")})` : ""}
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setTime(slot)}
                        disabled={!date}
                        className={`py-3 px-2 rounded-lg border text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                          time === slot
                            ? "border-primary bg-primary text-white"
                            : "border-border bg-white text-foreground hover:border-primary/50"
                        }`}
                        data-testid={`booking-time-${slot}`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                  {!date && (
                    <p className="text-xs text-muted-foreground mt-4">Alege mai întâi o dată.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Details */}
          {step === 3 && (
            <div data-testid="booking-step-3">
              <h3 className="font-heading text-2xl font-semibold mb-2">Detaliile tale</h3>
              <p className="text-sm text-muted-foreground mb-6">Te contactăm pentru confirmare.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium mb-1.5 block">Nume complet *</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => updateForm("name", e.target.value)}
                    placeholder="Andrei Popescu"
                    className="h-11"
                    data-testid="booking-input-name"
                  />
                  {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium mb-1.5 block">Telefon *</Label>
                  <Input
                    id="phone"
                    value={form.phone}
                    onChange={(e) => updateForm("phone", e.target.value)}
                    placeholder="+40 721 234 567"
                    className="h-11"
                    data-testid="booking-input-phone"
                  />
                  {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="location" className="text-sm font-medium mb-1.5 block">Adresa curții *</Label>
                  <Input
                    id="location"
                    value={form.location}
                    onChange={(e) => updateForm("location", e.target.value)}
                    placeholder="Str. Florilor 12, București"
                    className="h-11"
                    data-testid="booking-input-location"
                  />
                  {errors.location && <p className="text-xs text-red-600 mt-1">{errors.location}</p>}
                </div>
                <div>
                  <Label htmlFor="surface" className="text-sm font-medium mb-1.5 block">Suprafață curte (mp) *</Label>
                  <Input
                    id="surface"
                    type="number"
                    min="1"
                    value={form.surface}
                    onChange={(e) => updateForm("surface", e.target.value)}
                    placeholder="250"
                    className="h-11"
                    data-testid="booking-input-surface"
                  />
                  {errors.surface && <p className="text-xs text-red-600 mt-1">{errors.surface}</p>}
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="notes" className="text-sm font-medium mb-1.5 block">Cerințe specifice (opțional)</Label>
                  <Textarea
                    id="notes"
                    value={form.notes}
                    onChange={(e) => updateForm("notes", e.target.value)}
                    placeholder="Doresc plante rezistente la secetă, stil mediteranean..."
                    rows={4}
                    data-testid="booking-input-notes"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="text-center py-8" data-testid="booking-step-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Check size={40} className="text-primary" strokeWidth={2.5} />
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold mb-3">
                Mulțumim, {form.name.split(" ")[0]}!
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Programarea ta a fost înregistrată. Te vom contacta în maxim 24 de ore la numărul <strong className="text-foreground">{form.phone}</strong> pentru confirmare.
              </p>
              <div className="inline-block bg-secondary/60 border border-border rounded-xl p-5 text-left mb-8">
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Detalii programare</div>
                <div className="text-sm text-foreground space-y-1">
                  <div><strong>Data:</strong> {date?.toLocaleDateString("ro-RO")} la {time}</div>
                  <div><strong>Serviciu:</strong> {SERVICES.find((s) => s.id === serviceId)?.title}</div>
                  <div><strong>Adresă:</strong> {form.location}</div>
                </div>
              </div>
              <div>
                <Button
                  onClick={handleReset}
                  className="bg-primary hover:bg-primary/90 text-white rounded-full px-8"
                  data-testid="booking-new-btn"
                >
                  Trimite altă programare
                </Button>
              </div>
            </div>
          )}

          {/* Navigation */}
          {step < 4 && (
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
                className="rounded-full"
                data-testid="booking-back-btn"
              >
                <ArrowLeft size={16} className="mr-2" />
                Înapoi
              </Button>
              <Button
                onClick={handleNext}
                disabled={submitting}
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-8"
                data-testid="booking-next-btn"
              >
                {submitting ? (
                  <><Loader2 size={16} className="mr-2 animate-spin" /> Se trimite...</>
                ) : step === 3 ? (
                  <>Trimite programarea <ArrowRight size={16} className="ml-2" /></>
                ) : (
                  <>Continuă <ArrowRight size={16} className="ml-2" /></>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
