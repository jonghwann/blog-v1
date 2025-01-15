import Link from 'next/link';

import Github from '@/components/icons/github';
import LinkedIn from '@/components/icons/linked-in';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center gap-4 bg-background py-16">
      <div className="flex items-center gap-4">
        <Link href="https://github.com/wkdwhdghks" target="_blank">
          <Github className="fill-foreground" width={30} height={30} />
        </Link>

        <Link href="/">
          <LinkedIn className="fill-foreground" width={30} height={30} />
        </Link>
      </div>

      <span>© Powered by Jonghwan Jang</span>
    </footer>
  );
}
