'use client';
import { useEffect, useState, useContext } from 'react';
import Loading from '@/components/loading';

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

const InputROM = ({ GbaContext, filePath, setScale, gameLoaded, setGameLoaded, gameIsLoading, setGameIsLoading }) => {
  const { play: playGba } = useContext(GbaContext);
  const [fileLoaded, setFileLoaded] = useState(false);

  useEffect(() => {
    const loadFile = async () => {
      try {
        setGameIsLoading(true);
        const fileContent = await getFileContent(filePath);
        playGba({ newRomBuffer: fileContent });
        setFileLoaded(true);
        setGameLoaded(true);
      } catch (error) {
        console.error(error);
      } finally {
        setGameIsLoading(false);
      }
    };

    const handleClick = async () => {
      if (gameLoaded) return;
      await loadFile();
      // Find the canvas element
      const canvasElement = document.querySelector('canvas');
      const gameboyMain = document.getElementById('gameboy-main');
      const batteryElement = document.querySelector('.battery');
      if (batteryElement) batteryElement.classList.add('active');
      // Set the style of the canvas element to position absolute
      if (canvasElement) {
        canvasElement.style.position = 'absolute';
        canvasElement.style.zIndex = '999';
        canvasElement.style.width = `${gameboyMain.offsetWidth}px`;
        canvasElement.style.height = `${gameboyMain.offsetHeight}px`;
      }
    };

    const bumperElement = document.getElementById('on-button');
    if (bumperElement) bumperElement.addEventListener('click', handleClick);

    return () => {
      if (bumperElement) {
        bumperElement.removeEventListener('click', handleClick);
      }
    };
  }, [filePath, setScale, playGba, gameLoaded, setGameIsLoading]);

  return null;
};

export default function Emulator() {
  const [reactGbaJsModule, setReactGbaJsModule] = useState();
  const [scale, setScale] = useState(1);
  const [gameLoaded, setGameLoaded] = useState(false);
  const [gameIsLoading, setGameIsLoading] = useState(false);

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
      {gameIsLoading && <Loading />}
      <InputROM
        GbaContext={reactGbaJsModule.GbaContext}
        filePath="/fire_red.gba"
        setScale={setScale}
        gameLoaded={gameLoaded}
        setGameLoaded={setGameLoaded}
        gameIsLoading={gameIsLoading}
        setGameIsLoading={setGameIsLoading}
      />
      <reactGbaJsModule.ReactGbaJs volume={1} />
    </reactGbaJsModule.GbaProvider>
  );
}
