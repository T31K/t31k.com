'use client';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

function Spotify() {
  const [currentName, setCurrentName] = useState('Aerodynamic');
  const [currentArtist, setCurrentArtist] = useState('Daft Punk');
  const [currentAlbum, setCurrentAlbum] = useState(
    'https://upload.wikimedia.org/wikipedia/en/2/27/Daft_Punk_-_Discovery.png'
  );
  const [likedSongs, setLikedSongs] = useState([]);

  useEffect(() => {
    async function getCurrentSong() {
      try {
        const { data } = await axios.post(process.env.NEXT_PUBLIC_SPOTIFY_API_URL, {
          hash: process.env.NEXT_PUBLIC_SPOTIFY_HASH,
        });
        console.log(data);

        if (data.current !== '') {
          setCurrentName(data?.current?.item?.name);
          setCurrentArtist(data?.current?.item?.album?.artists[0]?.name);
          setCurrentAlbum(data?.current?.item?.album?.images[0]?.url);
          console.log(data?.current?.item?.album?.images[0]?.url);
        }

        if (data.likedSongs !== '') {
          setLikedSongs(data?.likedSongs?.items);
        }
      } catch (error) {
        console.error('Error fetching current song:', error);
      }
    }

    getCurrentSong();
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center flex-col gap-2">
        <Image
          src="/spotify.png"
          alt="Spotify Logo"
          className="mb-3"
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
        <p className="text-center whitespace-nowrap !mt-6 text-xl">{currentName?.slice(0, 16)}</p>
        <p className="text-center whitespace-nowrap text-md mt-[-15px]">{currentArtist}</p>
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
      <div
        className="lists"
        style={{ padding: '20px' }}
      >
        <div className="flex items-center justify-center mb-5">
          <i className="nes-icon is-medium heart"></i>
          <p style={{ textAlign: 'center', fontSize: '20px', margin: 0 }}>Top tracks this week</p>
        </div>
        <ul
          className="nes-list is-circle"
          style={{ marginTop: '15px' }}
        >
          {likedSongs?.map((likedSong, key) => (
            <>
              <li
                key={key}
                className="whitespace-nowrap"
                style={{ margin: '5px 0' }}
              >
                {likedSong.track.artists[0].name} - {likedSong.track.name?.split('(')[0].trim()}
              </li>
            </>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Spotify;
