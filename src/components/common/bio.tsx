import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import Icon from './icon';

interface BioProps {
  className?: string;
}

const icons = [
  { icon: FaGithub, href: 'https://github.com/wkdwhdghks' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/jonghwan/' },
];

export default function Bio({ className }: BioProps) {
  return (
    <aside className={cn('flex items-center gap-4', className)}>
      <Image
        src='/profile.jpg'
        alt='profile'
        width={128}
        height={128}
        priority
        className='size-32 flex-shrink-0 rounded-full object-cover'
      />

      <div>
        <h2 className='mb-1 font-bold text-2xl leading-6'>@jonghwan</h2>
        <p className='mb-3 font-nanum-square-round text-base'>꾸준히, 의미있는 학습을 기록하기 위한 공간입니다.</p>

        <nav>
          <ul className='flex items-center gap-2'>
            {icons.map(({ icon, href }) => (
              <li key={href}>
                <Link href={href} target='_blank'>
                  <Icon Icon={icon} className='size-6' />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
