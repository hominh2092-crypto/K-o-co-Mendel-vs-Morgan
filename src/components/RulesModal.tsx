import { motion } from 'motion/react';
import { X, CheckCircle, AlertTriangle, Lightbulb, Sparkles, BookOpen } from 'lucide-react';
import mendelAvatar from '../assets/images/mendel_portrait_1788943551781.jpg';
import morganAvatar from '../assets/images/morgan_portrait_1788943564933.jpg';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RulesModal({ isOpen, onClose }: RulesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-6"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base sm:text-lg text-white">
              Luật Chơi Kéo Co & Kiến Thức Sinh Học 12
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 space-y-4 text-xs sm:text-sm text-slate-300 max-h-[70vh] overflow-y-auto leading-relaxed">
          {/* Rule 1: Tug mechanics */}
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-2">
            <h4 className="font-bold text-white flex items-center gap-1.5 text-sm">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xs">1</span>
              Cơ Chế Kéo Co
            </h4>
            <ul className="space-y-1.5 pl-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Mỗi câu trả lời ĐÚNG:</strong> Lực kéo tác động, dây thừng sẽ dịch chuyển <strong>+1 nấc</strong> về phía đội của bạn!</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Khi trả lời SAI:</strong> Câu hỏi sẽ bị <strong>bỏ qua</strong>, dây giữ nguyên vị trí và hệ thống chuyển ngay sang câu tiếp theo.</span>
              </li>
              <li className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span><strong>Điều kiện Thắng:</strong> Khi cả 2 bên trả lời hết 10 câu (hoặc khi kéo đứt về vạch thắng), bên nào kéo dây về sân của mình nhiều hơn sẽ giành chiến thắng chung cuộc!</span>
              </li>
            </ul>
          </div>

          {/* Rule 2: 10 Questions and Midterm 1 topics */}
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-2">
            <h4 className="font-bold text-white flex items-center gap-1.5 text-sm">
              <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 flex items-center justify-center text-xs">2</span>
              Trọng Tâm Kiến Thức Sinh Học 12 Giữa Kì 1
            </h4>
            <p className="text-slate-300">
              Gồm 10 câu hỏi trắc nghiệm A, B, C, D riêng biệt cho mỗi bên, bao quát toàn diện các chuyên đề ôn thi giữa học kì 1:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="font-semibold text-emerald-400">🧬 Cơ chế phân tử:</span>
                <p className="text-slate-400 mt-0.5">Gen, mã di truyền, nhân đôi ADN, phiên mã, dịch mã, điều hòa Ôpêron Lac.</p>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="font-semibold text-amber-400">🔬 Cơ chế tế bào & Biến dị:</span>
                <p className="text-slate-400 mt-0.5">Đột biến gen điểm, cấu trúc NST, đột biến số lượng (lệch bội, đa bội).</p>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="font-semibold text-teal-400">🌱 Quy luật Menđen:</span>
                <p className="text-slate-400 mt-0.5">Phân ly (3:1), Phân ly độc lập (9:3:3:1), biến dị tổ hợp trên Đậu Hà Lan.</p>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="font-semibold text-rose-400">🪰 Quy luật Moocgan:</span>
                <p className="text-slate-400 mt-0.5">Liên kết gen, hoán vị gen (f ≤ 50%), di truyền liên kết giới tính XX-XY.</p>
              </div>
            </div>
          </div>

          {/* Character introductions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-600/30 flex items-center gap-2.5">
              <img 
                src={mendelAvatar} 
                alt="Gregor Mendel" 
                className="w-12 h-12 rounded-xl object-cover border border-emerald-400 shrink-0" 
                referrerPolicy="no-referrer"
              />
              <div>
                <h5 className="font-bold text-emerald-300">Gregor Mendel (Bên A)</h5>
                <p className="text-[11px] text-slate-300">Cha đẻ của Di truyền học. Thí nghiệm lừng danh trên đậu Hà Lan (Pisum sativum).</p>
                <div className="text-[10px] text-emerald-400 font-mono mt-0.5">Phím tắt: 1, 2, 3, 4</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-600/30 flex items-center gap-2.5">
              <img 
                src={morganAvatar} 
                alt="Thomas Hunt Morgan" 
                className="w-12 h-12 rounded-xl object-cover border border-amber-400 shrink-0" 
                referrerPolicy="no-referrer"
              />
              <div>
                <h5 className="font-bold text-amber-300">T. H. Morgan (Bên B)</h5>
                <p className="text-[11px] text-slate-300">Giải Nobel Y học 1933. Thuyết di truyền NST trên ruồi giấm (Drosophila).</p>
                <div className="text-[10px] text-amber-400 font-mono mt-0.5">Phím tắt: 7, 8, 9, 0</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm cursor-pointer transition shadow"
          >
            Đã Hiểu - Bắt Đầu Kéo Co!
          </button>
        </div>
      </motion.div>
    </div>
  );
}
