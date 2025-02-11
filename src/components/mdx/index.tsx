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
  h2: (props: HeadingProps) => <h3 className="mb-[18px] scroll-m-20 text-2xl font-bold leading-[34px] tracking-[-1px]" {...props} />,
  h3: (props: HeadingProps) => <h4 className="mb-[16px] scroll-m-20 text-xl font-semibold leading-[30px] tracking-[-0.5px]" {...props} />,

  p: (props: ParagraphProps) => <p className="mb-4 text-base leading-7 text-secondary-foreground" {...props} />,

  ul: (props: ListProps) => <ul className="mb-4 list-disc pl-5 text-base leading-7 text-secondary-foreground" {...props} />,
  ol: (props: OrderedListProps) => <ol className="mb-4 list-decimal pl-5 text-base leading-7 text-secondary-foreground" {...props} />,
  li: (props: ListItemProps) => <li className="mb-1.5" {...props} />,

  img: ({ src, alt }: ImageProps) => <Image src={src} alt={alt} />,

  hr: () => <hr className="my-12" />,

  table: (props: TableProps) => <table className="w-full border-collapse border border-border text-sm text-secondary-foreground">{props.children}</table>,
  tr: (props: TableRowProps) => <tr className="hover:bg-accent">{props.children}</tr>,
  th: (props: TableHeaderProps) => <th className="border border-border px-3 py-2 text-left font-bold">{props.children}</th>,
  td: (props: TableCellProps) => <td className="border border-border px-3 py-2">{props.children}</td>,
};
