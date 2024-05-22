import Spotify from "@/components/Spotify"
import Emulator from "@/components/Emulator"
import { Press_Start_2P } from 'next/font/google'
const pressStart = Press_Start_2P({ weight: '400', subsets: ['latin-ext'] })
import { IconCaretLeftFilled, IconCaretRightFilled, IconCircleFilled } from '@tabler/icons-react';
import { projects, articles } from '@/utils/raw'
import Image from 'next/image'

export default function page() {
  const currentTime = new Date().toLocaleString("en-US", { hour: 'numeric', hour12: true, timeZone: 'Asia/Singapore' }).toLowerCase();
  const currentHour = parseInt(new Date().toLocaleString("en-US", { hour: 'numeric', hour12: false, timeZone: 'Asia/Singapore' }), 10);

  return (
    <>
      <>
        {currentHour >= 22 ? (
          <>
          <div className="message-left block">
            <div className="nes-balloon from-left !py-1 !px-2">
              <p className={`!text-[10px] text-dark dark:text-dark ${pressStart.className}`}>{`It's ${currentTime} for Tim`}</p>
            </div>
          </div>
          <div className="justify-center flex-col items-center gap-y-6 flex">
            <Image src={'/mario_sleep.gif'} alt="t31k" width={100} height={100} />
            <h1 className={`text-6xl ${pressStart.className} font-semibold mb-4 !tracking-[-15px] text-dark dark:text-dark`}>t31k</h1>
          </div>
        </>
        ) : (
          <h1 className={`text-6xl ${pressStart.className} font-semibold mb-4 !tracking-[-15px] text-dark dark:text-dark`}>t31k</h1>
        )}
      </>


      <>
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
            <h3 className="data-title mb-1">
              <span className="text-let">let</span>
              <span>name</span>
              <span className="text-equal inline-block">=</span>
              <span className="text-string">{`'Tim'`}</span>
              <span className="!m-0">{`;`}</span>
            </h3>
            <h3 className="data-title mb-1">
              <span className="text-let">let</span>
              <span>location</span>
              <span className="text-equal inline-block">=</span>
              <span className="text-string">{`'singapore'`}</span>
              <span className="!m-0">{`;`}</span>
            </h3>
            <h3 className="data-title mb-1">
              <span className="text-let">let</span>
              <span>job</span>
              <span className="text-equal inline-block">=</span>
              <span className="text-string text-array">{"["}</span>
              <span className="text-string block !ml-3 mt-1">{"  'indie hacker',"}</span>
              <span className="text-string block !ml-3">{"  'software engineer',"}</span>
              <span className="text-string block !ml-3">{"  'writer ',"}</span>
              <span className="text-string text-array !ml-0">{"]"}</span>
              <span className="">{";"}</span>
            </h3>
          </div>
        </div>
      </>

      <>
        <h2 className={`text-2xl ${pressStart.className} font-semibold mb-6 mt-12 text-dark dark:text-dark`}>Projects</h2>
        {
          projects.map((project, key) => {
            return (
              <div className={`nes-container w-[80%] mx-auto with-title is-rounded bg- ${pressStart.className} !mt-4 relative`} key={key}>
                <p className="title capitalize text-dark dark:text-dark">{project.title}</p>
                <p className="!text-[12px] text-dark dark:text-dark"> {project.description}</p>

                <div className="flex justify-start gap-2">
                  <p className="!text-[10px] bg-[#222] text-white p-1">{project.revenue}</p>
                  <p className={`!text-[10px] p-1 ${project.active ? "bg-[#91CB41]" : "bg-[#E76E54]"}`}>{project.active ? "Active" : "Inactive"}</p>
                  <p className={`!text-[10px] p-1 ${project.active ? "block" : "hidden"}`}>
                  <a href={project.link} target="_blank" className="!text-[10px] !mb-4"> Link</a>
                  </p>
                </div>
              </div>
              )
          })
        }
        <h2 className={`text-2xl ${pressStart.className} font-semibold mb-6 mt-12 text-dark dark:text-dark`}>Articles</h2>
      </>

      <section className="lists w-[80%]">
        <ul className="nes-list is-disc">
          {
            articles.map((article, key) => {
              return (
                    <li key={key} className={`title capitalize my-5 ${pressStart.className}`}>
                      <a href={article.link} target="_blank"> {article.title}
                       {article.award && <i className="nes-icon trophy is-small !ml-2"></i>}
                      </a>
                    </li>

                )
            })
          }
        </ul>
      </section>

      <section className={`mt-12 ${pressStart.className}`}>
        <section className="message-left">
          <div className="nes-balloon from-left !py-1 !px-2">
            <p className="!text-[10px] text-dark dark:text-dark">Turn on the switch</p>
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

      <section className={`mt-24 ${pressStart.className} w-full`}>
        <Spotify />
      </section>
    </>
  );
}
