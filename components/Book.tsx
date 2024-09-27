'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Press_Start_2P } from 'next/font/google';
const pressStart = Press_Start_2P({ weight: '400', subsets: ['latin-ext'] });

import { books } from '@/utils/raw';

type BookType = {
  title: string;
  author: string;
  rating: number; // Rating is a single number
  favorite?: boolean; // Optional property
};

function Book() {
  const [selectedYear, setSelectedYear] = useState<2023 | 2024 | 2021 | 2022>(2024);

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
      <div className={`year-selector my-4 ${pressStart.className} mb-6 flex items-center justify-center`}>
        <button
          onClick={() => setSelectedYear(2021)}
          disabled={selectedYear === 2021}
          className={`px-4 py-2 mx-1 ${selectedYear === 2021 ? 'bg-blue-300 text-dark' : 'bg-gray-200 text-white'}`}
        >
          2021
        </button>
        <button
          onClick={() => setSelectedYear(2022)}
          disabled={selectedYear === 2022}
          className={`px-4 py-2 mx-1 ${selectedYear === 2022 ? 'bg-blue-300 text-dark' : 'bg-gray-200 text-white'}`}
        >
          2022
        </button>
        <button
          onClick={() => setSelectedYear(2023)}
          disabled={selectedYear === 2023}
          className={`px-4 py-2 mx-1 ${selectedYear === 2023 ? 'bg-blue-300 text-dark' : 'bg-gray-200 text-white'}`}
        >
          2023
        </button>
        <button
          onClick={() => setSelectedYear(2024)}
          disabled={selectedYear === 2024}
          className={`px-4 py-2 mx-1 ${selectedYear === 2024 ? 'bg-blue-300 text-dark' : 'bg-gray-200 text-white'}`}
        >
          2024
        </button>
      </div>

      <ul className="nes-list is-disc text-dark dark:text-dark">
        {books[selectedYear]?.map((book: BookType, key: number) => {
          const yellowStars = book.rating; // Number of yellow stars
          const grayStars = 5 - yellowStars; // Remaining gray stars

          return (
            <div
              key={key}
              className={`title capitalize my-8 ${pressStart.className} flex flex-col items-start`}
            >
              <div className="flex flex-col items-start gap-x-4">
                <span className="font-semibold !m-0">{book.title}</span>
                <p className="!m-0 text-sm text-gray-600">{book.author}</p>
              </div>

              <div className="flex items-center gap-x-2 mt-1 ">
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
                    key={index + yellowStars} // Ensure unique key by adding yellowStars
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
