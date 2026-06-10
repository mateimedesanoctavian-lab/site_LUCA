// Mock data for the landscaping application

export const SERVICES = [
  {
    id: "lawn",
    icon: "Sprout",
    title: "Rulouri de gazon și însămânțare",
    description: "Instalăm rulouri premium și efectuăm însămânțare profesională pentru un gazon dens și uniform.",
    image: "https://images.pexels.com/photos/8143668/pexels-photo-8143668.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    pricePerSqm: 25,
  },
  {
    id: "irrigation",
    icon: "Droplets",
    title: "Sisteme automatizate de irigații",
    description: "Proiectare și montaj sisteme inteligente de irigații, cu programare automată și senzori de umiditate.",
    image: "https://images.pexels.com/photos/17765487/pexels-photo-17765487.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    pricePerSqm: 18,
  },
  {
    id: "planting",
    icon: "TreePine",
    title: "Plantări pomi, arbuști și flori",
    description: "Selecție și plantare profesională a pomilor decorativi, arbuștilor și florilor pentru fiecare anotimp.",
    image: "https://images.pexels.com/photos/5029853/pexels-photo-5029853.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    pricePerSqm: 12,
  },
  {
    id: "maintenance",
    icon: "Scissors",
    title: "Întreținere și toaletare periodică",
    description: "Contracte de mentenanță lunară: tuns gazon, toaletare arbuști, fertilizare și combaterea dăunătorilor.",
    image: "https://images.pexels.com/photos/9816773/pexels-photo-9816773.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    pricePerSqm: 8,
  },
];

export const CALCULATOR_OPTIONS = [
  { id: "lawn-install", label: "Montaj gazon rulou", pricePerSqm: 25 },
  { id: "irrigation", label: "Sistem irigații automatizat", pricePerSqm: 18 },
  { id: "design3d", label: "Proiectare 3D personalizată", flatPrice: 800 },
  { id: "planting", label: "Plantări (pomi, arbuști, flori)", pricePerSqm: 12 },
  { id: "maintenance", label: "Mentenanță lunară (1 an)", pricePerSqm: 8 },
];

export const PORTFOLIO = [
  {
    id: 1,
    title: "Curte din Pipera transformată",
    location: "București, Sector 1",
    surface: 320,
    before: "https://images.unsplash.com/photo-1614587477607-79563e3dd0d0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NjZ8MHwxfHNlYXJjaHwxfHxkaXJ0JTIwZ3JvdW5kfGVufDB8fHx8MTc4MTEwNTk3MHww&ixlib=rb-4.1.0&q=85",
    after: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxiYWNreWFyZCUyMGdhcmRlbnxlbnwwfHx8fDE3ODExMDU5NjN8MA&ixlib=rb-4.1.0&q=85",
  },
  {
    id: 2,
    title: "Grădină modernă în Otopeni",
    location: "Otopeni, Ilfov",
    surface: 480,
    before: "https://images.unsplash.com/photo-1614587477607-79563e3dd0d0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NjZ8MHwxfHNlYXJjaHwxfHxkaXJ0JTIwZ3JvdW5kfGVufDB8fHx8MTc4MTEwNTk3MHww&ixlib=rb-4.1.0&q=85",
    after: "https://images.pexels.com/photos/8143668/pexels-photo-8143668.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    id: 3,
    title: "Oază verde în Cluj-Napoca",
    location: "Cluj-Napoca, Cluj",
    surface: 250,
    before: "https://images.unsplash.com/photo-1614587477607-79563e3dd0d0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NjZ8MHwxfHNlYXJjaHwxfHxkaXJ0JTIwZ3JvdW5kfGVufDB8fHx8MTc4MTEwNTk3MHww&ixlib=rb-4.1.0&q=85",
    after: "https://images.pexels.com/photos/9816773/pexels-photo-9816773.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
];

export const INITIAL_APPOINTMENTS = [
  {
    id: "apt-001",
    client: "Andrei Popescu",
    phone: "+40 721 234 567",
    service: "Montaj gazon rulou",
    serviceId: "lawn-install",
    date: "2026-02-18",
    time: "10:00",
    location: "Str. Florilor 12, București",
    surface: 280,
    notes: "Doresc gazon de calitate premium.",
    status: "confirmed",
    createdAt: "2026-02-10T08:30:00Z",
  },
  {
    id: "apt-002",
    client: "Maria Ionescu",
    phone: "+40 740 555 123",
    service: "Sistem irigații",
    serviceId: "irrigation",
    date: "2026-02-22",
    time: "14:00",
    location: "Bd. Mihai Viteazu 45, Cluj-Napoca",
    surface: 450,
    notes: "Curte cu pantă pronunțată.",
    status: "pending",
    createdAt: "2026-02-12T11:15:00Z",
  },
  {
    id: "apt-003",
    client: "George Stanescu",
    phone: "+40 752 887 990",
    service: "Plantări și mentenanță",
    serviceId: "planting",
    date: "2026-02-15",
    time: "09:00",
    location: "Aleea Teilor 3, Otopeni",
    surface: 150,
    notes: "Plante rezistente la frig.",
    status: "rejected",
    createdAt: "2026-02-08T16:00:00Z",
  },
  {
    id: "apt-004",
    client: "Elena Dumitrescu",
    phone: "+40 733 112 233",
    service: "Mentenanță lunară",
    serviceId: "maintenance",
    date: "2026-02-25",
    time: "11:00",
    location: "Str. Crinilor 8, Brașov",
    surface: 220,
    notes: "Doresc contract anual.",
    status: "confirmed",
    createdAt: "2026-02-11T09:45:00Z",
  },
  {
    id: "apt-005",
    client: "Cristian Mihai",
    phone: "+40 766 445 332",
    service: "Proiectare 3D",
    serviceId: "design3d",
    date: "2026-02-28",
    time: "16:00",
    location: "Calea Victoriei 100, București",
    surface: 600,
    notes: "Stil japonez modern.",
    status: "pending",
    createdAt: "2026-02-13T13:20:00Z",
  },
];

export const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00",
];

export const STATUS_CONFIG = {
  pending: { label: "În așteptare", color: "bg-amber-100 text-amber-800 border-amber-200" },
  confirmed: { label: "Confirmat", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  rejected: { label: "Respins", color: "bg-red-100 text-red-800 border-red-200" },
};

export const ADMIN_CREDENTIALS = {
  email: "admin@gradinarit.ro",
  password: "admin123",
};
