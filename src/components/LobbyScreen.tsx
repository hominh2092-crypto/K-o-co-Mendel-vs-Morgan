import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Play,
  Settings,
  BookOpen,
  FileText,
  Volume2,
  VolumeX,
  Clock,
  Sparkles,
  Swords,
  Users,
  Bot,
  Languages,
  Award,
  ChevronRight,
  Shirt,
  Check
} from 'lucide-react';
import { Language, TimeSettings, GameMode, CharacterSkinId } from '../types';
import { getT } from '../utils/translations';
import { TEAM_A_PROFILE, TEAM_B_PROFILE } from '../data/biologyQuestions';
import { CHARACTER_SKINS, getSkinDef } from '../data/characterSkins';
import BraidedRope from './BraidedRope';
import { sound } from '../utils/soundEffects';

interface LobbyScreenProps {
  language: Language;
  onOpenPlay: () => void;
  onOpenSettings: () => void;
  onOpenRules: () => void;
  onOpenQuestions: () => void;
  timeSettings: TimeSettings;
  volume: number;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
  questionsCount: number;
  selectedSkin: CharacterSkinId;
  onSelectSkin: (skinId: CharacterSkinId) => void;
  onOpenSkinModal: () => void;
}

export default function LobbyScreen({
  language,
  onOpenPlay,
  onOpenSettings,
  onOpenRules,
  onOpenQuestions,
  timeSettings,
  volume,
  isSoundEnabled,
  onToggleSound,
  questionsCount,
  selectedSkin,
  onSelectSkin,
  onOpenSkinModal
}: LobbyScreenProps) {
  const t = getT(language);
  const currentSkin = getSkinDef(selectedSkin);

  const effectiveTime =
    timeSettings.mode === 'shared'
      ? timeSettings.sharedSeconds === 0
        ? t.unlimited
        : `${timeSettings.sharedSeconds}s`
      : `A:${timeSettings.teamASeconds}s B:${timeSettings.teamBSeconds}s`;

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
      {/* Background Ambience & Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(245,158,11,0.08),rgba(15,23,42,0))] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Top Lobby Bar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-emerald-500 to-amber-500 flex items-center justify-center text-white font-extrabold shadow-md shadow-emerald-950/40">
            ⚔️
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Sinh Học 12 • Kéo Co Trí Tuệ
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
              v2.5 Full Edition
            </span>
          </div>
        </div>

        {/* Quick Indicators & Settings Trigger */}
        <div className="flex items-center gap-2">
          {/* Language Quick Indicator */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenSettings();
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold cursor-pointer transition-colors"
            title="Ngôn ngữ hiện tại"
          >
            <Languages className="w-3.5 h-3.5 text-emerald-400" />
            <span>{language === 'vi' ? '🇻🇳 VI' : '🇬🇧 EN'}</span>
          </button>

          {/* Sound & Volume Quick Toggle */}
          <button
            onClick={onToggleSound}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-colors ${
              isSoundEnabled && volume > 0
                ? 'bg-slate-900 hover:bg-slate-800 text-amber-300 border-slate-800'
                : 'bg-rose-950/60 text-rose-300 border-rose-800/60'
            }`}
            title="Âm thanh trò chơi"
          >
            {isSoundEnabled && volume > 0 ? (
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-rose-400" />
            )}
            <span className="font-mono text-[11px]">
              {!isSoundEnabled ? 'Tắt' : `${Math.round(volume * 100)}%`}
            </span>
          </button>

          {/* Quick Wardrobe Button */}
          <button
            id="btn-lobby-wardrobe-top"
            onClick={() => {
              sound.playClick();
              onOpenSkinModal();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-semibold cursor-pointer transition-colors"
            title="Tủ đồ trang phục"
          >
            <Shirt className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline font-medium text-amber-300">{currentSkin.icon} {language === 'vi' ? currentSkin.nameVi : currentSkin.nameEn}</span>
          </button>

          {/* Settings Button */}
          <button
            id="btn-lobby-settings-top"
            onClick={() => {
              sound.playClick();
              onOpenSettings();
            }}
            className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
          >
            <Settings className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">{t.btnSettings}</span>
          </button>
        </div>
      </header>

      {/* Main Center Content */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col items-center justify-center my-auto text-center">
        {/* Title Badges */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-semibold shadow-md mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="bg-linear-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent font-bold">
            Trò Chơi Giáo Dục Ôn Tập Kiến Thức Di Truyền Học
          </span>
        </motion.div>

        {/* Big Game Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-3xl"
        >
          {t.gameTitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mt-3 text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl font-medium"
        >
          {t.gameSubtitle}
        </motion.p>

        <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-xl italic">
          "{t.tagline}"
        </p>

        {/* VS Scientist Duel Stage Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className={`w-full max-w-3xl mt-7 mb-4 p-4 sm:p-5 rounded-2xl bg-slate-900/80 border ${currentSkin.borderClass} shadow-2xl backdrop-blur-md relative overflow-hidden transition-colors`}
        >
          <div className="flex items-center justify-between gap-2 sm:gap-6">
            {/* Left Scientist: Mendel */}
            <div className="flex-1 flex flex-col items-center text-center p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-900/50">
              <div className="relative">
                <img
                  src={TEAM_A_PROFILE.avatarUrl}
                  alt={TEAM_A_PROFILE.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-400 shadow-lg shadow-emerald-950/80"
                />
                <span className="absolute -bottom-1 -right-1 text-base bg-slate-900 rounded-full border border-emerald-500/50 p-0.5">
                  {currentSkin.icon}
                </span>
              </div>
              <h3 className="mt-2 text-xs sm:text-sm font-extrabold text-white">
                {language === 'vi' ? currentSkin.mendel.titleVi : currentSkin.mendel.titleEn}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-emerald-400 font-semibold line-clamp-1 mt-0.5">
                {language === 'vi' ? currentSkin.mendel.outfitDescVi : currentSkin.mendel.outfitDescEn}
              </p>
            </div>

            {/* Middle: Tug of War Rope Teaser */}
            <div className="flex flex-col items-center justify-center px-1 sm:px-4 shrink-0">
              <div className="w-20 sm:w-36 h-5 relative flex items-center justify-center">
                <div className="w-full h-2.5 bg-linear-to-r from-emerald-500 via-amber-400 to-amber-600 rounded-full shadow-md" />
                <div className="absolute w-4 h-4 bg-rose-500 rounded-full border-2 border-white shadow-md animate-pulse" />
              </div>
              <div className="mt-2 px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-[10px] font-mono text-amber-300 font-bold flex items-center gap-1">
                <span>{currentSkin.icon}</span>
                <span>{language === 'vi' ? currentSkin.nameVi : currentSkin.nameEn}</span>
              </div>
            </div>

            {/* Right Scientist: Morgan */}
            <div className="flex-1 flex flex-col items-center text-center p-2.5 rounded-xl bg-amber-950/40 border border-amber-900/50">
              <div className="relative">
                <img
                  src={TEAM_B_PROFILE.avatarUrl}
                  alt={TEAM_B_PROFILE.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-400 shadow-lg shadow-amber-950/80"
                />
                <span className="absolute -bottom-1 -right-1 text-base bg-slate-900 rounded-full border border-amber-500/50 p-0.5">
                  {currentSkin.icon}
                </span>
              </div>
              <h3 className="mt-2 text-xs sm:text-sm font-extrabold text-white">
                {language === 'vi' ? currentSkin.morgan.titleVi : currentSkin.morgan.titleEn}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-amber-400 font-semibold line-clamp-1 mt-0.5">
                {language === 'vi' ? currentSkin.morgan.outfitDescVi : currentSkin.morgan.outfitDescEn}
              </p>
            </div>
          </div>
        </motion.div>

        {/* CHARACTER SKIN SELECTION BOX ("Ô CHỌN SKIN CHO NHÂN VẬT") */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="w-full max-w-3xl mb-7 p-3.5 sm:p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-xl backdrop-blur-md text-left relative overflow-hidden"
        >
          {/* Header of skin selector */}
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center text-sm shadow-xs">
                <Shirt className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                  {t.skinSelectorTitle}
                  <span className="text-[10px] font-semibold text-amber-400 font-mono">
                    ({currentSkin.icon} {language === 'vi' ? currentSkin.nameVi : currentSkin.nameEn})
                  </span>
                </span>
                <span className="text-[10.5px] text-slate-400 hidden sm:block">
                  {t.skinSelectorDesc}
                </span>
              </div>
            </div>

            {/* Wardrobe Modal Trigger */}
            <button
              type="button"
              id="btn-open-wardrobe-modal"
              onClick={() => {
                sound.playClick();
                onOpenSkinModal();
              }}
              className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 text-amber-300 border border-slate-700/80 flex items-center gap-1 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.btnOpenWardrobe}</span>
            </button>
          </div>

          {/* Quick Skin Chips (7 Themes) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {CHARACTER_SKINS.map((skin) => {
              const isSelected = skin.id === selectedSkin;
              return (
                <button
                  key={skin.id}
                  type="button"
                  id={`skin-chip-${skin.id}`}
                  onClick={() => {
                    sound.playClick();
                    onSelectSkin(skin.id);
                  }}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-linear-to-b from-amber-500/25 to-slate-800/90 border-amber-400 shadow-md shadow-amber-950/40 text-amber-200 ring-1 ring-amber-400/50'
                      : 'bg-slate-950/60 hover:bg-slate-800/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-[9px] font-bold shadow-xs">
                      ✓
                    </div>
                  )}
                  <span className="text-xl sm:text-2xl mb-1">{skin.icon}</span>
                  <span className="text-[11px] font-bold leading-tight line-clamp-1">
                    {language === 'vi' ? skin.nameVi : skin.nameEn}
                  </span>
                  <span className="text-[9px] text-slate-400 mt-0.5 font-medium line-clamp-1">
                    {language === 'vi' ? skin.themeTagVi : skin.themeTagEn}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Skin Quick Preview Snippet */}
          <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-1.5 text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5 truncate max-w-full sm:max-w-[48%]">
              <span className="font-semibold text-emerald-400 shrink-0">🌱 Mendel:</span>
              <span className="text-slate-200 truncate">
                {language === 'vi' ? currentSkin.mendel.titleVi : currentSkin.mendel.titleEn} • {language === 'vi' ? currentSkin.mendel.outfitDescVi : currentSkin.mendel.outfitDescEn}
              </span>
            </div>
            <div className="flex items-center gap-1.5 truncate max-w-full sm:max-w-[48%]">
              <span className="font-semibold text-amber-400 shrink-0">🪰 Morgan:</span>
              <span className="text-slate-200 truncate">
                {language === 'vi' ? currentSkin.morgan.titleVi : currentSkin.morgan.titleEn} • {language === 'vi' ? currentSkin.morgan.outfitDescVi : currentSkin.morgan.outfitDescEn}
              </span>
            </div>
          </div>
        </motion.div>

        {/* PRIMARY ACTION BUTTONS (PLAY & SETTING) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full max-w-md flex flex-col sm:flex-row items-stretch gap-3.5"
        >
          {/* PLAY BUTTON (MAIN CTA) */}
          <button
            type="button"
            id="btn-main-play"
            onClick={() => {
              sound.playClick();
              onOpenPlay();
            }}
            className="flex-1 py-4 px-6 rounded-2xl bg-linear-to-r from-emerald-500 via-teal-500 to-amber-500 hover:from-emerald-400 hover:to-amber-400 text-slate-950 font-black text-base sm:text-lg shadow-xl shadow-emerald-950/70 flex items-center justify-center gap-3 cursor-pointer transition-all transform hover:scale-[1.03] active:scale-[0.98]"
          >
            <Play className="w-6 h-6 fill-slate-950" />
            <div className="text-left">
              <div className="leading-none">{t.btnPlay}</div>
              <div className="text-[10.5px] font-semibold text-slate-900 opacity-90 mt-0.5">
                {t.btnPlayDesc}
              </div>
            </div>
            <ChevronRight className="w-5 h-5 ml-auto" />
          </button>

          {/* SETTING BUTTON */}
          <button
            type="button"
            id="btn-main-setting"
            onClick={() => {
              sound.playClick();
              onOpenSettings();
            }}
            className="py-4 px-5 rounded-2xl bg-slate-900 hover:bg-slate-850 text-white font-bold text-sm sm:text-base border border-slate-700/80 shadow-lg shadow-slate-950/60 flex items-center justify-center gap-3 cursor-pointer transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Settings className="w-5 h-5 text-amber-400" />
            <div className="text-left">
              <div className="leading-none">{t.btnSettings}</div>
              <div className="text-[10.5px] font-normal text-slate-400 mt-0.5">
                {t.btnSettingsDesc}
              </div>
            </div>
          </button>
        </motion.div>

        {/* Secondary Navigation Options */}
        <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
          <button
            type="button"
            id="btn-lobby-manage-questions"
            onClick={onOpenQuestions}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold cursor-pointer transition-colors shadow-xs"
          >
            <FileText className="w-3.5 h-3.5 text-sky-400" />
            <span>{t.btnQuestions}</span>
            <span className="font-mono text-[11px] bg-slate-800 px-1.5 py-0.2 rounded text-slate-400">
              {questionsCount} câu
            </span>
          </button>

          <button
            type="button"
            id="btn-lobby-rules"
            onClick={onOpenRules}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold cursor-pointer transition-colors shadow-xs"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.btnRules}</span>
          </button>
        </div>
      </main>

      {/* Bottom Footer Info */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 border-t border-slate-800/60 gap-2">
        <div className="flex items-center gap-2">
          <span>Học phần Di truyền học Sinh học 12 (Chương 1 & 2)</span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <span>
            Thời gian:{' '}
            <strong className="text-slate-400 font-mono">{effectiveTime}</strong>
          </span>
          <span>•</span>
          <span>
            Âm lượng:{' '}
            <strong className="text-slate-400 font-mono">
              {!isSoundEnabled ? 'Tắt' : `${Math.round(volume * 100)}%`}
            </strong>
          </span>
        </div>
      </footer>
    </div>
  );
}
