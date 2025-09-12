export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='mt-14 flex h-14 items-center justify-center border-t px-4'>
      <small className='font-light text-secondary-foreground text-xs'>
        © <time>{year}</time>. jonghwan All rights reserved.
      </small>
    </footer>
  );
}
