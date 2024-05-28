'use client';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ImagePixelated, ElementPixelated } from 'react-pixelate';

function Spotify() {
  const [currentName, setCurrentName] = useState('retrieving data...');
  const [currentArtist, setCurrentArtist] = useState('retrieving data...');
  const [currentAlbum, setCurrentAlbum] = useState('/placeholder.webp');
  const [likedSongs, setLikedSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    async function getCurrentSong() {
      try {
        const { data } = await axios.post(process.env.NEXT_PUBLIC_SPOTIFY_API_URL, {
          hash: process.env.NEXT_PUBLIC_SPOTIFY_HASH,
        });

        if (data.current == '') {
          setIsPlaying(false);
        } else {
          let { current, likedSongs } = data;
          setCurrentName(current.item?.name);
          setCurrentArtist(current.item?.album?.artists[0]?.name);
          setCurrentAlbum(current.item?.album?.images[0]?.url);
          setLikedSongs(likedSongs?.items);
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
          src="/mario_dance.gif"
          alt="Spotify Logo"
          width={150}
          height={150}
        />
        <p className="text-center whitespace-nowrap mt-4 text-2xl ml-2 text-dark dark:text-dark">Now Playing</p>
      </div>
      {isPlaying ? (
        <>
          <div className="nes-container is-dark member-card !w-[80%] flex items-center flex-col justify-center relative">
            <ImagePixelated
              src={currentAlbum}
              width={200}
              height={200}
              fillTransparencyColor={'grey'}
            />
            <Image
              src="/spotify.png"
              alt="Spotify Logo"
              className="absolute"
              style={{ top: '10px', right: '10px' }}
              width={45}
              height={45}
            />
            <p
              className="text-center whitespace-nowrap !mt-6 text-xl"
              style={{ marginTop: '25px' }}
            >
              {currentName?.split('(')[0].trim()}
            </p>
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
            className="lists w-[80%] mx-auto text-dark dark:text-dark"
            style={{ padding: '20px' }}
          >
            <div className="flex flex-col items-center justify-center mb-5">
              <i className="nes-icon is-large heart"></i>
              <h2 style={{ textAlign: 'center', fontSize: ' 1.5rem;', margin: '0' }}>
                Top tracks <br /> this week
              </h2>
            </div>
            <ul
              className="nes-list is-circle"
              style={{ marginTop: '35px' }}
            >
              {likedSongs?.map((likedSong, key) => (
                <>
                  <li
                    key={key}
                    className="whitespace-nowrap"
                    style={{ margin: '20px 0' }}
                  >
                    <p className="!m-0 text-xl">{likedSong.track.name?.split('(')[0].trim()}</p>
                    <p className="!m-0  italic">{likedSong.track.artists[0].name}</p>
                  </li>
                </>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div className="nes-container is-dark member-card !w-[80%] flex items-center flex-col justify-center relative">
          <div className="flex flex-col justify-center items-center">
            <i className="snes-jp-logo is-large"></i>
            <p className="text-center mt-4">
              Tim is <em>surprisingly</em> <br />
              not listening to any music
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Spotify;
