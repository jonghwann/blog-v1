import Link from 'next/link';
import { FaListUl, FaRss, FaSearch, FaTags } from 'react-icons/fa';
import Icon from '../common/icon';

const icons = [
  { icon: FaTags, href: '/tags' },
  { icon: FaListUl, href: '/series' },
  { icon: FaRss, href: '/xml' },
  { icon: FaSearch, href: '/search' },
];

export default function Nav() {
  return (
    <nav>
      <ul className='flex items-center gap-[15px]'>
        {icons.map(({ icon, href }) => (
          <li key={href}>
            <Link href={href}>
              <Icon Icon={icon} />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
