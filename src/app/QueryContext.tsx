"use client";

import React, { createContext, useContext, useState } from "react";

interface QueryData {
  query: string;
  answer: string;
  sources: string[];
  time: number;
}

interface QueryContextType {
  queryData: QueryData | null;
  setQueryData: (data: QueryData) => void;
}

const QueryContext = createContext<QueryContextType | undefined>(undefined);

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryData, setQueryData] = useState<QueryData | null>(null);

  return (
    <QueryContext.Provider value={{ queryData, setQueryData }}>
      {children}
    </QueryContext.Provider>
  );
};

export const useQueryContext = () => {
  const context = useContext(QueryContext);
  if (!context) {
    throw new Error("useQueryContext must be used within a QueryProvider");
  }
  return context;
};
