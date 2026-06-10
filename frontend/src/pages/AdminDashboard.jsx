import { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Leaf, LogOut, Calendar, TrendingUp, Users, DollarSign, Search, Filter, Phone, MapPin, Ruler } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { useApp } from "@/context/AppContext";
import { STATUS_CONFIG } from "@/data/mockData";
import { toast } from "sonner";

export default function AdminDashboard() {
  const { appointments, updateStatus, isAdmin, logout } = useApp();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    if (!isAdmin) navigate("/admin/login");
  }, [isAdmin, navigate]);

  const handleLogout = () => {
    logout();
    toast.success("Te-ai deconectat cu succes");
    navigate("/");
  };

  const metrics = useMemo(() => {
    const now = new Date();
    const thisMonth = appointments.filter((a) => {
      const d = new Date(a.createdAt);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
    const confirmed = appointments.filter((a) => a.status === "confirmed");
    const pending = appointments.filter((a) => a.status === "pending");

    // Rough revenue estimate: surface * avg rate
    const revenue = confirmed.reduce((sum, a) => sum + (Number(a.surface) || 0) * 35, 0);

    return {
      totalMonth: thisMonth.length,
      pending: pending.length,
      confirmed: confirmed.length,
      revenue,
    };
  }, [appointments]);

  const filtered = useMemo(() => {
    return appointments.filter((a) => {
      const matchQuery = query
        ? [a.client, a.service, a.location, a.phone].some((f) => f?.toLowerCase().includes(query.toLowerCase()))
        : true;
      const matchStatus = statusFilter === "all" ? true : a.status === statusFilter;
      return matchQuery && matchStatus;
    });
  }, [appointments, query, statusFilter]);

  const formatDate = (iso) => {
    return new Date(iso).toLocaleDateString("ro-RO", { day: "2-digit", month: "short", year: "numeric" });
  };

  const formatRON = (n) => new Intl.NumberFormat("ro-RO").format(Math.round(n)) + " RON";

  const handleStatusChange = (id, status) => {
    updateStatus(id, status);
    toast.success(`Status actualizat: ${STATUS_CONFIG[status].label}`);
  };

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-secondary/30" data-testid="admin-dashboard-page">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" data-testid="admin-logo">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" strokeWidth={2} />
            </div>
            <div>
              <div className="font-heading font-bold text-sm">Admin Dashboard</div>
              <div className="text-[10px] text-muted-foreground tracking-widest uppercase">Grădinărit & Spații Verzi</div>
            </div>
          </Link>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="rounded-full"
            data-testid="admin-logout-btn"
          >
            <LogOut size={14} className="mr-2" /> Deconectare
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold mb-2">Bun venit, Administrator</h1>
          <p className="text-muted-foreground">Vizualizează și gestionează programările clienților.</p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <MetricCard
            icon={Calendar}
            label="Total luna aceasta"
            value={metrics.totalMonth}
            color="text-primary"
            bg="bg-primary/10"
            testId="metric-total-month"
          />
          <MetricCard
            icon={Users}
            label="În așteptare"
            value={metrics.pending}
            color="text-amber-700"
            bg="bg-amber-100"
            testId="metric-pending"
          />
          <MetricCard
            icon={TrendingUp}
            label="Confirmate"
            value={metrics.confirmed}
            color="text-emerald-700"
            bg="bg-emerald-100"
            testId="metric-confirmed"
          />
          <MetricCard
            icon={DollarSign}
            label="Venituri estimate"
            value={formatRON(metrics.revenue)}
            color="text-accent"
            bg="bg-amber-50"
            testId="metric-revenue"
            isCurrency
          />
        </div>

        {/* Table */}
        <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
            <div>
              <h2 className="font-heading text-xl font-semibold">Programări recente</h2>
              <p className="text-xs text-muted-foreground mt-1">{filtered.length} rezultate</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Caută client, serviciu..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-9 h-10 w-full sm:w-64"
                  data-testid="admin-search-input"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-10" data-testid="admin-filter-btn">
                    <Filter size={14} className="mr-2" />
                    {statusFilter === "all" ? "Toate" : STATUS_CONFIG[statusFilter]?.label}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setStatusFilter("all")} data-testid="admin-filter-all">Toate</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("pending")} data-testid="admin-filter-pending">În așteptare</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("confirmed")} data-testid="admin-filter-confirmed">Confirmate</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("rejected")} data-testid="admin-filter-rejected">Respinse</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table data-testid="admin-appointments-table">
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead className="font-semibold">Client</TableHead>
                  <TableHead className="font-semibold">Serviciu</TableHead>
                  <TableHead className="font-semibold">Data</TableHead>
                  <TableHead className="font-semibold">Locație</TableHead>
                  <TableHead className="font-semibold">Suprafață</TableHead>
                  <TableHead className="font-semibold text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                      Nicio programare găsită
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((a) => {
                    const cfg = STATUS_CONFIG[a.status];
                    return (
                      <TableRow key={a.id} className="hover:bg-muted/30" data-testid={`appointment-row-${a.id}`}>
                        <TableCell>
                          <div className="font-medium text-sm text-foreground">{a.client}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            <Phone size={11} /> {a.phone}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{a.service}</TableCell>
                        <TableCell className="text-sm">
                          <div>{formatDate(a.date)}</div>
                          <div className="text-xs text-muted-foreground">{a.time}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm flex items-start gap-1 max-w-[180px]">
                            <MapPin size={12} className="mt-1 text-muted-foreground shrink-0" />
                            <span className="truncate">{a.location}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">
                          <div className="flex items-center gap-1">
                            <Ruler size={12} className="text-muted-foreground" />
                            {a.surface} mp
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button
                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${cfg.color} hover:opacity-80 transition-opacity`}
                                data-testid={`status-badge-${a.id}`}
                              >
                                {cfg.label}
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleStatusChange(a.id, "pending")} data-testid={`status-set-pending-${a.id}`}>
                                În așteptare
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(a.id, "confirmed")} data-testid={`status-set-confirmed-${a.id}`}>
                                Confirmat
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(a.id, "rejected")} data-testid={`status-set-rejected-${a.id}`}>
                                Respins
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
}

const MetricCard = ({ icon: Icon, label, value, color, bg, testId, isCurrency = false }) => (
  <div className="bg-white border border-border rounded-2xl p-5 hover:shadow-md transition-shadow" data-testid={testId}>
    <div className="flex items-center justify-between mb-3">
      <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center`}>
        <Icon size={18} className={color} strokeWidth={2} />
      </div>
    </div>
    <div className={`font-heading font-bold text-foreground ${isCurrency ? "text-xl lg:text-2xl" : "text-3xl"}`}>{value}</div>
    <div className="text-xs text-muted-foreground mt-1">{label}</div>
  </div>
);
