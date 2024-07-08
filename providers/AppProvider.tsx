"use client";
import { ThemeProvider } from "next-themes";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/stores/store";
import { AuthProvider } from "./AuthProvider";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
      <AuthProvider>
        <Provider store={store}>{children}</Provider>
      </AuthProvider>
    </ThemeProvider>
  );
}
