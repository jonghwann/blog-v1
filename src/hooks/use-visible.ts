import { useState } from 'react';

export default function useVisible(defaultVisible = false) {
  const [isVisible, setIsVisible] = useState(defaultVisible);

  const show = () => {
    setIsVisible(true);
  };

  const hide = () => {
    setIsVisible(false);
  };

  const toggle = () => {
    setIsVisible(!isVisible);
  };

  return { isVisible, show, hide, toggle };
}
