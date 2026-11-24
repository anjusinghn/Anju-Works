import { getVisitorCount } from "@/lib/visitor-count";
import { VisitorCounterOdometer } from "@/components/landing/visitor-counter-odometer";
import { sampleDataConfig } from "@/config/sample";

/* Server-fetched so the count ships in the HTML behind a Suspense boundary
   instead of arriving late from a client-side request. */
export async function VisitorCounter() {
  const { visitors, isSample } = await getVisitorCount();
  return (
    <VisitorCounterOdometer
      visitors={visitors}
      sampleLabel={
        isSample
          ? `${sampleDataConfig.label}, ${sampleDataConfig.capturedAt}`
          : undefined
      }
    />
  );
}
