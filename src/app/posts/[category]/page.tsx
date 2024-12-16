import { getAllPosts, getCategories } from '@/lib/post';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Props {
  params: Promise<{ category: string }>;
}

export default async function Page({ params }: Props) {
  const { category } = await params;

  const categories = await getCategories();
  const posts = await getAllPosts(category);

  return (
    <div>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Make changes to your account here.</TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>

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
