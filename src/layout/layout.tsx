import Header from './header';
import ThemeToggle from '@/components/test/theme-toggle';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <ThemeToggle />
      <div className="mx-auto flex w-full max-w-[768px] flex-1">{children}</div>
      <div className="bg-slate-300">푸터 입니다.</div>
    </div>
  );
}
