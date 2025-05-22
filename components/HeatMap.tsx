'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { newColors } from '@/utils/constants';
import { Press_Start_2P } from 'next/font/google';
const pressStart = Press_Start_2P({
  weight: '400',
  subsets: ['latin-ext'],
  display: 'swap',
  adjustFontFallback: false,
});
import Image from 'next/image';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const HeatMap = () => {
  const [formState] = useState<any>({
    username: 't31k',
    theme: 'light',
    color_scheme: 'cello',
  });

  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1); // Months are 1-based
  const [yearlyContributions, setYearlyContributions] = useState<{ [year: number]: any[] }>({});
  const [contributionsData, setContributionsData] = useState<{ [date: string]: number }>({});
  const [imageDirection, setImageDirection] = useState<string>('left'); // New state for image direction

  useEffect(() => {
    if (yearlyContributions[selectedYear]) {
      processContributions(yearlyContributions[selectedYear]);
    } else {
      getData();
    }
  }, [selectedYear]);

  useEffect(() => {
    if (yearlyContributions[selectedYear]) {
      processContributions(yearlyContributions[selectedYear]);
    }
  }, [selectedMonth]);

  const getData = async () => {
    try {
      const year = selectedYear;
      const username = formState.username;

      const res = await axios.get(`https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`);
      setYearlyContributions((prev) => ({ ...prev, [year]: res.data.contributions }));
      processContributions(res.data.contributions);
    } catch (error: any) {
      console.error('Failed to fetch data:', error);
    }
  };

  const processContributions = (contributions: any[]) => {
    const filteredContributions = contributions.filter((entry) => {
      const date = new Date(entry.date);
      return date.getMonth() + 1 === selectedMonth;
    });

    const contributionsMap: { [date: string]: number } = {};
    filteredContributions.forEach((entry) => {
      contributionsMap[entry.date] = entry.count;
    });

    setContributionsData(contributionsMap);
  };

  const handlePrevMonth = () => {
    if (selectedMonth === 1) {
      if (selectedYear > 2023) {
        setSelectedYear(selectedYear - 1);
        setSelectedMonth(12);
      }
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
    setImageDirection('left'); // Set image direction to left
  };

  const handleNextMonth = () => {
    if (selectedMonth === 12) {
      if (selectedYear < 2024) {
        setSelectedYear(selectedYear + 1);
        setSelectedMonth(1);
      }
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
    setImageDirection('right'); // Set image direction to right
  };

  const getColor = (count: number) => {
    const { color_scheme } = formState as { color_scheme: keyof typeof newColors };
    if (count === 0) return '#e2e8f0';
    if (count <= 28) return newColors[color_scheme][200];
    if (count <= 70) return newColors[color_scheme][400];
    if (count <= 140) return newColors[color_scheme][600];
    return newColors[color_scheme][800];
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  if (!Object.keys(contributionsData).length) return null;

  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
  const firstDay = new Date(selectedYear, selectedMonth - 1, 1).getDay(); // 0 = Sunday

  const weeks: (number | null)[][] = [];
  let week: (number | null)[] = [];

  // Add nulls for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    week.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }

  // Fill the last week with nulls if necessary
  if (week.length > 0) {
    while (week.length < 7) {
      week.push(null);
    }
    weeks.push(week);
  }

  return (
    <>
      <Image
        src="/shy_guy.gif"
        className={imageDirection === 'right' ? 'mx-auto transform -scale-x-100' : 'mx-auto'}
        alt="t31k"
        width={120}
        height={120}
      />
      <h2 className={`text-2xl text-center ${pressStart.className} font-semibold mb-2 mt-4 text-dark dark:text-dark`}>
        Commit History
      </h2>
      <div className={`flex flex-col items-center ${formState.theme === 'dark' ? 'bg-[#0E0E10]' : 'bg-[#fffffc]'}`}>
        <div className={`year-selector ${pressStart.className} my-4 flex gap-x-8 items-center justify-center`}>
          <button
            onClick={() => {
              if (selectedYear > 2023) {
                setSelectedYear(selectedYear - 1);
                setSelectedMonth(selectedMonth);
              }
            }}
            disabled={selectedYear === 2023}
            className="px-2 py-1 bg-gray-200"
          >
            &lt;
          </button>
          <button
            disabled
            className={`px-4 py-2 mx-1 bg-blue-300 text-dark`}
          >
            {selectedYear}
          </button>
          <button
            onClick={() => {
              if (selectedYear < 2025) {
                setSelectedYear(selectedYear + 1);
                setSelectedMonth(selectedMonth);
              }
            }}
            disabled={selectedYear === 2025}
            className="px-2 py-1 bg-gray-200"
          >
            &gt;
          </button>
        </div>

        <div className="month-selector flex items-center my-2">
          <button
            onClick={handlePrevMonth}
            disabled={selectedYear === 2023 && selectedMonth === 1}
            className="px-2 py-1 bg-gray-200"
          >
            &lt;
          </button>
          <span className="mx-4 text-lg text-dark w-[250px] text-center">{months[selectedMonth - 1]}</span>
          <button
            onClick={handleNextMonth}
            disabled={selectedYear === 2025 && selectedMonth === new Date().getMonth() + 1}
            className="px-2 py-1 bg-gray-200"
          >
            &gt;
          </button>
        </div>

        <div className="h-[180px]">
          <div className="calendar">
            {weeks.map((week, weekIndex) => (
              <div
                key={weekIndex}
                className="flex"
              >
                {week.map((day, dayIndex) => {
                  if (day === null) {
                    return (
                      <div
                        key={dayIndex}
                        style={{
                          width: '20px',
                          height: '20px',
                          margin: '1px',
                          backgroundColor: '#e2e8f0',
                        }}
                      ></div>
                    );
                  } else {
                    const dateStr = `${selectedYear}-${selectedMonth.toString().padStart(2, '0')}-${day
                      .toString()
                      .padStart(2, '0')}`;
                    const count = contributionsData[dateStr] || 0;
                    return (
                      <div
                        key={dayIndex}
                        style={{
                          backgroundColor: getColor(count),
                          width: '20px',
                          height: '20px',
                          margin: '1px',
                        }}
                      ></div>
                    );
                  }
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeatMap;
