import CategoryPage from './[category]/page';

export default async function Page() {
  return <CategoryPage params={Promise.resolve({ category: 'All' })} />;
}
