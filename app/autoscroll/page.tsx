'use client';

import { useEffect, useRef } from 'react';

export default function AutoScroll() {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const playRandomSound = () => {
      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      // Randomly choose between swipe.mp3 and like.mp3
      const sounds = ['/swipe.mp3', '/like.mp3'];
      const randomSound = sounds[Math.floor(Math.random() * sounds.length)];

      // Create and play audio
      const audio = new Audio(randomSound);
      audioRef.current = audio;
      audio.play().catch((err) => console.log('Audio play failed:', err));
    };

    const scheduleNextPlay = () => {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Random interval between 1000ms (1s) and 7000ms (7s)
      const randomDelay = Math.floor(Math.random() * 6000) + 1000;

      timeoutRef.current = setTimeout(() => {
        playRandomSound();
        scheduleNextPlay(); // Schedule the next play
      }, randomDelay);
    };

    // Start the cycle
    scheduleNextPlay();

    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center text-black">
        <h1 className="text-4xl font-bold mb-4">Auto Scroll</h1>
        <p className="text-lg">Playing random sounds every 1-7 seconds...</p>
        <div className="mt-8 text-sm opacity-75">
          <p>🔊 Make sure your volume is on</p>
        </div>
      </div>
    </div>
  );
}
