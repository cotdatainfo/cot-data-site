import { marked } from 'marked';

/**
 * Convert markdown to HTML
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  // Configure marked options
  marked.setOptions({
    gfm: true, // GitHub Flavored Markdown
    breaks: true, // Convert \n to <br>
  });

  const html = await marked.parse(markdown);
  return html;
}

/**
 * Extract excerpt from markdown content
 */
export function extractExcerpt(content: string, length: number = 160): string {
  // Remove markdown syntax for excerpt
  const plainText = content
    .replace(/#{1,6}\s/g, '') // Remove headers
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links but keep text
    .replace(/[*_~`]/g, '') // Remove emphasis markers
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .trim();

  if (plainText.length <= length) {
    return plainText;
  }

  return plainText.substring(0, length).trim() + '...';
}
