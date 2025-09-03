export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='mt-14 flex h-14 items-center justify-center border-t px-4'>
      <small className='text-secondary-foreground text-sm'>
        © <time>{year}</time>. jonghwan All rights reserved.
      </small>
    </footer>
  );
}
