import Link from 'next/link';

import Github from '@/components/icons/github';
import LinkedIn from '@/components/icons/linked-in';

export default function Footer() {
  return (
    <footer className="mt-16 flex h-16 items-center justify-center gap-3 border-t border-border bg-background px-4">
      <span className="text-sm">© Powered by Jonghwan Jang</span>

      <div className="flex items-center gap-2">
        <Link href="https://github.com/wkdwhdghks" target="_blank">
          <Github className="fill-foreground" width={20} height={20} />
        </Link>

        <Link href="https://www.linkedin.com/in/jonghwan" target="_blank">
          <LinkedIn className="fill-foreground" width={20} height={20} />
        </Link>
      </div>
    </footer>
  );
}
