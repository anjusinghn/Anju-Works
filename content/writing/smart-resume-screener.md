## The problem

A reviewer working through a batch of résumés needs a consistent way to compare candidates against the same job requirements. A single match score leaves out the evidence a reviewer needs to decide which applications to examine more closely.

## How the screener works

The reviewer defines the requisition and uploads a batch of PDF résumés. The server extracts text, validates the fields produced by a constrained model, and applies rule-based checks to score the evidence in the document. The browser receives progress updates and shows a ranked shortlist as candidates finish processing.

## Reviewing the results

The results include a total score, a decision tier, and a breakdown by skills, experience, résumé quality, and fit. The scoring rules look for skills that appear explicitly in the source document. Reviewers can inspect the evidence behind a ranking and use it as a starting point for a manual review.

## Implementation

The dashboard uses Next.js, React, and TypeScript. Server actions queue candidate processing. Prisma and PostgreSQL persist candidate, requisition, and evaluation records. The model provider runs on the server.
