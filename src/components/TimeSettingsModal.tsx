import { useState } from 'react';
import { Clock, Check, X, Volume2, Sparkles, Sliders, ShieldAlert, Timer } from 'lucide-react';
import { TimeSettings } from '../types';

interface TimeSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  timeSettings: TimeSettings;
  onSaveTimeSettings: (newSettings: TimeSettings) => void;
  onApplyAndRestart: (newSettings: TimeSettings) => void;
}

const PRESET_OPTIONS = [
  { seconds: 10, label: '10 giây', desc: 'Siêu tốc (Kịch tính)' },
  { seconds: 15, label: '15 giây', desc: 'Nhanh' },
  { seconds: 20, label: '20 giây', desc: 'Vừa phải' },
  { seconds: 30, label: '30 giây', desc: 'Chuẩn (Khuyên dùng)' },
  { seconds: 45, label: '45 giây', desc: 'Thoải mái' },
  { seconds: 60, label: '60 giây', desc: 'Suy ngẫm sâu' },
  { seconds: 0, label: 'Vô hạn', desc: 'Không giới hạn thời gian' },
];

export default function TimeSettingsModal({
  isOpen,
  onClose,
  timeSettings,
  onSaveTimeSettings,
  onApplyAndRestart,
}: TimeSettingsModalProps) {
  const [localSettings, setLocalSettings] = useState<TimeSettings>(timeSettings);

  if (!isOpen) return null;

  const handleSave = (andRestart: boolean) => {
    if (andRestart) {
      onApplyAndRestart(localSettings);
    } else {
      onSaveTimeSettings(localSettings);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-3.5 bg-linear-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-700/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                Cài Đặt Thời Gian Cho Mỗi Đội
              </h3>
              <p className="text-[11px] text-slate-400">
                Tùy chỉnh thời gian suy nghĩ cho mỗi câu hỏi trong trận đấu kéo co
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4 overflow-y-auto">
          {/* Mode Switcher: Equal vs Custom per team */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-emerald-400" />
              Chế độ áp dụng thời gian:
            </label>
            <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setLocalSettings(prev => ({ ...prev, mode: 'shared' }))}
                className={`py-2 px-3 rounded-lg font-medium transition-all cursor-pointer text-center ${
                  localSettings.mode === 'shared'
                    ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                🤝 Cả hai đội bằng nhau
              </button>
              <button
                type="button"
                onClick={() => setLocalSettings(prev => ({ ...prev, mode: 'individual' }))}
                className={`py-2 px-3 rounded-lg font-medium transition-all cursor-pointer text-center ${
                  localSettings.mode === 'individual'
                    ? 'bg-amber-600 text-white font-bold shadow-md shadow-amber-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                ⚖️ Tùy chỉnh riêng từng đội
              </button>
            </div>
          </div>

          {/* SHARED MODE PRESETS */}
          {localSettings.mode === 'shared' && (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Chọn thời gian mỗi câu (Áp dụng chung):</span>
                <span className="text-emerald-400 font-mono font-bold text-sm">
                  {localSettings.sharedSeconds === 0 ? 'Vô hạn (Không giới hạn)' : `${localSettings.sharedSeconds} giây`}
                </span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {PRESET_OPTIONS.map((opt) => {
                  const isSelected = localSettings.sharedSeconds === opt.seconds;
                  return (
                    <button
                      key={opt.seconds}
                      type="button"
                      onClick={() => setLocalSettings(prev => ({ ...prev, sharedSeconds: opt.seconds }))}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500/40'
                          : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs sm:text-[13px]">{opt.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1">{opt.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* INDIVIDUAL MODE: Team A & Team B */}
          {localSettings.mode === 'individual' && (
            <div className="space-y-3.5">
              {/* Team A - Mendel */}
              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="font-bold text-xs text-emerald-300">Bên A: Gregor Mendel</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    {localSettings.teamASeconds === 0 ? 'Vô hạn' : `${localSettings.teamASeconds} giây`}
                  </span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 text-xs font-mono">
                  {PRESET_OPTIONS.map((opt) => (
                    <button
                      key={opt.seconds}
                      type="button"
                      onClick={() => setLocalSettings(prev => ({ ...prev, teamASeconds: opt.seconds }))}
                      className={`py-1.5 px-1 rounded-lg border text-center transition-all cursor-pointer ${
                        localSettings.teamASeconds === opt.seconds
                          ? 'bg-emerald-600 text-white font-bold border-emerald-400'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-emerald-700/50'
                      }`}
                    >
                      {opt.seconds === 0 ? '∞' : `${opt.seconds}s`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Team B - Morgan */}
              <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/40 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="font-bold text-xs text-amber-300">Bên B: Thomas Hunt Morgan</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {localSettings.teamBSeconds === 0 ? 'Vô hạn' : `${localSettings.teamBSeconds} giây`}
                  </span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 text-xs font-mono">
                  {PRESET_OPTIONS.map((opt) => (
                    <button
                      key={opt.seconds}
                      type="button"
                      onClick={() => setLocalSettings(prev => ({ ...prev, teamBSeconds: opt.seconds }))}
                      className={`py-1.5 px-1 rounded-lg border text-center transition-all cursor-pointer ${
                        localSettings.teamBSeconds === opt.seconds
                          ? 'bg-amber-600 text-white font-bold border-amber-400'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-amber-700/50'
                      }`}
                    >
                      {opt.seconds === 0 ? '∞' : `${opt.seconds}s`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Sound Notification Checkbox */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-sky-400" />
              <div>
                <p className="text-xs font-medium text-slate-200">Âm thanh đếm ngược nhịp tích tắc</p>
                <p className="text-[10px] text-slate-400">Phát âm thanh cảnh báo khi còn dưới 5 giây cuối</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={localSettings.tickSoundEnabled}
                onChange={(e) => setLocalSettings(prev => ({ ...prev, tickSoundEnabled: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-700 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          {/* Rule note */}
          <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/40 text-[11px] text-slate-400 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              <strong className="text-slate-200">Quy tắc hết giờ:</strong> Khi đồng hồ đếm về 0, hệ thống sẽ tính là <span className="text-rose-400 font-semibold">bỏ qua</span> câu hỏi đó (dây kéo giữ nguyên vị trí), hiển thị đáp án đúng và tự động chuyển sang câu tiếp theo.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
          >
            Hủy bỏ
          </button>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => handleSave(false)}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
            >
              Lưu cài đặt
            </button>
            <button
              type="button"
              onClick={() => handleSave(true)}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-950 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Timer className="w-3.5 h-3.5" />
              <span>Áp dụng & Chơi mới</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
