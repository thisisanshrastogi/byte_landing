"use client";

import { useState, useEffect } from "react";
import { MotionConfig } from "framer-motion";
import IntroShutter from "./ui/intro-shutter";
import ClientProviders from "./ClientProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return prefersReduced;
}

export default function MotionGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) {
    return (
      <MotionConfig reducedMotion="always">
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <ClientProviders>{children}</ClientProviders>
        </GoogleOAuthProvider>
      </MotionConfig>
    );
  }

  return (
    <>
      <IntroShutter />
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <ClientProviders>{children}</ClientProviders>
      </GoogleOAuthProvider>
    </>
  );
}
