import CategoryPage from './[category-slug]/page';

export default async function PostsPage() {
  return <CategoryPage params={Promise.resolve({ 'category-slug': 'all' })} />;
}
