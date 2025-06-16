// src/components/MirageProvider.tsx
"use client";

import { useEffect } from "react";
import { makeServer } from "@/lib/mirage";

export function MirageProvider() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      makeServer();
    }
  }, []);

  return null; // no UI, just side effect
}
