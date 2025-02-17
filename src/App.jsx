import "./index.css";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";
import { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Music from "../public/world.mp3"; // Your music file
import CircularText from "./CircularText";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [showCanvas, setShowCanvas] = useState(false);
  const headingref = useRef(null);
  const growingSpan = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      smoothMobile: true,
      lerp: 0.3,
    });

    return () => {
      locomotiveScroll.destroy();
    };
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          gsap.set(growingSpan.current, {
            top: e.clientY,
            left: e.clientX,
          });

          gsap.to("body", {
            color: "#000",
            backgroundColor: "#fd2c2a",
            duration: 1.2,
            ease: "power2.inOut",
          });

          gsap.to(growingSpan.current, {
            scale: 1000,
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingSpan.current, {
                scale: 0,
                clearProps: "all",
              });
            },
          });
        } else {
          gsap.to("body", {
            color: "#fff",
            backgroundColor: "#000",
            duration: 1.2,
            ease: "power2.inOut",
          });
        }

        return !prevShowCanvas;
      });
    };

    const headingElement = headingref.current;
    headingElement.addEventListener("click", handleClick);

    return () => headingElement.removeEventListener("click", handleClick);
  }, []);

  const page1GSAPAnimation = () => {
    const tl = gsap.timeline();

    useGSAP(() => {
      tl.from(".brand", {
        y: -50,
        opacity: 0,
        duration: 1,
        delay: 0.25,
      });
      tl.from(".links a", {
        y: -50,
        opacity: 0,
        duration: 0.5,
        stagger: 0.25,
      });
      tl.from(".text h3", {
        x: -200,
        opacity: 0,
        duration: 0.25,
      }, "textcontainer");
      tl.from(".text p", {
        x: 200,
        opacity: 0,
        duration: 0.25,
      }, "textcontainer");

      tl.from(".text a", {
        y: -20,
        opacity: 0,
        duration: 0.5,
      });

      tl.from(".heading h1", {
        y: 10,
        opacity: 0,
        color: "#fd2c2a",
        // borderRadius: 15,
        // padding: "5, 10",
        duration: 0.9,
        scale: 300,
      });
    });
  };

  page1GSAPAnimation();

  return (
    <div ref={scrollRef} data-scroll-container className="overflow-hidden">
      <span
        ref={growingSpan}
        className="growing rounded-full block fixed top-[-20px] left-[-20px] w-5 h-5"
      ></span>
      <div className="w-full relative min-h-screen">
        {showCanvas &&
          data[0].map((canvasdets, index) => <Canvas details={canvasdets} />)}
        <div className="w-full relative z-[1] h-screen">
          <nav className="w-full px-4 py-4 flex justify-between z-50">
            <div className="brand text-2xl font-semibold">Thirtysixstudios</div>
            <div className="links flex gap-10">
              {[
                "What we do",
                "Who we are",
                "How we give back",
                "Talk to us",
              ].map((link, index) => (
                <a
                  key={index}
                  href={`#${link.toLowerCase()}`}
                  className="text-md hover:text-gray-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </nav>
          <div className="textcontainer mt-12 w-full px-[20%]">
            <div className="text">
              <h3 className="text-4xl leading-[1.2]">
                At Thirtysixstudio, we build immersive digital experiences for
                brands with a purpose.
              </h3>
              <p className="text-lg w-[80%] mt-7 font-normal">
                We are a team of designers, developers, and strategists who are
                passionate about creating digital experiences that are both
                beautiful and functional.
              </p>
              <a className="text-md mt-7 inline-block">scroll</a>
            </div>
          </div>
          <div className="heading w-full absolute bottom-0 left-0 cursor-pointer">
            <h1
              ref={headingref}
              className="text-3xl sm:text-[12vw] font-normal tracking-tight leading-none pl-5"
            >
              Thirtysixstudios
            </h1>
            {/* Conditionally render the audio element */}
            {showCanvas && (
              <audio src={Music} autoPlay loop />
            )}
          </div>
        </div>
      </div>
      <div className="w-full relative h-screen mt-32 px-10">
        {showCanvas &&
          data[1].map((canvasdets, index) => <Canvas details={canvasdets} />)}
        <h1 className="text-8xl tracking-tighter">about the brand</h1>
        <p className="text-4xl leading-[1.8] w-[80%] mt-10 ml-28 font-light">
          We are a team of designers, developers, and strategists who are
          passionate about creating digital experiences that are both beautiful
          and functional.
        </p>
        <p className="text-4xl leading-[1.8] w-[80%] mt-10 ml-56 font-light">
          We are a team of designers, developers, and strategists who are
          passionate about creating digital experiences that are both beautiful
          and functional.
        </p>
      </div>
    </div>
  );
}

export default App;
