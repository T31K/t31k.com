'use client';
import React, { useEffect } from 'react';

function Page() {
  useEffect(() => {
    let counter = 3;
    const intervalId = setInterval(() => {
      if (counter === 0) {
        window.location.href = 'https://t31k.medium.com/back-to-my-unfamiliar-familiar-home-236bc841a463';
      } else {
        console.log(counter);
        counter--;
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <div className="text-3xl max-w-xl text-[#222]">Redirecting to Medium in 3, 2, 1...</div>;
}

export default Page;
