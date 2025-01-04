import Header from './header';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mt-[64px] flex w-full flex-1">{children}</main>
      <div className="bg-slate-300">푸터 입니다.</div>
    </div>
  );
}
