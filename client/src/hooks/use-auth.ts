import { useQuery, useMutation } from "@tanstack/react-query";
import { User } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function useAuth() {
  const { toast } = useToast();

  // 1. Fetch the current user
  const { data: user, isLoading, error } = useQuery<User | null>({
    queryKey: ["/api/user"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/user");
        if (res.status === 401) return null; // Not logged in
        if (!res.ok) throw new Error("Failed to fetch user");
        return await res.json();
      } catch (e) {
        return null; // Return null if not logged in
      }
    },
  });

  // 2. Login Function (Redirects to Google)
  const loginMutation = useMutation({
    mutationFn: async () => {
      // This redirects the browser to your backend's Google Auth route
      window.location.href = "/api/auth/google";
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // 3. Logout Function
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/logout");
    },
    onSuccess: () => {
      // Clear user data from the app state
      queryClient.setQueryData(["/api/user"], null);
      toast({
        title: "Logged out successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    user,
    isLoading,
    error,
    loginMutation,
    logoutMutation,
    // Helper shortcuts
    login: loginMutation.mutate, 
    logout: logoutMutation.mutate
  };
}