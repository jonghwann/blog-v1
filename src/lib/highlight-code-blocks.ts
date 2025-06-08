import * as cheerio from 'cheerio';
import { createLowlight, common } from 'lowlight';
import { toHtml } from 'hast-util-to-html';

const lowlight = createLowlight(common);

export function highlightCodeBlocks(html: string) {
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
