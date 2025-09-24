'use client';

import { Tweet } from 'react-tweet';
import { Press_Start_2P } from 'next/font/google';
const pressStart = Press_Start_2P({
  weight: '400',
  subsets: ['latin-ext'],
  display: 'swap',
  adjustFontFallback: false,
});

const journalData = {
  '2025_03_27': {
    tweets: ['https://x.com/t31kx/status/1905173564451439048', 'https://x.com/t31kx/status/1905262445264089471'],
    captions: [
      `They say lightning also strike once and it was really true for me. I saw the Ghibli trend on Twitter blowing up and thought hey let's build something`,
      `since my parents were at the airport and i had to stay late, i decided to just build something with no real plan. As you can see the tweet blew up`,
    ],
  },
  '2025_03_28': {
    tweets: ['https://x.com/t31kx/status/1905264984537678254', 'https://x.com/t31kx/status/1905299998402879582'],
    captions: [`I upped the price from $0.5 to $2.0. Sales continued to skyrocket`],
  },
  '2025_03_29': {
    tweets: ['https://x.com/t31kx/status/1905329562344718369', 'https://x.com/t31kx/status/1905262445264089471'],
    captions: [`I got tons of DMs & emails from random people, some`],
  },
  '2025_03_30': {
    tweets: ['https://x.com/t31kx/status/1905173564451439048', 'https://x.com/t31kx/status/1905262445264089471'],
    captions: [`Sales dipped to absolute 0. Turns out my checkout broke.`],
  },
  '2025_03_31': {
    tweets: ['https://x.com/t31kx/status/1905173564451439048'],
    captions: [
      `Someone offered to buy the app.`,
      'We jumped on a call even though he was in a 12 hour different timezone',
      'No deal in the end since the app was fairly new and I couldnt even fathom the thought of it having valuation',
    ],
  },
  '2025_04_01': {
    tweets: ['https://x.com/t31kx/status/1905173564451439048'],
    captions: [
      `Damon Chen a very popular & well known indie hacker gave the app a shout out.`,
      `This brought another surge of traffic to the app, and hence more sales`,
    ],
  },
  '2025_04_02': {
    tweets: ['https://x.com/t31kx/status/1905173564451439048'],
    captions: [`I launched a hari raya thematic pack`, `Response was excellent. Even more $$$$`],
  },
  '2025_04_03': {
    tweets: ['https://x.com/t31kx/status/1905173564451439048'],
    captions: [`Pieter Levels, the GOAT of indie hackers followed me`],
  },
  '2025_04_05': {
    tweets: ['https://x.com/t31kx/status/1905173564451439048'],
    captions: [`Danny Postma another extremely sucessful and well known indie hacker, offered to acquire the app`],
  },
};

export default function JourneyPage() {
  return (
    <section className=" flex min-h-screen flex-col items-center gap-y-6 max-w-4xl overflow-x-hidden text-white relative !font-mono">
      <h1 className={`text-3xl text-center whitespace-nowrap font-bold mb-8 text-black`}>My Dreamchanted Journey</h1>
      <div className="space-y-8">
        {Object.entries(journalData).map(([dateKey, dayData]) => {
          const formattedDate = dateKey.replace(/_/g, '-');
          return (
            <div
              key={dateKey}
              className="mb-12 w-full"
            >
              <h2 className={`text-2xl font-bold mb-6 text-center text-black font-mono`}>
                {new Intl.DateTimeFormat('en-US', { day: '2-digit', month: 'long' }).format(new Date(formattedDate))}
              </h2>

              <div className="captions mb-6 text-center max-w-lg mx-auto">
                {dayData.captions.map((caption, index) => (
                  <p
                    key={index}
                    className="mt-2 text-left text-gray-800 leading-relaxed"
                  >
                    {caption}
                  </p>
                ))}
              </div>

              <div className="tweets grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 justify-center items-start ">
                {dayData.tweets.map((tweetUrl) => {
                  const tweetId = tweetUrl.split('/').pop() || '';
                  return (
                    <div key={tweetUrl}>
                      <Tweet id={tweetId} />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
