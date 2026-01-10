"use client";

import { AnimatePresence, MotionConfig } from "framer-motion";
import useIsMobile from "./mobile-detector";
import IntroShutter from "./ui/intro-shutter";
import ClientProviders from "./ClientProvider";

export default function MotionGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <MotionConfig reducedMotion="always">
        <AnimatePresence initial={false}>
          {isMobile && <IntroShutter />}
          <ClientProviders>{children}</ClientProviders>
        </AnimatePresence>
      </MotionConfig>
    );
  }

  // Desktop: no restrictions
  return (
    <>
      <IntroShutter />
      <ClientProviders>{children}</ClientProviders>
    </>
  );
}
