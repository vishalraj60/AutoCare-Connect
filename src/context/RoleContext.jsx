import React, { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';

const RoleContext = createContext(null);

export const ROLES = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
  MECHANIC: 'mechanic',
};

/**
 * RoleProvider now derives role from AuthContext so existing
 * useRole() calls in dashboards continue to work unchanged.
 */
export function RoleProvider({ children }) {
  const { role } = useAuth();

  // Provide a no-op setRole for legacy compatibility
  const setRole = () => {};

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error('useRole must be used within RoleProvider');
  return ctx;
}
