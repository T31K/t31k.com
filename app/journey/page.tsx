'use client';

import { Tweet } from 'react-tweet';
import { Press_Start_2P } from 'next/font/google';
const pressStart = Press_Start_2P({
  weight: '400',
  subsets: ['latin-ext'],
  display: 'swap',
  adjustFontFallback: false,
});

// Sample tweet IDs - replace these with your actual tweet IDs
const tweetIds = [
  '1901291168606122274', // Replace with actual tweet IDs
  '1901475760801775691',
  '1901626070492950597',
  '1901982163152904412',
  '1902345808969875595',
  '1903063625935491344',
  '1903438087637582059',
  '1903825138535305502',
];

export default function JourneyPage() {
  return (
    <section className=" flex min-h-screen flex-col items-center gap-y-6 py-24 max-w-4xl overflow-x-hiddentext-white relative">
      <h1 className={`text-4xl whitespace-nowrap font-bold mb-8 text-black ${pressStart.className}`}>My Journey</h1>
      <div className="space-y-8">
        {tweetIds
          .slice()
          .reverse()
          .map((tweetId) => (
            <div
              key={tweetId}
              className="max-w-2xl mx-auto"
            >
              <Tweet id={tweetId} />
            </div>
          ))}
      </div>
    </section>
  );
}
