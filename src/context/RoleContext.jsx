import React, { createContext, useContext, useState } from 'react';

const RoleContext = createContext(null);

export const ROLES = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
  MECHANIC: 'mechanic',
};

export function RoleProvider({ children }) {
  const [role, setRoleState] = useState(null);

  const setRole = (newRole) => {
    setRoleState(newRole);
  };

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
