import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function useScrollProgress() {
  const pathname = usePathname();

  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (currentScrollY / scrollableHeight) * 100;
      setScrollPercentage(progress);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setScrollPercentage(0);
  }, [pathname]);

  return scrollPercentage;
}
