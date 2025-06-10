export async function getPost(id: string) {
  'use cache';
  const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
    next: {
      revalidate: 31536000,
    },
  });

  const data = await response.json();
  return data;
}
