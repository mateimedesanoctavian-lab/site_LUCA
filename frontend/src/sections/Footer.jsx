import { Leaf, Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-[#0F1E17] text-white" data-testid="main-footer" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <div>
                <div className="font-heading font-bold text-lg">Grădinărit</div>
                <div className="font-heading text-[10px] text-white/60 tracking-widest uppercase">& Spații Verzi</div>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Amenajăm grădini de poveste pentru casa visurilor tale. Profesionalism, pasiune și natură.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors" data-testid="footer-facebook">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors" data-testid="footer-instagram">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors" data-testid="footer-youtube">
                <Youtube size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-base mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 text-primary shrink-0" />
                <a href="tel:+40721234567" data-testid="footer-phone">+40 721 234 567</a>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 text-primary shrink-0" />
                <a href="mailto:contact@gradinarit.ro" data-testid="footer-email">contact@gradinarit.ro</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 text-primary shrink-0" />
                <span>Str. Florilor 42, București, Sector 1</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-base mb-4">Program de lucru</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <Clock size={16} className="mt-0.5 text-primary shrink-0" />
                <div>
                  <div>Luni - Vineri: 08:00 - 18:00</div>
                  <div>Sâmbătă: 09:00 - 14:00</div>
                  <div>Duminică: Închis</div>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-base mb-4">Servicii</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#servicii" className="hover:text-primary transition-colors">Rulouri de gazon</a></li>
              <li><a href="#servicii" className="hover:text-primary transition-colors">Sisteme de irigații</a></li>
              <li><a href="#servicii" className="hover:text-primary transition-colors">Plantări și amenajări</a></li>
              <li><a href="#servicii" className="hover:text-primary transition-colors">Mentenanță periodică</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/50">
            © 2026 Grădinărit & Spații Verzi. Toate drepturile rezervate.
          </p>
          <Link
            to="/admin"
            className="text-xs text-white/40 hover:text-primary transition-colors"
            data-testid="footer-admin-link"
          >
            Acces Administrator
          </Link>
        </div>
      </div>
    </footer>
  );
};
