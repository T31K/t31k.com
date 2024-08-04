import { useRef } from 'react';

const TurnTable = () => {
  const audioRef = useRef(null);

  const handleVolumeChange = (event) => {
    if (audioRef.current) {
      audioRef.current.volume = event.target.value;
    }
  };

  const playMusic = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  return (
    <>
      <p className="text-center whitespace-nowrap mt-4 text-2xl ml-2 text-dark dark:text-dark">{'Vinyl Collection'}</p>
      <div className="vinyl-jacket ">
        <div className="vinyl-wrapper">
          <div className="vinyl-record"></div>
        </div>
      </div>

      <div className="record-player relative">
        <section
          className="message-left"
          style={{ zIndex: 50, position: 'absolute', right: -50, top: -20 }}
        >
          <div className="nes-balloon from-left !py-1 !px-2">
            <p className="!text-[10px] text-dark dark:text-dark">Drop the needle</p>
          </div>
        </section>
        <input
          type="checkbox"
          id="headshell"
          onClick={playMusic}
        />
        <label
          className="headshell"
          htmlFor="headshell"
        ></label>
        <audio
          id="player"
          ref={audioRef}
        >
          <source
            src="/hooked.mp3"
            type="audio/mpeg"
          />
        </audio>
        <input
          type="range"
          max="1"
          min="0"
          step="0.1"
          id="volume-control"
          onChange={handleVolumeChange}
        />
        <div className="plinth"></div>
        <div className="platter"></div>
        <div className="vinyl"></div>
        <div className="top-circle"></div>
      </div>
    </>
  );
};

export default TurnTable;
