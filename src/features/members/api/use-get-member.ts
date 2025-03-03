import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id, Doc } from "../../../../convex/_generated/dataModel";

interface UseGetMemberProps {
  id: Id<"members">;
}

interface MemberWithUser extends Doc<"members"> {
  user: Doc<"users">;
}

export const useGetMember = ({ id }: UseGetMemberProps) => {
  const data = useQuery(api.members.getById, { id }) as MemberWithUser | null;
  const isLoading = data === undefined;
  return { data, isLoading };
};
