export default function PostLayout({ children }: { children: React.ReactNode }) {
  return <section className="mx-auto w-full max-w-(--breakpoint-md) px-4">{children}</section>;
}
