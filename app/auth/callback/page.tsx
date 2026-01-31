import { Suspense } from "react";
import AuthCallbackPage from "./pageComponent";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AuthCallbackPage />
    </Suspense>
  );
}
