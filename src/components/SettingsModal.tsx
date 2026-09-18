import { useState, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  Volume1,
  VolumeX,
  Languages,
  Clock,
  Check,
  X,
  Play,
  Sliders,
  Sparkles
} from 'lucide-react';
import { Language, TimeSettings } from '../types';
import { getT } from '../utils/translations';
import { sound } from '../utils/soundEffects';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  volume: number; // 0 to 1
  onVolumeChange: (vol: number) => void;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
  timeSettings: TimeSettings;
  onOpenTimeSettings: () => void;
}

export default function SettingsModal({
  isOpen,
  onClose,
  language,
  onLanguageChange,
  volume,
  onVolumeChange,
  isSoundEnabled,
  onToggleSound,
  timeSettings,
  onOpenTimeSettings,
}: SettingsModalProps) {
  const t = getT(language);
  const [localVolume, setLocalVolume] = useState<number>(volume);

  if (!isOpen) return null;

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setLocalVolume(val);
    onVolumeChange(val);
    sound.setVolume(val);
  };

  const handleSetQuickVolume = (val: number) => {
    setLocalVolume(val);
    onVolumeChange(val);
    sound.setVolume(val);
    sound.playClick();
  };

  const handleTestSound = () => {
    sound.playTestSound();
  };

  const volumePercent = Math.round(localVolume * 100);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto"
        >
          {/* Header Banner */}
          <div className="relative px-6 py-4 bg-linear-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 shadow-md">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                  {t.settingsTitle}
                </h2>
                <p className="text-xs text-slate-400">{t.settingsDesc}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 sm:p-6 space-y-6">
            {/* 1. LANGUAGE SETTING (CHỈNH TIẾNG VIỆT HOẶC TIẾNG ANH) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Languages className="w-4 h-4 text-emerald-400" />
                  <span>{t.langSectionTitle}</span>
                </label>
                <span className="text-[11px] text-slate-400 font-mono">
                  {language === 'vi' ? '🇻🇳 VI' : '🇬🇧 EN'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Tiếng Việt */}
                <button
                  type="button"
                  id="btn-lang-vi"
                  onClick={() => {
                    onLanguageChange('vi');
                    sound.playClick();
                  }}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                    language === 'vi'
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/30 font-bold'
                      : 'bg-slate-850 border-slate-700/80 text-slate-400 hover:text-slate-200 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🇻🇳</span>
                    <div className="text-left">
                      <div className="text-xs sm:text-sm font-semibold text-white">
                        Tiếng Việt
                      </div>
                      <div className="text-[10px] text-slate-400">Mặc định</div>
                    </div>
                  </div>
                  {language === 'vi' && (
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </button>

                {/* English */}
                <button
                  type="button"
                  id="btn-lang-en"
                  onClick={() => {
                    onLanguageChange('en');
                    sound.playClick();
                  }}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                    language === 'en'
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/30 font-bold'
                      : 'bg-slate-850 border-slate-700/80 text-slate-400 hover:text-slate-200 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🇬🇧</span>
                    <div className="text-left">
                      <div className="text-xs sm:text-sm font-semibold text-white">
                        English
                      </div>
                      <div className="text-[10px] text-slate-400">International</div>
                    </div>
                  </div>
                  {language === 'en' && (
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* 2. VOLUME SETTING (TĂNG GIẢM ÂM LƯỢNG) */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  {localVolume === 0 || !isSoundEnabled ? (
                    <VolumeX className="w-4 h-4 text-rose-400" />
                  ) : localVolume < 0.5 ? (
                    <Volume1 className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-amber-400" />
                  )}
                  <span>{t.volumeSectionTitle}</span>
                </label>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/50">
                    {!isSoundEnabled ? 'Tắt âm' : `${volumePercent}%`}
                  </span>
                  <button
                    type="button"
                    onClick={onToggleSound}
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold border cursor-pointer transition-colors ${
                      isSoundEnabled
                        ? 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                        : 'bg-rose-950 text-rose-300 border-rose-700/60'
                    }`}
                  >
                    {isSoundEnabled ? t.btnMute : t.btnUnmute}
                  </button>
                </div>
              </div>

              {/* Master Volume Slider */}
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleSetQuickVolume(0)}
                    className="text-slate-400 hover:text-white cursor-pointer"
                    title="0%"
                  >
                    <VolumeX className="w-4 h-4" />
                  </button>

                  <input
                    type="range"
                    id="volume-range-slider"
                    min="0"
                    max="1"
                    step="0.05"
                    value={localVolume}
                    disabled={!isSoundEnabled}
                    onChange={handleSliderChange}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500 disabled:opacity-40"
                  />

                  <button
                    type="button"
                    onClick={() => handleSetQuickVolume(1)}
                    className="text-slate-400 hover:text-white cursor-pointer"
                    title="100%"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Quick Presets & Test Sound */}
                <div className="flex items-center justify-between pt-1 gap-2 flex-wrap">
                  <div className="flex items-center gap-1">
                    {[0.25, 0.5, 0.75, 1].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => handleSetQuickVolume(p)}
                        className={`px-2 py-1 rounded text-[11px] font-mono font-medium border cursor-pointer transition-colors ${
                          Math.abs(localVolume - p) < 0.05 && isSoundEnabled
                            ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                        }`}
                      >
                        {Math.round(p * 100)}%
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    id="btn-test-sound"
                    onClick={handleTestSound}
                    disabled={!isSoundEnabled || localVolume === 0}
                    className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <Play className="w-3 h-3 fill-amber-300" />
                    <span>{t.btnTestSound}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 3. TIME SETTINGS SHORTCUT */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between bg-slate-950/50 p-3 rounded-xl border">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-sky-400 border border-slate-700">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">
                    {t.timeSectionTitle}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {t.currentTimeLabel}{' '}
                    <span className="font-bold text-sky-300 font-mono">
                      {timeSettings.mode === 'shared'
                        ? timeSettings.sharedSeconds === 0
                          ? t.unlimited
                          : `${timeSettings.sharedSeconds}s`
                        : `A: ${timeSettings.teamASeconds}s | B: ${timeSettings.teamBSeconds}s`}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenTimeSettings();
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 text-xs font-semibold border border-slate-700 cursor-pointer transition-colors"
              >
                {t.btnCustomizeTime}
              </button>
            </div>
          </div>

          {/* Action Footer */}
          <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-end">
            <button
              type="button"
              id="btn-close-settings"
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer transition-all shadow-md shadow-emerald-950/50"
            >
              {t.btnClose}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
