export async function getPost(id: string) {
  const response = await fetch(`http://localhost:3000/api/posts/${id}`);
  const data = await response.json();
  return data;
}
