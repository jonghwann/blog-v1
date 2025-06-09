import getSession from '@/lib/session';

import FabLink from '@/components/fab/fab-link';

export default async function PostsPage() {
  const { id } = await getSession();

  return (
    <section className="mx-auto flex w-full max-w-(--breakpoint-xl) lg:gap-10">
      <div className="relative flex-2 px-4">
        <div className="mb-[10px]"></div>

        <ul></ul>

        {id && <FabLink href="/posts/write" />}
      </div>

      <aside className="hidden flex-1 border-l px-4 md:block">
        <section className="flex flex-col gap-3">
          <h2 className="text-secondary-foreground text-sm font-medium">Tags</h2>
        </section>
      </aside>
    </section>
  );
}
