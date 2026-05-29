"use client";

import {
  createContext,
  useContext,
  ReactNode
} from "react";

type DashboardContextType = {
  dashboardData: any;
};

const DashboardContext =
  createContext<
    DashboardContextType | null
  >(null);

type Props = {
  children: ReactNode;
  dashboardData: any;
};

export function DashboardProvider({
  children,
  dashboardData
}: Props) {
  return (
    <DashboardContext.Provider
      value={{
        dashboardData
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context =
    useContext(
      DashboardContext
    );

  if (!context) {
    throw new Error(
      "useDashboard must be used inside DashboardProvider"
    );
  }

  return context;
}