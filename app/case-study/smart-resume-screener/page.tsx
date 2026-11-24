import { notFound } from "next/navigation";
import { WritingArticle, writingMetadata } from "@/components/writing/article";
import { findWriting } from "@/config/writing";

const entry = findWriting("smart-resume-screener");

export const metadata = entry ? writingMetadata(entry) : {};

export default function SmartResumeScreenerCaseStudyPage() {
  if (!entry) notFound();
  return <WritingArticle entry={entry} />;
}
