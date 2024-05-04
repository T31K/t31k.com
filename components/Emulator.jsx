'use client';
import { useEffect, useState, useContext } from 'react';

const getFileContent = async (filePath) => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error('Failed to fetch file');
    }
    const buffer = await response.arrayBuffer();
    return new Uint8Array(buffer);
  } catch (error) {
    throw new Error('Failed to load ROM file: ' + error.message);
  }
};

const InputROM = ({ GbaContext, filePath, setScale }) => {
  const { play: playGba } = useContext(GbaContext);
  const [fileLoaded, setFileLoaded] = useState(false);

  useEffect(() => {
    const loadFile = async () => {
      try {
        const fileContent = await getFileContent(filePath);
        playGba({ newRomBuffer: fileContent });
        setFileLoaded(true);
      } catch (error) {
        console.error(error);
      }
    };

    const handleClick = async () => {
      await loadFile();

      // Find the canvas element
      const canvasElement = document.querySelector('canvas');
      const screenBorderElement = document.querySelector('.screen.relative');
      const gameboyMain = document.getElementById('gameboy-main-container');
      if (gameboyMain) gameboyMain.classList.add('power-on');
      // Set the style of the canvas element to position absolute
      if (canvasElement) {
        canvasElement.style.position = 'absolute';
        canvasElement.style.zIndex = '999';
        canvasElement.style.width = `${screenBorderElement.offsetWidth}px`;
        canvasElement.style.height = `${screenBorderElement.offsetHeight}px`;
      }
    };

    const bumperElement = document.getElementById('on-button');
    if (bumperElement) bumperElement.addEventListener('click', handleClick);

    return () => {
      if (bumperElement) {
        bumperElement.removeEventListener('click', handleClick);
      }
    };
  }, [filePath, setScale, playGba]);

  return null;
};

export default function Emulator() {
  const [reactGbaJsModule, setReactGbaJsModule] = useState();
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const importModule = async () => {
      const { default: ReactGbaJs, GbaContext, GbaProvider } = await import('react-gbajs');

      setReactGbaJsModule({ ReactGbaJs, GbaContext, GbaProvider });
    };

    importModule();
  }, []);

  if (reactGbaJsModule === undefined) {
    return <p>Loading ReactGbaJs</p>;
  }

  return (
    <reactGbaJsModule.GbaProvider>
      <InputROM
        GbaContext={reactGbaJsModule.GbaContext}
        filePath="/fire_red.gba"
        setScale={setScale}
      />
      <reactGbaJsModule.ReactGbaJs volume={1} />
    </reactGbaJsModule.GbaProvider>
  );
}
