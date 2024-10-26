import React from 'react';

function page() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh' }}>
      <video
        autoPlay
        loop
        controls
        style={{ width: '100%', maxWidth: '300px', height: 'auto', borderRadius: '35px', border: '5px solid black' }}
        src="/test_b14-2.mp4"
      ></video>
    </div>
  );
}

export default page;
