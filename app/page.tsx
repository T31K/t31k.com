
import Emulator from "@/components/Emulator"
export default function page() {
  return (
    <>

      <div className="hidden">

        <div className="gba-screen rounded-3xl">
          <div className="h-[10%] flex justify-between px-3 pt-2">
            <div className="screen-bumper-top"></div>
            <div className="screen-bumper-top"></div>
          </div>
          <div className="h-[80%] flex justify-between px-6 py-2">
          <div className="h-full w-full bg-black rounded-lg screen" />
          </div>

          <div className="h-[10%] flex justify-between px-3 ">
            <div className="screen-bumper-bottom"></div>
            <div className="screen-bumper-bottom"></div>
          </div>
        </div>
          <br />
          <br />
        <div className="system-container" id="gbasp">
          <div className="screen-body">
            <div className="screen-bumper" id="bumper-ul"></div>
            <div className="screen-bumper" id="bumper-ur"></div>
            <div className="screen-bumper small-bumper" id="bumper-tm"></div>
            <div className="screen-bumper small-bumper" id="bumper-ll"></div>
            <div className="screen-bumper small-bumper" id="bumper-lr"></div>
            <div className="screen-border flex justify-center items-center">
              {/* Emulator Screen */}
x            </div>
          </div>
          <div className="swivel"></div>
          <div className="gamepad-body">
            <div className="power-light"></div>
            <div className="power-light"></div>

            <div className="pad-container dpad-container">
              <div className="d-pad"></div>
            </div>

            <div className="pad-container buttons-container">
              <div className="b-button"><span className="letter">B</span></div>
              <a href="#"><div className="a-button"><span className="letter">A</span></div></a>
            </div>

            <div className="pad-container power-container">
              <a href="#"><div className="b-button power-button"></div></a>
            </div>
            <div className="speaker-holder">
              {/* Speaker dots omitted for brevity */}
            </div>

            <div className="pad-container select-container">
              <div className="a-button select-button"></div>
            </div>

            <div className="pad-container start-container">
              <div className="a-button start-button"></div>
            </div>

            <div className="select-label">SELECT</div>
            <div className="start-label">START</div>
          </div>
        </div>


      </div>

       <div className="gameboy" id="gameboy-main-container">
    <div className="front-plate">
      <div className="front-plate-head">
        <div className="vertical-stripe"></div>
        <div className="vertical-stripe"></div>
        <div className="vertical-stripe"></div>

        <div className="vertical-gouge vertical-gouge-1"></div>
        <div className="vertical-gouge vertical-gouge-2"></div>

        <div className="on-off" id="on-button">
          <div className="spike spike-left"><div></div></div>
          <div className="spike spike-right"><div></div></div>
          <span>
            OFF
            <i></i>
            ON
          </span>
        </div>
      </div>

      <div className="screen-container">
        <div className="screen-headline">
          <span>DOT MATRIX WITH STEREO SOUND</span>
        </div>

        <div className="battery-light">
          <span>BATTERY</span>
        </div>
        <div className="screen relative">

          <Emulator  />
        </div>



      </div>

      <div className="logo"></div>

      <div id="controller">

        <div className="buttons-a-b">
          <div className="button-b button-key-j" id="controller_b"></div>

          <div className="button-a button-key-k" id="controller_a"></div>
        </div>

        <div className="start button-key-m" id="controller_start"><div></div></div>

        <div className="select button-key-n" id="controller_select"><div></div></div>

        <div className="cross-container">
          <div className="spike"><div></div></div>
          <div className="spike"><div></div></div>
          <div className="spike"><div></div></div>
          <div className="spike"><div></div></div>

          <div className="cross" id="controller_dpad">
            <div className="top-down">
              <div className="button-top button-key-w" id="controller_up">
                <div className="button-stripe"></div>
                <div className="button-stripe"></div>
                <div className="button-stripe"></div>
              </div>
              <div className="button-bottom button-key-s" id="controller_down">
                <div className="button-stripe"></div>
                <div className="button-stripe"></div>
                <div className="button-stripe"></div>
              </div>
            </div>

            <div className="left-right">
              <div className="button-left button-key-a" id="controller_left">
                <div className="button-stripe"></div>
                <div className="button-stripe"></div>
                <div className="button-stripe"></div>
              </div>
              <div className="button-right button-key-d" id="controller_right">
                <div className="button-stripe"></div>
                <div className="button-stripe"></div>
                <div className="button-stripe"></div>
              </div>
            </div>
            <div className="cross-middle-bumb"></div>
          </div>
        </div>

      </div>

      <div className="speaker">
        <div><div className="speaker-inner-shadow"></div></div>
        <div><div className="speaker-inner-shadow"></div></div>
        <div><div className="speaker-inner-shadow"></div></div>
        <div><div className="speaker-inner-shadow"></div></div>
        <div><div className="speaker-inner-shadow"></div></div>
        <div><div className="speaker-inner-shadow"></div></div>
      </div>

      <div className="phones" id="volume-switch">
        <div className="vertical-stripe"></div>
        <div className="vertical-stripe"></div>
        <div className="vertical-stripe"></div>
        <i></i>
        <span>PHONES</span>
      </div>

    </div>

    <div className="power-button"><div></div></div>
  </div>
    </>

  );
}
