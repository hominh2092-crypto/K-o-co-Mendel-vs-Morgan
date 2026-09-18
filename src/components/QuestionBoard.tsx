import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, AlertCircle, ArrowRight, HelpCircle, Clock } from 'lucide-react';
import { Question } from '../types';
import BraidedRope from './BraidedRope';

interface QuestionBoardProps {
  side: 'A' | 'B';
  teamName: string;
  characterTitle: string;
  themeColor: 'emerald' | 'amber';
  avatarUrl: string;
  currentQuestion: Question | undefined;
  questionNumber: number;
  totalQuestions: number;
  score: number;
  missedCount: number;
  isActiveTurn: boolean;
  isCompleted: boolean;
  isBot?: boolean;
  botStatusText?: string;
  keyHints: string[];
  timeLimit?: number;
  timeLeft?: number;
  isTimedOut?: boolean;
  onAnswer: (selectedIndex: number) => void;
}

export default function QuestionBoard({
  side,
  teamName,
  characterTitle,
  themeColor,
  avatarUrl,
  currentQuestion,
  questionNumber,
  totalQuestions,
  score,
  missedCount,
  isActiveTurn,
  isCompleted,
  isBot = false,
  botStatusText,
  keyHints,
  timeLimit = 30,
  timeLeft,
  isTimedOut = false,
  onAnswer
}: QuestionBoardProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isAnswering, setIsAnswering] = useState<boolean>(false);

  // Reset local state when current question changes
  useEffect(() => {
    setSelectedOption(null);
    setShowFeedback(false);
    setIsAnswering(false);
  }, [currentQuestion?.id]);

  // If timed out, show feedback
  useEffect(() => {
    if (isTimedOut) {
      setSelectedOption(-1);
      setShowFeedback(true);
      setIsAnswering(true);
    }
  }, [isTimedOut]);

  const handleSelect = (idx: number) => {
    if (isAnswering || showFeedback || !currentQuestion || isCompleted || !isActiveTurn) return;

    setIsAnswering(true);
    setSelectedOption(idx);
    setShowFeedback(true);

    // Call parent handler
    onAnswer(idx);
  };

  const isEmerald = themeColor === 'emerald';
  const borderTone = isEmerald ? 'border-emerald-500/60' : 'border-amber-500/60';
  const headerBg = isEmerald ? 'bg-emerald-950/70' : 'bg-amber-950/70';
  const badgeBg = isEmerald ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300';

  return (
    <div 
      id={`question-board-${side.toLowerCase()}`}
      className={`flex flex-col h-full max-w-sm sm:max-w-md xl:max-w-[430px] w-full mx-auto bg-slate-950/60 backdrop-blur-[2px] rounded-2xl border-2 ${borderTone} shadow-2xl overflow-hidden transition-all duration-300 relative z-20 ${
        !isActiveTurn && !isCompleted ? 'opacity-75 saturate-80' : 'ring-2 ' + (isEmerald ? 'ring-emerald-500/30' : 'ring-amber-500/30')
      }`}
    >
      {/* Heavy-Duty Braided Tug-of-War Rope Header Bar */}
      <div className="relative shrink-0 z-10">
        <BraidedRope
          height={22}
          label={side === 'A' ? '🌱 CỌNG DÂY MENDEL' : '🪰 CỌNG DÂY MORGAN'}
          sublabel={side === 'A' ? 'KÉO TRÁI' : 'KÉO PHẢI'}
          accentColor={isEmerald ? 'emerald' : 'amber'}
          showEndCaps={true}
        />
        {/* Steel Suspension Eyelets / Shackles */}
        <div className="absolute -bottom-1.5 left-5 w-2.5 h-2.5 rounded-full bg-slate-800 border-2 border-slate-400 shadow flex items-center justify-center pointer-events-none z-20">
          <div className="w-1 h-1 rounded-full bg-slate-300" />
        </div>
        <div className="absolute -bottom-1.5 right-5 w-2.5 h-2.5 rounded-full bg-slate-800 border-2 border-slate-400 shadow flex items-center justify-center pointer-events-none z-20">
          <div className="w-1 h-1 rounded-full bg-slate-300" />
        </div>
      </div>

      {/* Board Header - Compact Battle HUD */}
      <div className={`px-2.5 py-1.5 sm:px-3 sm:py-1.5 border-b border-slate-800/70 ${headerBg} backdrop-blur-xs flex items-center justify-between gap-2 shrink-0`}>
        <div className="flex items-center gap-1.5">
          <div className={`w-7 h-7 rounded-lg overflow-hidden border-2 shrink-0 ${isEmerald ? 'border-emerald-400' : 'border-amber-400'}`}>
            <img 
              src={avatarUrl} 
              alt={teamName} 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded ${badgeBg}`}>
                {side === 'A' ? '← Bên A' : 'Bên B →'}
              </span>
              <h3 className="font-bold text-xs sm:text-[13px] text-white leading-none">{teamName}</h3>
            </div>
            <p className="text-[9px] text-slate-400 line-clamp-1 mt-0.5">{characterTitle}</p>
          </div>
        </div>

        {/* Question progress and scores */}
        <div className="flex items-center gap-1.5 text-xs font-mono">
          {/* Timer Badge */}
          {timeLimit > 0 ? (
            <div 
              className={`px-2 py-0.5 rounded-md flex items-center gap-1 font-mono text-[11px] font-bold border transition-all ${
                timeLeft !== undefined && timeLeft <= 5
                  ? 'bg-rose-950/90 text-rose-300 border-rose-500 shadow-sm shadow-rose-900/50 animate-pulse ring-1 ring-rose-400'
                  : timeLeft !== undefined && timeLeft <= 10
                  ? 'bg-amber-950/90 text-amber-300 border-amber-500/70'
                  : isEmerald
                  ? 'bg-emerald-950/90 text-emerald-300 border-emerald-600/70'
                  : 'bg-amber-950/90 text-amber-300 border-amber-600/70'
              }`}
              title={`Thời gian còn lại: ${timeLeft ?? timeLimit}s`}
            >
              <Clock className={`w-3 h-3 ${timeLeft !== undefined && timeLeft <= 5 ? 'text-rose-400 animate-spin' : 'text-slate-400'}`} />
              <span>{timeLeft ?? timeLimit}s</span>
            </div>
          ) : (
            <div className="px-1.5 py-0.5 rounded-md flex items-center gap-1 font-mono text-[10px] text-slate-400 bg-slate-900/80 border border-slate-700/60" title="Không giới hạn thời gian">
              <Clock className="w-2.5 h-2.5 text-slate-500" />
              <span>∞</span>
            </div>
          )}

          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isEmerald ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60' : 'bg-amber-950/80 text-amber-300 border border-amber-700/60'}`}>
            {questionNumber}/{totalQuestions}
          </span>
          <div className="px-1.5 py-0.5 bg-emerald-950/80 border border-emerald-500/50 rounded text-emerald-300 flex items-center gap-1 text-[10px]">
            <span className="text-[8px] text-emerald-400/90 font-sans">ĐÚNG</span>
            <span className="font-bold">{score}</span>
          </div>
          <div className="px-1.5 py-0.5 bg-rose-950/80 border border-rose-500/50 rounded text-rose-300 flex items-center gap-1 text-[10px]">
            <span className="text-[8px] text-rose-400/90 font-sans">BỎ</span>
            <span className="font-bold">{missedCount}</span>
          </div>
        </div>
      </div>

      {/* Dynamic Countdown Progress Bar */}
      {timeLimit > 0 && !isCompleted && (
        <div className="w-full bg-slate-900/90 h-1.5 relative overflow-hidden border-b border-slate-800/80">
          <div 
            className={`h-full transition-all duration-1000 ease-linear ${
              timeLeft !== undefined && timeLeft <= 5
                ? 'bg-rose-500 shadow-xs shadow-rose-500 animate-pulse'
                : timeLeft !== undefined && timeLeft <= 10
                ? 'bg-amber-400'
                : isEmerald
                ? 'bg-emerald-400'
                : 'bg-amber-400'
            }`}
            style={{
              width: `${Math.max(0, Math.min(100, ((timeLeft ?? timeLimit) / timeLimit) * 100))}%`
            }}
          />
        </div>
      )}

      {/* Turn alert banner if turn-based */}
      {!isActiveTurn && !isCompleted && (
        <div className="bg-slate-800/90 px-3 py-1 text-center text-[11px] text-slate-400 border-b border-slate-700/50 flex items-center justify-center gap-1.5 shrink-0">
          <AlertCircle className="w-3 h-3 text-amber-400" />
          <span>Đang đợi lượt của đối thủ...</span>
        </div>
      )}

      {/* Bot thinking indicator */}
      {isBot && isActiveTurn && !isCompleted && (
        <div className="bg-amber-950/60 px-3 py-1 text-center text-[11px] text-amber-300 border-b border-amber-800/50 flex items-center justify-center gap-1.5 animate-pulse shrink-0">
          <span>🤖 {botStatusText || 'Morgan AI đang suy nghĩ...'}</span>
        </div>
      )}

      {/* Content Area - Translucent to reveal Tug-of-War rope behind */}
      <div className="p-2 sm:p-2.5 flex-1 flex flex-col justify-between overflow-y-auto min-h-0 bg-transparent">
        {isCompleted ? (
          /* Finished State */
          <div className="my-auto py-3 text-center flex flex-col items-center justify-center space-y-1.5">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isEmerald ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-white">Đã hoàn thành 10/10 câu!</h4>
            <p className="text-[11px] text-slate-400 max-w-xs">
              Bên {side} ({teamName}) đạt <span className="font-bold text-emerald-400">{score}</span> đúng (kéo thành công), bỏ qua <span className="font-bold text-rose-400">{missedCount}</span>.
            </p>
          </div>
        ) : currentQuestion ? (
          /* Active Question State */
          <div className="flex flex-col h-full justify-between gap-1">
            <div>
              {/* Question metadata */}
              <div className="flex items-center justify-between gap-1.5 mb-0.5">
                <span className="text-[9.5px] font-semibold text-slate-400 uppercase tracking-wide flex items-center gap-1">
                  <HelpCircle className="w-2.5 h-2.5 text-sky-400" />
                  Chủ đề: <span className="text-sky-300 font-medium">{currentQuestion.topic}</span>
                </span>
                <span className="text-[9.5px] text-slate-400 italic">
                  {side === 'A' ? '🌱 Kéo về trái' : '🪰 Kéo về phải'}
                </span>
              </div>

              {/* Question Text */}
              <h4 className="text-xs sm:text-[12.5px] font-semibold text-slate-100 leading-snug">
                {currentQuestion.question}
              </h4>
            </div>

            {/* Answer Options: 2x2 Grid on sm screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-1.5 my-0.5">
              {currentQuestion.options.map((optionText, idx) => {
                const optLetter = ['A', 'B', 'C', 'D'][idx];
                const keyHint = keyHints[idx];
                const isChosen = selectedOption === idx;
                const isCorrect = idx === currentQuestion.correctIndex;

                // Color calculation when feedback is displayed (translucent for rope visibility)
                let btnStyle = 'bg-slate-900/60 hover:bg-slate-800/80 backdrop-blur-xs text-slate-200 border-slate-700/60 hover:border-slate-500/80';
                let letterStyle = isEmerald ? 'bg-emerald-900/60 text-emerald-300 border-emerald-600/40' : 'bg-amber-900/60 text-amber-300 border-amber-600/40';

                if (showFeedback) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950/85 backdrop-blur-xs border-emerald-500 text-emerald-100 ring-1.5 ring-emerald-500/60';
                    letterStyle = 'bg-emerald-600 text-white border-emerald-400';
                  } else if (isChosen && !isCorrect) {
                    btnStyle = 'bg-rose-950/85 backdrop-blur-xs border-rose-500 text-rose-100 ring-1.5 ring-rose-500/60';
                    letterStyle = 'bg-rose-600 text-white border-rose-400';
                  } else {
                    btnStyle = 'bg-slate-900/30 border-slate-800/50 text-slate-500 opacity-40';
                    letterStyle = 'bg-slate-800/60 text-slate-500 border-slate-700/50';
                  }
                }

                return (
                  <button
                    key={idx}
                    id={`btn-${side.toLowerCase()}-opt-${optLetter.toLowerCase()}`}
                    disabled={!isActiveTurn || showFeedback || isBot}
                    onClick={() => handleSelect(idx)}
                    className={`text-left p-1.5 sm:p-2 rounded-xl border transition-all flex items-start gap-1.5 cursor-pointer disabled:cursor-not-allowed ${btnStyle}`}
                  >
                    {/* Option Letter Tag (A, B, C, D) */}
                    <div className={`w-5 h-5 rounded-md font-bold text-[11px] flex items-center justify-center shrink-0 border mt-0.2 ${letterStyle}`}>
                      {optLetter}
                    </div>

                    {/* Option Text */}
                    <span className="text-[10.5px] sm:text-[11px] font-medium leading-tight flex-1">
                      {optionText}
                    </span>

                    {/* Keyboard Hint */}
                    {keyHint && !showFeedback && (
                      <span className="hidden xl:inline-block text-[8px] font-mono text-slate-400 bg-slate-900/80 px-1 rounded border border-slate-700/60 shrink-0">
                        {keyHint.split('/')[0].trim()}
                      </span>
                    )}

                    {/* Status icons during feedback */}
                    {showFeedback && isCorrect && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 self-center" />
                    )}
                    {showFeedback && isChosen && !isCorrect && (
                      <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 self-center" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Instant Answer Feedback Message */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`p-1.5 sm:p-2 rounded-xl border text-[10.5px] backdrop-blur-xs ${
                    isTimedOut
                      ? 'bg-rose-950/90 border-rose-500/80 text-rose-200 ring-1 ring-rose-400'
                      : selectedOption === currentQuestion.correctIndex
                      ? 'bg-emerald-950/90 border-emerald-500/80 text-emerald-200'
                      : 'bg-rose-950/90 border-rose-500/80 text-rose-200'
                  }`}
                >
                  <div className="flex items-start gap-1.5">
                    {isTimedOut ? (
                      <>
                        <Clock className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5 animate-bounce" />
                        <div>
                          <p className="font-bold text-rose-300">
                            ⏰ Hết thời gian suy nghĩ! Bỏ qua câu hỏi này (Dây giữ nguyên).
                          </p>
                          <p className="text-[9.5px] text-rose-300/80 mt-0.2 line-clamp-2">
                            Đáp án đúng: <span className="font-semibold text-white">
                              {['A', 'B', 'C', 'D'][currentQuestion.correctIndex]}. {currentQuestion.options[currentQuestion.correctIndex]}
                            </span>
                          </p>
                        </div>
                      </>
                    ) : selectedOption === currentQuestion.correctIndex ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-emerald-300">
                            Chính xác! Lực kéo +1 về phía Bên {side}!
                          </p>
                          <p className="text-[9.5px] text-emerald-300/80 mt-0.2 line-clamp-2">
                            {currentQuestion.explanation}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3 text-rose-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-rose-300">
                            Chưa chính xác! Dây không dịch chuyển (Bỏ qua).
                          </p>
                          <p className="text-[9.5px] text-rose-300/80 mt-0.2 line-clamp-2">
                            Đáp án: <span className="font-semibold text-white">
                              {['A', 'B', 'C', 'D'][currentQuestion.correctIndex]}. {currentQuestion.options[currentQuestion.correctIndex]}
                            </span>
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-4 text-slate-400 text-xs">Không có câu hỏi.</div>
        )}
      </div>
    </div>
  );
}
