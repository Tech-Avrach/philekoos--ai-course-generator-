"use client";

import { createContext } from "react";

export const UserInputContext = createContext();

export const UserInputProvider = ({ children }) => {
  return (
    <UserInputContext.Provider value={{}}>
      {children}
    </UserInputContext.Provider>
  );
};
