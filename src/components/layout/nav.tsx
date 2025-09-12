import Link from 'next/link';
import { FaListUl, FaRss, FaSearch, FaTags } from 'react-icons/fa';

const icons = [
  { Icon: FaTags, href: '/tags' },
  { Icon: FaListUl, href: '/series' },
  { Icon: FaRss, href: '/xml' },
  { Icon: FaSearch, href: '/search' },
];

export default function Nav() {
  return (
    <nav>
      <ul className='flex items-center gap-[15px]'>
        {icons.map(({ Icon, href }) => (
          <li key={href}>
            <Link href={href}>
              <Icon className='size-5 text-tertiary-foreground hover:text-foreground' />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
