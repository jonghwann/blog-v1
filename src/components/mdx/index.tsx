import { HTMLProps } from 'react';

type HeadingProps = HTMLProps<HTMLHeadingElement>;
type ParagraphProps = HTMLProps<HTMLParagraphElement>;

export const MDXComponents = {
  h1: (props: HeadingProps) => <h1 className="mb-6 mt-12 text-4xl font-bold" {...props} />,
  h2: (props: HeadingProps) => <h2 className="mb-4 mt-10 text-2xl font-bold" {...props} />,
  h3: (props: HeadingProps) => <h3 className="mb-4 mt-8 text-xl font-bold" {...props} />,
  p: (props: ParagraphProps) => <p className="my-6 leading-relaxed text-secondary-foreground" {...props} />,
};
