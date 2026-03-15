import React from 'react';

export default function Logo({ className = "", light = false, showText = true, size = "md" }) {
  const sizes = {
    sm: { box: "w-6 h-6", text: "text-base", bars: "w-3 h-[2px] gap-[2px]" },
    md: { box: "w-10 h-10", text: "text-xl", bars: "w-4 h-[2.5px] gap-[3px]" },
    lg: { box: "w-16 h-16", text: "text-3xl", bars: "w-6 h-[4px] gap-[5px]" },
    xl: { box: "w-24 h-24", text: "text-5xl", bars: "w-10 h-[6px] gap-[8px]" }
  };

  const s = sizes[size] || sizes.md;
  const brandRed = "#ff4d4d";
  const brandBlack = light ? "#ffffff" : "#111827";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Shield Logo */}
      <div className={`${s.box} relative flex-shrink-0`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M10 10H90V70L50 95L10 70V10Z" fill={brandRed} />
          <path d="M30 35H70V75L50 60L30 75V35Z" fill={brandBlack} />
          <path d="M45 45L50 49L55 45V35H45V45Z" fill={brandRed} />
        </svg>
      </div>

      {/* Text Part */}
      {showText && (
        <div className="flex items-center">
          {/* FELIX */}
          <div className={`font-condensed font-900 tracking-tighter ${s.text} flex items-center text-felix-red`}>
            <span>F</span>
            <div className={`flex flex-col ${s.bars.split(' ')[2]} mx-[1px] mb-[1px]`}>
              <div className={`${s.bars.split(' ')[0]} ${s.bars.split(' ')[1]} bg-felix-red`} />
              <div className={`${s.bars.split(' ')[0]} ${s.bars.split(' ')[1]} bg-felix-red`} />
              <div className={`${s.bars.split(' ')[0]} ${s.bars.split(' ')[1]} bg-felix-red`} />
            </div>
            <span>LIX</span>
          </div>
          {/* MOTORS */}
          <span className={`font-condensed font-900 ml-2 tracking-widest ${s.text} ${light ? "text-white" : "text-gray-900"}`}>
            MOTORS
          </span>
        </div>
      )}
    </div>
  );
}


