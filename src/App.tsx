import { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { MENDEL_QUESTIONS, MORGAN_QUESTIONS, TEAM_A_PROFILE, TEAM_B_PROFILE } from './data/biologyQuestions';
import { Question, GameMode, AnswerRecord, TimeSettings, Language, MatchType, ScientistChoice, CharacterSkinId } from './types';
import { sound } from './utils/soundEffects';
import TugOfWarStage from './components/TugOfWarStage';
import QuestionBoard from './components/QuestionBoard';
import GameHeader from './components/GameHeader';
import GameOverModal from './components/GameOverModal';
import RulesModal from './components/RulesModal';
import QuestionManagerTab from './components/QuestionManagerTab';
import TimeSettingsModal from './components/TimeSettingsModal';
import LobbyScreen from './components/LobbyScreen';
import PlaySetupModal from './components/PlaySetupModal';
import SettingsModal from './components/SettingsModal';
import SkinSelectorModal from './components/SkinSelectorModal';

const MENDEL_STORAGE_KEY = 'bio_tug_mendel_questions_v2';
const MORGAN_STORAGE_KEY = 'bio_tug_morgan_questions_v2';
const TIME_SETTINGS_STORAGE_KEY = 'bio_tug_time_settings_v2';
const LANGUAGE_STORAGE_KEY = 'bio_tug_language_v2';
const VOLUME_STORAGE_KEY = 'bio_tug_volume_v2';
const SOUND_ENABLED_STORAGE_KEY = 'bio_tug_sound_enabled_v2';
const SKIN_STORAGE_KEY = 'bio_tug_selected_skin_v2';

const DEFAULT_TIME_SETTINGS: TimeSettings = {
  mode: 'shared',
  sharedSeconds: 30,
  teamASeconds: 30,
  teamBSeconds: 30,
  tickSoundEnabled: true,
};

function loadStoredTimeSettings(): TimeSettings {
  try {
    const saved = localStorage.getItem(TIME_SETTINGS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed.sharedSeconds === 'number') {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading time settings:', e);
  }
  return DEFAULT_TIME_SETTINGS;
}

function loadStoredQuestions(key: string, defaultQuestions: Question[]): Question[] {
  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error(`Error loading questions from ${key}:`, e);
  }
  return defaultQuestions;
}

export default function App() {
  // Navigation View ('lobby' for Màn hình chờ, 'arena' for Tug of War, 'manage' for Question Management)
  const [activeTab, setActiveTab] = useState<'lobby' | 'arena' | 'manage'>('lobby');

  // Modals state
  const [isPlaySetupOpen, setIsPlaySetupOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);
  const [isTimeSettingsOpen, setIsTimeSettingsOpen] = useState<boolean>(false);
  const [isSkinModalOpen, setIsSkinModalOpen] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<'A' | 'B' | 'TIE' | null>(null);

  // Character Skin state
  const [selectedSkin, setSelectedSkin] = useState<CharacterSkinId>(() => {
    try {
      const saved = localStorage.getItem(SKIN_STORAGE_KEY);
      if (
        saved &&
        (saved === 'classic' ||
          saved === 'christmas' ||
          saved === 'tet' ||
          saved === 'halloween' ||
          saved === 'teacher' ||
          saved === 'cyber' ||
          saved === 'summer')
      ) {
        return saved as CharacterSkinId;
      }
    } catch (e) {
      console.error('Error loading skin:', e);
    }
    return 'classic';
  });

  const handleSelectSkin = (newSkin: CharacterSkinId) => {
    setSelectedSkin(newSkin);
    try {
      localStorage.setItem(SKIN_STORAGE_KEY, newSkin);
    } catch (e) {
      console.error('Error saving skin:', e);
    }
  };

  // Language & Audio settings state
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return saved === 'en' ? 'en' : 'vi';
  });

  const [volume, setVolumeState] = useState<number>(() => {
    const saved = localStorage.getItem(VOLUME_STORAGE_KEY);
    if (saved !== null) {
      const parsed = parseFloat(saved);
      if (!isNaN(parsed)) return parsed;
    }
    return 0.8;
  });

  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem(SOUND_ENABLED_STORAGE_KEY);
    return saved !== 'false';
  });

  // Sync initial volume & sound state to soundEffects engine
  useEffect(() => {
    sound.setVolume(volume);
    sound.enabled = isSoundEnabled;
  }, []);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
    } catch (e) {
      console.error('Error saving language:', e);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolumeState(newVol);
    sound.setVolume(newVol);
    try {
      localStorage.setItem(VOLUME_STORAGE_KEY, String(newVol));
    } catch (e) {
      console.error('Error saving volume:', e);
    }
  };

  const handleToggleSound = () => {
    const newState = sound.toggleSound();
    setIsSoundEnabled(newState);
    try {
      localStorage.setItem(SOUND_ENABLED_STORAGE_KEY, String(newState));
    } catch (e) {
      console.error('Error saving sound state:', e);
    }
  };

  // Master Question Pools (Loaded from localStorage or defaults)
  const [masterMendelQuestions, setMasterMendelQuestions] = useState<Question[]>(() =>
    loadStoredQuestions(MENDEL_STORAGE_KEY, MENDEL_QUESTIONS)
  );
  const [masterMorganQuestions, setMasterMorganQuestions] = useState<Question[]>(() =>
    loadStoredQuestions(MORGAN_STORAGE_KEY, MORGAN_QUESTIONS)
  );

  // Game Configuration
  const [gameMode, setGameMode] = useState<GameMode>('simultaneous');
  const [playerSide, setPlayerSide] = useState<ScientistChoice>('A'); // 'A' = Mendel, 'B' = Morgan

  // Determine whether Team A or Team B is automated by AI in vs-bot mode
  const isBotA = gameMode === 'vs-bot' && playerSide === 'B';
  const isBotB = gameMode === 'vs-bot' && playerSide === 'A';

  // Time Settings
  const [timeSettings, setTimeSettings] = useState<TimeSettings>(loadStoredTimeSettings);
  const effectiveTimeA = timeSettings.mode === 'shared' ? timeSettings.sharedSeconds : timeSettings.teamASeconds;
  const effectiveTimeB = timeSettings.mode === 'shared' ? timeSettings.sharedSeconds : timeSettings.teamBSeconds;

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
  const [mendTimeLeft, setMendelTimeLeft] = useState<number>(effectiveTimeA);
  const [isMendelTimedOut, setIsMendelTimedOut] = useState<boolean>(false);
  const [botStatusTextA, setBotStatusTextA] = useState<string>('');

  // Side B (Morgan) State
  const [morganQuestions, setMorganQuestions] = useState<Question[]>([]);
  const [morganIndex, setMorganIndex] = useState<number>(0);
  const [morganScore, setMorganScore] = useState<number>(0);
  const [morganMissed, setMorganMissed] = useState<number>(0);
  const [morganAnswers, setMorganAnswers] = useState<AnswerRecord[]>([]);
  const [isMorganBusy, setIsMorganBusy] = useState<boolean>(false);
  const [morganTimeLeft, setMorganTimeLeft] = useState<number>(effectiveTimeB);
  const [isMorganTimedOut, setIsMorganTimedOut] = useState<boolean>(false);
  const [botStatusTextB, setBotStatusTextB] = useState<string>('');

  // Bot timer references
  const botTimeoutRefA = useRef<NodeJS.Timeout | null>(null);
  const botTimeoutRefB = useRef<NodeJS.Timeout | null>(null);

  // Helper to pick 10 questions randomly from master pools
  const initQuestions = useCallback(() => {
    const shuffledMendel = [...masterMendelQuestions].sort(() => 0.5 - Math.random()).slice(0, 10);
    const shuffledMorgan = [...masterMorganQuestions].sort(() => 0.5 - Math.random()).slice(0, 10);

    setMendelQuestions(shuffledMendel);
    setMorganQuestions(shuffledMorgan);
  }, [masterMendelQuestions, masterMorganQuestions]);

  // Handle Question Bank updates from QuestionManagerTab
  const handleUpdateQuestions = useCallback((updatedMendel: Question[], updatedMorgan: Question[]) => {
    setMasterMendelQuestions(updatedMendel);
    setMasterMorganQuestions(updatedMorgan);
    try {
      localStorage.setItem(MENDEL_STORAGE_KEY, JSON.stringify(updatedMendel));
      localStorage.setItem(MORGAN_STORAGE_KEY, JSON.stringify(updatedMorgan));
    } catch (e) {
      console.error('Error persisting questions to localStorage:', e);
    }
  }, []);

  // Handle Reset to Default questions
  const handleResetToDefault = useCallback(() => {
    setMasterMendelQuestions(MENDEL_QUESTIONS);
    setMasterMorganQuestions(MORGAN_QUESTIONS);
    try {
      localStorage.removeItem(MENDEL_STORAGE_KEY);
      localStorage.removeItem(MORGAN_STORAGE_KEY);
    } catch (e) {
      console.error('Error clearing questions storage:', e);
    }
  }, []);

  // Save Time Settings Handler
  const handleSaveTimeSettings = useCallback((newSettings: TimeSettings) => {
    setTimeSettings(newSettings);
    try {
      localStorage.setItem(TIME_SETTINGS_STORAGE_KEY, JSON.stringify(newSettings));
    } catch (e) {
      console.error('Error persisting time settings:', e);
    }
  }, []);

  // Initialize or Reset Game
  const resetGame = useCallback(() => {
    if (botTimeoutRefA.current) clearTimeout(botTimeoutRefA.current);
    if (botTimeoutRefB.current) clearTimeout(botTimeoutRefB.current);

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
    setIsMendelTimedOut(false);
    setMendelTimeLeft(effectiveTimeA);
    setBotStatusTextA('');

    setMorganIndex(0);
    setMorganScore(0);
    setMorganMissed(0);
    setMorganAnswers([]);
    setIsMorganBusy(false);
    setIsMorganTimedOut(false);
    setMorganTimeLeft(effectiveTimeB);
    setBotStatusTextB('');

    sound.playWhistle();
  }, [initQuestions, effectiveTimeA, effectiveTimeB]);

  // Handler when starting match from PlaySetupModal
  const handleStartBattleFromSetup = (config: {
    matchType: MatchType;
    chosenScientist: ScientistChoice;
    gameMode: GameMode;
  }) => {
    setGameMode(config.gameMode);
    setPlayerSide(config.chosenScientist);
    setIsPlaySetupOpen(false);
    setActiveTab('arena');
    resetGame();
  };

  // Apply new time settings and immediately start new match
  const handleApplyTimeSettingsAndRestart = useCallback((newSettings: TimeSettings) => {
    handleSaveTimeSettings(newSettings);
    const timeA = newSettings.mode === 'shared' ? newSettings.sharedSeconds : newSettings.teamASeconds;
    const timeB = newSettings.mode === 'shared' ? newSettings.sharedSeconds : newSettings.teamBSeconds;
    setMendelTimeLeft(timeA);
    setMorganTimeLeft(timeB);
    resetGame();
  }, [handleSaveTimeSettings, resetGame]);

  // Sync timers when active question index changes or effective time changes
  useEffect(() => {
    setMendelTimeLeft(effectiveTimeA);
    setIsMendelTimedOut(false);
  }, [mendelIndex, effectiveTimeA]);

  useEffect(() => {
    setMorganTimeLeft(effectiveTimeB);
    setIsMorganTimedOut(false);
  }, [morganIndex, effectiveTimeB]);

  // Initial load
  useEffect(() => {
    initQuestions();
  }, [initQuestions]);

  // Check Game Over conditions
  const checkGameOver = useCallback(
    (newPull: number, mIndex: number, moIndex: number) => {
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

      if (mIndex >= 10 && moIndex >= 10) {
        let matchWinner: 'A' | 'B' | 'TIE' = 'TIE';
        if (newPull < 0) {
          matchWinner = 'A';
        } else if (newPull > 0) {
          matchWinner = 'B';
        } else {
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
        nextPull = Math.max(-MAX_PULL, pullPosition - 1);
        setPullPosition(nextPull);
        setLastPuller('A');
        setMendelScore((prev) => prev + 1);
        sound.playCorrect();
        sound.playPull('left');
      } else {
        setMendelMissed((prev) => prev + 1);
        sound.playWrong();
      }

      setMendelAnswers((prev) => [
        ...prev,
        { questionIndex: mendelIndex, question: q, selectedOption: selectedIndex, isCorrect }
      ]);

      setTimeout(() => {
        const nextIndex = mendelIndex + 1;
        setMendelIndex(nextIndex);
        setIsMendelBusy(false);
        setIsMendelTimedOut(false);
        setBotStatusTextA('');

        if (gameMode === 'turn-based') {
          setCurrentTurn('B');
        }

        checkGameOver(nextPull, nextIndex, morganIndex);
      }, 1500);
    },
    [isMendelBusy, isGameOver, mendelIndex, mendelQuestions, pullPosition, gameMode, morganIndex, checkGameOver]
  );

  // Handle Side A (Mendel) Timeout
  const handleMendelTimeout = useCallback(() => {
    if (isMendelBusy || isGameOver || mendelIndex >= 10) return;
    const q = mendelQuestions[mendelIndex];
    if (!q) return;

    setIsMendelBusy(true);
    setIsMendelTimedOut(true);
    setMendelMissed((prev) => prev + 1);
    sound.playWrong();

    setMendelAnswers((prev) => [
      ...prev,
      { questionIndex: mendelIndex, question: q, selectedOption: -1, isCorrect: false, isTimeout: true }
    ]);

    setTimeout(() => {
      const nextIndex = mendelIndex + 1;
      setMendelIndex(nextIndex);
      setIsMendelBusy(false);
      setIsMendelTimedOut(false);
      setBotStatusTextA('');

      if (gameMode === 'turn-based') {
        setCurrentTurn('B');
      }

      checkGameOver(pullPosition, nextIndex, morganIndex);
    }, 1800);
  }, [isMendelBusy, isGameOver, mendelIndex, mendelQuestions, pullPosition, morganIndex, gameMode, checkGameOver]);

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
        nextPull = Math.min(MAX_PULL, pullPosition + 1);
        setPullPosition(nextPull);
        setLastPuller('B');
        setMorganScore((prev) => prev + 1);
        sound.playCorrect();
        sound.playPull('right');
      } else {
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
        setIsMorganTimedOut(false);
        setBotStatusTextB('');

        if (gameMode === 'turn-based') {
          setCurrentTurn('A');
        }

        checkGameOver(nextPull, mendelIndex, nextIndex);
      }, 1500);
    },
    [isMorganBusy, isGameOver, morganIndex, morganQuestions, pullPosition, gameMode, mendelIndex, checkGameOver]
  );

  // Handle Side B (Morgan) Timeout
  const handleMorganTimeout = useCallback(() => {
    if (isMorganBusy || isGameOver || morganIndex >= 10) return;
    const q = morganQuestions[morganIndex];
    if (!q) return;

    setIsMorganBusy(true);
    setIsMorganTimedOut(true);
    setMorganMissed((prev) => prev + 1);
    sound.playWrong();

    setMorganAnswers((prev) => [
      ...prev,
      { questionIndex: morganIndex, question: q, selectedOption: -1, isCorrect: false, isTimeout: true }
    ]);

    setTimeout(() => {
      const nextIndex = morganIndex + 1;
      setMorganIndex(nextIndex);
      setIsMorganBusy(false);
      setIsMorganTimedOut(false);
      setBotStatusTextB('');

      if (gameMode === 'turn-based') {
        setCurrentTurn('A');
      }

      checkGameOver(pullPosition, mendelIndex, nextIndex);
    }, 1800);
  }, [isMorganBusy, isGameOver, morganIndex, morganQuestions, pullPosition, mendelIndex, gameMode, checkGameOver]);

  // Countdown Ticking Loop for both teams
  useEffect(() => {
    if (activeTab !== 'arena' || isGameOver) return;

    const interval = setInterval(() => {
      // Mendel side countdown
      if (
        effectiveTimeA > 0 &&
        !isMendelBusy &&
        !isMendelTimedOut &&
        mendelIndex < 10 &&
        (gameMode !== 'turn-based' || currentTurn === 'A')
      ) {
        setMendelTimeLeft((prev) => {
          if (prev <= 1) {
            handleMendelTimeout();
            return 0;
          }
          if (prev <= 6 && timeSettings.tickSoundEnabled && isSoundEnabled) {
            sound.playTick();
          }
          return prev - 1;
        });
      }

      // Morgan side countdown
      if (
        effectiveTimeB > 0 &&
        !isMorganBusy &&
        !isMorganTimedOut &&
        morganIndex < 10 &&
        (gameMode !== 'turn-based' || currentTurn === 'B')
      ) {
        setMorganTimeLeft((prev) => {
          if (prev <= 1) {
            handleMorganTimeout();
            return 0;
          }
          if (prev <= 6 && timeSettings.tickSoundEnabled && isSoundEnabled) {
            sound.playTick();
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [
    activeTab,
    isGameOver,
    effectiveTimeA,
    effectiveTimeB,
    isMendelBusy,
    isMorganBusy,
    isMendelTimedOut,
    isMorganTimedOut,
    mendelIndex,
    morganIndex,
    gameMode,
    currentTurn,
    timeSettings.tickSoundEnabled,
    isSoundEnabled,
    handleMendelTimeout,
    handleMorganTimeout
  ]);

  // Bot logic for Side B (Morgan) when isBotB === true
  useEffect(() => {
    if (activeTab !== 'arena' || !isBotB || isGameOver || isMorganBusy || morganIndex >= 10) return;

    const q = morganQuestions[morganIndex];
    if (!q) return;

    setBotStatusTextB('Morgan AI đang suy nghĩ...');

    let thinkTime = 2200 + Math.random() * 2000;
    if (effectiveTimeB > 0) {
      const maxAllowed = Math.max(1200, (effectiveTimeB - 2) * 1000);
      thinkTime = Math.min(thinkTime, maxAllowed);
    }

    botTimeoutRefB.current = setTimeout(() => {
      const willBeCorrect = Math.random() < 0.75;
      let chosenOpt = q.correctIndex;
      if (!willBeCorrect) {
        const wrongOpts = [0, 1, 2, 3].filter((i) => i !== q.correctIndex);
        chosenOpt = wrongOpts[Math.floor(Math.random() * wrongOpts.length)];
      }

      setBotStatusTextB(`Morgan AI chọn [${['A', 'B', 'C', 'D'][chosenOpt]}]`);
      handleMorganAnswer(chosenOpt);
    }, thinkTime);

    return () => {
      if (botTimeoutRefB.current) clearTimeout(botTimeoutRefB.current);
    };
  }, [activeTab, isBotB, isGameOver, isMorganBusy, morganIndex, morganQuestions, effectiveTimeB, handleMorganAnswer]);

  // Bot logic for Side A (Mendel) when isBotA === true
  useEffect(() => {
    if (activeTab !== 'arena' || !isBotA || isGameOver || isMendelBusy || mendelIndex >= 10) return;

    const q = mendelQuestions[mendelIndex];
    if (!q) return;

    setBotStatusTextA('Mendel AI đang suy nghĩ...');

    let thinkTime = 2200 + Math.random() * 2000;
    if (effectiveTimeA > 0) {
      const maxAllowed = Math.max(1200, (effectiveTimeA - 2) * 1000);
      thinkTime = Math.min(thinkTime, maxAllowed);
    }

    botTimeoutRefA.current = setTimeout(() => {
      const willBeCorrect = Math.random() < 0.75;
      let chosenOpt = q.correctIndex;
      if (!willBeCorrect) {
        const wrongOpts = [0, 1, 2, 3].filter((i) => i !== q.correctIndex);
        chosenOpt = wrongOpts[Math.floor(Math.random() * wrongOpts.length)];
      }

      setBotStatusTextA(`Mendel AI chọn [${['A', 'B', 'C', 'D'][chosenOpt]}]`);
      handleMendelAnswer(chosenOpt);
    }, thinkTime);

    return () => {
      if (botTimeoutRefA.current) clearTimeout(botTimeoutRefA.current);
    };
  }, [activeTab, isBotA, isGameOver, isMendelBusy, mendelIndex, mendelQuestions, effectiveTimeA, handleMendelAnswer]);

  // Keyboard shortcut listener for simultaneous play
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab !== 'arena' || isGameOver || e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = e.key.toLowerCase();

      // Side A (Mendel) controls: keys 1, 2, 3, 4 OR a, s, d, f (only if not controlled by bot)
      if (!isBotA && !isMendelBusy && (gameMode !== 'turn-based' || currentTurn === 'A')) {
        if (key === '1' || key === 'a') handleMendelAnswer(0);
        else if (key === '2' || key === 's') handleMendelAnswer(1);
        else if (key === '3' || key === 'd') handleMendelAnswer(2);
        else if (key === '4' || key === 'f') handleMendelAnswer(3);
      }

      // Side B (Morgan) controls: keys 7, 8, 9, 0 OR h, j, k, l (only if not controlled by bot)
      if (!isBotB && !isMorganBusy && (gameMode !== 'turn-based' || currentTurn === 'B')) {
        if (key === '7' || key === 'h') handleMorganAnswer(0);
        else if (key === '8' || key === 'j') handleMorganAnswer(1);
        else if (key === '9' || key === 'k') handleMorganAnswer(2);
        else if (key === '0' || key === 'l') handleMorganAnswer(3);
      }

      // If user is playing as Morgan against Bot Mendel, also allow 1,2,3,4 / a,s,d,f for convenience
      if (isBotA && !isMorganBusy && (gameMode !== 'turn-based' || currentTurn === 'B')) {
        if (key === '1' || key === 'a') handleMorganAnswer(0);
        else if (key === '2' || key === 's') handleMorganAnswer(1);
        else if (key === '3' || key === 'd') handleMorganAnswer(2);
        else if (key === '4' || key === 'f') handleMorganAnswer(3);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, isGameOver, isBotA, isBotB, isMendelBusy, isMorganBusy, gameMode, currentTurn, handleMendelAnswer, handleMorganAnswer]);

  const handleSelectGameMode = (mode: GameMode) => {
    if (mode === gameMode) return;
    setGameMode(mode);
    resetGame();
  };

  // If on Lobby screen, render LobbyScreen
  if (activeTab === 'lobby') {
    return (
      <>
        <LobbyScreen
          language={language}
          onOpenPlay={() => setIsPlaySetupOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenRules={() => setIsRulesOpen(true)}
          onOpenQuestions={() => setActiveTab('manage')}
          timeSettings={timeSettings}
          volume={volume}
          isSoundEnabled={isSoundEnabled}
          onToggleSound={handleToggleSound}
          questionsCount={masterMendelQuestions.length + masterMorganQuestions.length}
          selectedSkin={selectedSkin}
          onSelectSkin={handleSelectSkin}
          onOpenSkinModal={() => setIsSkinModalOpen(true)}
        />

        {/* Character Skin Wardrobe Modal */}
        <SkinSelectorModal
          isOpen={isSkinModalOpen}
          onClose={() => setIsSkinModalOpen(false)}
          selectedSkin={selectedSkin}
          onSelectSkin={handleSelectSkin}
          language={language}
        />

        {/* Play Setup Modal (Play -> 2 choices -> Mendel or Morgan) */}
        <PlaySetupModal
          isOpen={isPlaySetupOpen}
          onClose={() => setIsPlaySetupOpen(false)}
          language={language}
          onStartBattle={handleStartBattleFromSetup}
        />

        {/* Settings Modal (Language VI/EN, Volume slider & test) */}
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          language={language}
          onLanguageChange={handleLanguageChange}
          volume={volume}
          onVolumeChange={handleVolumeChange}
          isSoundEnabled={isSoundEnabled}
          onToggleSound={handleToggleSound}
          timeSettings={timeSettings}
          onOpenTimeSettings={() => setIsTimeSettingsOpen(true)}
        />

        {/* Rules Modal */}
        <RulesModal
          isOpen={isRulesOpen}
          onClose={() => setIsRulesOpen(false)}
        />

        {/* Time Settings Modal */}
        <TimeSettingsModal
          isOpen={isTimeSettingsOpen}
          onClose={() => setIsTimeSettingsOpen(false)}
          timeSettings={timeSettings}
          onSaveTimeSettings={handleSaveTimeSettings}
          onApplyAndRestart={handleApplyTimeSettingsAndRestart}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Application Header with Navigation Tabs & Time Settings */}
      <GameHeader
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        questionsCount={masterMendelQuestions.length + masterMorganQuestions.length}
        gameMode={gameMode}
        onSelectGameMode={handleSelectGameMode}
        timeSettings={timeSettings}
        onOpenTimeSettings={() => setIsTimeSettingsOpen(true)}
        isSoundEnabled={isSoundEnabled}
        onToggleSound={handleToggleSound}
        onOpenRules={() => setIsRulesOpen(true)}
        onResetGame={resetGame}
        language={language}
        onOpenSettings={() => setIsSettingsOpen(true)}
        selectedSkin={selectedSkin}
        onOpenSkinModal={() => setIsSkinModalOpen(true)}
      />

      {/* Conditional View: Arena Tab or Question Management Tab */}
      {activeTab === 'manage' ? (
        <QuestionManagerTab
          mendelQuestions={masterMendelQuestions}
          morganQuestions={masterMorganQuestions}
          onUpdateQuestions={handleUpdateQuestions}
          onResetToDefault={handleResetToDefault}
          onBackToArena={() => {
            setActiveTab('arena');
            resetGame();
          }}
        />
      ) : (
        /* Main Unified Tug of War Stage */
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
            skinId={selectedSkin}
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
                timeLimit={effectiveTimeA}
                timeLeft={mendTimeLeft}
                isTimedOut={isMendelTimedOut}
                isBot={isBotA}
                botStatusText={botStatusTextA}
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
                timeLimit={effectiveTimeB}
                timeLeft={morganTimeLeft}
                isTimedOut={isMorganTimedOut}
                isBot={isBotB}
                botStatusText={botStatusTextB}
                keyHints={isBotA ? ['Phím 1/A', 'Phím 2/S', 'Phím 3/D', 'Phím 4/F'] : ['Phím 7 / H', 'Phím 8 / J', 'Phím 9 / K', 'Phím 0 / L']}
                onAnswer={handleMorganAnswer}
              />
            }
          />

          {/* Keyboard Helper / Footer info banner */}
          <footer className="shrink-0 bg-slate-900/60 border border-slate-800/80 rounded-xl px-3 py-1.5 text-center text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-[11px]">
              <span className="font-semibold text-slate-300">🎮 Điều khiển:</span>
              <span className="text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                {isBotA ? 'Mendel: Máy tự động' : 'Mendel: 1, 2, 3, 4 (hoặc A, S, D, F)'}
              </span>
              <span className="text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/50">
                {isBotB ? 'Morgan: Máy tự động' : isBotA ? 'Morgan: 1, 2, 3, 4 hoặc 7, 8, 9, 0' : 'Morgan: 7, 8, 9, 0 (hoặc H, J, K, L)'}
              </span>
            </div>
            <div className="text-slate-400 text-[11px]">
              Đúng: <span className="text-emerald-400 font-semibold">+1 nấc kéo</span> | Sai / Hết giờ: <span className="text-rose-400 font-semibold">bỏ qua (dây giữ nguyên)</span>
            </div>
          </footer>
        </main>
      )}

      {/* Play Setup Modal */}
      <PlaySetupModal
        isOpen={isPlaySetupOpen}
        onClose={() => setIsPlaySetupOpen(false)}
        language={language}
        onStartBattle={handleStartBattleFromSetup}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        language={language}
        onLanguageChange={handleLanguageChange}
        volume={volume}
        onVolumeChange={handleVolumeChange}
        isSoundEnabled={isSoundEnabled}
        onToggleSound={handleToggleSound}
        timeSettings={timeSettings}
        onOpenTimeSettings={() => setIsTimeSettingsOpen(true)}
      />

      {/* Rules & Bio Modal */}
      <RulesModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
      />

      {/* Time Settings Modal */}
      <TimeSettingsModal
        isOpen={isTimeSettingsOpen}
        onClose={() => setIsTimeSettingsOpen(false)}
        timeSettings={timeSettings}
        onSaveTimeSettings={handleSaveTimeSettings}
        onApplyAndRestart={handleApplyTimeSettingsAndRestart}
      />

      {/* Character Skin Wardrobe Modal */}
      <SkinSelectorModal
        isOpen={isSkinModalOpen}
        onClose={() => setIsSkinModalOpen(false)}
        selectedSkin={selectedSkin}
        onSelectSkin={handleSelectSkin}
        language={language}
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
