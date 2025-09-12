import Tag from './tag';

interface TagListProps {
  tags: string[];
}

export default function TagList({ tags }: TagListProps) {
  return (
    <ul className='flex flex-wrap items-center gap-2'>
      {tags.map((tag) => (
        <li key={tag}>
          <Tag href={`/posts/tag/${tag}`}>{tag}</Tag>
        </li>
      ))}
    </ul>
  );
}
