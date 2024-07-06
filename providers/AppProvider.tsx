"use client";
import { ThemeProvider } from "next-themes";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/stores/store";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
}
