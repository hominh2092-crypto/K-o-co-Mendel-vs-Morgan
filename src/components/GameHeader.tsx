import { useState } from 'react';
import { Volume2, VolumeX, RotateCcw, HelpCircle, Users, Bot, Swords, Sparkles } from 'lucide-react';
import { GameMode } from '../types';

interface GameHeaderProps {
  gameMode: GameMode;
  onSelectGameMode: (mode: GameMode) => void;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
  onOpenRules: () => void;
  onResetGame: () => void;
}

export default function GameHeader({
  gameMode,
  onSelectGameMode,
  isSoundEnabled,
  onToggleSound,
  onOpenRules,
  onResetGame
}: GameHeaderProps) {
  return (
    <header className="w-full bg-slate-900/90 border-b border-slate-800 backdrop-blur-md px-4 py-3 sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Title */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-emerald-500 via-teal-600 to-amber-500 flex items-center justify-center shadow-md shadow-emerald-900/40 text-white font-extrabold text-lg">
              ⚔️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base sm:text-lg text-white tracking-tight flex items-center gap-1.5">
                  Đấu Trường Kéo Co Sinh Học 12
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Giữa Kì 1
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Gregor Mendel (Đậu Hà Lan) vs Thomas Hunt Morgan (Ruồi giấm)
              </p>
            </div>
          </div>

          {/* Mobile quick actions */}
          <div className="flex items-center gap-1.5 md:hidden">
            <button
              onClick={onToggleSound}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 cursor-pointer"
              title={isSoundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            >
              {isSoundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>
            <button
              onClick={onOpenRules}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 cursor-pointer"
              title="Hướng dẫn luật chơi"
            >
              <HelpCircle className="w-4 h-4 text-sky-400" />
            </button>
          </div>
        </div>

        {/* Mode Switcher Pill */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs w-full md:w-auto overflow-x-auto">
          <button
            id="mode-simultaneous"
            onClick={() => onSelectGameMode('simultaneous')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
              gameMode === 'simultaneous'
                ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Swords className="w-3.5 h-3.5" />
            <span>2 Người cùng lúc</span>
          </button>

          <button
            id="mode-turn-based"
            onClick={() => onSelectGameMode('turn-based')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
              gameMode === 'turn-based'
                ? 'bg-sky-600 text-white shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Chơi theo lượt</span>
          </button>

          <button
            id="mode-vs-bot"
            onClick={() => onSelectGameMode('vs-bot')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
              gameMode === 'vs-bot'
                ? 'bg-amber-600 text-white shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Đấu với Morgan AI</span>
          </button>
        </div>

        {/* Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={onToggleSound}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium flex items-center gap-1.5 cursor-pointer hover:bg-slate-750 transition-all"
            title={isSoundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
          >
            {isSoundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Âm thanh: Bật</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                <span>Âm thanh: Tắt</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenRules}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-sky-300 hover:text-sky-200 border border-slate-700 text-xs font-medium flex items-center gap-1.5 cursor-pointer hover:bg-slate-750 transition-all"
          >
            <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
            <span>Luật chơi</span>
          </button>

          <button
            onClick={onResetGame}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
            <span>Chơi lại</span>
          </button>
        </div>
      </div>
    </header>
  );
}
