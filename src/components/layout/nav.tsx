import { List, Search, Signal, Tags } from 'lucide-react';
import Link from 'next/link';

const icons = [
  { Icon: Tags, href: '/tags' },
  { Icon: List, href: '/series' },
  { Icon: Signal, href: '/xml' },
  { Icon: Search, href: '/search' },
];

export default function Nav() {
  return (
    <nav>
      <ul className='flex items-center gap-3'>
        {icons.map(({ Icon, href }) => (
          <li key={href}>
            <Link href={href}>
              <Icon className='size-5 text-secondary-foreground hover:text-foreground' />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
