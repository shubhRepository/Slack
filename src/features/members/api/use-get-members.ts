import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Doc, Id } from "../../../../convex/_generated/dataModel";

interface UseGetMembersProps {
  workspaceId: Id<"workspaces">;
}

interface EnrichedMember extends Doc<"members"> {
  user: Doc<"users">;
}

type EnrichedMembers = EnrichedMember[];

export const useGetMembers = ({ workspaceId }: UseGetMembersProps) => {
  const data = useQuery(api.members.get, {
    workspaceId,
  }) as EnrichedMembers | null;
  const isLoading = data === undefined;
  return { data, isLoading };
};
