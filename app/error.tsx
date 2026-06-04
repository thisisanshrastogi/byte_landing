"use client";

import { THEME, CLAY } from "@/lib/design-tokens";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      className={`${THEME.bg} min-h-screen flex items-center justify-center px-6`}
    >
      <div className="text-center max-w-md">
        <div className={`w-16 h-16 mx-auto mb-6 ${THEME.cardInset} rounded-full flex items-center justify-center`}>
          <span className="text-2xl">!</span>
        </div>

        <h1 className={`text-2xl md:text-3xl font-extrabold mb-4 ${THEME.textDark}`}>
          Something went wrong
        </h1>

        <p className={`text-base mb-8 leading-relaxed ${THEME.textSoft}`}>
          An unexpected error occurred. Please try again.
        </p>

        <button
          onClick={reset}
          className={`inline-block px-8 py-3 font-bold text-sm uppercase tracking-wider ${THEME.btnPrimary}`}
        >
          Try again
        </button>
      </div>
    </main>
  );
}
