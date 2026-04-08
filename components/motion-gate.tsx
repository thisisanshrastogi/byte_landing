"use client";

import { AnimatePresence, MotionConfig } from "framer-motion";
import useIsMobile from "./mobile-detector";
import IntroShutter from "./ui/intro-shutter";
import ClientProviders from "./ClientProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function MotionGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <MotionConfig reducedMotion="always">
        <AnimatePresence initial={false} mode="wait">
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
          >
            {/* {!isMobile && <IntroShutter />} */}
            <ClientProviders>{children}</ClientProviders>
          </GoogleOAuthProvider>
        </AnimatePresence>
      </MotionConfig>
    );
  }

  // Desktop: no restrictions
  return (
    <>
      <IntroShutter />
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <ClientProviders>{children}</ClientProviders>
      </GoogleOAuthProvider>
    </>
  );
}
