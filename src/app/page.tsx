"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

import { UserButton } from "@/feature/auth/components/user-button";
import { useGetWorkspaces } from "@/feature/workspaces/api/use-get-workspaces";
import { useCreateWorkSpaceModal } from "@/feature/workspaces/store/use-create-workspace-modal";

export default function Home() {
  const router = useRouter();
  const { data, isLoading } = useGetWorkspaces();
  const [open, setOpen] = useCreateWorkSpaceModal();

  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (workspaceId) {
      router.replace(`/workspace/${workspaceId}`);
    } else if (!open) {
      setOpen(true);
    }
  }, [workspaceId, isLoading, open, setOpen, router]);

  return (
    <div>
      <UserButton />
    </div>
  );
}
