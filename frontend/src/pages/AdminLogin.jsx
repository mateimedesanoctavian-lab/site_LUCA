import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Leaf, Lock, Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";

export default function AdminLogin() {
  const { login, isAdmin } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAdmin) navigate("/admin");
  }, [isAdmin, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const ok = login(email, password);
      if (ok) {
        toast.success("Autentificare reușită!");
        navigate("/admin");
      } else {
        toast.error("Email sau parolă incorectă");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-secondary/40 flex items-center justify-center p-4" data-testid="admin-login-page">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
          data-testid="admin-login-back-home"
        >
          <ArrowLeft size={16} /> Înapoi la site
        </Link>

        <div className="bg-white border border-border rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <div>
              <h1 className="font-heading text-xl font-bold">Acces Administrator</h1>
              <p className="text-xs text-muted-foreground">Panoul de control programări</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4" data-testid="admin-login-form">
            <div>
              <Label htmlFor="admin-email" className="text-sm font-medium mb-1.5 block">Email</Label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gradinarit.ro"
                  className="pl-10 h-11"
                  required
                  data-testid="admin-login-email"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="admin-password" className="text-sm font-medium mb-1.5 block">Parolă</Label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 h-11"
                  required
                  data-testid="admin-login-password"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-full h-11"
              data-testid="admin-login-submit"
            >
              {loading ? "Se procesează..." : <>Autentificare <ArrowRight size={16} className="ml-2" /></>}
            </Button>
          </form>

          <div className="mt-6 p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              <strong>Demo:</strong> admin@gradinarit.ro / admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
