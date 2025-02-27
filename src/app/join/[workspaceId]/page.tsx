"use client";

import Link from "next/link";
import Image from "next/image";
import VerificationInput from "react-verification-input";
import { Loader } from "lucide-react";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useGetWorkspaceInfo } from "@/feature/workspaces/api/use-get-workspace-info";

import { Button } from "@/components/ui/button";

function JoinPage() {
  const workspaceId = useWorkspaceId();
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspaceInfo({
    id: workspaceId,
  });

  if (workspaceLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center justify-center gap-y-8 bg-white p-8 rounded-lg shadow-md">
      <Image src="/join.svg" width={60} height={60} alt="Logo" />
      <div className="flex flex-col items-center justify-center max-w-md">
        <div className="flex flex-col items-center justify-center gap-y-2 mb-4">
          <h1 className="text-2xl font-bold">Join {workspace?.name}</h1>
          <p className="text-medium text-muted-foreground">
            Enter the workspace code to join
          </p>
        </div>
        <VerificationInput
          length={6}
          classNames={{
            container: "flex gap-x-2",
            character:
              "uppercase h-auto rounded-md border border-gray-300 flex items-center justify-center text-lg font-medium text-gray-500",
            characterInactive: "bg-muted",
            characterSelected: "bg-white text-black",
            characterFilled: "bg-white text-black",
          }}
          autoFocus
        />
      </div>
      <div className="flex gap-x-4">
        <Button size="lg" variant="outline" asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}

export default JoinPage;
