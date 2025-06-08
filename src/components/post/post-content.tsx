interface PostContentProps {
  html: string;
}

export default function PostContent({ html }: PostContentProps) {
  return <div className="tiptap" dangerouslySetInnerHTML={{ __html: html }} />;
}
