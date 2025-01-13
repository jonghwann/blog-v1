import { HTMLProps } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Callout from './callout';

type HeadingProps = HTMLProps<HTMLHeadingElement>;
type ParagraphProps = HTMLProps<HTMLParagraphElement>;

export const MDXComponents = {
  // HTML 요소 커스터마이징
  h1: (props: HeadingProps) => <h1 className="mb-6 mt-12 text-4xl font-bold" {...props} />,
  h2: (props: HeadingProps) => <h2 className="mb-4 mt-10 text-2xl font-bold" {...props} />,
  h3: (props: HeadingProps) => <h3 className="mb-4 mt-8 text-xl font-bold" {...props} />,
  p: (props: ParagraphProps) => <p className="my-6 leading-relaxed text-gray-800 dark:text-gray-200" {...props} />,

  // Next.js 컴포넌트
  Image,
  Link,
  Callout,
};
