/* eslint-disable @next/next/no-img-element */
import { cn } from '@/lib/utils';

export interface ImageProps {
  src: string;
  alt: string;
}

export default function Image({ src, alt }: ImageProps) {
  return (
    <>
      <img className={cn('mx-auto rounded-xl border', alt ? 'mt-8' : 'my-8')} src={src} alt={alt} />
      {alt && <span className="mb-8 mt-[6px] block w-full text-center text-xs text-secondary-foreground">{alt}</span>}
    </>
  );
}
