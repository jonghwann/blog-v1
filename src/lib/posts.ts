import * as cheerio from 'cheerio';
import { toHtml } from 'hast-util-to-html';
import { common, createLowlight } from 'lowlight';
import readingTime from 'reading-time';
import type { TableOfContents } from '@/components/post/post-table-of-contents';

export function generateAnchorId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9ㄱ-ㅎㅏ-ㅣ가-힣\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '');
}

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

export function addHeadingIds(html: string): string {
  const $ = cheerio.load(html);

  $('h2, h3').each((_, el) => {
    const title = $(el).text().trim();
    const anchorId = generateAnchorId(title);
    $(el).attr('id', anchorId);
  });

  return $.root().html() || '';
}

export function createTableOfContents(html: string): TableOfContents[] {
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
}

export function parseTags(tags: { tags: string }[]): string[] {
  return Array.from(
    new Set(
      tags
        .flatMap(({ tags }) => tags.split(','))
        .map((tag) => tag.trim())
        .filter(Boolean)
        .sort(),
    ),
  );
}

export function parsePostFormData(formData: FormData) {
  let content = formData.get('content')?.toString() ?? '';
  content = highlightCodeBlocks(content);
  content = addHeadingIds(content);

  const summary = content
    .replace(/<pre><code[\s\S]*?<\/code><\/pre>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 150);

  return {
    title: formData.get('title')?.toString() ?? '',
    content,
    summary,
    tags: formData.get('tags')?.toString().split(',').filter(Boolean).sort().join(',') ?? '',
    readingTime: Math.ceil(readingTime(content).minutes),
  };
}

import { codeToHtml } from 'shiki';

async function processHtmlForStorage(html: string): Promise<string> {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const codeBlocks = doc.querySelectorAll('pre code[class*="language-"]');

    let processedHtml = html;

    for (const codeBlock of codeBlocks) {
      const code = codeBlock.textContent || '';

      const classList = Array.from(codeBlock.classList);

      const languageClass = classList.find((cls) => cls.startsWith('language-'));

      const language = languageClass ? languageClass.replace('language-', '') : 'tsx';

      const highlightedHtml = await codeToHtml(code, {
        lang: language,
        theme: 'dark-plus',
      });

      const originalPreTag = codeBlock.parentElement?.outerHTML;

      if (originalPreTag) {
        processedHtml = processedHtml.replace(originalPreTag, highlightedHtml);
      }
    }

    return processedHtml;
  } catch (error) {
    console.error(error);
    return html;
  }
}

export async function processPostData(data: { title: string; content: string; tags: string[] }) {
  // const processedContent = addHeadingIds(highlightCodeBlocks(data.content));
  const processedContent = addHeadingIds(await processHtmlForStorage(data.content));
  return {
    ...data,
    content: data.content,
    summary: data.content
      .replace(/<pre><code[\s\S]*?<\/code><\/pre>/g, '')
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 150),
    readingTime: Math.ceil(readingTime(data.content).minutes),
    html: processedContent,
  };
}

export function createTagHref(tag: string, selectedTags?: string[]) {
  const isSelected = selectedTags?.includes(tag);
  const nextTags = isSelected ? selectedTags?.filter((t) => t !== tag) : [...(selectedTags ?? []), tag];

  if (nextTags?.length === 0) {
    return '/posts';
  }

  const params = nextTags?.map((t) => `tag=${t}`).join('&');
  return `/posts?${params}`;
}
