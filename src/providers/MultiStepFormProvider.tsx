import React, { createContext, useState } from 'react';
import { MultiStepFormInterface } from '../types/types';
import { MultiStepFormSettings } from '../classes/classes';

export const MultiStepFormContext = createContext<MultiStepFormInterface>({
  currentIndex: 0,
  createSettings: (x: number, y: number) => new MultiStepFormSettings(x, y),
  changeCurrentIndex: () => {},
  resetCurrentIndex: () => {},
});

const MultiStepFormProvider = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const createSettings = (minIndex: number, maxIndex: number) => {
    return new MultiStepFormSettings(minIndex, maxIndex);
  };
  const changeCurrentIndex = (
    currentIndex: number,
    settings: MultiStepFormSettings,
    action: 'prev' | 'next',
  ) => {
    const { minIndex, maxIndex } = settings;
    if (action === 'prev' && currentIndex > minIndex) setCurrentIndex(currentIndex - 1);
    if (action === 'next' && currentIndex < maxIndex) setCurrentIndex(currentIndex + 1);
  };

  const resetCurrentIndex = (minIndex: number) => {
    setCurrentIndex(minIndex);
  };

  const multiStepFormContext: MultiStepFormInterface = {
    createSettings,
    changeCurrentIndex,
    resetCurrentIndex,
    currentIndex,
  };
  return (
    <MultiStepFormContext.Provider value={multiStepFormContext}>
      {children}
    </MultiStepFormContext.Provider>
  );
};

export default MultiStepFormProvider;
