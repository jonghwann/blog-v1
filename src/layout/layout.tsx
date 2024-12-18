interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="bg-slate-300">헤더 입니다.</div>
      <div className="mx-auto flex w-full max-w-[768px] flex-1">{children}</div>
      <div className="bg-slate-300">푸터 입니다.</div>
    </div>
  );
}
