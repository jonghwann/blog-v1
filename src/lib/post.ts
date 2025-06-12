import * as cheerio from 'cheerio';
import { createLowlight, common } from 'lowlight';
import { toHtml } from 'hast-util-to-html';
import { TableOfContents } from '@/types/post';

const lowlight = createLowlight(common);

export function highlightCodeBlocks(html: string): string {
  const $ = cheerio.load(html);

  $('pre code').each((_, el) => {
    const code = $(el);
    const language = code.attr('class')?.match(/language-(\w+)/)?.[1] || 'plaintext';
    const codeText = code.text();
    const highlighted = lowlight.highlight(language, codeText);
    const highlightedHtml = toHtml(highlighted);
    code.html(highlightedHtml);
    code.addClass('hljs');
  });

  return $.root().html() || '';
}

export function generateAnchorId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9ㄱ-ㅎㅏ-ㅣ가-힣\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function addHeadingIds(html: string): string {
  const $ = cheerio.load(html);

  $('h2').each((_, el) => {
    const title = $(el).text().trim();
    const anchorId = generateAnchorId(title);
    $(el).attr('id', anchorId);
  });

  return $.root().html() || '';
}

export const createTableOfContents = (html: string): TableOfContents[] => {
  const $ = cheerio.load(html);
  const headings: TableOfContents[] = [];

  $('h2').each((_, el) => {
    const title = $(el).text().trim();
    const anchorId = generateAnchorId(title);

    headings.push({
      title,
      link: `#${anchorId}`,
      depth: 0,
    });
  });

  return headings;
};
