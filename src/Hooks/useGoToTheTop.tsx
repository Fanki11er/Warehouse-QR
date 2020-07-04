import { useCallback } from 'react';

const useGoToTheTop = () => {
  const goTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return goTop;
};

export default useGoToTheTop;
