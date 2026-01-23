"use client";

import axi from "@/lib/axi";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";

export default function GoogleLoginButton() {
  const router = useRouter();

  return (
    <GoogleLogin
      onSuccess={async (res) => {
        const token = res.credential;
        if (!token) return;

        const r = await axi.post("/auth/google", { token });
        if (r.status === 200) {
          router.push("/wallet");
        } else {
          console.error("Auth failed");
        }
      }}
      onError={() => {
        console.error("Google Login Failed");
      }}
    />
  );
}
