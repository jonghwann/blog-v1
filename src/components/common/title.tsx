interface TitleProps {
  children: React.ReactNode;
}

export default function Title({ children }: TitleProps) {
  return <h1 className='mb-6 font-bold text-lg'>{children}</h1>;
}
