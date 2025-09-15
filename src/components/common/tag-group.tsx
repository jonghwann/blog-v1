import Tag from './tag';

interface TagGroupProps {
  tags: string[];
}

export default function TagGroup({ tags }: TagGroupProps) {
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
