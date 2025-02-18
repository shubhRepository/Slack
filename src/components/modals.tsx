"use client";

import { useEffect, useState } from "react";

import { CreateWorkspaceModal } from "@/feature/workspaces/components/create-workspace-modal";

export const Modals = () => {
  // to prevent hydration error
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <CreateWorkspaceModal></CreateWorkspaceModal>
    </>
  );
};
