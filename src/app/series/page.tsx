import Link from 'next/link';
import Button from '@/components/common/button';

export default function SeriesPage() {
  return (
    <section className='absolute inset-0 flex flex-col items-center justify-center'>
      <h1 className='mb-4 font-bold text-2xl'>Coming Soon</h1>

      <p className='mb-8 text-lg'>준비 중인 페이지입니다.</p>

      <Link href='/posts'>
        <Button className='h-10 w-[116px]'>홈으로</Button>
      </Link>
    </section>
  );
}
