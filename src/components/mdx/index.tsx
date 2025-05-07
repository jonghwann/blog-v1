import Image, { ImageProps } from './image';

import {
  HeadingProps,
  ListItemProps,
  ListProps,
  OrderedListProps,
  ParagraphProps,
  TableCellProps,
  TableHeaderProps,
  TableProps,
  TableRowProps,
} from '@/types/post';

export const MDXComponents = {
  h2: (props: HeadingProps) => <h2 className="mt-12 mb-6 scroll-m-20 border-t pt-10 text-2xl leading-[1.3em] font-semibold" {...props} />,
  h3: (props: HeadingProps) => <h3 className="mt-8 mb-3 scroll-m-20 text-xl leading-[1.6em] font-semibold" {...props} />,

  p: (props: ParagraphProps) => <p className="my-5 text-base leading-7" {...props} />,

  ul: (props: ListProps) => <ul className="mb-5 list-disc pl-5 text-base leading-7" {...props} />,
  ol: (props: OrderedListProps) => <ol className="mb-5 list-decimal pl-5 text-base leading-7" {...props} />,
  li: (props: ListItemProps) => <li className="mb-2" {...props} />,

  img: ({ src, alt }: ImageProps) => <Image src={src} alt={alt} />,

  table: (props: TableProps) => <table className="w-full border-collapse border text-sm">{props.children}</table>,
  tr: (props: TableRowProps) => <tr>{props.children}</tr>,
  th: (props: TableHeaderProps) => <th className="border px-3 py-2 text-left font-bold">{props.children}</th>,
  td: (props: TableCellProps) => <td className="border px-3 py-2">{props.children}</td>,
};
