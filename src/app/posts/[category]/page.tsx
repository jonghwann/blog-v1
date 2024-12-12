import { getAllPosts, getCategories } from '@/lib/post';

interface Props {
  params: Promise<{ category: string }>;
}

export default async function Page({ params }: Props) {
  const { category } = await params;

  const categories = await getCategories();
  const posts = await getAllPosts(category);

  return (
    <div>
      <ul>
        {categories.map((category) => (
          <li key={category.category}>
            {category.category} ({category.count})
          </li>
        ))}
      </ul>

      <ul>
        {posts.map((post) => {
          const { url, title } = post;
          return <li key={url}>{title}</li>;
        })}
      </ul>
    </div>
  );
}
