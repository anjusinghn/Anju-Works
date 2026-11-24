export const acceluteConfig = {
  title: "My best work",
  name: "Smart Résumé Screener",
  eyebrow: "Applied AI · Next.js and TypeScript",
  tagline: "From a batch of PDFs to an explainable shortlist.",
  summary:
    "Upload a batch of résumés and compare each one with a job requisition. The screener combines a constrained model with rule-based checks and shows the evidence behind each score.",
  primaryCta: { label: "Try the screener", href: "https://anju-smart-screener.vercel.app" },
  caseStudy: { label: "Read the case study", href: "/case-study/smart-resume-screener" },
  productHunt: {
    label: "Source on GitHub",
    href: "https://github.com/anjusinghn/triage",
  },
  lessonVideo: {
    src: "/videos/screener-demo.mp4",
    poster: "/images/screener/workflow.webp",
    width: 736,
    height: 400,
    hasAudio: false,
    label: "Smart Résumé Screener demo showing batch processing, candidate ranking, and score detail",
    browser: {
      url: "anju-smart-screener.vercel.app",
      href: "https://anju-smart-screener.vercel.app",
      activeTab: "Smart Résumé Screener",
      otherTab: "Candidate review",
    },
    note: "Watch it run",
  },
  tourTitle: "What screening looks like",
  tour: [
    {
      id: "upload",
      title: "Add a requisition and a batch",
      body: "Define the role, then upload a group of PDF résumés to compare against the same criteria.",
      image: "/images/screener/upload.webp",
      alt: "Job requisition form and resume upload controls",
    },
    {
      id: "workflow",
      title: "Follow screening progress",
      body: "The dashboard streams updates while the server extracts text and scores each candidate.",
      image: "/images/screener/workflow.webp",
      alt: "Screening dashboard with a progress bar and the candidate list",
    },
    {
      id: "ranking",
      title: "Review the ranked list",
      body: "Match scores and decision tiers provide a starting point for reviewing the batch.",
      image: "/images/screener/ranking.webp",
      alt: "Ranked results in the screener",
    },
    {
      id: "breakdown",
      title: "Inspect how a score was made",
      body: "Open a candidate to inspect the skills, experience, résumé quality, and fit behind the score.",
      image: "/images/screener/breakdown.webp",
      alt: "Candidate detail with a breakdown of match scores",
    },
  ],
  statsTitle: "From upload to review",
  stats: [
    { before: "PDF", after: "Text", unit: "", label: "Extract résumé content" },
    { before: "Role", after: "Fit", unit: "", label: "Apply the job criteria" },
    { before: "Batch", after: "Ranks", unit: "", label: "Review the shortlist" },
    { before: "Score", after: "Evidence", unit: "", label: "Inspect each scoring breakdown" },
  ],
};

export type AcceluteTourStep = (typeof acceluteConfig.tour)[number];
