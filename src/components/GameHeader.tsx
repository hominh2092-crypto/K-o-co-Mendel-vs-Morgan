import { useState } from 'react';
import { Volume2, VolumeX, RotateCcw, HelpCircle, Users, Bot, Swords, Sparkles, BookOpen, Clock, Settings, Home, Shirt } from 'lucide-react';
import { GameMode, TimeSettings, Language, CharacterSkinId } from '../types';
import { getT } from '../utils/translations';
import { getSkinDef } from '../data/characterSkins';

interface GameHeaderProps {
  activeTab: 'arena' | 'manage' | 'lobby';
  onSelectTab: (tab: 'arena' | 'manage' | 'lobby') => void;
  questionsCount?: number;
  gameMode: GameMode;
  onSelectGameMode: (mode: GameMode) => void;
  timeSettings: TimeSettings;
  onOpenTimeSettings: () => void;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
  onOpenRules: () => void;
  onResetGame: () => void;
  language: Language;
  onOpenSettings: () => void;
  selectedSkin?: CharacterSkinId;
  onOpenSkinModal?: () => void;
}

export default function GameHeader({
  activeTab,
  onSelectTab,
  questionsCount = 0,
  gameMode,
  onSelectGameMode,
  timeSettings,
  onOpenTimeSettings,
  isSoundEnabled,
  onToggleSound,
  onOpenRules,
  onResetGame,
  language,
  onOpenSettings,
  selectedSkin = 'classic',
  onOpenSkinModal
}: GameHeaderProps) {
  const t = getT(language);
  const skin = getSkinDef(selectedSkin);

  return (
    <header className="w-full bg-slate-900/90 border-b border-slate-800 backdrop-blur-md px-3 sm:px-4 py-2.5 sm:py-3 sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col gap-2.5">
        
        {/* Row 1: Brand & Global Actions + Navigation Tabs */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-2.5">
          {/* Brand & Title */}
          <div className="flex items-center justify-between w-full lg:w-auto gap-3">
            <button
              onClick={() => onSelectTab('lobby')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
              title="Quay lại Màn hình chờ (Sảnh chính)"
            >
              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-emerald-500 via-teal-600 to-amber-500 flex items-center justify-center shadow-md shadow-emerald-900/40 text-white font-extrabold text-lg shrink-0 group-hover:scale-105 transition-transform">
                ⚔️
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-extrabold text-sm sm:text-base md:text-lg text-white tracking-tight flex items-center gap-1.5 group-hover:text-emerald-300 transition-colors">
                    {t.gameTitle}
                  </h1>
                  <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Sinh 12
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-400">
                  Gregor Mendel vs Thomas Hunt Morgan
                </p>
              </div>
            </button>

            {/* Mobile quick action buttons */}
            <div className="flex items-center gap-1.5 lg:hidden">
              <button
                onClick={() => onSelectTab('lobby')}
                className="p-1.5 rounded-lg bg-slate-800 text-emerald-400 hover:text-white border border-slate-700 cursor-pointer"
                title="Về sảnh chính"
              >
                <Home className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenSettings}
                className="p-1.5 rounded-lg bg-slate-800 text-amber-300 hover:text-white border border-slate-700 cursor-pointer"
                title={t.btnSettings}
              >
                <Settings className="w-4 h-4" />
              </button>
              <button
                onClick={onToggleSound}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 cursor-pointer"
                title={isSoundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
              >
                {isSoundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
              </button>
              <button
                onClick={onOpenRules}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 cursor-pointer"
                title="Hướng dẫn luật chơi"
              >
                <HelpCircle className="w-4 h-4 text-sky-400" />
              </button>
            </div>
          </div>

          {/* Center: Main Navigation Tabs (Lobby vs Arena vs Question Management) */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs w-full sm:w-auto justify-center">
            <button
              id="tab-lobby"
              onClick={() => onSelectTab('lobby')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'lobby'
                  ? 'bg-slate-800 text-emerald-300 shadow-md border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>{t.btnBackToLobby}</span>
            </button>

            <button
              id="tab-arena"
              onClick={() => onSelectTab('arena')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'arena'
                  ? 'bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-900/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Swords className="w-3.5 h-3.5" />
              <span>{t.arenaTab}</span>
            </button>

            <button
              id="tab-manage-questions"
              onClick={() => onSelectTab('manage')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'manage'
                  ? 'bg-linear-to-r from-sky-600 to-indigo-600 text-white shadow-md shadow-sky-900/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t.managerTab}</span>
              {questionsCount > 0 && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-slate-850 border border-slate-700 text-slate-300 ml-0.5">
                  {questionsCount}
                </span>
              )}
            </button>
          </div>

          {/* Desktop Right Quick Actions */}
          <div className="hidden lg:flex items-center gap-2">
            {onOpenSkinModal && (
              <button
                onClick={onOpenSkinModal}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-amber-300 hover:text-amber-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer hover:bg-slate-750 transition-all shadow-xs"
                title="Đổi trang phục nhân vật"
              >
                <Shirt className="w-3.5 h-3.5 text-amber-400" />
                <span>{skin.icon} {language === 'vi' ? skin.nameVi : skin.nameEn}</span>
              </button>
            )}

            <button
              onClick={onOpenSettings}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer hover:bg-slate-750 transition-all shadow-xs"
              title={t.btnSettings}
            >
              <Settings className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.btnSettings}</span>
            </button>

            <button
              onClick={onOpenTimeSettings}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-amber-300 hover:text-amber-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer hover:bg-slate-750 transition-all"
              title="Cài đặt thời gian cho mỗi đội"
            >
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.timeRemaining}:</span>
              <span className="font-mono bg-amber-950/80 px-1 rounded text-[11px] border border-amber-800/60 font-bold">
                {timeSettings.mode === 'shared'
                  ? timeSettings.sharedSeconds === 0 ? '∞' : `${timeSettings.sharedSeconds}s`
                  : `A:${timeSettings.teamASeconds === 0 ? '∞' : timeSettings.teamASeconds}s B:${timeSettings.teamBSeconds === 0 ? '∞' : timeSettings.teamBSeconds}s`}
              </span>
            </button>

            <button
              onClick={onToggleSound}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium flex items-center gap-1.5 cursor-pointer hover:bg-slate-750 transition-all"
              title={isSoundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            >
              {isSoundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Âm thanh</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                  <span>Tắt âm</span>
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

            {activeTab === 'arena' && (
              <button
                onClick={onResetGame}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                <span>Chơi lại</span>
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Mode Switcher & Time Settings (When in Arena Tab) */}
        {activeTab === 'arena' && (
          <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800/60 flex-wrap">
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-slate-400 font-medium hidden sm:inline-block">
                  Chế độ:
                </span>
                <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs overflow-x-auto">
                  <button
                    id="mode-simultaneous"
                    onClick={() => onSelectGameMode('simultaneous')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
                      gameMode === 'simultaneous'
                        ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Swords className="w-3.5 h-3.5" />
                    <span>{t.pvpSimultaneous}</span>
                  </button>

                  <button
                    id="mode-turn-based"
                    onClick={() => onSelectGameMode('turn-based')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
                      gameMode === 'turn-based'
                        ? 'bg-sky-600 text-white shadow-xs font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>{t.pvpTurnBased}</span>
                  </button>

                  <button
                    id="mode-vs-bot"
                    onClick={() => onSelectGameMode('vs-bot')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
                      gameMode === 'vs-bot'
                        ? 'bg-amber-600 text-white shadow-xs font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>{t.modeVsBot}</span>
                  </button>
                </div>
              </div>

              {/* Quick Time Setting Pill Button */}
              <button
                id="btn-arena-time-settings"
                onClick={onOpenTimeSettings}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium cursor-pointer transition-all"
                title="Nhấn để đổi thời gian cho mỗi đội"
              >
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.timeRemaining}:</span>
                <span className="font-mono text-amber-300 font-bold">
                  {timeSettings.mode === 'shared'
                    ? timeSettings.sharedSeconds === 0 ? t.unlimited : `${timeSettings.sharedSeconds}s`
                    : `A: ${timeSettings.teamASeconds === 0 ? '∞' : timeSettings.teamASeconds + 's'} | B: ${timeSettings.teamBSeconds === 0 ? '∞' : timeSettings.teamBSeconds + 's'}`}
                </span>
              </button>
            </div>

            <div className="text-[11px] text-slate-400 hidden md:block">
              {t.controlsMendel} • {t.controlsMorgan}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
