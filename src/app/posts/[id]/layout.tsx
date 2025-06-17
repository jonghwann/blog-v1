import ScrollProgressBar from '@/components/common/scroll-progress-bar';

export default function PostLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgressBar />
      {children}
    </>
  );
}
