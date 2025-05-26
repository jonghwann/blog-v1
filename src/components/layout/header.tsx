import getSession from '@/lib/session';

import ClientHeader from './client-header';

export default async function Header() {
  const { id } = await getSession();

  return <ClientHeader id={id} />;
}
