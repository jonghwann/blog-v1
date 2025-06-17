import Header from './header';
import Footer from './footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mt-32 flex flex-1">{children}</main>
      <Footer />
    </div>
  );
}
