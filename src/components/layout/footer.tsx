import ThemeButton from '../common/theme-button';

export default function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="m-auto flex h-16 max-w-(--breakpoint-xl) items-center justify-between px-4">
        <span className="text-secondary-foreground text-sm">© Powered by Jonghwan Jang</span>
        <ThemeButton />
      </div>
    </footer>
  );
}
