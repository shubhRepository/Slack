import { useMemo, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

type RequestType = { name: string };
type ResponseType = Id<"workspaces"> | null;

type Options = {
  onSuccess?: (data: ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};

type StateType = {
  [key: string]: string;
};

const states: StateType = {
  pending: "pending",
  success: "success",
  error: "error",
  settled: "settled",
  initial: "initial",
} as const;

export const useCreateWorkSpace = () => {
  const [data, setData] = useState<ResponseType>(null);
  const [error, setError] = useState<Error | null>(null);

  const [status, setStatus] = useState<
    "pending" | "success" | "error" | "settled" | "initial"
  >("initial");

  const mutation = useMutation(api.workspaces.create);

  const isPending = useMemo(() => status === states.pending, [status]);
  const isSuccess = useMemo(() => status === states.success, [status]);
  const isError = useMemo(() => status === states.error, [status]);
  const isSettled = useMemo(() => status === states.settled, [status]);

  const mutate = async (values: RequestType, options: Options) => {
    try {
      setData(null);
      setError(null);

      setStatus("pending");

      const response = await mutation(values);
      options?.onSuccess?.(response);
      return response;
    } catch (error) {
      setStatus("error");
      options?.onError?.(error as Error);
      if (options?.throwError) {
        return error;
      }
    } finally {
      setStatus("settled");
      options?.onSettled?.();
    }
  };
  return { mutate, data, error, isPending, isSuccess, isError, isSettled };
};
