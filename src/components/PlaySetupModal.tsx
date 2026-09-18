import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Users, Swords, ArrowRight, X, Sparkles, Check } from 'lucide-react';
import { MatchType, ScientistChoice, GameMode, Language } from '../types';
import { getT } from '../utils/translations';
import { TEAM_A_PROFILE, TEAM_B_PROFILE } from '../data/biologyQuestions';
import { sound } from '../utils/soundEffects';

interface PlaySetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onStartBattle: (config: {
    matchType: MatchType;
    chosenScientist: ScientistChoice;
    gameMode: GameMode;
  }) => void;
}

export default function PlaySetupModal({
  isOpen,
  onClose,
  language,
  onStartBattle,
}: PlaySetupModalProps) {
  const t = getT(language);

  // Step 1: Match Type ('vs-bot' vs 'pvp')
  const [matchType, setMatchType] = useState<MatchType>('vs-bot');

  // Sub-option for PvP (Simultaneous vs Turn-Based)
  const [pvpMode, setPvpMode] = useState<'simultaneous' | 'turn-based'>('simultaneous');

  // Step 2: Scientist choice ('A' for Mendel, 'B' for Morgan)
  const [chosenScientist, setChosenScientist] = useState<ScientistChoice>('A');

  if (!isOpen) return null;

  const handleStart = () => {
    sound.playWhistle();
    const effectiveGameMode: GameMode =
      matchType === 'vs-bot' ? 'vs-bot' : pvpMode;

    onStartBattle({
      matchType,
      chosenScientist,
      gameMode: effectiveGameMode,
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto"
        >
          {/* Header Banner */}
          <div className="relative px-6 py-4 bg-linear-to-r from-emerald-950/90 via-slate-900 to-amber-950/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-amber-500 flex items-center justify-center text-white shadow-md text-xl">
                ⚔️
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  {t.setupTitle}
                </h2>
                <p className="text-xs text-slate-400">
                  {matchType === 'vs-bot' ? t.modeVsBot : t.modePvP}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* STEP 1: CHỌN HÌNH THỨC THI ĐẤU (2 LỰA CHỌN) */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center text-[11px]">
                    1
                  </span>
                  {t.step1Title}
                </label>
                <span className="text-[11px] text-slate-400">
                  {matchType === 'vs-bot' ? 'Chơi đơn với AI' : 'Thi đấu đối kháng'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Lựa chọn 1: Kéo với máy */}
                <button
                  type="button"
                  id="btn-choice-vs-bot"
                  onClick={() => {
                    sound.playClick();
                    setMatchType('vs-bot');
                  }}
                  className={`p-4 rounded-xl border text-left transition-all relative cursor-pointer flex flex-col justify-between ${
                    matchType === 'vs-bot'
                      ? 'bg-slate-800/90 border-emerald-500 shadow-md shadow-emerald-950/50 ring-2 ring-emerald-500/30'
                      : 'bg-slate-850/50 border-slate-700/60 hover:border-slate-600 hover:bg-slate-800/50 text-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      <Bot className="w-5 h-5" />
                    </div>
                    {matchType === 'vs-bot' && (
                      <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white flex items-center gap-1.5 mb-1">
                      {t.modeVsBot}
                    </h3>
                    <p className="text-[11.5px] text-slate-400 leading-relaxed">
                      {t.modeVsBotDesc}
                    </p>
                  </div>
                </button>

                {/* Lựa chọn 2: 2 người chơi */}
                <button
                  type="button"
                  id="btn-choice-pvp"
                  onClick={() => {
                    sound.playClick();
                    setMatchType('pvp');
                  }}
                  className={`p-4 rounded-xl border text-left transition-all relative cursor-pointer flex flex-col justify-between ${
                    matchType === 'pvp'
                      ? 'bg-slate-800/90 border-amber-500 shadow-md shadow-amber-950/50 ring-2 ring-amber-500/30'
                      : 'bg-slate-850/50 border-slate-700/60 hover:border-slate-600 hover:bg-slate-800/50 text-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400">
                      <Users className="w-5 h-5" />
                    </div>
                    {matchType === 'pvp' && (
                      <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white flex items-center gap-1.5 mb-1">
                      {t.modePvP}
                    </h3>
                    <p className="text-[11.5px] text-slate-400 leading-relaxed">
                      {t.modePvPDesc}
                    </p>
                  </div>
                </button>
              </div>

              {/* PvP Sub-options: Simultaneous or Turn-based */}
              {matchType === 'pvp' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 p-3 bg-slate-950/70 border border-slate-800 rounded-xl"
                >
                  <p className="text-[11px] text-slate-400 font-medium mb-2">
                    {t.pvpSubModeTitle}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPvpMode('simultaneous')}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                        pvpMode === 'simultaneous'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 ring-1 ring-amber-500/40'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      <Swords className="w-3.5 h-3.5" />
                      <span>{t.pvpSimultaneous}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPvpMode('turn-based')}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                        pvpMode === 'turn-based'
                          ? 'bg-sky-500/20 text-sky-300 border-sky-500/60 ring-1 ring-sky-500/40'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>{t.pvpTurnBased}</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* STEP 2: CHỌN MENDEL HOẶC MORGAN */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center text-[11px]">
                    2
                  </span>
                  {t.step2Title}
                </label>
                <span className="text-[11px] text-slate-400">
                  {matchType === 'vs-bot'
                    ? chosenScientist === 'A'
                      ? 'Bạn là Mendel vs Máy là Morgan'
                      : 'Bạn là Morgan vs Máy là Mendel'
                    : chosenScientist === 'A'
                    ? 'P1: Mendel | P2: Morgan'
                    : 'P1: Morgan | P2: Mendel'}
                </span>
              </div>

              <p className="text-xs text-slate-400 mb-3">
                {matchType === 'vs-bot' ? t.step2DescVsBot : t.step2DescPvP}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Scientist Option 1: Gregor Mendel */}
                <button
                  type="button"
                  id="btn-choose-mendel"
                  onClick={() => {
                    sound.playClick();
                    setChosenScientist('A');
                  }}
                  className={`p-4 rounded-xl border text-left transition-all relative cursor-pointer group ${
                    chosenScientist === 'A'
                      ? 'bg-linear-to-b from-emerald-950/70 to-slate-900 border-emerald-500 shadow-lg shadow-emerald-950/60 ring-2 ring-emerald-500/30'
                      : 'bg-slate-850/40 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={TEAM_A_PROFILE.avatarUrl}
                      alt={TEAM_A_PROFILE.name}
                      referrerPolicy="no-referrer"
                      className={`w-14 h-14 rounded-xl object-cover border-2 shrink-0 transition-transform ${
                        chosenScientist === 'A'
                          ? 'border-emerald-400 shadow-md shadow-emerald-900/50 scale-105'
                          : 'border-slate-700 grayscale-30'
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                          {t.mendelColorLabel}
                        </span>
                        {chosenScientist === 'A' && (
                          <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </span>
                        )}
                      </div>
                      <h4 className="font-extrabold text-sm sm:text-base text-white mt-1">
                        {t.mendelName}
                      </h4>
                      <p className="text-[11px] text-emerald-300 font-medium">
                        {t.mendelTitle}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 space-y-1">
                    <div className="text-[11px] text-slate-300 flex items-center gap-1.5">
                      <span>🌱</span>
                      <span className="font-semibold text-white">Đối tượng:</span>
                      <span className="truncate">{t.mendelOrganism}</span>
                    </div>
                    <div className="text-[10.5px] text-slate-400">
                      🧬 <span className="font-semibold text-slate-300">Nội dung:</span> {t.mendelSpecialty}
                    </div>
                  </div>
                </button>

                {/* Scientist Option 2: Thomas Hunt Morgan */}
                <button
                  type="button"
                  id="btn-choose-morgan"
                  onClick={() => {
                    sound.playClick();
                    setChosenScientist('B');
                  }}
                  className={`p-4 rounded-xl border text-left transition-all relative cursor-pointer group ${
                    chosenScientist === 'B'
                      ? 'bg-linear-to-b from-amber-950/70 to-slate-900 border-amber-500 shadow-lg shadow-amber-950/60 ring-2 ring-amber-500/30'
                      : 'bg-slate-850/40 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={TEAM_B_PROFILE.avatarUrl}
                      alt={TEAM_B_PROFILE.name}
                      referrerPolicy="no-referrer"
                      className={`w-14 h-14 rounded-xl object-cover border-2 shrink-0 transition-transform ${
                        chosenScientist === 'B'
                          ? 'border-amber-400 shadow-md shadow-amber-900/50 scale-105'
                          : 'border-slate-700 grayscale-30'
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/60">
                          {t.morganColorLabel}
                        </span>
                        {chosenScientist === 'B' && (
                          <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </span>
                        )}
                      </div>
                      <h4 className="font-extrabold text-sm sm:text-base text-white mt-1">
                        {t.morganName}
                      </h4>
                      <p className="text-[11px] text-amber-300 font-medium">
                        {t.morganTitle}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 space-y-1">
                    <div className="text-[11px] text-slate-300 flex items-center gap-1.5">
                      <span>🪰</span>
                      <span className="font-semibold text-white">Đối tượng:</span>
                      <span className="truncate">{t.morganOrganism}</span>
                    </div>
                    <div className="text-[10.5px] text-slate-400 line-clamp-1">
                      🧬 <span className="font-semibold text-slate-300">Nội dung:</span> {t.morganSpecialty}
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Quick Match Summary Box */}
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">
                  {chosenScientist === 'A' ? '🌿 ' + t.mendelName : '🪰 ' + t.morganName}
                </span>
                <span className="text-slate-500">VS</span>
                <span className="text-amber-400 font-bold">
                  {chosenScientist === 'A'
                    ? matchType === 'vs-bot' ? '🤖 Morgan AI' : '🪰 ' + t.morganName
                    : matchType === 'vs-bot' ? '🤖 Mendel AI' : '🌿 ' + t.mendelName}
                </span>
              </div>

              <span className="text-slate-400 text-[11px] bg-slate-900 px-2 py-1 rounded border border-slate-800">
                10 Câu hỏi • Kéo co 5 nấc
              </span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer transition-colors"
            >
              {t.btnCancel}
            </button>

            <button
              type="button"
              id="btn-confirm-start-battle"
              onClick={handleStart}
              className="flex-1 sm:flex-initial px-7 py-2.5 rounded-xl bg-linear-to-r from-emerald-500 via-teal-500 to-amber-500 hover:from-emerald-400 hover:to-amber-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2 cursor-pointer transition-all transform hover:scale-[1.02]"
            >
              <Swords className="w-4 h-4" />
              <span>{t.btnStartMatch}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
