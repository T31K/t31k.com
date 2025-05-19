'use client';

import { useState } from 'react';
import { ImagePixelated, ElementPixelated } from 'react-pixelate';
const Mario = () => {
  const [isJumping, setIsJumping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const handleJump = () => {
    setIsJumping(true);
    // Reset the jump after the animation ends
    setTimeout(() => {
      setDarkMode(!darkMode);
      setIsJumping(false);
    }, 250); // This should match the duration of the animation
  };

  return (
    <div className="absolute right-4 top-8 flex flex-col">
      <div className="w-12 h-12 bg-gray-200 flex items-center justify-center p-1">
        <img
          alt="test"
          src={darkMode ? '/sun.png' : '/moon.png'}
          width={35}
          height={35}
        />
      </div>
      <div
        className={`mario-container ${isJumping ? 'jumping' : ''}`}
        onClick={handleJump}
      >
        <div className="mario-red mario-hat1"></div>
        <div className="mario-red mario-hat2"></div>
        <div className="mario-skin mario-head"></div>
        <div className="mario-skin mario-nose"></div>
        <div className="mario-skin mario-snoot"></div>
        <div className="mario-black mario-eye"></div>
        <div className="mario-black mario-mustache1"></div>
        <div className="mario-black mario-mustache2"></div>
        <div className="mario-skin mario-chin"></div>
        <div className="mario-brown mario-hair1"></div>
        <div className="mario-brown mario-hair2"></div>
        <div className="mario-brown mario-hair3"></div>
        <div className="mario-brown mario-hair4"></div>
        <div className="mario-brown mario-hair5"></div>
        <div className="mario-skin mario-hands"></div>
        <div className="mario-red mario-torso"></div>
        <div className="mario-red mario-sleeves1"></div>
        <div className="mario-red mario-sleeves2"></div>
        <div className="mario-red mario-sleeves3"></div>
        <div className="mario-blue mario-waist"></div>
        <div className="mario-blue mario-pant1"></div>
        <div className="mario-blue mario-pant2"></div>
        <div className="mario-blue mario-left-brace"></div>
        <div className="mario-blue mario-right-brace"></div>
        <div className="mario-blue mario-brace-between"></div>
        <div className="mario-yellow mario-left-button"></div>
        <div className="mario-yellow mario-right-button"></div>
        <div className="mario-brown mario-left-shoe1"></div>
        <div className="mario-brown mario-left-shoe2"></div>
        <div className="mario-brown mario-right-shoe1"></div>
        <div className="mario-brown mario-right-shoe2"></div>
      </div>
    </div>
  );
};

export default Mario;
