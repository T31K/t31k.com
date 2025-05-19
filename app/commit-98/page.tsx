import React from 'react';
// add some changes

function page() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex mb-4">
        <div className="flex shift-command mr-4 gap-x-1">
          <kbd className=" font-mono px-4 py-1 text-xl font-bold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
            ⇧
          </kbd>
          <kbd className=" font-mono px-4 py-1 text-xl font-bold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
            ⌘
          </kbd>
        </div>
        <kbd className="return-key font-mono px-2 py-1 flex justify-center items-center text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
          Return
        </kbd>
      </div>
      <img
        alt="test"
        src="/commit-98.png"
        className="max-w-[480px]"
      />
      <a
        href="https://github.com/T31K/commit-98/raw/main/public/build/commit-98_0.0.1_universal.dmg"
        download
        className="text-white font-mono bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-full font-semibold text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Download Commit-98 (Mac)
      </a>
    </div>
  );
}

export default page;
