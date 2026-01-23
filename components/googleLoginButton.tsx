"use client";

import axi from "@/lib/axi";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useGoogleLogin } from "@react-oauth/google";

const clayBtnSecondary =
  "bg-white text-[#5C4D45] shadow-[6px_6px_12px_rgba(214,198,186,0.5),_-2px_-2px_6px_rgba(255,255,255,0.8)] hover:bg-[#F5EFE8] hover:shadow-lg active:translate-y-[2px] active:shadow-none transition-all dark:bg-secondary dark:text-secondary-foreground dark:shadow-none";

export default function GoogleLoginButton({
  isLoading,
  setIsLoading,
}: {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}) {
  const router = useRouter();
  const handleGoogleSignup = () => {
    setIsLoading(true);
    login();
    // const googleAuthUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/google?invite_token=${token || ""}`;
    // window.location.href = googleAuthUrl;
  };
  const login = useGoogleLogin({
    flow: "auth-code",
    ux_mode: "redirect",
    redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
    scope: "openid email profile",
    onSuccess: ({ code }) => {
      router.push(`/auth/callback?code=${code}`);
    },
    onError: () => console.error("Google login failed"),
  });

  return (
    <Button
      type="button"
      disabled={isLoading}
      onClick={handleGoogleSignup}
      className={`w-full h-16 rounded-[1.2rem] text-base font-bold flex items-center justify-center gap-3 ${clayBtnSecondary} mb-6`}
    >
      {isLoading ? (
        "Redirecting..."
      ) : (
        <>
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </>
      )}
    </Button>
  );
}
