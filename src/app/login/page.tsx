"use client";

import { LoginForm } from "@/components/forms/login-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  return (
    <div>
      <LoginForm />
      <div className="mt-4">
        <Button className="w-full" onClick={() => router.push("/register")} variant="ghost">
          Register
        </Button>
      </div>
    </div>
  );
}
