import Form from 'next/form';

import getSession from '@/lib/session';

import { logoutAction } from '@/app/logout/action';

import Nav from './nav';
import Button from '../common/button';

export default async function Header() {
  const { id } = await getSession();

  return (
    <header className="bg-background/80 sticky top-0 z-[var(--z-header)] mb-16 w-full border-b backdrop-blur-[5px] backdrop-saturate-[180%]">
      <div className="mx-auto flex h-16 w-full max-w-(--breakpoint-xl) items-center justify-between px-4">
        <Nav />

        {id && (
          <Form action={logoutAction}>
            <Button className="h-8 rounded-md text-sm">Log out</Button>
          </Form>
        )}
      </div>
    </header>
  );
}
