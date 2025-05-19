interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      헤더
      <main className="flex flex-1">{children}</main>
      푸터
    </div>
  );
}
