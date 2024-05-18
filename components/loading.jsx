import React, { useState, useEffect } from 'react';

function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 80;
      });
    }, 10); // Increase every 10ms to achieve 1s for 100 steps

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <progress
        className="nes-progress is-primary"
        value={progress}
        max="100"
        style={{ width: '100px', height: '30px', margin: '45px 20px' }}
      ></progress>
    </>
  );
}

export default Loading;
