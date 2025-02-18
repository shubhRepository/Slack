"use client";

// import { useAuthActions } from "@convex-dev/auth/react";

import { UserButton } from "@/feature/auth/components/user-button";

export default function Home() {
  // const { signOut } = useAuthActions();

  return (
    <div>
      Logged in 😊
      <UserButton />
    </div>
  );
}
