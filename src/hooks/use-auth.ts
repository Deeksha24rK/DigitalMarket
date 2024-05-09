import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Custom hooks
export const useAuth = () => {
  const router = useRouter();
  const signOut = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ); //API endpoint that CMS provides to us - invalidate the token , remove it from the response and then user is logged out properly
      if (!res.ok) throw new Error();

      toast.success("Signed out successfully");
      router.push("/sign-in");
      router.refresh();
    } catch (error) {
      toast.error("Couldn't sign out, please try again");
    }
  };

  return { signOut };
};
