import { useState, useEffect } from 'react';

export default function useScreenSize(minWidth: number = 0, maxWidth: number = 767) {
  const [isWithinRange, setIsWithinRange] = useState(window.innerWidth >= minWidth && window.innerWidth <= maxWidth);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      setIsWithinRange(currentWidth >= minWidth && currentWidth <= maxWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => window.removeEventListener('resize', handleResize);
  }, [minWidth, maxWidth]);

  return isWithinRange;
}
