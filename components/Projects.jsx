'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Press_Start_2P } from 'next/font/google';
const pressStart = Press_Start_2P({ weight: '400', subsets: ['latin-ext'] });

import { projects } from '@/utils/raw';

function Projects() {
  const getBadgeColor = (status) => {
    if (status === 'active') {
      return 'bg-green-400';
    } else if (status === 'inactive') {
      return 'bg-red-400';
    } else if (status === 'building') {
      return 'bg-yellow-400';
    }
  };

  const [selectedYear, setSelectedYear] = useState(2024);
  return (
    <>
      <h2 className={`text-2xl ${pressStart.className} font-semibold mb-6 mt-12 text-dark dark:text-dark`}>Projects</h2>
      <div className="flex mb-4">
        <h2
          className={`text-xl ${pressStart.className} font-semibold text-dark dark:text-dark !mx-2 ${
            selectedYear == 2023 && 'underline'
          } !italic`}
          onClick={() => setSelectedYear(2023)}
        >
          2023
        </h2>
        <h2
          className={`text-xl ${pressStart.className} font-semibold text-dark dark:text-dark !mx-2 ${
            selectedYear == 2024 && 'underline'
          } !italic`}
          onClick={() => setSelectedYear(2024)}
        >
          2024
        </h2>
      </div>
      {projects[selectedYear].map((project, key) => {
        return (
          <div
            className={`nes-container w-[80%] mx-auto with-title is-rounded bg- ${pressStart.className} !mt-4 relative`}
            key={key}
          >
            <p className="title capitalize text-dark dark:text-dark">{project.title}</p>
            <p className="!text-[12px] text-dark dark:text-dark"> {project.description}</p>

            <div className="flex justify-start gap-2">
              <p className="!text-[10px] bg-[#222] text-white p-1">{project.revenue}</p>
              <p className={`!text-[10px] capitalize p-1 ${getBadgeColor(project.status)}`}>{project.status}</p>
              <p className={`!text-[10px] p-1 ${project.link ? 'block' : 'hidden'}`}>
                <a
                  href={project.link}
                  target="_blank"
                  className="!text-[10px] !mb-4"
                >
                  {' '}
                  Link
                </a>
              </p>
            </div>
          </div>
        );
      })}
      <h2 className={`text-2xl ${pressStart.className} font-semibold mb-6 mt-12 text-dark dark:text-dark`}>Articles</h2>
    </>
  );
}

export default Projects;
