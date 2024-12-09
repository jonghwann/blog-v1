import { getAllPosts } from '@/lib/post';

export default async function Page() {
  const posts = await getAllPosts();

  return (
    <div>
      <h1>전체 글 목록</h1>

      <ul>
        {posts.map((post) => {
          const { url, title } = post;
          return <li key={url}>{title}</li>;
        })}
      </ul>
    </div>
  );
}
