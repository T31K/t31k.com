
import Emulator from "@/components/Emulator"
export default function page() {

  return (
      <div className="prose dark:prose-invert">

        <div className="system-container" id="gbasp">
          <div className="screen-body">
            <div className="screen-bumper" id="bumper-ul"></div>
            <div className="screen-bumper" id="bumper-ur"></div>
            <div className="screen-bumper small-bumper" id="bumper-tm"></div>
            <div className="screen-bumper small-bumper" id="bumper-ll"></div>
            <div className="screen-bumper small-bumper" id="bumper-lr"></div>
            <div className="screen-border flex justify-center items-center">
              {/* Emulator Screen */}
              <Emulator />
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
  );
}
