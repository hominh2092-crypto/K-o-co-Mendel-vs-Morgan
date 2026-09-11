import { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { MENDEL_QUESTIONS, MORGAN_QUESTIONS, TEAM_A_PROFILE, TEAM_B_PROFILE } from './data/biologyQuestions';
import { Question, GameMode, AnswerRecord } from './types';
import { sound } from './utils/soundEffects';
import TugOfWarStage from './components/TugOfWarStage';
import QuestionBoard from './components/QuestionBoard';
import GameHeader from './components/GameHeader';
import GameOverModal from './components/GameOverModal';
import RulesModal from './components/RulesModal';

export default function App() {
  // Game Configuration
  const [gameMode, setGameMode] = useState<GameMode>('simultaneous');
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(true);
  const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<'A' | 'B' | 'TIE' | null>(null);

  // Tug of War physics (-5 is Mendel win line, +5 is Morgan win line, 0 is center)
  const MAX_PULL = 5;
  const [pullPosition, setPullPosition] = useState<number>(0);
  const [lastPuller, setLastPuller] = useState<'A' | 'B' | null>(null);
  const [currentTurn, setCurrentTurn] = useState<'A' | 'B'>('A');

  // Side A (Mendel) State
  const [mendelQuestions, setMendelQuestions] = useState<Question[]>([]);
  const [mendelIndex, setMendelIndex] = useState<number>(0);
  const [mendelScore, setMendelScore] = useState<number>(0);
  const [mendelMissed, setMendelMissed] = useState<number>(0);
  const [mendelAnswers, setMendelAnswers] = useState<AnswerRecord[]>([]);
  const [isMendelBusy, setIsMendelBusy] = useState<boolean>(false);

  // Side B (Morgan) State
  const [morganQuestions, setMorganQuestions] = useState<Question[]>([]);
  const [morganIndex, setMorganIndex] = useState<number>(0);
  const [morganScore, setMorganScore] = useState<number>(0);
  const [morganMissed, setMorganMissed] = useState<number>(0);
  const [morganAnswers, setMorganAnswers] = useState<AnswerRecord[]>([]);
  const [isMorganBusy, setIsMorganBusy] = useState<boolean>(false);
  const [botStatusText, setBotStatusText] = useState<string>('');

  // Bot timer reference
  const botTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to pick 10 questions randomly or slice
  const initQuestions = useCallback(() => {
    // Shuffle and pick 10 for Mendel
    const shuffledMendel = [...MENDEL_QUESTIONS].sort(() => 0.5 - Math.random()).slice(0, 10);
    // Shuffle and pick 10 for Morgan
    const shuffledMorgan = [...MORGAN_QUESTIONS].sort(() => 0.5 - Math.random()).slice(0, 10);

    setMendelQuestions(shuffledMendel);
    setMorganQuestions(shuffledMorgan);
  }, []);

  // Initialize or Reset Game
  const resetGame = useCallback(() => {
    if (botTimeoutRef.current) {
      clearTimeout(botTimeoutRef.current);
    }
    initQuestions();
    setPullPosition(0);
    setLastPuller(null);
    setCurrentTurn('A');
    setIsGameOver(false);
    setWinner(null);

    setMendelIndex(0);
    setMendelScore(0);
    setMendelMissed(0);
    setMendelAnswers([]);
    setIsMendelBusy(false);

    setMorganIndex(0);
    setMorganScore(0);
    setMorganMissed(0);
    setMorganAnswers([]);
    setIsMorganBusy(false);
    setBotStatusText('');

    sound.playWhistle();
  }, [initQuestions]);

  // Initial load
  useEffect(() => {
    initQuestions();
    sound.playWhistle();
  }, [initQuestions]);

  // Check Game Over conditions
  const checkGameOver = useCallback(
    (newPull: number, mIndex: number, moIndex: number) => {
      // Early win condition by pulling over threshold
      if (newPull <= -MAX_PULL) {
        setWinner('A');
        setIsGameOver(true);
        triggerVictory('A');
        return true;
      }
      if (newPull >= MAX_PULL) {
        setWinner('B');
        setIsGameOver(true);
        triggerVictory('B');
        return true;
      }

      // Both players finished 10 questions
      if (mIndex >= 10 && moIndex >= 10) {
        let matchWinner: 'A' | 'B' | 'TIE' = 'TIE';
        if (newPull < 0) {
          matchWinner = 'A';
        } else if (newPull > 0) {
          matchWinner = 'B';
        } else {
          // If pull is 0, check score
          if (mendelScore > morganScore) matchWinner = 'A';
          else if (morganScore > mendelScore) matchWinner = 'B';
          else matchWinner = 'TIE';
        }

        setWinner(matchWinner);
        setIsGameOver(true);
        triggerVictory(matchWinner);
        return true;
      }

      return false;
    },
    [mendelScore, morganScore]
  );

  const triggerVictory = (victor: 'A' | 'B' | 'TIE') => {
    sound.playVictory();
    try {
      const colors = victor === 'A' ? ['#10b981', '#34d399', '#059669'] : victor === 'B' ? ['#f59e0b', '#fbbf24', '#d97706'] : ['#38bdf8', '#818cf8', '#e2e8f0'];
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors
        });
      }, 350);
    } catch {
      // Ignore
    }
  };

  // Handle Side A (Mendel) Answer
  const handleMendelAnswer = useCallback(
    (selectedIndex: number) => {
      if (isMendelBusy || isGameOver || mendelIndex >= 10) return;

      const q = mendelQuestions[mendelIndex];
      if (!q) return;

      setIsMendelBusy(true);
      const isCorrect = selectedIndex === q.correctIndex;

      let nextPull = pullPosition;
      if (isCorrect) {
        // Correct: pull towards Mendel (negative direction)
        nextPull = Math.max(-MAX_PULL, pullPosition - 1);
        setPullPosition(nextPull);
        setLastPuller('A');
        setMendelScore((prev) => prev + 1);
        sound.playCorrect();
        sound.playPull('left');
      } else {
        // Wrong: miss/skip, no pull movement
        setMendelMissed((prev) => prev + 1);
        sound.playWrong();
      }

      setMendelAnswers((prev) => [
        ...prev,
        { questionIndex: mendelIndex, question: q, selectedOption: selectedIndex, isCorrect }
      ]);

      // Feedback display delay before advancing to next question
      setTimeout(() => {
        const nextIndex = mendelIndex + 1;
        setMendelIndex(nextIndex);
        setIsMendelBusy(false);

        if (gameMode === 'turn-based') {
          setCurrentTurn('B');
        }

        checkGameOver(nextPull, nextIndex, morganIndex);
      }, 1500);
    },
    [isMendelBusy, isGameOver, mendelIndex, mendelQuestions, pullPosition, gameMode, morganIndex, checkGameOver]
  );

  // Handle Side B (Morgan) Answer
  const handleMorganAnswer = useCallback(
    (selectedIndex: number) => {
      if (isMorganBusy || isGameOver || morganIndex >= 10) return;

      const q = morganQuestions[morganIndex];
      if (!q) return;

      setIsMorganBusy(true);
      const isCorrect = selectedIndex === q.correctIndex;

      let nextPull = pullPosition;
      if (isCorrect) {
        // Correct: pull towards Morgan (positive direction)
        nextPull = Math.min(MAX_PULL, pullPosition + 1);
        setPullPosition(nextPull);
        setLastPuller('B');
        setMorganScore((prev) => prev + 1);
        sound.playCorrect();
        sound.playPull('right');
      } else {
        // Wrong: miss/skip, no pull movement
        setMorganMissed((prev) => prev + 1);
        sound.playWrong();
      }

      setMorganAnswers((prev) => [
        ...prev,
        { questionIndex: morganIndex, question: q, selectedOption: selectedIndex, isCorrect }
      ]);

      setTimeout(() => {
        const nextIndex = morganIndex + 1;
        setMorganIndex(nextIndex);
        setIsMorganBusy(false);

        if (gameMode === 'turn-based') {
          setCurrentTurn('A');
        }

        checkGameOver(nextPull, mendelIndex, nextIndex);
      }, 1500);
    },
    [isMorganBusy, isGameOver, morganIndex, morganQuestions, pullPosition, gameMode, mendelIndex, checkGameOver]
  );

  // Bot logic for Side B (Morgan) when in 'vs-bot' mode
  useEffect(() => {
    if (gameMode !== 'vs-bot' || isGameOver || isMorganBusy || morganIndex >= 10) return;

    // In vs-bot mode, Morgan is controlled by simulated AI
    const q = morganQuestions[morganIndex];
    if (!q) return;

    setBotStatusText('Morgan AI đang phân tích câu hỏi...');

    const thinkTime = 2500 + Math.random() * 2000; // 2.5s to 4.5s
    botTimeoutRef.current = setTimeout(() => {
      // 75% chance correct, 25% chance of picking another option
      const willBeCorrect = Math.random() < 0.75;
      let chosenOpt = q.correctIndex;
      if (!willBeCorrect) {
        const wrongOpts = [0, 1, 2, 3].filter((i) => i !== q.correctIndex);
        chosenOpt = wrongOpts[Math.floor(Math.random() * wrongOpts.length)];
      }

      setBotStatusText(`Morgan AI đã chọn đáp án ${['A', 'B', 'C', 'D'][chosenOpt]}!`);
      handleMorganAnswer(chosenOpt);
    }, thinkTime);

    return () => {
      if (botTimeoutRef.current) {
        clearTimeout(botTimeoutRef.current);
      }
    };
  }, [gameMode, isGameOver, isMorganBusy, morganIndex, morganQuestions, handleMorganAnswer]);

  // Keyboard shortcut listener for simultaneous couch play
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if target is an input or dialog
      if (isGameOver || e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = e.key.toLowerCase();

      // Side A (Mendel) shortcuts: 1, 2, 3, 4 OR a, s, d, f
      if (!isMendelBusy && (gameMode !== 'turn-based' || currentTurn === 'A')) {
        if (key === '1' || key === 'a') handleMendelAnswer(0);
        else if (key === '2' || key === 's') handleMendelAnswer(1);
        else if (key === '3' || key === 'd') handleMendelAnswer(2);
        else if (key === '4' || key === 'f') handleMendelAnswer(3);
      }

      // Side B (Morgan) shortcuts (only when not vs-bot): 7, 8, 9, 0 OR h, j, k, l
      if (gameMode !== 'vs-bot' && !isMorganBusy && (gameMode !== 'turn-based' || currentTurn === 'B')) {
        if (key === '7' || key === 'h') handleMorganAnswer(0);
        else if (key === '8' || key === 'j') handleMorganAnswer(1);
        else if (key === '9' || key === 'k') handleMorganAnswer(2);
        else if (key === '0' || key === 'l') handleMorganAnswer(3);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGameOver, isMendelBusy, isMorganBusy, gameMode, currentTurn, handleMendelAnswer, handleMorganAnswer]);

  // Sound toggle handler
  const handleToggleSound = () => {
    const state = sound.toggleSound();
    setIsSoundEnabled(state);
  };

  // Change Game Mode
  const handleSelectGameMode = (mode: GameMode) => {
    if (mode === gameMode) return;
    setGameMode(mode);
    resetGame();
  };

  return (
    <div className="min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Application Header */}
      <GameHeader
        gameMode={gameMode}
        onSelectGameMode={handleSelectGameMode}
        isSoundEnabled={isSoundEnabled}
        onToggleSound={handleToggleSound}
        onOpenRules={() => setIsRulesOpen(true)}
        onResetGame={resetGame}
      />

      {/* Main Unified Tug of War Stage: questions directly placed at Mendel & Morgan pulling stations */}
      <main className="flex-1 min-h-0 max-w-[1720px] w-full mx-auto p-1.5 sm:p-2 flex flex-col gap-1.5 overflow-hidden">
        <TugOfWarStage
          pullPosition={pullPosition}
          maxPull={MAX_PULL}
          lastPuller={lastPuller}
          mendelScore={mendelScore}
          morganScore={morganScore}
          mendelQuestionIndex={mendelIndex}
          morganQuestionIndex={morganIndex}
          totalQuestions={10}
          isGameOver={isGameOver}
          winner={winner}
          leftBoard={
            <QuestionBoard
              side="A"
              teamName={TEAM_A_PROFILE.name}
              characterTitle={TEAM_A_PROFILE.title}
              themeColor="emerald"
              avatarUrl={TEAM_A_PROFILE.avatarUrl || ''}
              currentQuestion={mendelQuestions[mendelIndex]}
              questionNumber={Math.min(10, mendelIndex + 1)}
              totalQuestions={10}
              score={mendelScore}
              missedCount={mendelMissed}
              isActiveTurn={gameMode !== 'turn-based' || currentTurn === 'A'}
              isCompleted={mendelIndex >= 10}
              keyHints={['Phím 1 / A', 'Phím 2 / S', 'Phím 3 / D', 'Phím 4 / F']}
              onAnswer={handleMendelAnswer}
            />
          }
          rightBoard={
            <QuestionBoard
              side="B"
              teamName={TEAM_B_PROFILE.name}
              characterTitle={TEAM_B_PROFILE.title}
              themeColor="amber"
              avatarUrl={TEAM_B_PROFILE.avatarUrl || ''}
              currentQuestion={morganQuestions[morganIndex]}
              questionNumber={Math.min(10, morganIndex + 1)}
              totalQuestions={10}
              score={morganScore}
              missedCount={morganMissed}
              isActiveTurn={gameMode !== 'turn-based' || currentTurn === 'B'}
              isCompleted={morganIndex >= 10}
              isBot={gameMode === 'vs-bot'}
              botStatusText={botStatusText}
              keyHints={['Phím 7 / H', 'Phím 8 / J', 'Phím 9 / K', 'Phím 0 / L']}
              onAnswer={handleMorganAnswer}
            />
          }
        />

        {/* Keyboard Helper / Footer info banner */}
        <footer className="shrink-0 bg-slate-900/60 border border-slate-800/80 rounded-xl px-3 py-1.5 text-center text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[11px]">
            <span className="font-semibold text-slate-300">🎮 Phím tắt:</span>
            <span className="text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
              Bên A: 1, 2, 3, 4 (hoặc A, S, D, F)
            </span>
            {gameMode !== 'vs-bot' && (
              <span className="text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/50">
                Bên B: 7, 8, 9, 0 (hoặc H, J, K, L)
              </span>
            )}
          </div>
          <div className="text-slate-400 text-[11px]">
            Đúng: <span className="text-emerald-400 font-semibold">+1 lực kéo</span> | Sai: <span className="text-rose-400 font-semibold">bỏ qua (dây giữ nguyên)</span>
          </div>
        </footer>
      </main>

      {/* Rules & Bio Modal */}
      <RulesModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
      />

      {/* Game Over Victory Modal */}
      {isGameOver && winner && (
        <GameOverModal
          winner={winner}
          pullPosition={pullPosition}
          mendelScore={mendelScore}
          morganScore={morganScore}
          mendelAnswers={mendelAnswers}
          morganAnswers={morganAnswers}
          onRestart={resetGame}
        />
      )}
    </div>
  );
}
