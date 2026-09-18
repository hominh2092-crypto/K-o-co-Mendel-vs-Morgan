import { useState, useMemo, FormEvent, ChangeEvent } from 'react';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  RotateCcw, 
  Search, 
  Filter, 
  Check, 
  X, 
  HelpCircle, 
  AlertTriangle, 
  Download, 
  Upload, 
  BookOpen,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { Question } from '../types';

interface QuestionManagerTabProps {
  mendelQuestions: Question[];
  morganQuestions: Question[];
  onUpdateQuestions: (updatedMendel: Question[], updatedMorgan: Question[]) => void;
  onResetToDefault: () => void;
  onBackToArena: () => void;
}

export default function QuestionManagerTab({
  mendelQuestions,
  morganQuestions,
  onUpdateQuestions,
  onResetToDefault,
  onBackToArena
}: QuestionManagerTabProps) {
  // Filter and Search States
  const [filterTeam, setFilterTeam] = useState<'all' | 'A' | 'B'>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingQuestion, setEditingQuestion] = useState<{
    id?: number;
    team: 'A' | 'B';
    topic: string;
    question: string;
    options: [string, string, string, string];
    correctIndex: number;
    explanation: string;
  } | null>(null);

  // Delete Confirmation State
  const [deletingItem, setDeletingItem] = useState<{ id: number; team: 'A' | 'B'; question: string } | null>(null);
  
  // Feedback Message Banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Combine both pools with team tag for easy browsing
  const allQuestionsWithTeam = useMemo(() => {
    const listA = mendelQuestions.map(q => ({ ...q, team: 'A' as const }));
    const listB = morganQuestions.map(q => ({ ...q, team: 'B' as const }));
    return [...listA, ...listB];
  }, [mendelQuestions, morganQuestions]);

  // Unique Topics for filter dropdown
  const uniqueTopics = useMemo(() => {
    const set = new Set<string>();
    allQuestionsWithTeam.forEach(q => {
      if (q.topic) set.add(q.topic.trim());
    });
    return Array.from(set).sort();
  }, [allQuestionsWithTeam]);

  // Filtered Questions
  const filteredQuestions = useMemo(() => {
    return allQuestionsWithTeam.filter(q => {
      // Team filter
      if (filterTeam !== 'all' && q.team !== filterTeam) return false;

      // Topic filter
      if (selectedTopic !== 'all' && q.topic.toLowerCase() !== selectedTopic.toLowerCase()) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inQuestion = q.question.toLowerCase().includes(query);
        const inTopic = q.topic.toLowerCase().includes(query);
        const inOptions = q.options.some(opt => opt.toLowerCase().includes(query));
        const inExplanation = q.explanation.toLowerCase().includes(query);
        if (!inQuestion && !inTopic && !inOptions && !inExplanation) return false;
      }

      return true;
    });
  }, [allQuestionsWithTeam, filterTeam, selectedTopic, searchQuery]);

  // Open modal for Adding
  const handleOpenAddModal = (teamDefault: 'A' | 'B' = 'A') => {
    setEditingQuestion({
      team: filterTeam === 'B' ? 'B' : teamDefault,
      topic: selectedTopic !== 'all' ? selectedTopic : 'Quy luật di truyền',
      question: '',
      options: ['', '', '', ''],
      correctIndex: 0,
      explanation: ''
    });
    setIsModalOpen(true);
  };

  // Open modal for Editing
  const handleOpenEditModal = (q: Question & { team: 'A' | 'B' }) => {
    setEditingQuestion({
      id: q.id,
      team: q.team,
      topic: q.topic,
      question: q.question,
      options: [...q.options] as [string, string, string, string],
      correctIndex: q.correctIndex,
      explanation: q.explanation
    });
    setIsModalOpen(true);
  };

  // Save Modal (Add or Edit)
  const handleSaveQuestion = (e: FormEvent) => {
    e.preventDefault();
    if (!editingQuestion) return;

    // Validation
    if (!editingQuestion.question.trim()) {
      showToast('⚠️ Vui lòng nhập nội dung câu hỏi!');
      return;
    }
    if (editingQuestion.options.some(opt => !opt.trim())) {
      showToast('⚠️ Vui lòng điền đủ cả 4 đáp án A, B, C, D!');
      return;
    }
    if (!editingQuestion.explanation.trim()) {
      showToast('⚠️ Vui lòng nhập lời giải thích đáp án!');
      return;
    }

    const targetTeam = editingQuestion.team;
    const isEditing = editingQuestion.id !== undefined;

    let updatedMendel = [...mendelQuestions];
    let updatedMorgan = [...morganQuestions];

    if (isEditing) {
      // Find where it was previously (could be moved between teams)
      const inMendel = updatedMendel.some(q => q.id === editingQuestion.id);
      const inMorgan = updatedMorgan.some(q => q.id === editingQuestion.id);

      const updatedObj: Question = {
        id: editingQuestion.id!,
        topic: editingQuestion.topic.trim(),
        question: editingQuestion.question.trim(),
        options: [
          editingQuestion.options[0].trim(),
          editingQuestion.options[1].trim(),
          editingQuestion.options[2].trim(),
          editingQuestion.options[3].trim(),
        ],
        correctIndex: editingQuestion.correctIndex,
        explanation: editingQuestion.explanation.trim(),
        team: targetTeam
      };

      // Remove from current places
      if (inMendel) updatedMendel = updatedMendel.filter(q => q.id !== editingQuestion.id);
      if (inMorgan) updatedMorgan = updatedMorgan.filter(q => q.id !== editingQuestion.id);

      // Insert into target team
      if (targetTeam === 'A') {
        updatedMendel.unshift(updatedObj);
      } else {
        updatedMorgan.unshift(updatedObj);
      }

      showToast(`✅ Đã cập nhật câu hỏi #${editingQuestion.id} thành công!`);
    } else {
      // Generate unique ID
      const allIds = [...mendelQuestions, ...morganQuestions].map(q => q.id);
      const newId = (allIds.length > 0 ? Math.max(...allIds) : (targetTeam === 'A' ? 100 : 200)) + 1;

      const newQuestion: Question = {
        id: newId,
        topic: editingQuestion.topic.trim(),
        question: editingQuestion.question.trim(),
        options: [
          editingQuestion.options[0].trim(),
          editingQuestion.options[1].trim(),
          editingQuestion.options[2].trim(),
          editingQuestion.options[3].trim(),
        ],
        correctIndex: editingQuestion.correctIndex,
        explanation: editingQuestion.explanation.trim(),
        team: targetTeam
      };

      if (targetTeam === 'A') {
        updatedMendel = [newQuestion, ...updatedMendel];
      } else {
        updatedMorgan = [newQuestion, ...updatedMorgan];
      }

      showToast(`🎉 Đã thêm mới câu hỏi #${newId} vào Bên ${targetTeam === 'A' ? 'Mendel (A)' : 'Morgan (B)'}!`);
    }

    onUpdateQuestions(updatedMendel, updatedMorgan);
    setIsModalOpen(false);
    setEditingQuestion(null);
  };

  // Delete Question confirmation
  const handleConfirmDelete = () => {
    if (!deletingItem) return;

    let updatedMendel = [...mendelQuestions];
    let updatedMorgan = [...morganQuestions];

    if (deletingItem.team === 'A') {
      updatedMendel = updatedMendel.filter(q => q.id !== deletingItem.id);
    } else {
      updatedMorgan = updatedMorgan.filter(q => q.id !== deletingItem.id);
    }

    onUpdateQuestions(updatedMendel, updatedMorgan);
    showToast(`🗑️ Đã xóa câu hỏi #${deletingItem.id} khỏi Bên ${deletingItem.team}!`);
    setDeletingItem(null);
  };

  // Export JSON
  const handleExportJSON = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      mendelQuestions,
      morganQuestions
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', 'ngan_hang_cau_hoi_keo_co_sinh12.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('📥 Đã tải xuống file ngân hàng câu hỏi JSON!');
  };

  // Import JSON
  const handleImportJSON = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        if (Array.isArray(parsed.mendelQuestions) && Array.isArray(parsed.morganQuestions)) {
          onUpdateQuestions(parsed.mendelQuestions, parsed.morganQuestions);
          showToast(`✅ Đã nhập thành công ${parsed.mendelQuestions.length + parsed.morganQuestions.length} câu hỏi từ file!`);
        } else if (Array.isArray(parsed)) {
          // If flat array, split into A and B
          const a = parsed.filter((q: Question) => q.team === 'A' || q.id < 200);
          const b = parsed.filter((q: Question) => q.team === 'B' || q.id >= 200);
          onUpdateQuestions(a, b);
          showToast(`✅ Đã nhập thành công ${parsed.length} câu hỏi!`);
        } else {
          showToast('❌ Định dạng file JSON không hợp lệ!');
        }
      } catch {
        showToast('❌ Lỗi khi đọc file JSON! Vui lòng kiểm tra lại cấu trúc.');
      }
    };
    reader.readAsText(file);
    // Reset file input
    event.target.value = '';
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-4 py-4 flex flex-col min-h-0">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-18 right-4 z-50 bg-slate-900 border-2 border-emerald-500/80 text-white px-4 py-2.5 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Header & Stats */}
      <div className="shrink-0 bg-slate-900/80 border border-slate-800 rounded-2xl p-3 sm:p-4 mb-3 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              </span>
              <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                Ngân Hàng & Quản Lý Câu Hỏi Sinh Học 12
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Tùy chỉnh, bổ sung hoặc chỉnh sửa bộ câu hỏi kéo co giữa Bên A (Mendel) và Bên B (Morgan).
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              id="btn-add-question"
              onClick={() => handleOpenAddModal('A')}
              className="px-3.5 py-2 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-900/40 flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Thêm câu hỏi mới</span>
            </button>

            <button
              onClick={onResetToDefault}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all"
              title="Khôi phục lại 24 câu hỏi mặc định của kì 1"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>Khôi phục mặc định</span>
            </button>

            {/* Export / Import */}
            <button
              onClick={handleExportJSON}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 text-xs cursor-pointer transition-all"
              title="Tải về file JSON dự phòng"
            >
              <Download className="w-4 h-4 text-sky-400" />
            </button>

            <label
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 text-xs cursor-pointer transition-all"
              title="Tải lên file JSON câu hỏi"
            >
              <Upload className="w-4 h-4 text-purple-400" />
              <input
                type="file"
                accept=".json"
                onChange={handleImportJSON}
                className="hidden"
              />
            </label>

            <button
              onClick={onBackToArena}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1 cursor-pointer transition-all"
            >
              <span>Vào Đấu Trường ⚔️</span>
            </button>
          </div>
        </div>

        {/* Counter Pills */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-800 text-xs">
          <div className="bg-slate-950/60 rounded-xl p-2 border border-slate-800/80 flex items-center justify-between">
            <span className="text-slate-400">Tổng câu hỏi:</span>
            <span className="font-extrabold text-white font-mono text-sm">{allQuestionsWithTeam.length}</span>
          </div>

          <div className="bg-emerald-950/30 rounded-xl p-2 border border-emerald-700/40 flex items-center justify-between">
            <span className="text-emerald-300 flex items-center gap-1">
              <span>🌱 Bên A (Mendel):</span>
            </span>
            <span className="font-extrabold text-emerald-400 font-mono text-sm">{mendelQuestions.length} câu</span>
          </div>

          <div className="bg-amber-950/30 rounded-xl p-2 border border-amber-700/40 flex items-center justify-between">
            <span className="text-amber-300 flex items-center gap-1">
              <span>🪰 Bên B (Morgan):</span>
            </span>
            <span className="font-extrabold text-amber-400 font-mono text-sm">{morganQuestions.length} câu</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="shrink-0 bg-slate-900/60 border border-slate-800 rounded-2xl p-2.5 sm:p-3 mb-3 flex flex-wrap items-center justify-between gap-2.5">
        {/* Team Segment Controls */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setFilterTeam('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              filterTeam === 'all'
                ? 'bg-slate-800 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tất cả ({allQuestionsWithTeam.length})
          </button>
          <button
            onClick={() => setFilterTeam('A')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1 ${
              filterTeam === 'A'
                ? 'bg-emerald-700 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-emerald-400'
            }`}
          >
            🌱 Bên A - Mendel ({mendelQuestions.length})
          </button>
          <button
            onClick={() => setFilterTeam('B')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1 ${
              filterTeam === 'B'
                ? 'bg-amber-700 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-amber-400'
            }`}
          >
            🪰 Bên B - Morgan ({morganQuestions.length})
          </button>
        </div>

        {/* Topic Filter & Search */}
        <div className="flex items-center gap-2 flex-1 min-w-[240px] justify-end">
          {/* Topic selector */}
          <div className="relative">
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-xl px-2.5 py-1.5 pr-8 appearance-none focus:outline-hidden focus:border-slate-600 cursor-pointer"
            >
              <option value="all">Tất cả chủ đề ({uniqueTopics.length})</option>
              {uniqueTopics.map((top) => (
                <option key={top} value={top}>
                  {top}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Search Box */}
          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm câu hỏi, từ khóa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl pl-8 pr-7 py-1.5 placeholder:text-slate-600 focus:outline-hidden focus:border-slate-600"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Question List View */}
      <div className="flex-1 overflow-y-auto pr-1 min-h-0 space-y-2.5">
        {filteredQuestions.length === 0 ? (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-500 mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-200">Không tìm thấy câu hỏi nào!</h3>
            <p className="text-xs text-slate-500 max-w-sm mt-1">
              Thử tìm kiếm với từ khóa khác hoặc nhấn nút bên dưới để thêm một câu hỏi mới.
            </p>
            <button
              onClick={() => handleOpenAddModal('A')}
              className="mt-3 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tạo câu hỏi mới</span>
            </button>
          </div>
        ) : (
          filteredQuestions.map((q, idx) => {
            const isTeamA = q.team === 'A';
            const teamBorder = isTeamA ? 'border-emerald-800/40 hover:border-emerald-600/70' : 'border-amber-800/40 hover:border-amber-600/70';
            const teamBadge = isTeamA
              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60'
              : 'bg-amber-950/80 text-amber-300 border-amber-700/60';

            return (
              <div
                key={`${q.team}-${q.id}`}
                className={`bg-slate-900/70 backdrop-blur-xs border rounded-2xl p-3 sm:p-4 transition-all duration-200 shadow-sm ${teamBorder}`}
              >
                {/* Header row of Card */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono font-bold text-slate-500">#{idx + 1}</span>
                    <span className={`text-[10.5px] font-bold px-2 py-0.5 rounded-full border ${teamBadge}`}>
                      {isTeamA ? '🌱 Bên A - Mendel' : '🪰 Bên B - Morgan'}
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-800 text-sky-300 border border-slate-700">
                      Chủ đề: {q.topic}
                    </span>
                    <span className="text-[9px] font-mono text-slate-500">
                      (ID: {q.id})
                    </span>
                  </div>

                  {/* Actions: Edit & Delete */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      id={`btn-edit-q-${q.id}`}
                      onClick={() => handleOpenEditModal(q)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-sky-900/60 text-slate-300 hover:text-sky-200 border border-slate-700 hover:border-sky-600/60 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all"
                      title="Chỉnh sửa câu hỏi này"
                    >
                      <Pencil className="w-3 h-3 text-sky-400" />
                      <span>Sửa</span>
                    </button>

                    <button
                      id={`btn-delete-q-${q.id}`}
                      onClick={() => setDeletingItem({ id: q.id, team: q.team, question: q.question })}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-rose-950/80 text-slate-300 hover:text-rose-300 border border-slate-700 hover:border-rose-600/60 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all"
                      title="Xóa câu hỏi này"
                    >
                      <Trash2 className="w-3 h-3 text-rose-400" />
                      <span>Xóa</span>
                    </button>
                  </div>
                </div>

                {/* Question Body */}
                <h4 className="text-xs sm:text-[13.5px] font-bold text-slate-100 leading-snug mb-2.5">
                  {q.question}
                </h4>

                {/* 4 Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-2">
                  {q.options.map((opt, optIdx) => {
                    const optLetter = ['A', 'B', 'C', 'D'][optIdx];
                    const isCorrect = optIdx === q.correctIndex;

                    return (
                      <div
                        key={optIdx}
                        className={`p-1.5 sm:p-2 rounded-xl border text-xs flex items-start gap-2 ${
                          isCorrect
                            ? 'bg-emerald-950/50 border-emerald-500/70 text-emerald-200 ring-1 ring-emerald-500/40'
                            : 'bg-slate-950/40 border-slate-800/80 text-slate-300'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-md font-bold text-[11px] flex items-center justify-center shrink-0 border mt-0.5 ${
                            isCorrect
                              ? 'bg-emerald-600 text-white border-emerald-400'
                              : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                        >
                          {optLetter}
                        </span>
                        <span className="text-[11px] sm:text-xs flex-1 leading-tight self-center">
                          {opt}
                        </span>
                        {isCorrect && (
                          <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-600/50 shrink-0 self-center">
                            ✓ Đúng
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                <div className="bg-slate-950/60 rounded-xl p-2 border border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-1.5">
                  <span className="text-sky-400 font-bold shrink-0">💡 Giải thích:</span>
                  <span className="line-clamp-2 hover:line-clamp-none text-slate-300">
                    {q.explanation}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ========================================================================= */}
      {/* ADD / EDIT MODAL DIALOG */}
      {/* ========================================================================= */}
      {isModalOpen && editingQuestion && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-slate-900 border-2 border-slate-700 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="px-4 py-3 border-b border-slate-800 bg-slate-850 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {editingQuestion.id ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
                <h3 className="font-extrabold text-white text-sm sm:text-base">
                  {editingQuestion.id ? `Chỉnh sửa câu hỏi #${editingQuestion.id}` : 'Thêm câu hỏi mới vào ngân hàng'}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingQuestion(null);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveQuestion} className="p-4 space-y-3.5 max-h-[80vh] overflow-y-auto">
              
              {/* Target Team & Topic */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Team Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Gán vào đội thi đấu:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingQuestion({ ...editingQuestion, team: 'A' })}
                      className={`p-2 rounded-xl border text-xs font-bold text-center cursor-pointer transition-all ${
                        editingQuestion.team === 'A'
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500/40'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      🌱 Bên A (Mendel)
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingQuestion({ ...editingQuestion, team: 'B' })}
                      className={`p-2 rounded-xl border text-xs font-bold text-center cursor-pointer transition-all ${
                        editingQuestion.team === 'B'
                          ? 'bg-amber-950 border-amber-500 text-amber-300 ring-2 ring-amber-500/40'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      🪰 Bên B (Morgan)
                    </button>
                  </div>
                </div>

                {/* Topic Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Chủ đề kiến thức:
                  </label>
                  <input
                    type="text"
                    list="topic-suggestions"
                    required
                    placeholder="VD: Mã di truyền, Đột biến gen..."
                    value={editingQuestion.topic}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, topic: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-xs rounded-xl px-3 py-2 focus:outline-hidden focus:border-slate-600"
                  />
                  <datalist id="topic-suggestions">
                    {uniqueTopics.map((top) => (
                      <option key={top} value={top} />
                    ))}
                    <option value="Mã di truyền" />
                    <option value="Nhân đôi ADN" />
                    <option value="Phiên mã & Dịch mã" />
                    <option value="Cấu trúc Operon Lac" />
                    <option value="Đột biến gen" />
                    <option value="Đột biến NST" />
                    <option value="Quy luật phân ly Mendel" />
                    <option value="Phân ly độc lập" />
                    <option value="Tương tác gen" />
                    <option value="Liên kết gen Moocgan" />
                    <option value="Hoán vị gen" />
                    <option value="Di truyền liên kết giới tính" />
                  </datalist>
                </div>
              </div>

              {/* Question Text */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Nội dung câu hỏi:
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Nhập nội dung câu hỏi trắc nghiệm..."
                  value={editingQuestion.question}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, question: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-xs sm:text-sm rounded-xl p-2.5 focus:outline-hidden focus:border-slate-600 leading-relaxed"
                />
              </div>

              {/* 4 Options with Correct Answer Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center justify-between">
                  <span>4 Phương án trả lời (A, B, C, D):</span>
                  <span className="text-[10px] text-emerald-400 font-normal italic">
                    * Nhấp vào ký hiệu A/B/C/D để chọn đáp án đúng
                  </span>
                </label>

                <div className="space-y-2">
                  {(['A', 'B', 'C', 'D'] as const).map((letter, optIdx) => {
                    const isSelectedAsCorrect = editingQuestion.correctIndex === optIdx;

                    return (
                      <div
                        key={letter}
                        className={`flex items-center gap-2 p-1.5 rounded-xl border transition-all ${
                          isSelectedAsCorrect
                            ? 'bg-emerald-950/40 border-emerald-500/80 ring-1 ring-emerald-500/40'
                            : 'bg-slate-950 border-slate-800'
                        }`}
                      >
                        {/* Click to designate as correct answer */}
                        <button
                          type="button"
                          onClick={() => setEditingQuestion({ ...editingQuestion, correctIndex: optIdx })}
                          className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 border cursor-pointer transition-all ${
                            isSelectedAsCorrect
                              ? 'bg-emerald-600 text-white border-emerald-400 shadow-sm'
                              : 'bg-slate-800 text-slate-400 hover:text-white border-slate-700'
                          }`}
                          title={`Chọn ${letter} làm đáp án đúng`}
                        >
                          {isSelectedAsCorrect ? '✓' : letter}
                        </button>

                        <input
                          type="text"
                          required
                          placeholder={`Nội dung phương án ${letter}...`}
                          value={editingQuestion.options[optIdx]}
                          onChange={(e) => {
                            const newOptions = [...editingQuestion.options] as [string, string, string, string];
                            newOptions[optIdx] = e.target.value;
                            setEditingQuestion({ ...editingQuestion, options: newOptions });
                          }}
                          className="flex-1 bg-transparent text-slate-100 text-xs focus:outline-hidden"
                        />

                        {isSelectedAsCorrect && (
                          <span className="text-[9.5px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-600/50 shrink-0">
                            Đáp án đúng
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Explanation */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Lời giải thích chi tiết (hiện khi người chơi trả lời):
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Giải thích vì sao đáp án này đúng theo kiến thức Sinh học 12..."
                  value={editingQuestion.explanation}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, explanation: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-xs rounded-xl p-2.5 focus:outline-hidden focus:border-slate-600"
                />
              </div>

              {/* Modal Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingQuestion(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold cursor-pointer transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-900/50 cursor-pointer transition-all active:scale-95"
                >
                  {editingQuestion.id ? 'Lưu cập nhật' : 'Thêm vào ngân hàng'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DELETE CONFIRMATION DIALOG */}
      {/* ========================================================================= */}
      {deletingItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-rose-600/70 rounded-2xl w-full max-w-md shadow-2xl p-4 sm:p-5 text-center space-y-3 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-rose-950 border border-rose-500/40 text-rose-400 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="font-extrabold text-base text-white">
              Xác nhận xóa câu hỏi #{deletingItem.id}?
            </h3>

            <p className="text-xs text-slate-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-left line-clamp-3">
              "{deletingItem.question}"
            </p>

            <p className="text-[11px] text-slate-400">
              Câu hỏi này sẽ được gỡ khỏi bộ đề thi đấu của Bên {deletingItem.team === 'A' ? 'Mendel' : 'Morgan'}. Hành động này có thể hoàn tác bằng nút "Khôi phục mặc định".
            </p>

            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setDeletingItem(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold cursor-pointer transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                id="btn-confirm-delete"
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-900/50 cursor-pointer transition-all active:scale-95"
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
