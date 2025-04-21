import ThemeToggleButton from '@/components/shared/theme-button';

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-background">
      <div className="m-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
        <span className="text-sm text-secondary-foreground">© Powered by Jonghwan Jang</span>
        <ThemeToggleButton />
      </div>
    </footer>
  );
}
