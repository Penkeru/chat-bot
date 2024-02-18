import React, { useEffect, useState } from 'react';
import { TypingAnimationProps } from './typing-animation.model';

export const TypingAnimation = ({text, typingSpeed = 50}: TypingAnimationProps) => {
  const [displayText, setDisplayText] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentIndex, text]);

  return <span>{displayText}</span>
};