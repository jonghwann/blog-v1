import Header from './header';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="flex w-full flex-1">{children}</div>
      <div className="bg-slate-300">푸터 입니다.</div>
    </main>
  );
}
