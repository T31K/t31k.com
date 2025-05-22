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
import { projects } from '@/utils/raw';

// Define a Project type based on your data structure
interface Project {
  title: string;
  description: string;
  status: 'active' | 'inactive' | 'building'; // Adjust as per your status options
  revenue?: string;
  lfg?: boolean;
  link?: string;
}

function Projects() {
  // Function to get badge colors based on the project status
  const getBadgeColor = (status: 'active' | 'inactive' | 'building') => {
    switch (status) {
      case 'active':
        return 'bg-green-400';
      case 'inactive':
        return 'bg-red-400';
      case 'building':
        return 'bg-yellow-400';
      default:
        return '';
    }
  };

  const [selectedYear, setSelectedYear] = useState<number>(2025);

  return (
    <>
      <h2 className={`text-2xl ${pressStart.className} font-semibold  mt-12 text-dark dark:text-dark`}>Projects</h2>
      <div className={`year-selector my-4 ${pressStart.className} mb-6 flex gap-x-8 items-center justify-center`}>
        <button
          onClick={() =>
            setSelectedYear((prevYear) => {
              const newYear = prevYear - 1;
              return newYear >= 2023 ? newYear : prevYear;
            })
          }
          className="px-2 py-1 bg-gray-200"
        >
          &lt;
        </button>
        <button
          disabled={selectedYear === 2023}
          className={`px-4 py-2 mx-1 bg-blue-300 text-dark`}
        >
          {selectedYear}
        </button>
        <button
          onClick={() =>
            setSelectedYear((prevYear) => {
              const newYear = prevYear + 1;
              return newYear <= 2025 ? newYear : prevYear;
            })
          }
          disabled={selectedYear === 2025}
          className="px-2 py-1 bg-gray-200"
        >
          &gt;
        </button>
      </div>

      {/* Render projects for the selected year */}
      {projects[selectedYear as keyof typeof projects]?.map((project: any, index: number) => (
        <div
          className={`nes-container w-[80%] ${project.lfg && 'rainbow'} mx-auto with-title is-rounded ${
            pressStart.className
          } !mt-4 relative`}
          key={index}
        >
          <p className={`title capitalize text-dark dark:text-dark ${project.lfg && 'text-rainbow !bg-[#222]'}`}>
            {project.title}
          </p>
          <p className="!text-[12px] text-dark dark:text-dark">{project.description}</p>

          <div className="flex justify-start gap-2">
            {project.revenue && (
              <p className={`!text-[10px] bg-[#222] text-white p-1 ${project.lfg ? 'rainbow !text-gray-600' : ''}`}>
                {project.revenue}
              </p>
            )}
            <p className={`!text-[10px] capitalize p-1 ${getBadgeColor(project.status)}`}>{project.status}</p>
            {project.link && (
              <p className="!text-[10px] p-1">
                <a
                  href={project.link}
                  target="_blank"
                  className="!text-[10px] !mb-4"
                >
                  Link
                </a>
              </p>
            )}
          </div>
        </div>
      ))}

      <h2 className={`text-2xl ${pressStart.className} font-semibold mb-6 mt-12 text-dark dark:text-dark`}>Articles</h2>
    </>
  );
}

export default Projects;
