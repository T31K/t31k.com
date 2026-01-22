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

const HeatMap = () => {
  const [formState] = useState<any>({
    username: 't31k',
    theme: 'light',
    color_scheme: 'cello',
  });

  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [yearlyContributions, setYearlyContributions] = useState<{ [year: number]: any[] }>({});
  const [contributionsData, setContributionsData] = useState<{ [date: string]: number }>({});
  const [currentGif, setCurrentGif] = useState<string>('/left_shy_guy.gif');
  const [showMonthIndicators, setShowMonthIndicators] = useState<boolean>(false);

  useEffect(() => {
    if (yearlyContributions[selectedYear]) {
      processContributions(yearlyContributions[selectedYear]);
    } else {
      getData();
    }
  }, [selectedYear]);

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
    const contributionsMap: { [date: string]: number } = {};
    contributions.forEach((entry) => {
      contributionsMap[entry.date] = entry.count;
    });
    setContributionsData(contributionsMap);
  };

  const handlePrevYear = () => {
    if (selectedYear > 2020) {
      setSelectedYear(selectedYear - 1);
      setCurrentGif('/left_shy_guy.gif');
    }
  };

  const handleNextYear = () => {
    if (selectedYear < new Date().getFullYear()) {
      setSelectedYear(selectedYear + 1);
      setCurrentGif('/right_shy_guy.gif');
    }
  };

  const getColor = (count: number) => {
    const { color_scheme } = formState as { color_scheme: keyof typeof newColors };
    if (count === 0) return '#e2e8f0';
    if (count <= 28) return newColors[color_scheme][200];
    if (count <= 70) return newColors[color_scheme][400];
    if (count <= 140) return newColors[color_scheme][600];
    return newColors[color_scheme][800];
  };

  const getYearLabel = (year: number): string => {
    const labels: { [key: number]: string } = {
      2020: 'Junior SWE',
      2021: 'Junior SWE',
      2022: 'Senior SWE',
      2023: 'First learnt about Indie Hacking',
      2024: 'Part time indie hacker',
      2025: 'Full time indie hacker year 1',
      2026: 'Full time indie hacker year 2',
    };
    return labels[year] || '';
  };

  if (!Object.keys(contributionsData).length) return null;

  // Build array of all days in the year
  const startDate = new Date(selectedYear, 0, 1);
  const endDate = new Date(selectedYear, 11, 31);

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const allDays: Array<{ date: Date; dateStr: string; count: number; isMonthStart: boolean; monthName: string }> = [];
  let currentDate = new Date(startDate);
  let totalContributions = 0;
  let longestStreak = 0;
  let currentStreak = 0;
  let longestDry = 0;
  let currentDry = 0;
  let daysWithContributions = 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const count = contributionsData[dateStr] || 0;

    // Only count stats for days up to today
    const dateToCheck = new Date(currentDate);
    dateToCheck.setHours(0, 0, 0, 0);
    if (dateToCheck <= today) {
      totalContributions += count;

      if (count > 0) {
        daysWithContributions++;
        currentStreak++;
        longestStreak = Math.max(longestStreak, currentStreak);
        currentDry = 0;
      } else {
        currentDry++;
        longestDry = Math.max(longestDry, currentDry);
        currentStreak = 0;
      }
    }

    const isMonthStart = currentDate.getDate() === 1;
    const monthName = monthNames[currentDate.getMonth()];
    allDays.push({ date: new Date(currentDate), dateStr, count, isMonthStart, monthName });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Calculate total days (up to today for current year)
  const totalDays = selectedYear === new Date().getFullYear()
    ? Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
    : allDays.length;

  const contributionPercentage = totalDays > 0 ? ((daysWithContributions / totalDays) * 100).toFixed(1) : '0.0';

  // Organize into rows of 15 days each
  const DAYS_PER_ROW = 15;
  const rows: Array<Array<{ date: Date; dateStr: string; count: number; isMonthStart: boolean; monthName: string } | null>> = [];
  for (let i = 0; i < allDays.length; i += DAYS_PER_ROW) {
    const row: Array<{ date: Date; dateStr: string; count: number; isMonthStart: boolean; monthName: string } | null> = allDays.slice(i, i + DAYS_PER_ROW);
    // Fill last row with nulls to maintain alignment
    while (row.length < DAYS_PER_ROW) {
      row.push(null);
    }
    rows.push(row);
  }

  return (
    <>
      <Image
        src={currentGif}
        className="mx-auto"
        alt="t31k"
        width={120}
        height={120}
      />
      <h2 className={`text-2xl text-center ${pressStart.className} font-semibold mb-2 mt-4 text-dark dark:text-dark`}>
        Commit History
      </h2>
      <div className={`flex flex-col items-center ${formState.theme === 'dark' ? 'bg-[#0E0E10]' : 'bg-[#fffffc]'}`}>
        <div className="flex flex-col items-center gap-3">
          <div className={`year-selector ${pressStart.className} flex items-center justify-center`}>
            <button
              onClick={handlePrevYear}
              disabled={selectedYear === 2020}
              className="px-2 py-1 bg-gray-200"
            >
              &lt;
            </button>
            <span className="mx-4 text-lg text-dark w-[150px] text-center">
              {selectedYear}
            </span>
            <button
              onClick={handleNextYear}
              disabled={selectedYear === new Date().getFullYear()}
              className="px-2 py-1 bg-gray-200"
            >
              &gt;
            </button>
          </div>

          <div className={`${pressStart.className} capitalize text-xs mt-4 font-medium text-center px-4 max-w-md`}>
            {getYearLabel(selectedYear)}
          </div>

          <div className="flex flex-col gap-1 mt-4 px-4 mx-auto text-[10px] text-dark">
            <div className="text-left">
              <span className="text-gray-500">Total Commits:</span>
              <span className="ml-2 font-semibold">{totalContributions.toLocaleString()}</span>
            </div>
            <div className="text-left">
              <span className="text-gray-500">Active Days:</span>
              <span className="ml-2 font-semibold">{contributionPercentage}%</span>
            </div>
            <div className="text-left">
              <span className="text-gray-500">Longest Streak:</span>
              <span className="ml-2 font-semibold">{longestStreak} days</span>
            </div>
            <div className="text-left">
              <span className="text-gray-500">Longest Dry:</span>
              <span className="ml-2 font-semibold">{longestDry} days</span>
            </div>
          </div>

        </div>

        <div className={`flex flex-col items-center gap-1 px-4 mt-4 relative ${showMonthIndicators ? 'ml-12' : ''}`}>
          {showMonthIndicators && (
            <div className="absolute left-0 top-0 h-full flex flex-col justify-start" style={{ width: '40px' }}>
              {monthNames.map((month, idx) => (
                <div
                  key={month}
                  className="flex items-center justify-end pr-2"
                  style={{ height: `${100 / 12}%` }}
                >
                  <span className={`text-[9px] ${pressStart.className} text-dark font-bold whitespace-nowrap`}>
                    {month}
                  </span>
                </div>
              ))}
            </div>
          )}
          {rows.map((row, rowIndex) => {
            return (
            <div key={rowIndex} className="flex gap-1 relative">
              {row.map((day, dayIndex) => {
                if (day === null) {
                  // Transparent box for alignment
                  return (
                    <div
                      key={dayIndex}
                      className="relative w-4 h-4 md:w-6 md:h-6"
                      style={{
                        backgroundColor: 'transparent',
                      }}
                    ></div>
                  );
                }

                // Check if this day is in the future
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const dayDate = new Date(day.date);
                dayDate.setHours(0, 0, 0, 0);
                const isFutureDate = dayDate > today;

                const bgColor = isFutureDate ? '#f8fafc' : getColor(day.count);
                const currentMonth = day.date.getMonth();

                // Check horizontal boundaries (within row)
                const prevDay = row[dayIndex - 1];
                const nextDay = row[dayIndex + 1];
                const isFirstInRow = !prevDay || prevDay.date.getMonth() !== currentMonth;
                const isLastInRow = !nextDay || nextDay.date.getMonth() !== currentMonth;

                // Check vertical boundaries (across rows)
                const dayAbove = rowIndex > 0 ? rows[rowIndex - 1][dayIndex] : null;
                const dayBelow = rowIndex < rows.length - 1 ? rows[rowIndex + 1][dayIndex] : null;
                const isFirstRowOfMonth = !dayAbove || dayAbove.date.getMonth() !== currentMonth;
                const isLastRowOfMonth = !dayBelow || dayBelow.date.getMonth() !== currentMonth;

                const borderClasses = showMonthIndicators ? [
                  isFirstRowOfMonth ? 'border-t-2' : '',
                  isLastRowOfMonth ? 'border-b-2' : '',
                  isFirstInRow ? 'border-l-2' : '',
                  isLastInRow ? 'border-r-2' : '',
                  'border-gray-800'
                ].filter(Boolean).join(' ') : '';

                return (
                  <div key={dayIndex} className="relative">
                    <div
                      className={`w-4 h-4 md:w-6 md:h-6 ${borderClasses}`}
                      style={{ backgroundColor: bgColor }}
                      title={`${day.dateStr}: ${day.count} contributions`}
                    ></div>
                  </div>
                );
              })}
            </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HeatMap;
