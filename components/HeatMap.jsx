'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { newColors } from '@/utils/constants';

const HeatMap = () => {
  const [formState, setFormState] = useState({
    year: '2024',
    username: 't31k',
    theme: 'light',
    color_scheme: 'cello',
  });
  const [contributionsData, setContributionsData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const year = formState.year;
      const username = formState.username;
      const res = await axios.get(`https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`);
      setContributionsData(aggregateData(res.data.contributions));
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  // Aggregates every 7 days of contributions into one
  const aggregateData = (data) => {
    return data.reduce((acc, curr, index) => {
      let week = Math.floor(index / 7);
      if (!acc[week]) {
        acc[week] = { count: 0 };
      }
      acc[week].count += curr.count;
      return acc;
    }, []);
  };

  const getColor = (count) => {
    const { color_scheme } = formState;
    if (count === 0) return '#e2e8f0';
    if (count <= 28) return newColors[color_scheme][200];
    if (count <= 70) return newColors[color_scheme][400];
    if (count <= 140) return newColors[color_scheme][600];
    return newColors[color_scheme][800];
  };

  if (!contributionsData.length) return null;

  // Calculating the number of columns required (52 weeks / 4 weeks per column)
  const columnsCount = Math.ceil(52 / 4);

  // Creating columns with vertical grouping
  const columns = [];
  for (let col = 0; col < columnsCount; col++) {
    const columnSquares = [];
    for (let row = 0; row < 4; row++) {
      const weekIndex = col * 4 + row;
      const weekData = contributionsData[weekIndex] || { count: 0 }; // Use default count if no data available
      columnSquares.push(
        <div
          style={{
            backgroundColor: getColor(weekData.count),
            width: '20px',
            height: '20px',
            border: '7px',
            margin: '1px',
          }}
        ></div>
      );
    }
    columns.push(
      <div
        key={col}
        className="flex flex-col"
      >
        {columnSquares}
      </div>
    );
  }

  return (
    <div
      className={`flex flex-row h-screen justify-center items-center ${
        formState.theme === 'dark' ? 'bg-[#0E0E10]' : 'bg-[#fffffc]'
      }`}
    >
      {columns}
    </div>
  );
};

export default HeatMap;
