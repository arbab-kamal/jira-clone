import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.members)[":memberId"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.members)[":memberId"]["$patch"]
>;

export const useUpdateMember = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation<RequestType, ResponseType, Error>({
    mutationFn: async ({ param, json }) => {
      const response = await client.api.members[":memberId"]["$patch"]({
        param,
        json,
      });
      if (!response.ok) {
        throw new Error("Failed to update member");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("member updated");
      queryClient.invalidateQueries({ queryKey: ["members"] });

      router.push("/");
    },
    onError: () => {
      toast.error("Failed to update member");
    },
  });
  return mutation;
};
