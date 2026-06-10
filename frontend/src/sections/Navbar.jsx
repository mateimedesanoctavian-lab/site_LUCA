import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Leaf } from "lucide-react";
import { Button } from "../components/ui/button";

const NAV_LINKS = [
  { label: "Servicii", href: "#servicii" },
  { label: "Portofoliu", href: "#portofoliu" },
  { label: "Calculator", href: "#calculator" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/" + href);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBookNow = () => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/#programare");
    } else {
      document.querySelector("#programare")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl bg-white/80 border-b border-border/60" : "bg-white/40 backdrop-blur-md"
      }`}
      data-testid="main-navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            to="/"
            className="flex items-center gap-2 group"
            data-testid="navbar-logo-link"
          >
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center transition-transform group-hover:scale-110">
              <Leaf className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-heading font-bold text-lg text-foreground">Grădinărit</span>
              <span className="font-heading text-xs text-muted-foreground tracking-widest uppercase">& Spații Verzi</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group"
                data-testid={`navbar-link-${link.href.replace("#", "")}`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button
              onClick={handleBookNow}
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-5 font-medium shadow-sm hover:shadow-md transition-all"
              data-testid="navbar-book-now-btn"
            >
              Programează-te
            </Button>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-md text-foreground"
            data-testid="navbar-mobile-toggle"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden pb-6 pt-2 border-t border-border/60" data-testid="navbar-mobile-menu">
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left py-2 px-3 rounded-md hover:bg-muted text-foreground/80 font-medium"
                  data-testid={`navbar-mobile-link-${link.href.replace("#", "")}`}
                >
                  {link.label}
                </button>
              ))}
              <Button
                onClick={handleBookNow}
                className="bg-primary hover:bg-primary/90 text-white rounded-full mt-2"
                data-testid="navbar-mobile-book-now-btn"
              >
                Programează-te
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
