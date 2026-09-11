import React from 'react';

interface BraidedRopeProps {
  className?: string;
  height?: number;
  label?: string;
  sublabel?: string;
  accentColor?: 'emerald' | 'amber' | 'rose' | 'neutral';
  showEndCaps?: boolean;
}

export default function BraidedRope({
  className = '',
  height = 28,
  label,
  sublabel,
  accentColor = 'neutral',
  showEndCaps = true,
}: BraidedRopeProps) {
  const patternId = React.useId().replace(/:/g, '-');

  const badgeBg =
    accentColor === 'emerald'
      ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/70 shadow-emerald-900/50'
      : accentColor === 'amber'
      ? 'bg-amber-950/90 text-amber-300 border-amber-500/70 shadow-amber-900/50'
      : accentColor === 'rose'
      ? 'bg-rose-950/90 text-rose-300 border-rose-500/70 shadow-rose-900/50'
      : 'bg-slate-950/90 text-amber-200 border-amber-700/60 shadow-black/60';

  return (
    <div
      className={`relative flex items-center justify-center overflow-visible select-none ${className}`}
      style={{ height: `${height}px` }}
    >
      {/* Underlying Shadow for depth on arena turf */}
      <div 
        className="absolute inset-x-0 bottom-[-3px] h-[6px] bg-black/60 blur-[3px] rounded-full pointer-events-none" 
      />

      {/* 3D Braided SVG Rope */}
      <svg
        width="100%"
        height={height}
        className="w-full h-full overflow-visible rounded-full"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Repeating Braided Spiral Strand Pattern */}
          <pattern
            id={`hemp-strand-${patternId}`}
            width="28"
            height={height}
            patternUnits="userSpaceOnUse"
          >
            {/* Strand 1: Dark Amber Shadow */}
            <path
              d={`M0,0 L12,${height} L17,${height} L5,0 Z`}
              fill="#78350f"
            />
            {/* Strand 2: Rich Golden Hemp */}
            <path
              d={`M5,0 L17,${height} L23,${height} L11,0 Z`}
              fill="#b45309"
            />
            {/* Strand 3: Bright Wheat Core */}
            <path
              d={`M11,0 L23,${height} L29,${height} L17,0 Z`}
              fill="#d97706"
            />
            {/* Strand 4: Umber Crevice */}
            <path
              d={`M17,0 L29,${height} L34,${height} L22,0 Z`}
              fill="#592508"
            />
            {/* Twisted Fiber Highlights */}
            <line
              x1="9"
              y1="3"
              x2="19"
              y2={height - 3}
              stroke="#fef08a"
              strokeWidth="1.2"
              strokeDasharray="3 3"
              opacity="0.65"
            />
            <line
              x1="15"
              y1="3"
              x2="25"
              y2={height - 3}
              stroke="#fed7aa"
              strokeWidth="1"
              strokeDasharray="4 3"
              opacity="0.5"
            />
          </pattern>

          {/* 3D Cylindrical lighting overlay: top shadow, bright mid-upper ridge, bottom deep shade */}
          <linearGradient id={`rope-3d-cylinder-${patternId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#291102" stopOpacity="0.85" />
            <stop offset="18%" stopColor="#78350f" stopOpacity="0.25" />
            <stop offset="35%" stopColor="#fef08a" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#b45309" stopOpacity="0.1" />
            <stop offset="85%" stopColor="#451a03" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#1a0b02" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* Base Solid Hemp Layer */}
        <rect
          x="0"
          y="0"
          width="100%"
          height={height}
          fill="#92400e"
          rx={height / 4}
        />

        {/* Braided Repeating Pattern */}
        <rect
          x="0"
          y="0"
          width="100%"
          height={height}
          fill={`url(#hemp-strand-${patternId})`}
          rx={height / 4}
        />

        {/* 3D Cylindrical Lighting Sheen */}
        <rect
          x="0"
          y="0"
          width="100%"
          height={height}
          fill={`url(#rope-3d-cylinder-${patternId})`}
          rx={height / 4}
        />

        {/* Edge Contours */}
        <line
          x1="0"
          y1="0.5"
          x2="100%"
          y2="0.5"
          stroke="#451a03"
          strokeWidth="1"
          opacity="0.9"
        />
        <line
          x1="0"
          y1={height - 0.5}
          x2="100%"
          y2={height - 0.5}
          stroke="#1c0b02"
          strokeWidth="1.2"
          opacity="0.95"
        />
      </svg>

      {/* Left End Metal Clevis / Whipping Clamp */}
      {showEndCaps && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[115%] w-3 bg-gradient-to-r from-amber-700 via-yellow-500 to-amber-900 rounded-sm border border-amber-950 shadow-md flex flex-col justify-around py-0.5 z-10 pointer-events-none">
          <div className="w-full h-0.5 bg-amber-200 opacity-80" />
          <div className="w-full h-0.5 bg-amber-950 opacity-90" />
          <div className="w-full h-0.5 bg-amber-200 opacity-80" />
        </div>
      )}

      {/* Right End Metal Clevis / Whipping Clamp */}
      {showEndCaps && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[115%] w-3 bg-gradient-to-r from-amber-900 via-yellow-500 to-amber-700 rounded-sm border border-amber-950 shadow-md flex flex-col justify-around py-0.5 z-10 pointer-events-none">
          <div className="w-full h-0.5 bg-amber-200 opacity-80" />
          <div className="w-full h-0.5 bg-amber-950 opacity-90" />
          <div className="w-full h-0.5 bg-amber-200 opacity-80" />
        </div>
      )}

      {/* Center Plaque / Label on Rope */}
      {label && (
        <div
          className={`absolute top-1/2 -translate-y-1/2 px-2.5 py-0.5 rounded-full border text-[10px] font-black uppercase tracking-wider font-mono shadow-md z-20 flex items-center gap-1.5 whitespace-nowrap pointer-events-none ${badgeBg}`}
        >
          <span>{label}</span>
          {sublabel && (
            <span className="text-[9px] font-normal opacity-80 lowercase">
              ({sublabel})
            </span>
          )}
        </div>
      )}
    </div>
  );
}
