import Link from 'next/link';

interface PostItemProps {
  id: number;
  title: string;
  summary: string;
  readingTime: number;
  createdAt: Date;
}

export default function PostItem({ id, title, summary, readingTime, createdAt }: PostItemProps) {
  return (
    <article>
      <Link className="group flex items-center justify-between gap-5 py-5" href={`/posts/${id}`}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <h2 className="text-foreground group-hover:text-accent-foreground line-clamp-1 text-base font-semibold sm:text-xl">
              {title}
            </h2>
            <p className="text-secondary-foreground line-clamp-2 text-xs sm:text-sm">{summary}</p>
          </div>

          <div className="text-secondary-foreground flex items-center gap-2 text-xs">
            <time>{createdAt.toLocaleDateString()}</time>
            <span>·</span>
            <span>{readingTime} min read</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
