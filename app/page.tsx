
import Emulator from "@/components/Emulator"
import { Press_Start_2P } from 'next/font/google'

const pressStart = Press_Start_2P({ weight: '400', subsets: ['latin-ext'] })
import { IconCaretLeftFilled, IconCaretRightFilled, IconCircleFilled } from '@tabler/icons-react';

const projects = [
  {
    title: "calorieasy",
    description: "Track calories with AI",
    revenue: "$1000",
    active: true
  },
  {
    title: "sidepod",
    description: "Spotify widget for macOS",
    revenue: "$0",
    active: false
  },
  {
    title: "resync",
    description: "Async meetings for your team",
    revenue: "$0",
    active: false
  },
  {
    title: "wardrobe ai pro",
    description: "Try on clothes with AI",
    revenue: "$0",
    active: false
  },
  {
    title: "harmonize",
    description: "A spotlight-like app for your music",
    revenue: "$300",
    active: true
  },
  {
    title: "docktopus",
    description: "A macOS dock replacement",
    revenue: "$0",
    active: false
  },
]
export default function page() {
  return (
    <>
    <h1 className={`text-6xl ${pressStart.className} font-semibold mb-4 !tracking-[-15px]`}>t31k</h1>
    <div className="blog-window w-full !font-mono" >
      <div className="top-menu">
        <div>
          <span className="red"></span>
          <span className="orange" ></span>
          <span className="green" ></span>
        </div>
        <div>
        </div>
      </div>
      <div className="inner">
        <h3 className="data-title mb-1">{"let name = 't31k';"}</h3>
        <h3 className="data-title mb-1">{"let location = 'singapore';"}</h3>
        <h3 className="data-title mb-1">{"let job = ["}</h3>
        <h3 className="data-title ml-4">{"  'indie hacker',"}</h3>
        <h3 className="data-title ml-4">{"  'software engineer',"}</h3>
        <h3 className="data-title ml-4">{"  'writer',"}</h3>
        <h3 className="data-title mt-1">{"  ];"}</h3>
      </div>
    </div>
    <h2 className={`text-2xl ${pressStart.className} font-semibold mb-4 mt-8`}>Projects</h2>

  {
    projects.map((project, key) => {
      return (
        <div className={`nes-container w-[80%] mx-auto with-title is-rounded bg- ${pressStart.className} !mt-4 relative`} key={key}>
          <p className="title capitalize">{project.title}</p>
          <div className="absolute top-[-10px] right-[-80px] scale-50">
            <a href="#" className="nes-badge !mr-5">
              <span className="is-dark">{project.revenue}</span>
            </a>
            <a href="#" className="nes-badge">
              <span className={`is-${project.active ? "success" : "error"} capitalize`}>{project.active ? "active" : "inactive"}</span>
            </a>
          </div>
          <p className="!text-[12px]"> {project.description}</p>
        </div>
        )
    })
  }

  <section className={`mt-12 ${pressStart.className}`}>
    <section className="message-left">
      <div className="nes-balloon from-left !py-1 !px-2">
        <p className="!text-[10px]">Turn on the switch</p>
      </div>
    </section>


    <div className="gameboy">
      <div className="switch"></div>
      <div className="base">
        <div className="line__top"></div>
        <div className="line__side__R"></div>
        <div className="line__side__L"></div>
        <div className="on__off" id="on-button">
          <div className="on__off__btm flex items-center justify-center">
            <IconCaretLeftFilled size={8}/>
            <p className="!m-0">OFF</p>
            <IconCircleFilled size={4} />
            <p className="!m-0">ON</p>
            <IconCaretRightFilled size={8}/>
          </div>
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
  </section>

    </>

  );
}
