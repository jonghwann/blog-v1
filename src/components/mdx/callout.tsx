interface CalloutProps {
  children: React.ReactNode;
  type?: 'info' | 'warn';
}

export default function Callout({ children, type = 'info' }: CalloutProps) {
  const styles = {
    info: 'bg-blue-50 border-blue-300 dark:bg-blue-950 dark:border-blue-800 text-blue-900 dark:text-blue-100',
    warn: 'bg-yellow-50 border-yellow-300 dark:bg-yellow-950 dark:border-yellow-800 text-yellow-900 dark:text-yellow-100',
  };

  return <div className={`my-6 rounded-r border-l-4 p-4 ${styles[type]}`}>{children}</div>;
}
