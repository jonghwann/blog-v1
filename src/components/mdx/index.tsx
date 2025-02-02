import { HTMLProps } from 'react';

import Image, { ImageProps } from './image';

type HeadingProps = HTMLProps<HTMLHeadingElement>;
type ParagraphProps = HTMLProps<HTMLParagraphElement>;

export const MDXComponents = {
  h1: (props: HeadingProps) => <h1 className="mb-8 mt-14 scroll-m-20 text-3xl font-bold leading-[1.3]" {...props} />,
  h2: (props: HeadingProps) => <h2 className="mb-6 mt-12 scroll-m-20 text-2xl font-bold leading-[1.3]" {...props} />,
  h3: (props: HeadingProps) => <h3 className="mb-4 mt-10 scroll-m-20 text-xl font-bold leading-[1.3]" {...props} />,
  h4: (props: HeadingProps) => <h4 className="mb-4 mt-8 scroll-m-20 text-lg font-bold leading-[1.3]" {...props} />,
  p: (props: ParagraphProps) => <p className="my-6 text-base leading-7 text-secondary-foreground" {...props} />,
  img: ({ src, alt }: ImageProps) => <Image src={src} alt={alt} />,
};
