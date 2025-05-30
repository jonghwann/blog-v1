import { createLowlight, common } from 'lowlight';
import { toHtml } from 'hast-util-to-html';

const lowlight = createLowlight(common);

export default function PostContent({ html }: { html: string }) {
  if (!html) return null;

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const codeBlocks = Array.from(doc.querySelectorAll('pre code'));

  codeBlocks.forEach((code) => {
    const language = code.className.match(/language-(\w+)/)?.[1] || 'plaintext';
    const codeText = code.textContent || '';
    const highlighted = lowlight.highlight(language, codeText);
    const highlightedHtml = toHtml(highlighted);
    code.innerHTML = highlightedHtml;
    code.classList.add('hljs');
  });

  return <div className="tiptap" dangerouslySetInnerHTML={{ __html: doc.body.innerHTML }} />;
}
