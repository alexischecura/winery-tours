import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { isLoading, data } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  return { isLoading, data };
}
