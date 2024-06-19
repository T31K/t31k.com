'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { IconArrowNarrowDown } from '@tabler/icons-react';
import { newColors } from '@/utils/constants';

const HeatMap = () => {
  const [formState, setFormState] = useState({
    year: '2024',
    username: 't31k',
    theme: 'light',
    color_scheme: 'cello',
    day_labels: false,
    current_week_pointer: false,
  });
  const [contributionsData, setContributionsData] = useState([]);
  const [stats, setStats] = useState({ streak: 0, highest: 0, median: 0 });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const year = formState.year;
      const username = formState.username;
      const res = await axios.get(`https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`);
      setContributionsData(res.data);
    } catch (error) {
      if (error.code === 'ERR_BAD_REQUEST') {
        // toast("User doesn't exist. Try again!");
      }
    }
  };

  // const generateStats = (contributionsData) => {
  //   let highest = getHighest(contributionsData);
  //   let median = getMedian(contributionsData);
  //   let streak = getStreak(contributionsData);
  //   let total = getTotal(contributionsData);
  //   let mostActiveDay = getMostActiveDay(contributionsData);
  //   let missedDays = getMissedDays(contributionsData);
  //   let monthlyChart = processMonthlyChart(contributionsData);
  //   let weeklyBar = processWeeklyBarChart(contributionsData);
  //   let rank = generateRank(contributionsData);

  //   setStats({
  //     highest,
  //     median,
  //     streak,
  //     monthlyChart,
  //     total,
  //     rank,
  //     mostActiveDay,
  //     missedDays,
  //     weeklyBar,
  //   });
  // };

  const getColor = (activeColor, count) => {
    if (count === 0) return '#e2e8f0';
    if (count <= 4) return newColors[activeColor][200];
    if (count <= 10) return newColors[activeColor][400];
    if (count <= 20) return newColors[activeColor][600];
    return newColors[activeColor][800];
  };

  if (!contributionsData?.contributions) return null;

  const { color_scheme, theme, day_labels, current_week_pointer } = formState;

  const startOffsets = {
    0: 0, // Sunday
    1: 1, // Monday
    2: 2, // Tuesday
    3: 3, // Wednesday
    4: 4, // Thursday
    5: 5, // Friday
    6: 6, // Saturday
  };

  const firstDayOfWeek = new Date(contributionsData?.contributions[0]?.date).getDay();
  const emptySquares = startOffsets[firstDayOfWeek];
  const emptySquaresRender = Array.from({ length: emptySquares }, (_, index) => (
    <div
      key={`empty-${index}`}
      className="w-[20px] h-[20px] rounded-[7px]"
    ></div>
  ));
  const contributionSquaresRender = contributionsData?.contributions?.map((day, dayIndex) => {
    const color = getColor(color_scheme, day.count);

    const currentWeekNumber = Math.ceil(
      (new Date().getTime() - new Date(new Date().getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000)
    );

    const weekNumber = Math.floor((dayIndex + 1) / 7);
    const showArrow = false;

    return (
      <div
        key={dayIndex}
        className="relative"
      >
        <div
          style={{
            backgroundColor: color,
            width: '20px',
            height: '20px',
            borderRadius: '7px',
          }}
        ></div>
        {showArrow && current_week_pointer && (
          <IconArrowNarrowDown
            className={`absolute left-1/2 translate-x-[-50%] -top-[23px]`}
            size={18}
            strokeWidth={3}
            color={theme === 'dark' ? '#fff' : '#000'}
          />
        )}
      </div>
    );
  });

  const missingDotsRender = Array.from({ length: 4 }, (_, index) => (
    <div
      key={`missing-${index}`}
      style={{
        backgroundColor: 'transparent',
        width: '20px',
        height: '20px',
        borderRadius: '7px',
      }}
    ></div>
  ));

  const allSquares = [...emptySquaresRender, ...contributionSquaresRender, ...missingDotsRender].slice(1, 106);

  const rows = [];
  for (let i = 0; i < allSquares.length; i += 7) {
    const weekSquares = allSquares.slice(i, i + 7);
    rows.push(
      <div
        key={`week-${i}`}
        className="flex flex-col gap-2"
      >
        {weekSquares}
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col gap-2 h-screen justify-center items-center  ${
        theme == 'dark' ? 'bg-[#0E0E10]' : 'bg-[#fffffc]'
      }`}
    >
      <div className={`flex `}>
        <div className={`flex flex-col gap-2 mr-3 ${day_labels ? 'opacity-100' : 'opacity-0'}`}>
          <div className={`h-[20px] ${theme == 'dark' ? 'text-white' : 'text-slate-800'} font-mono font-semibold`}>
            S
          </div>
          <div className={`h-[20px] ${theme == 'dark' ? 'text-white' : 'text-slate-800'} font-mono font-semibold`}>
            M
          </div>
          <div className={`h-[20px] ${theme == 'dark' ? 'text-white' : 'text-slate-800'} font-mono font-semibold`}>
            T
          </div>
          <div className={`h-[20px] ${theme == 'dark' ? 'text-white' : 'text-slate-800'} font-mono font-semibold`}>
            W
          </div>
          <div className={`h-[20px] ${theme == 'dark' ? 'text-white' : 'text-slate-800'} font-mono font-semibold`}>
            T
          </div>
          <div className={`h-[20px] ${theme == 'dark' ? 'text-white' : 'text-slate-800'} font-mono font-semibold`}>
            F
          </div>
          <div className={`h-[20px] ${theme == 'dark' ? 'text-white' : 'text-slate-800'} font-mono font-semibold`}>
            S
          </div>
        </div>

        <div className="flex gap-2 h-full justify-center items-center">{rows}</div>
      </div>
    </div>
  );
};

export default HeatMap;
