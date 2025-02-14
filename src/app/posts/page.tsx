import CategoryPage from './[category]/page';

export default async function PostsPage() {
  return <CategoryPage params={Promise.resolve({ category: 'all' })} />;
}
