import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WritingArticle, writingMetadata } from "@/components/writing/article";
import { findWriting, writingConfig } from "@/config/writing";

export const dynamicParams = false;

export function generateStaticParams() {
  return writingConfig
    .filter((entry) => entry.kind === "post")
    .map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const entry = findWriting((await params).slug);
  return entry ? writingMetadata(entry) : { title: "Post not found" };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const entry = findWriting((await params).slug);
  if (!entry || entry.kind !== "post") notFound();
  return <WritingArticle entry={entry} />;
}
