'use client';
import React, { useEffect } from 'react';

function Page() {
  useEffect(() => {
    let counter = 3;
    const intervalId = setInterval(() => {
      if (counter === 0) {
        window.location.href = 'https://ugc-gen.vercel.app/';
      } else {
        console.log(counter);
        counter--;
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="text-3xl max-w-xl text-[#222]"
      style={{ color: 'black' }}
    >
      Redirecting to UGC Generator in 3, 2, 1...
    </div>
  );
}

export default Page;
