"use client";

import Image from "next/image";
import { IconType } from "react-icons";
import {
  FaReact, FaDocker, FaNodeJs, FaGithub,
  FaTwitter, FaLinkedin, FaInstagram, FaGoogle, FaApple
} from "react-icons/fa";
import {
  SiNextdotjs, SiVercel, SiRedux, SiTypescript, SiFacebook
} from "react-icons/si";

interface IconConfig {
  Icon?: IconType | null;
  color?: string;
  img?: string;
}


const iconConfigs: IconConfig[] = [
  { Icon: FaReact, color: "#61DAFB" },
  { Icon: FaDocker, color: "#2496ED" },
  { Icon: FaNodeJs, color: "#339933" },
  { Icon: SiNextdotjs, color: "#000000" },
  { Icon: SiVercel, color: "#000000" },
  { Icon: SiRedux, color: "#764ABC" },
  { Icon: SiTypescript, color: "#3178C6" },
  { Icon: FaGithub, color: "#181717" },
  { Icon: FaTwitter, color: "#1DA1F2" },
  { Icon: FaLinkedin, color: "#0077B5" },
  { Icon: FaInstagram, color: "#E1306C" },
  { Icon: FaGoogle, color: "#DB4437" },
  { Icon: FaApple, color: "#000000" },
  { Icon: SiFacebook, color: "#1877F2" },
];

export default function HeroIcons() {
  const orbitCount = 3;
  const orbitGap = 8; 
  const iconsPerOrbit = Math.ceil(iconConfigs.length / orbitCount);

  return (
    <section>
        <div className="relative translate-x-[25%] flex items-center justify-center">
          {/* Center Circle */}
          <div className="z-20 w-24 h-24 rounded-full bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 flex items-center justify-center">
            <FaReact className="w-12 h-12 text-blue-400 animate-spin" style={{ animationDuration: '10s' }} />
          </div>

          {/* Orbits */}
          {[...Array(orbitCount)].map((_, orbitIdx) => {
            const size = `${12 + orbitGap * (orbitIdx + 1)}rem`;
            const duration = 15 + orbitIdx * 5;

            return (
              <div
                key={orbitIdx}
                className="absolute rounded-full border border-dashed border-gray-300 dark:border-gray-700 animate-spin-slow"
                style={{
                  width: size,
                  height: size,
                  "--duration": `${duration}s`
                } as React.CSSProperties}
              >
                {iconConfigs
                  .slice(orbitIdx * iconsPerOrbit, (orbitIdx + 1) * iconsPerOrbit)
                  .map((cfg, iconIdx) => {
                    const angle = (iconIdx * (360 / iconsPerOrbit));
                    return (
                      <div
                        key={iconIdx}
                        className="absolute bg-white dark:bg-gray-800 rounded-full p-2 shadow-sm border dark:border-gray-700"
                        style={{
                          left: "50%",
                          top: "50%",
                          transform: `rotate(${angle}deg) translateX(${6 + orbitGap / 2 * (orbitIdx + 1)}rem) rotate(-${angle}deg)`,
                        }}
                      >
                        {/* Counter-rotation inside the icon container keeps the icon upright */}
                        <div className="animate-reverse-spin-slow" style={{ "--duration": `${duration}s` } as React.CSSProperties}>
                           {cfg.Icon ? (
                            <cfg.Icon className="w-6 h-6" style={{ color: cfg.color }} />
                          ) : (
                            <Image src={cfg.img || "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"} width={6} height={6} alt="tool" className="w-6 h-6 object-contain" />
                          )} 
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
    </section>
  );
}