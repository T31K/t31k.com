
import Emulator from "@/components/Emulator"
export default function page() {
  return (
    <>


<h1 className="text-7xl font-mono font-semibold">T31K</h1>
<div className="gameboy mt-12">
  <div className="switch"></div>
  <div className="base">
    <div className="line__top"></div>
    <div className="line__side__R"></div>
    <div className="line__side__L"></div>
    <div className="on__off" id="on-button">
      <div className="on__off__btm">◀OFF●ON▶</div>
      <div className="on__off__line"></div>
      <div className="on__off__line"></div>
      <div className="on__off__line"></div>
    </div>
    <div className="display">

      <div className="display__line">
        <div className="display__line__l"></div>
        <div className="display__line__l"></div>
      </div>

      <div className="display__top">DOT MATRIX WITH STEREO SOUND</div>

      <div className="battery"></div>

      <div className="display__inner relative" id="gameboy-main">
      <Emulator />
      </div>
    </div>


    <div className="left__key">

      <div className="left__key__tate"></div>
      <div className="left__key__yoko"></div>
      <div className="left__key__tate__inner">
        <div className="left__key__tate__inner__grips"></div>
        <div className="left__key__tate__inner__grips"></div>
        <div className="left__key__tate__inner__grips"></div>
        <div className="left__key__tate__inner__grips"></div>
        <div className="left__key__tate__inner__grips"></div>
        <div className="left__key__tate__inner__grips"></div>
        <div className="left__key__tate__inner__grips"></div>
        <div className="left__key__tate__inner__grips"></div>
        <div className="left__key__tate__inner__grips"></div>
      </div>
      <div className="left__key__yoko__inner">
        <div className="left__key__yoko__inner__grips"></div>
        <div className="left__key__yoko__inner__grips"></div>
        <div className="left__key__yoko__inner__grips"></div>
        <div className="left__key__yoko__inner__grips"></div>
        <div className="left__key__yoko__inner__grips"></div>
        <div className="left__key__yoko__inner__grips"></div>
        <div className="left__key__yoko__inner__grips"></div>
        <div className="left__key__yoko__inner__grips"></div>
        <div className="left__key__yoko__inner__grips"></div>
      </div>
      <div className="left__key__center">
        <div className="left__key__center__cir"></div>
      </div>
    </div>

    <div className="right__key">
      <div className="right__key__btn">
        <div className="right__key__btn__R"></div>
        <div className="right__key__btn__L"></div>
      </div>
      <div className="right__key__label">
        <div className="b">B</div>
        <div className="a">A</div>
      </div>

    </div>

    <div className="selectStart">
      <div className="selectStart__slect">
        <div className="selectStart__btn">
          <div className="selectStart__btn__inner"></div>
        </div>
        <div className="select">SELECT</div>
      </div>
      <div className="selectStart__start">
        <div className="selectStart__btn">
          <div className="selectStart__btn__inner"></div>
        </div>
        <div className="start">START</div>
      </div>
    </div>

    <div className="speaker">
      <div className="speaker__Light"></div>
      <div className="speaker__line"></div>
      <div className="speaker__line"></div>
      <div className="speaker__line"></div>
      <div className="speaker__line"></div>
      <div className="speaker__line"></div>
      <div className="speaker__line"></div>

    </div>

    <div className="phones">
      <div className="phones__top">ΩPHONES</div>
      <div className="phones__line">
        <div className="phones__line__inner"></div>
        <div className="phones__line__inner"></div>
      </div>

    </div>

  </div>
</div>
    </>

  );
}
