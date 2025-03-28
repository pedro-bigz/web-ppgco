import { useEffect, useState } from "react";

interface IWindow {
  innerWidth: number;
  innerHeight: number;
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<IWindow>({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight
  });

  useEffect(() => {
    const resizeListener = () => {
      setWindowSize({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight
      })
    }

    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    }
  });

  return { windowSize }
}