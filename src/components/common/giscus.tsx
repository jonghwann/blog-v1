'use client';
import Comments from '@giscus/react';
import { useTheme } from 'next-themes';

interface GiscusProps {
  className?: string;
}

export default function Giscus({ className }: GiscusProps) {
  const { resolvedTheme } = useTheme();

  return (
    <div className={className}>
      <Comments
        repo='wkdwhdghks/blog'
        repoId='R_kgDONUe_SA'
        category='Announcements'
        categoryId='DIC_kwDONUe_SM4CmK0j'
        mapping='pathname'
        strict='1'
        reactionsEnabled='1'
        emitMetadata='0'
        inputPosition='bottom'
        theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
        lang='ko'
      />
    </div>
  );
}
