import { HTMLProps } from 'react';

import Image, { ImageProps } from './image';

type HeadingProps = HTMLProps<HTMLHeadingElement>;
type ParagraphProps = HTMLProps<HTMLParagraphElement>;
type ListProps = React.HTMLProps<HTMLUListElement>;
type OrderedListProps = React.OlHTMLAttributes<HTMLOListElement>;
type ListItemProps = React.HTMLProps<HTMLLIElement>;

export const MDXComponents = {
  h1: (props: HeadingProps) => <h1 className="mb-1 mt-6 scroll-m-20 text-3xl font-bold leading-[1.6]" {...props} />,
  h2: (props: HeadingProps) => <h2 className="mb-1 mt-6 scroll-m-20 text-2xl font-bold leading-[1.6]" {...props} />,
  h3: (props: HeadingProps) => <h3 className="mb-1 mt-6 scroll-m-20 text-xl font-bold leading-[1.6]" {...props} />,
  h4: (props: HeadingProps) => <h4 className="mb-1 mt-6 scroll-m-20 text-lg font-bold leading-[1.6]" {...props} />,
  p: (props: ParagraphProps) => <p className="mb-1 mt-6 text-base leading-[1.6] text-secondary-foreground" {...props} />,
  img: ({ src, alt }: ImageProps) => <Image src={src} alt={alt} />,
  ul: (props: ListProps) => <ul className="mb-1 mt-6 list-disc pl-6" {...props} />,
  ol: (props: OrderedListProps) => <ol className="mb-1 mt-6 list-decimal pl-6" {...props} />,
  li: (props: ListItemProps) => <li className="mb-4 text-secondary-foreground" {...props} />,
  hr: () => <hr className="my-12" />,
  br: () => <br className="my-3" />,
};
