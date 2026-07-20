import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// ─── Demo credentials ────────────────────────────────────────────────────────
const DEMO_ADMIN    = { username: 'Vishal', password: 'v123' };
const DEMO_MECHANIC = { username: 'mech',   password: 'm123' };

const STORAGE_KEY    = 'autocare_auth';
const CUSTOMERS_KEY  = 'autocare_customers';

// ─── Context ─────────────────────────────────────────────────────────────────
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : { user: null, role: null, isAuthenticated: false };
    } catch {
      return { user: null, role: null, isAuthenticated: false };
    }
  });

  // Persist auth state whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authState));
  }, [authState]);

  /** login — returns { success, error } */
  const login = useCallback((role, credentials) => {
    if (role === 'admin') {
      if (
        credentials.username === DEMO_ADMIN.username &&
        credentials.password === DEMO_ADMIN.password
      ) {
        const user = { name: 'Vishal', initials: 'VA', role: 'admin' };
        setAuthState({ user, role: 'admin', isAuthenticated: true });
        return { success: true };
      }
      return { success: false, error: 'Invalid Admin Credentials' };
    }

    if (role === 'mechanic') {
      if (
        credentials.username === DEMO_MECHANIC.username &&
        credentials.password === DEMO_MECHANIC.password
      ) {
        const user = { name: 'Mechanic', initials: 'MC', role: 'mechanic' };
        setAuthState({ user, role: 'mechanic', isAuthenticated: true });
        return { success: true };
      }
      return { success: false, error: 'Invalid Mechanic Credentials' };
    }

    if (role === 'customer') {
      try {
        const stored = localStorage.getItem(CUSTOMERS_KEY);
        const customers = stored ? JSON.parse(stored) : [];
        const found = customers.find(
          (c) =>
            (c.email === credentials.emailOrPhone ||
              c.phone === credentials.emailOrPhone) &&
            c.password === credentials.password
        );
        if (found) {
          const user = {
            name: found.fullName,
            initials: found.fullName.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase(),
            role: 'customer',
            email: found.email,
            phone: found.phone,
          };
          setAuthState({ user, role: 'customer', isAuthenticated: true });
          return { success: true };
        }
      } catch { /* ignore */ }
      return { success: false, error: 'Invalid Customer Credentials' };
    }

    return { success: false, error: 'Unknown role' };
  }, []);

  /** register — stores customer and auto-logs in */
  const register = useCallback((data) => {
    if (data.password !== data.confirmPassword) {
      return { success: false, error: 'Passwords do not match' };
    }
    try {
      const stored = localStorage.getItem(CUSTOMERS_KEY);
      const customers = stored ? JSON.parse(stored) : [];
      const exists = customers.find((c) => c.email === data.email);
      if (exists) return { success: false, error: 'An account with this email already exists' };

      const newCustomer = {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        bikeBrand: data.bikeBrand,
        bikeModel: data.bikeModel,
        bikeRegNo: data.bikeRegNo,
      };
      customers.push(newCustomer);
      localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers));

      const user = {
        name: data.fullName,
        initials: data.fullName.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase(),
        role: 'customer',
        email: data.email,
        phone: data.phone,
      };
      setAuthState({ user, role: 'customer', isAuthenticated: true });
      return { success: true };
    } catch {
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  }, []);

  /** logout — clear everything */
  const logout = useCallback(() => {
    setAuthState({ user: null, role: null, isAuthenticated: false });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        role: authState.role,
        isAuthenticated: authState.isAuthenticated,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
