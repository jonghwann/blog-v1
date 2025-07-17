import PostNavigationItem from './post-navigation-item';

export interface Navigation {
  prev: { id: number; title: string } | null;
  next: { id: number; title: string } | null;
}

interface PostNavigationProps {
  navigation: Navigation;
}

export default function PostNavigation({ navigation: { prev, next } }: PostNavigationProps) {
  return (
    <nav className="my-12 flex flex-wrap justify-between border-t pt-8">
      <PostNavigationItem variant="prev" id={prev?.id} title={prev?.title} />
      <PostNavigationItem variant="next" id={next?.id} title={next?.title} />
    </nav>
  );
}
