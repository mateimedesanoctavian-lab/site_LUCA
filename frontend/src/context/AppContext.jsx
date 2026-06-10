import { createContext, useContext, useState, useEffect } from "react";
import { INITIAL_APPOINTMENTS } from "@/data/mockData";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [appointments, setAppointments] = useState(() => {
    try {
      const stored = localStorage.getItem("gradinarit_appointments");
      return stored ? JSON.parse(stored) : INITIAL_APPOINTMENTS;
    } catch {
      return INITIAL_APPOINTMENTS;
    }
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem("gradinarit_admin") === "true";
  });

  useEffect(() => {
    localStorage.setItem("gradinarit_appointments", JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = (appt) => {
    const newAppt = {
      ...appt,
      id: `apt-${Date.now()}`,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    setAppointments((prev) => [newAppt, ...prev]);
    return newAppt;
  };

  const updateStatus = (id, status) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const login = (email, password) => {
    if (email === "admin@gradinarit.ro" && password === "admin123") {
      localStorage.setItem("gradinarit_admin", "true");
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("gradinarit_admin");
    setIsAdmin(false);
  };

  return (
    <AppContext.Provider
      value={{ appointments, addAppointment, updateStatus, isAdmin, login, logout }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
