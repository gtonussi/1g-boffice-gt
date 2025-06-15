"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import { queryClient } from "@/lib/query-client";

import { ThemeProvider } from "./theme-provider";

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [client] = useState(() => queryClient);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange enableSystem>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
}
