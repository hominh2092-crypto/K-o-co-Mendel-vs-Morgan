import { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, RotateCcw, BookOpen, CheckCircle, XCircle, ChevronDown, ChevronUp, Share2, Award } from 'lucide-react';
import { Question, AnswerRecord } from '../types';
import mendelAvatar from '../assets/images/mendel_portrait_1788943551781.jpg';
import morganAvatar from '../assets/images/morgan_portrait_1788943564933.jpg';

interface GameOverModalProps {
  winner: 'A' | 'B' | 'TIE';
  pullPosition: number;
  mendelScore: number;
  morganScore: number;
  mendelAnswers: AnswerRecord[];
  morganAnswers: AnswerRecord[];
  onRestart: () => void;
}

export default function GameOverModal({
  winner,
  pullPosition,
  mendelScore,
  morganScore,
  mendelAnswers,
  morganAnswers,
  onRestart
}: GameOverModalProps) {
  const [activeTab, setActiveTab] = useState<'summary' | 'review'>('summary');
  const [reviewSide, setReviewSide] = useState<'A' | 'B'>('A');

  const winnerData = winner === 'A' ? {
    name: 'Gregor Mendel',
    sideName: 'Bên A (Gregor Mendel)',
    title: 'Đậu Hà Lan đã kéo phăng đối thủ về vạch chiến thắng!',
    avatar: mendelAvatar,
    color: 'emerald',
    badge: '🌿 Bậc thầy Di truyền cổ điển'
  } : winner === 'B' ? {
    name: 'Thomas Hunt Morgan',
    sideName: 'Bên B (Thomas Hunt Morgan)',
    title: 'Ruồi giấm và liên kết gen đã xuất sắc giành thắng lợi!',
    avatar: morganAvatar,
    color: 'amber',
    badge: '🪰 Đỉnh cao Di truyền NST'
  } : {
    name: 'Bất phân thắng bại',
    sideName: 'Hòa nhau',
    title: 'Hai nhà sinh học vĩ đại đều thể hiện kiến thức tuyệt đỉnh!',
    avatar: null,
    color: 'sky',
    badge: '⚖️ Cân bằng tuyệt đối'
  };

  return (
    <div id="game-over-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-6"
      >
        {/* Modal Header */}
        <div className={`p-6 text-center relative overflow-hidden ${
          winner === 'A' 
            ? 'bg-linear-to-b from-emerald-950 via-emerald-900/60 to-slate-900' 
            : winner === 'B' 
            ? 'bg-linear-to-b from-amber-950 via-amber-900/60 to-slate-900' 
            : 'bg-linear-to-b from-sky-950 via-slate-900 to-slate-900'
        }`}>
          {/* Winner Icon & Avatar */}
          <div className="relative inline-block mb-3">
            {winnerData.avatar ? (
              <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-4 shadow-xl mx-auto ${
                winner === 'A' ? 'border-emerald-400 shadow-emerald-500/30' : 'border-amber-400 shadow-amber-500/30'
              }`}>
                <img 
                  src={winnerData.avatar} 
                  alt={winnerData.name} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-2xl bg-sky-950 border-4 border-sky-400 flex items-center justify-center mx-auto text-4xl">
                🤝
              </div>
            )}

            <div className="absolute -bottom-2.5 -right-2.5 p-1.5 rounded-full bg-yellow-500 text-slate-950 shadow-lg">
              <Trophy className="w-5 h-5 fill-current" />
            </div>
          </div>

          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-800/90 text-amber-300 border border-slate-700 mb-2">
            {winnerData.badge}
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {winner === 'TIE' ? 'TRẬN ĐẤU HÒA!' : `${winnerData.sideName} THẮNG!`}
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-md mx-auto">
            {winnerData.title}
          </p>

          {/* Navigation Tabs */}
          <div className="flex items-center justify-center gap-2 mt-5">
            <button
              onClick={() => setActiveTab('summary')}
              className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'summary'
                  ? 'bg-white text-slate-950 shadow'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Tổng kết trận đấu
            </button>
            <button
              onClick={() => setActiveTab('review')}
              className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'review'
                  ? 'bg-white text-slate-950 shadow'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Xem lại 20 câu hỏi & lời giải
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[58vh] overflow-y-auto">
          {activeTab === 'summary' ? (
            <div className="space-y-5">
              {/* Score comparison card */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {/* Mendel box */}
                <div className={`p-4 rounded-xl border ${winner === 'A' ? 'bg-emerald-950/50 border-emerald-500/70 ring-1 ring-emerald-500/30' : 'bg-slate-800/60 border-slate-700'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="font-bold text-sm text-emerald-300">Bên A: Mendel</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                    {mendelScore} <span className="text-xs font-normal text-slate-400">/ 10 câu đúng</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Tỉ lệ đúng: <span className="font-semibold text-emerald-400">{Math.round((mendelScore / 10) * 100)}%</span>
                  </div>
                  <div className="text-xs text-rose-400 mt-0.5">
                    Bỏ qua: {10 - mendelScore} câu
                  </div>
                </div>

                {/* Morgan box */}
                <div className={`p-4 rounded-xl border ${winner === 'B' ? 'bg-amber-950/50 border-amber-500/70 ring-1 ring-amber-500/30' : 'bg-slate-800/60 border-slate-700'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="font-bold text-sm text-amber-300">Bên B: Morgan</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                    {morganScore} <span className="text-xs font-normal text-slate-400">/ 10 câu đúng</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Tỉ lệ đúng: <span className="font-semibold text-amber-400">{Math.round((morganScore / 10) * 100)}%</span>
                  </div>
                  <div className="text-xs text-rose-400 mt-0.5">
                    Bỏ qua: {10 - morganScore} câu
                  </div>
                </div>
              </div>

              {/* Rope final position badge */}
              <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center justify-between text-xs sm:text-sm">
                <span className="text-slate-300 font-medium">Vị trí chốt dây cuối cùng:</span>
                <span className="font-mono font-bold text-white px-2 py-0.5 rounded bg-slate-900 border border-slate-700">
                  {pullPosition === 0
                    ? 'Chính giữa (0)'
                    : pullPosition < 0
                    ? `Nghiêng về Bên A (${Math.abs(pullPosition)} nấc)`
                    : `Nghiêng về Bên B (+${pullPosition} nấc)`}
                </span>
              </div>

              {/* Learning note */}
              <div className="bg-sky-950/40 border border-sky-800/50 rounded-xl p-3.5 text-xs text-sky-200">
                <p className="font-semibold text-sky-300 mb-1 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-sky-400" />
                  Ghi nhớ Sinh học 12 Giữa kì 1:
                </p>
                <p className="leading-relaxed text-slate-300">
                  Gregor Mendel đặt nền móng với định luật Phân ly và Phân ly độc lập trên Đậu Hà Lan. Thomas Hunt Morgan phát triển thuyết Di truyền NST với Liên kết gen hoàn toàn, Hoán vị gen và Di truyền liên kết giới tính trên Ruồi giấm!
                </p>
              </div>
            </div>
          ) : (
            /* Review Questions & Answers Tab */
            <div className="space-y-4">
              {/* Selector for which side to review */}
              <div className="flex items-center justify-center gap-2 mb-3">
                <button
                  onClick={() => setReviewSide('A')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    reviewSide === 'A'
                      ? 'bg-emerald-600 text-white shadow'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  Bảng câu hỏi Bên A (Mendel - 10 câu)
                </button>
                <button
                  onClick={() => setReviewSide('B')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    reviewSide === 'B'
                      ? 'bg-amber-600 text-white shadow'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  Bảng câu hỏi Bên B (Morgan - 10 câu)
                </button>
              </div>

              {/* Question list for the selected side */}
              <div className="space-y-3">
                {(reviewSide === 'A' ? mendelAnswers : morganAnswers).map((item, idx) => {
                  const q = item.question;
                  return (
                    <div 
                      key={q.id} 
                      className={`p-3 rounded-xl border text-xs ${
                        item.isCorrect 
                          ? 'bg-emerald-950/30 border-emerald-500/40' 
                          : 'bg-rose-950/30 border-rose-500/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <span className="font-bold text-white">
                          Câu {idx + 1}: [{q.topic}]
                        </span>
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          item.isCorrect 
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        }`}>
                          {item.isCorrect ? '✓ Đúng (+1 Dây)' : '✕ Sai (Bỏ qua)'}
                        </span>
                      </div>
                      <p className="text-slate-200 mb-2 font-medium">{q.question}</p>

                      <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800 space-y-1">
                        <div className="text-emerald-400 font-semibold">
                          Đáp án đúng: {['A', 'B', 'C', 'D'][q.correctIndex]}. {q.options[q.correctIndex]}
                        </div>
                        {!item.isCorrect && item.selectedOption >= 0 && (
                          <div className="text-rose-400">
                            Bạn đã chọn: {['A', 'B', 'C', 'D'][item.selectedOption]}. {q.options[item.selectedOption]}
                          </div>
                        )}
                        <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800 mt-1 italic">
                          💡 Giải thích: {q.explanation}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={() => setActiveTab(activeTab === 'summary' ? 'review' : 'summary')}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-750 transition-all cursor-pointer"
          >
            {activeTab === 'summary' ? '📖 Lời giải chi tiết' : '📊 Xem tổng kết'}
          </button>

          <button
            id="btn-play-again"
            onClick={onRestart}
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-linear-to-r from-emerald-500 to-teal-500 text-slate-950 hover:from-emerald-400 hover:to-teal-400 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
          >
            <RotateCcw className="w-4 h-4" />
            Chơi Ván Mới
          </button>
        </div>
      </motion.div>
    </div>
  );
}
