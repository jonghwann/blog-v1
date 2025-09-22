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
    <nav className='mt-15 mb-12 flex flex-col justify-between gap-3 md:flex-row md:flex-wrap'>
      <PostNavigationItem variant='prev' id={prev?.id} title={prev?.title} />
      <PostNavigationItem variant='next' id={next?.id} title={next?.title} />
    </nav>
  );
}
