'use client';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

function Spotify() {
  const [currentName, setCurrentName] = useState("King's Highway");
  const [currentArtist, setCurrentArtist] = useState('James Bay');
  const [currentAlbum, setCurrentAlbum] = useState('https://i.scdn.co/image/ab67616d0000b273b9c53cbae54409327870c847');

  useEffect(() => {
    async function getCurrentSong() {
      try {
        const { data } = await axios.post(NEXT_PUBLIC_SPOTIFY_API_URL);
        console.log(data);

        if (data !== '') {
          setCurrentName(data?.item?.name);
          setCurrentArtist(data?.item?.album?.artists[0]?.name);
          setCurrentAlbum(data?.item?.album?.images[0]?.url);
          console.log(data?.item?.album?.images[0]?.url);
        }
      } catch (error) {
        console.error('Error fetching current song:', error);
      }
    }

    getCurrentSong();
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center flex-col">
        <Image
          src="/spotify.png"
          alt="Spotify Logo"
          width={45}
          height={45}
        />
        <p className="text-center whitespace-nowrap mt-4 text-2xl ml-2">Now Playing</p>
      </div>
      <div className="nes-container is-dark member-card !w-[80%] flex items-center flex-col justify-center">
        <Image
          src={currentAlbum}
          alt="We Sing, We Dance, We Steal Things"
          width={200}
          className="mb-6"
          height={200}
        />
        <p className="text-center whitespace-nowrap !mt-6 text-2xl">{currentName?.slice(0, 16)}</p>
        <p className="text-center whitespace-nowrap text-lg mt-[-15px]">{currentArtist}</p>
        <div className="flex justify-center items-center gap-4 ">
          <Image
            src="/prev.webp"
            className="invert"
            alt="Skip"
            width={35}
            height={35}
          />
          <Image
            src="/play_btn.webp"
            alt="Play"
            width={75}
            height={75}
          />
          <Image
            src="/next.webp"
            className="!invert rotate-180"
            alt="Skip"
            width={35}
            height={35}
          />
        </div>
      </div>
    </div>
  );
}

export default Spotify;
