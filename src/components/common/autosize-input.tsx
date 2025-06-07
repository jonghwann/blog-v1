'use client';

import { InputHTMLAttributes, useLayoutEffect, useRef, useState } from 'react';

interface AutosizeInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function AutosizeInput({ className, ...rest }: AutosizeInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  const [inputWidth, setInputWidth] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    if (spanRef.current) {
      setInputWidth(spanRef.current.offsetWidth + 2);
    }
  }, [rest.value, rest.placeholder]);

  return (
    <div className="relative inline-block">
      <input ref={inputRef} className={className} style={{ width: inputWidth }} {...rest} />

      <span
        ref={spanRef}
        className="pointer-events-none invisible absolute whitespace-pre"
        style={{
          font: inputRef.current ? getComputedStyle(inputRef.current).font : undefined,
          padding: inputRef.current ? getComputedStyle(inputRef.current).padding : undefined,
        }}
      >
        {rest.value || rest.placeholder || ''}
      </span>
    </div>
  );
}
