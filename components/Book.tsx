'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Press_Start_2P } from 'next/font/google';
const pressStart = Press_Start_2P({
  weight: '400',
  subsets: ['latin-ext'],
  display: 'swap',
  adjustFontFallback: false,
});
import { books } from '@/utils/raw';

type BookType = {
  title: string;
  author: string;
  // allow rating to be number or null
  rating: number | null;
  reading?: boolean;
  favorite?: boolean;
};

function Book() {
  const [selectedYear, setSelectedYear] = useState<number>(2024);

  return (
    <>
      <Image
        src="/book.webp"
        alt="me"
        className="mx-auto"
        width={85}
        height={85}
      />
      <h2 className={`text-2xl text-center ${pressStart.className} font-semibold mb-8 mt-4 text-dark dark:text-dark`}>
        Book Picks
      </h2>
      <div className={`year-selector my-4 ${pressStart.className} mb-6 flex gap-x-8 items-center justify-center`}>
        <button
          onClick={() =>
            setSelectedYear((prevYear) => {
              const newYear = prevYear - 1;
              return newYear >= 2021 ? newYear : prevYear;
            })
          }
          className="px-2 py-1 bg-gray-200"
        >
          &lt;
        </button>
        <button
          disabled={selectedYear === 2022}
          className={`px-4 py-2 mx-1 bg-blue-300 text-dark`}
        >
          {selectedYear}
        </button>
        <button
          onClick={() =>
            setSelectedYear((prevYear) => {
              const newYear = prevYear + 1;
              const currentYear = new Date().getFullYear();
              return newYear <= currentYear ? newYear : prevYear;
            })
          }
          disabled={selectedYear === new Date().getFullYear()}
          className="px-2 py-1 bg-gray-200"
        >
          &gt;
        </button>
      </div>

      <ul className="nes-list is-disc text-dark dark:text-dark">
        {books[selectedYear as keyof typeof books]?.map((book: BookType, key: number) => {
          // Fallback to 0 if the rating is null
          const rating = book.rating ?? 0;
          const yellowStars = rating;
          const grayStars = 5 - rating;

          return book.reading ? (
            <div
              key={key}
              className={`title capitalize my-8 ${pressStart.className} flex flex-col items-start w-full`}
            >
              <div className="flex flex-col items-start gap-x-4 w-full">
                <span className="font-semibold !m-0">{book.title}</span>
                <p className="!m-0 text-sm text-gray-600">{book.author}</p>
                <p className="!m-0 text-sm text-yellow-600">Currently reading</p>
              </div>
            </div>
          ) : (
            <div
              key={key}
              className={`title capitalize my-8 ${pressStart.className} flex flex-col items-start w-full`}
            >
              <div className="flex flex-col items-start gap-x-4 w-full">
                <span className="font-semibold !m-0">{book.title}</span>
                <p className="!m-0 text-sm text-gray-600">{book.author}</p>
              </div>
              <div className="flex items-center gap-x-2 mt-1 w-full">
                {/* Display yellow stars */}
                {[...Array(yellowStars)].map((_, index: number) => (
                  <Image
                    key={index}
                    src="/yellow_star.webp"
                    alt="yellow star"
                    width={19}
                    height={19}
                  />
                ))}
                {/* Display gray stars */}
                {[...Array(grayStars)].map((_, index: number) => (
                  <Image
                    key={index + yellowStars}
                    src="/gray_star.webp"
                    alt="gray star"
                    width={19}
                    height={19}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </ul>
    </>
  );
}

export default Book;
