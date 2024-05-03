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

    const screenBorderElement = document.querySelector('.screen-border');
    if (screenBorderElement) {
      const screenWidth = screenBorderElement.offsetWidth;
      const relativeWidth = screenWidth / 246; // Assuming 240px corresponds to 1
      setScale(relativeWidth);
    }

    const bumperElement = document.getElementById('bumper-ll');
    if (bumperElement) bumperElement.addEventListener('click', loadFile);

    return () => {
      if (bumperElement) {
        bumperElement.removeEventListener('click', loadFile);
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
        filePath="/test.gba"
        setScale={setScale}
      />
      <reactGbaJsModule.ReactGbaJs
        volume={1}
        scale={scale}
      />
    </reactGbaJsModule.GbaProvider>
  );
}
