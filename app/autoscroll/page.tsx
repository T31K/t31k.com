'use client';

import { useEffect, useRef } from 'react';

export default function AutoScroll() {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const burstCountRef = useRef(0);
  const totalBurstsRef = useRef(0);
  const isIdleRef = useRef(false);

  const POST_AUDIO_DELAY = 1300; // <<---- Added 1 second delay after audio ends

  useEffect(() => {
    const stopAudio = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };

    const playSound = (file: string): Promise<void> => {
      return new Promise((resolve) => {
        stopAudio();

        const audio = new Audio(file);
        audioRef.current = audio;

        audio.addEventListener('ended', () => resolve());

        audio.play().catch((e) => {
          console.log('Audio failed:', e);
          resolve();
        });
      });
    };

    const nextScroll = async () => {
      stopAudio();

      // 10–15% chance to idle like a human
      if (!isIdleRef.current && Math.random() < 0.15) {
        isIdleRef.current = true;
        const idleTime = 1000 + Math.random() * 2000; // 1–3 sec pause

        timeoutRef.current = setTimeout(() => {
          isIdleRef.current = false;
          nextScroll();
        }, idleTime);

        return;
      }

      let file = '';
      let wait = 0;

      // Quick burst setup
      if (burstCountRef.current === 0) {
        totalBurstsRef.current = Math.floor(Math.random() * 4) + 2; // 2–5 quick swipes
      }

      const inBurst = burstCountRef.current < totalBurstsRef.current;

      if (inBurst) {
        file = '/swipe_up_quick.mp3';
        wait = 200 + Math.random() * 350; // 200–550 ms
        burstCountRef.current++;
      } else {
        file = '/swipe_up_slow.mp3';
        wait = 1800 + Math.random() * 2500; // 1.8–4.3 s
        burstCountRef.current = 0;
      }

      // Play the audio and wait for it to finish
      await playSound(file);

      // **Added post-audio natural delay**
      await new Promise((r) => setTimeout(r, POST_AUDIO_DELAY)); // extra fixed 1 sec

      // Now schedule the next scroll
      timeoutRef.current = setTimeout(() => {
        nextScroll();
      }, wait);
    };

    nextScroll();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      stopAudio();
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center text-black">
        <h1 className="text-4xl font-bold mb-4">Auto Scroll</h1>
        <p className="text-lg">Simulating human-like social media scrolling...</p>
      </div>
    </div>
  );
}
