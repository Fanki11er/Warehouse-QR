import { useCallback, useEffect, DependencyList } from 'react';

const useGoToTheTop = (dependenciesArr: DependencyList = []) => {
  const goTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    goTop();
  }, [dependenciesArr, goTop]);
  return goTop;
};

export default useGoToTheTop;
