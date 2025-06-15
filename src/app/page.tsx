"use client";

import { UsersPannel } from "@/components/ui/users-pannel";

export default function Home() {
  return (
    <div className="flex justify-center">
      <div className="max-w-5xl">
        <UsersPannel />
      </div>
    </div>
  );
}
