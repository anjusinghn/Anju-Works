/**
 * Standalone routes carried over from the template. A disabled page returns
 * 404 and drops out of the sitemap and command palette; its code stays in
 * place so it can be switched back on with real content.
 */
export const pagesConfig = {
  components: false,
  testimonials: false,
  sponsor: false,
} as const;
