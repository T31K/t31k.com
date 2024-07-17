'use client';
import { books } from '@/utils/raw';
import { Press_Start_2P } from 'next/font/google';
const pressStart = Press_Start_2P({ weight: '400', subsets: ['latin-ext'] });
import Image from 'next/image';
import { useState } from 'react';
function BookPicks() {
  const [activeYear, setActiveYear] = useState(2024);

  const handleArrow = (direction) => {
    if (direction === 'left') {
      if (activeYear === 2021) return;

      setActiveYear(activeYear - 1);
    } else {
      if (activeYear === 2024) return;
      setActiveYear(activeYear + 1);
    }
  };
  return (
    <section className="lists pt-12 w-[80%]">
      <Image
        src="/book.webp"
        alt="me"
        className="mx-auto"
        width={85}
        height={85}
      />
      <h2 className={`text-2xl text-center ${pressStart.className} font-semibold mt-4 text-dark dark:text-dark`}>
        Book picks
      </h2>
      <div className="flex items-center justify-center gap-x-4 mt-4">
        <Image
          src="/left_chevron.png"
          alt="me"
          width={36}
          height={36}
          onClick={() => handleArrow('left')}
        />
        <h3 className={`text-xl text-center ${pressStart.className} font-medium !m-0 text-dark dark:text-dark `}>
          {activeYear}
        </h3>
        <Image
          src="/right_chevron.png"
          alt="me"
          width={36}
          height={36}
          className={`${activeYear === 2024 ? 'opacity-50' : 'opacity-100'}`}
          onClick={() => handleArrow('right')}
        />
      </div>
      <ul className="nes-list is-disc text-dark dark:text-dark">
        {books[activeYear].map((book, key) => {
          return (
            <li
              key={key}
              className={`title capitalize my-8 ${pressStart.className}`}
            >
              <span className="">{book.title}</span>
              <p className="!m-0 !ml-2">
                {book.author}
                {book.favorite && <i className="nes-icon heart is-small !ml-2"></i>}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default BookPicks;
