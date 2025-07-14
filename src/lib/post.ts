import * as cheerio from 'cheerio';
import { toHtml } from 'hast-util-to-html';
import { createLowlight, common } from 'lowlight';

import { type TableOfContents } from '@/components/post/post-table-of-contents';

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

  $('h2, h3').each((_, el) => {
    const title = $(el).text().trim();
    const anchorId = generateAnchorId(title);
    $(el).attr('id', anchorId);
  });

  return $.root().html() || '';
}

export const createTableOfContents = (html: string): TableOfContents[] => {
  const $ = cheerio.load(html);
  const headings: TableOfContents[] = [];

  $('h2, h3').each((i, el) => {
    const tag = $(el).get(0)?.tagName?.toLowerCase();
    const title = $(el).text().trim();
    const anchorId = generateAnchorId(title);
    const depth = tag ? Number(tag.replace('h', '')) - 2 : 0;

    headings.push({
      id: i,
      title,
      link: `#${anchorId}`,
      depth,
    });
  });

  return headings;
};

export function parsePostFormData(formData: FormData) {
  let content = formData.get('content')?.toString() ?? '';
  content = highlightCodeBlocks(content);
  content = addHeadingIds(content);

  const summary = content.replace(/<[^>]+>/g, '').slice(0, 100) + '...';

  return {
    title: formData.get('title')?.toString() ?? '',
    content,
    summary,
    tags: formData.get('tags')?.toString().split(',').filter(Boolean).sort().join(',') ?? '',
  };
}
