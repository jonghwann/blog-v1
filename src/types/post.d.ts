export type HeadingProps = HTMLProps<HTMLHeadingElement>;
export type ParagraphProps = HTMLProps<HTMLParagraphElement>;
export type ListProps = React.HTMLProps<HTMLUListElement>;
export type OrderedListProps = React.OlHTMLAttributes<HTMLOListElement>;
export type ListItemProps = React.HTMLProps<HTMLLIElement>;
export type TableProps = React.HTMLProps<HTMLTableElement>;
export type TableRowProps = React.HTMLProps<HTMLTableRowElement>;
export type TableHeaderProps = React.HTMLProps<HTMLTableHeaderCellElement>;
export type TableCellProps = React.HTMLProps<HTMLTableCellElement>;

export interface PostInfo {
  categoryPublicName: string;
  post: string;
  category: string;
  postUrl: string;
}

export interface PostMatter {
  title: string;
  createdAt: string;
  thumbnail: string;
}

export interface PostDetail extends PostMatter {
  excerpt: string;
  readingMinutes: number;
  content: string;
}

export interface Post extends PostInfo, PostDetail {}

export interface CategoryItem {
  categoryPublicName: string;
  category: string;
  count: number;
}

export interface TableOfContents {
  title: string;
  link: string;
  depth: number;
}
