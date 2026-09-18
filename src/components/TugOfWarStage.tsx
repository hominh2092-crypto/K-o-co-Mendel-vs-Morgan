import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Award, Zap, Sparkles } from 'lucide-react';
import mendelAvatar from '../assets/images/mendel_portrait_1788943551781.jpg';
import morganAvatar from '../assets/images/morgan_portrait_1788943564933.jpg';
import MendelCharacter from './MendelCharacter';
import MorganCharacter from './MorganCharacter';
import BraidedRope from './BraidedRope';
import { CharacterSkinId } from '../types';
import { getSkinDef } from '../data/characterSkins';

interface TugOfWarStageProps {
  pullPosition: number; // e.g. -5 (Mendel wins) to +5 (Morgan wins), 0 is center
  maxPull: number; // default 5
  lastPuller: 'A' | 'B' | null;
  mendelScore: number;
  morganScore: number;
  mendelQuestionIndex: number;
  morganQuestionIndex: number;
  totalQuestions: number;
  isGameOver: boolean;
  winner: 'A' | 'B' | 'TIE' | null;
  leftBoard: ReactNode;
  rightBoard: ReactNode;
  skinId?: CharacterSkinId;
}

export default function TugOfWarStage({
  pullPosition,
  maxPull = 5,
  lastPuller,
  mendelScore,
  morganScore,
  mendelQuestionIndex,
  morganQuestionIndex,
  totalQuestions,
  isGameOver,
  winner,
  leftBoard,
  rightBoard,
  skinId = 'classic'
}: TugOfWarStageProps) {
  const skin = getSkinDef(skinId);
  // Convert pullPosition (-maxPull to +maxPull) to percentage offset (-34% to +34%)
  const ropeShiftPercent = Math.max(-34, Math.min(34, (pullPosition / maxPull) * 30));

  return (
    <div id="tug-of-war-arena" className="w-full flex-1 min-h-0 flex flex-col justify-between bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 rounded-2xl p-2 sm:p-3 shadow-2xl border border-slate-700/80 overflow-hidden relative select-none">
      {/* Background stadium atmosphere */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* Top Banner: Arena Header, Live Scoreboard & Center Tension Status */}
      <div className="flex items-center justify-between gap-2 mb-1.5 relative z-10 shrink-0">
        {/* Mendel Mini Info */}
        <div className="flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-1 rounded-xl backdrop-blur-xs shadow">
          <div className="w-7 h-7 rounded-lg overflow-hidden border border-emerald-400 shrink-0 shadow">
            <img 
              src={mendelAvatar} 
              alt="Gregor Mendel" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-xs text-emerald-300">Bên A: Gregor Mendel</span>
              <span className="text-[9px] px-1 py-0.2 bg-emerald-800/80 text-emerald-200 rounded hidden sm:inline">🌱 Đậu Hà Lan</span>
            </div>
            <div className="text-[10px] text-emerald-200/80 font-mono">
              Điểm kéo: <span className="font-bold text-emerald-300 text-xs">{mendelScore}</span>/{totalQuestions}
            </div>
          </div>
        </div>

        {/* Center Live Distance Pill */}
        <div className="flex flex-col items-center justify-center px-3 py-1 bg-slate-800/90 rounded-xl border border-slate-700 shadow">
          <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <Zap className="w-2.5 h-2.5 text-amber-400 fill-amber-400 animate-pulse" />
            Vạch Trung Tâm 0m
          </div>
          <div className="text-xs font-bold text-white flex items-center gap-1 mt-0.5 font-mono">
            {pullPosition < 0 ? (
              <span className="text-emerald-400">← Mendel dẫn {Math.abs(pullPosition)} nấc</span>
            ) : pullPosition > 0 ? (
              <span className="text-amber-400">Morgan dẫn {pullPosition} nấc →</span>
            ) : (
              <span className="text-sky-300">Cân bằng ở tâm (0)</span>
            )}
          </div>
        </div>

        {/* Morgan Mini Info */}
        <div className="flex items-center gap-2 bg-amber-950/80 border border-amber-500/40 px-2.5 py-1 rounded-xl backdrop-blur-xs text-right shadow">
          <div>
            <div className="flex items-center justify-end gap-1">
              <span className="text-[9px] px-1 py-0.2 bg-amber-800/80 text-amber-200 rounded hidden sm:inline">🪰 Ruồi giấm</span>
              <span className="font-bold text-xs text-amber-300">Bên B: T. H. Morgan</span>
            </div>
            <div className="text-[10px] text-amber-200/80 font-mono">
              Điểm kéo: <span className="font-bold text-amber-300 text-xs">{morganScore}</span>/{totalQuestions}
            </div>
          </div>
          <div className="w-7 h-7 rounded-lg overflow-hidden border border-amber-400 shrink-0 shadow">
            <img 
              src={morganAvatar} 
              alt="Thomas Hunt Morgan" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* THE UNIFIED BATTLE ARENA (CHỈ 1 KHUNG DUY NHẤT):
          - Sân đấu kéo co liên hoàn với mặt cỏ, vạch 0m, vạch đích.
          - Cọng dây thừng bện gai căng ngang từ tay Mendel sang tay Morgan.
          - Câu hỏi của Mendel hiện trực tiếp trên cọng dây của ông Mendel (bên trái).
          - Điểm thắt nút ruy băng đỏ di động ở giữa cọng dây (vạch 0m).
          - Câu hỏi của Morgan hiện trực tiếp trên cọng dây của ông Morgan (bên phải).
      */}
      <div className="relative flex-1 min-h-0 w-full rounded-2xl border border-slate-800 bg-radial from-slate-850 via-slate-900 to-slate-950 p-2 sm:p-3 flex flex-col justify-between overflow-hidden shadow-inner my-0.5">
        
        {/* Grass Turf Field Texture at Bottom */}
        <div className="absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-linear-to-t from-emerald-950/90 via-emerald-900/40 to-transparent border-t border-emerald-800/30 pointer-events-none rounded-b-2xl" />

        {/* Field Chalk & Distance Markings */}
        <div className="absolute inset-x-0 bottom-0 top-0 pointer-events-none flex items-center justify-center">
          {/* Middle vertical red line (0m start mark) */}
          <div className="w-0.5 h-full bg-rose-500/60 relative">
            <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[8px] font-mono text-rose-300/80 bg-slate-900/90 px-1 py-0.2 rounded border border-rose-900/60">
              0m
            </span>
          </div>

          {/* Distance Ticks */}
          {[-4, -3, -2, -1, 1, 2, 3, 4].map((tick) => (
            <div
              key={tick}
              className="absolute h-10 border-l border-dashed border-slate-600/30"
              style={{ left: `${50 + (tick / maxPull) * 28}%` }}
            >
              <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-mono text-slate-500">
                {tick < 0 ? `${Math.abs(tick)}` : `${tick}`}
              </span>
            </div>
          ))}

          {/* Left Win Zone Line */}
          <div 
            className="absolute h-full border-l-2 border-emerald-500/70"
            style={{ left: `${50 - (4.2 / maxPull) * 28}%` }}
          >
            <span className="absolute top-1.5 -left-7 text-[8px] font-bold text-emerald-400 bg-emerald-950/90 px-1 py-0.2 rounded uppercase tracking-wider border border-emerald-700/50">
              Thắng A
            </span>
          </div>

          {/* Right Win Zone Line */}
          <div 
            className="absolute h-full border-r-2 border-amber-500/70"
            style={{ left: `${50 + (4.2 / maxPull) * 28}%` }}
          >
            <span className="absolute top-1.5 left-1 text-[8px] font-bold text-amber-400 bg-amber-950/90 px-1 py-0.2 rounded uppercase tracking-wider border border-amber-700/50">
              Thắng B
            </span>
          </div>
        </div>

        {/* Mobile Tug-of-War Tension Rope (visible only on small screens) */}
        <div className="md:hidden w-full pt-0.5 pb-1 px-1 shrink-0 z-20 select-none">
          <BraidedRope
            height={22}
            label={pullPosition === 0 ? '0m (Cân bằng)' : pullPosition < 0 ? `🌱 Mendel dẫn ← ${Math.abs(pullPosition)}m` : `🪰 Morgan dẫn +${pullPosition}m →`}
            accentColor={pullPosition < 0 ? 'emerald' : pullPosition > 0 ? 'amber' : 'neutral'}
            showEndCaps={true}
          />
        </div>

        {/* MAIN BATTLE ROW:
            Gregor Mendel (Trái)
            <=== TRỤC DÂY THỪNG 3D CHẠY XUYÊN SUỐT PHÍA SAU KHUNG CÂU HỎI TRONG SUỐT ===>
            T. H. Morgan (Phải)
        */}
        <div className="relative z-10 flex-1 min-h-0 flex flex-col md:flex-row items-center justify-between gap-1.5 sm:gap-2 lg:gap-3">
          
          {/* 1. CONTINUOUS HORIZONTAL TUG-OF-WAR BRAIDED ROPE
              Chạy xuyên suốt từ tay Mendel (trái), xuyên qua phía sau khung câu hỏi bán trong suốt của Mendel,
              lộ ra ở khoảng giữa với Ruy băng đỏ vạch 0m, rồi xuyên qua phía sau khung câu hỏi của Morgan,
              nối thẳng vào tay Morgan (phải).
          */}
          <div className="absolute inset-x-8 sm:inset-x-12 lg:inset-x-16 top-1/2 -translate-y-1/2 h-8 pointer-events-none z-10 hidden md:block select-none">
            <motion.div
              className="w-full h-full relative flex items-center"
              animate={{
                x: lastPuller === 'A' ? -6 : lastPuller === 'B' ? 6 : 0,
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            >
              {/* Thick 3D Braided Rope spanning the full width */}
              <BraidedRope
                height={28}
                showEndCaps={true}
                className="w-full drop-shadow-md"
              />

              {/* Dynamic Sliding Red Ribbon Knot & 0m Marker tied directly on the rope */}
              <motion.div
                id="rope-center-marker"
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-30"
                style={{ left: `calc(50% + ${ropeShiftPercent}%)` }}
                animate={{
                  scale: lastPuller ? [1, 1.35, 1] : 1,
                  y: lastPuller ? [-2, 2, 0] : 0,
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              >
                {/* Center Brass Ring & Knot */}
                <div className="w-5 h-5 rounded-full bg-linear-to-b from-amber-300 via-yellow-400 to-amber-600 border-2 border-yellow-100 shadow-lg shadow-yellow-500/70 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse" />
                </div>

                {/* Vivid Hanging Red Ribbon tails */}
                <div className="w-4 h-6 -mt-0.5 bg-linear-to-b from-rose-600 to-rose-700 rounded-b shadow-md flex items-center justify-center">
                  <div className="w-0.5 h-4 bg-rose-200" />
                </div>

                {/* Distance Meter Tag */}
                <div className="mt-0.5 px-1.5 py-0.2 rounded bg-slate-950/95 text-white font-mono text-[8.5px] font-bold border border-slate-700 whitespace-nowrap shadow-md">
                  {pullPosition === 0 ? '0m' : pullPosition < 0 ? `← ${Math.abs(pullPosition)}m` : `+${pullPosition}m →`}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* 2. MENDEL CHARACTER (Left Flank - Đang nắm chặt đầu cọng dây bên trái) */}
          <div className="shrink-0 flex flex-col items-center justify-center relative z-20 order-1">
            <MendelCharacter
              isPulling={lastPuller === 'A'}
              pullPosition={pullPosition}
              isWinner={winner === 'A'}
              isLoser={winner === 'B'}
              skinId={skinId}
            />
            <div className="text-[10px] font-bold text-emerald-300 mt-1 flex items-center gap-1 bg-slate-900/90 px-2 py-0.5 rounded-full border border-emerald-700/60 shadow">
              <span>{skin.icon} {skin.mendel.titleVi.split(' ')[0]} Mendel</span>
            </div>
          </div>

          {/* Left Connecting Rope Strand (visible on large screens between Mendel and the board) */}
          <div className="hidden lg:flex items-center w-6 xl:w-8 shrink-0 z-20 -mx-1 order-2 pointer-events-none">
            <BraidedRope height={22} showEndCaps={false} />
          </div>

          {/* 3. KHUNG CÂU HỎI BÊN MENDEL (Bán trong suốt nhẹ, nhỏ gọn hơn) */}
          <div className="flex-1 min-w-0 max-w-sm sm:max-w-md xl:max-w-[430px] h-full flex flex-col justify-center relative z-20 order-3">
            {leftBoard}
          </div>

          {/* 4. Center Divider Gap (Khoảng hở giữa 2 khung để nhìn rõ trục dây và Ruy băng đỏ vạch 0m) */}
          <div className="hidden md:flex flex-col items-center justify-center shrink-0 w-10 lg:w-14 relative z-20 py-2 order-4 select-none pointer-events-none">
            <div className="w-0.5 h-12 bg-rose-500/40" />
            <span className="text-[8.5px] font-mono text-rose-300 font-bold bg-slate-950/90 px-1.5 py-0.5 rounded-full border border-rose-600/50 shadow my-1">
              0m
            </span>
            <div className="w-0.5 h-12 bg-rose-500/40" />
          </div>

          {/* 5. KHUNG CÂU HỎI BÊN MORGAN (Bán trong suốt nhẹ, nhỏ gọn hơn) */}
          <div className="flex-1 min-w-0 max-w-sm sm:max-w-md xl:max-w-[430px] h-full flex flex-col justify-center relative z-20 order-5">
            {rightBoard}
          </div>

          {/* Right Connecting Rope Strand (visible on large screens between Morgan and the board) */}
          <div className="hidden lg:flex items-center w-6 xl:w-8 shrink-0 z-20 -mx-1 order-6 pointer-events-none">
            <BraidedRope height={22} showEndCaps={false} />
          </div>

          {/* 6. MORGAN CHARACTER (Right Flank - Đang nắm chặt đầu cọng dây bên phải) */}
          <div className="shrink-0 flex flex-col items-center justify-center relative z-20 order-7">
            <MorganCharacter
              isPulling={lastPuller === 'B'}
              pullPosition={pullPosition}
              isWinner={winner === 'B'}
              isLoser={winner === 'A'}
              skinId={skinId}
            />
            <div className="text-[10px] font-bold text-amber-300 mt-1 flex items-center gap-1 bg-slate-900/90 px-2 py-0.5 rounded-full border border-amber-700/60 shadow">
              <span>{skin.icon} {skin.morgan.titleVi.split(' ')[0]} Morgan</span>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Progress Bars for Both Sides */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6 mt-1.5 text-[11px] shrink-0">
        {/* Mendel Progress */}
        <div className="bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
          <div className="flex justify-between items-center mb-0.5 text-[10px]">
            <span className="text-emerald-400 font-semibold">Tiến độ Mendel</span>
            <span className="text-slate-400 font-mono">{mendelQuestionIndex} / {totalQuestions} câu</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
              style={{ width: `${(mendelQuestionIndex / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Morgan Progress */}
        <div className="bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
          <div className="flex justify-between items-center mb-0.5 text-[10px]">
            <span className="text-amber-400 font-semibold">Tiến độ Morgan</span>
            <span className="text-slate-400 font-mono">{morganQuestionIndex} / {totalQuestions} câu</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-amber-500 h-full transition-all duration-300 rounded-full"
              style={{ width: `${(morganQuestionIndex / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
