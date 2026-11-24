import { Suspense } from "react";
import { FooterScene } from "@/components/landing/footer-scene";
import { VisitorCounter } from "@/components/landing/visitor-counter";
import { VisitorCounterSkeleton } from "@/components/skeletons/visitor-counter-skeleton";
import { footerConfig } from "@/config/site";

export function Footer() {
  return (
    <FooterScene>
      {footerConfig.showVisitorCounter && (
        <Suspense fallback={<VisitorCounterSkeleton />}>
          <VisitorCounter />
        </Suspense>
      )}
    </FooterScene>
  );
}
