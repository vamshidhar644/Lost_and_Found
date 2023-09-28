import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {BiChevronUpCircle} from 'react-icons/bi'

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div
      className={`go-to-top-button ${isVisible ? 'visible' : ''}`}
      onClick={handleScrollToTop}
    >
      <BiChevronUpCircle/>
    </div>
  );
};

export default GoToTop;
