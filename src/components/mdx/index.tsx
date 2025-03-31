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
  h2: (props: HeadingProps) => <h2 className="mb-6 mt-12 scroll-m-20 border-t pt-10 text-2xl font-semibold leading-[1.3em]" {...props} />,
  h3: (props: HeadingProps) => <h3 className="mb-3 mt-8 scroll-m-20 text-xl font-semibold leading-[1.6em]" {...props} />,

  p: (props: ParagraphProps) => <p className="my-5 text-base leading-7" {...props} />,

  ul: (props: ListProps) => <ul className="mb-5 list-disc pl-5 text-base leading-7" {...props} />,
  ol: (props: OrderedListProps) => <ol className="mb-5 list-decimal pl-5 text-base leading-7" {...props} />,
  li: (props: ListItemProps) => <li className="mb-2" {...props} />,

  img: ({ src, alt }: ImageProps) => <Image src={src} alt={alt} />,

  table: (props: TableProps) => <table className="w-full border-collapse border border-border text-sm">{props.children}</table>,
  tr: (props: TableRowProps) => <tr className="hover:bg-accent">{props.children}</tr>,
  th: (props: TableHeaderProps) => <th className="border border-border px-3 py-2 text-left font-bold">{props.children}</th>,
  td: (props: TableCellProps) => <td className="border border-border px-3 py-2">{props.children}</td>,
};
