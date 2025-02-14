/* eslint-disable @next/next/no-img-element */
export interface ImageProps {
  src: string;
  alt: string;
}

export default function Image({ src, alt }: ImageProps) {
  return (
    <>
      <img className="w-full rounded-xl border" src={src} alt={alt} />
      {alt && <span className="mt-[6px] block w-full text-center text-xs text-secondary-foreground">{alt}</span>}
    </>
  );
}
