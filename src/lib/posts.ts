import * as cheerio from 'cheerio';
import readingTime from 'reading-time';
import { codeToHtml } from 'shiki';
import type { TableOfContents } from '@/components/post/post-table-of-contents';

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9ㄱ-ㅎㅏ-ㅣ가-힣\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function extractSummary(html: string, maxLength = 150): string {
  const text = html
    .replace(/<pre[\s\S]*?<\/pre>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  return text.slice(0, maxLength) + '…';
}

export function addHeadingIds(html: string): string {
  const $ = cheerio.load(html);

  $('h2, h3').each((_, el) => {
    const title = $(el).text().trim();
    const anchorId = slugify(title);
    $(el).attr('id', anchorId);
  });

  return $.html() || '';
}

async function highlightCodeBlocks(html: string): Promise<string> {
  try {
    const $ = cheerio.load(html);

    const codeBlocks = $('pre code[class*="language-"]');

    for (const element of codeBlocks.toArray()) {
      const $code = $(element);
      const code = $code.text();

      const languageClass = $code
        .attr('class')
        ?.split(' ')
        .find((cls) => cls.startsWith('language-'));
      const language = languageClass ? languageClass.replace('language-', '') : 'tsx';

      const highlightedHtml = await codeToHtml(code, {
        lang: language,
        theme: 'dark-plus',
      });

      $code.parent().replaceWith(highlightedHtml);
    }

    return $.html();
  } catch (error) {
    console.error(error);
    return html;
  }
}

export function createTableOfContents(html: string): TableOfContents[] {
  const $ = cheerio.load(html);
  const headings: TableOfContents[] = [];

  $('h2, h3').each((i, el) => {
    const tag = $(el).get(0)?.tagName?.toLowerCase();
    const title = $(el).text().trim();
    const anchorId = slugify(title);
    const depth = tag ? Number(tag.replace('h', '')) - 2 : 0;

    headings.push({
      id: i,
      title,
      link: `#${anchorId}`,
      depth,
    });
  });

  return headings;
}

export async function processPostData(data: { title: string; content: string; tags: string[] }) {
  const processedContent = addHeadingIds(await highlightCodeBlocks(data.content));

  return {
    ...data,
    content: data.content,
    summary: extractSummary(data.content),
    readingTime: Math.ceil(readingTime(data.content).minutes),
    html: processedContent,
  };
}
