import { motion } from 'motion/react';

interface MendelCharacterProps {
  isPulling: boolean;
  pullPosition: number; // negative is Mendel leading, positive is losing
  isWinner: boolean;
  isLoser: boolean;
}

export default function MendelCharacter({
  isPulling,
  pullPosition,
  isWinner,
  isLoser
}: MendelCharacterProps) {
  // Body lean angle: Mendel pulls to the left, so negative rotation leans him back
  const baseAngle = isWinner ? -24 : isLoser ? 12 : pullPosition < 0 ? -18 : -10;
  const currentAngle = isPulling ? baseAngle - 8 : baseAngle;

  return (
    <motion.div
      id="game-character-mendel"
      className="relative flex flex-col items-center select-none"
      animate={{
        x: isPulling ? [-2, -10, -4] : isLoser ? [0, 6, 2] : 0,
        rotate: currentAngle,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
    >
      {/* Strain / Exertion Speech Bubble */}
      {isPulling && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: -8, scale: 1 }}
          exit={{ opacity: 0 }}
          className="absolute -top-9 left-2 z-20 bg-emerald-500 text-slate-950 font-black text-[11px] px-2.5 py-0.5 rounded-full shadow-lg border border-emerald-300 whitespace-nowrap"
        >
          Hây... DÔ DÂY! 🌱
        </motion.div>
      )}

      {isLoser && (
        <div className="absolute -top-7 left-0 z-20 bg-rose-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow border border-rose-400 whitespace-nowrap animate-bounce">
          Á... Trượt chân! 💦
        </div>
      )}

      {isWinner && (
        <div className="absolute -top-9 left-2 z-20 bg-yellow-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-xl border-2 border-yellow-200 whitespace-nowrap animate-pulse">
          🏆 CHIẾN THẮNG!
        </div>
      )}

      {/* SVG 2D Character Body in Tug-of-War Pulling Pose */}
      <svg
        viewBox="0 0 140 170"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-24 h-32 sm:w-28 sm:h-36 md:w-32 md:h-40 xl:w-36 xl:h-44 overflow-visible filter drop-shadow-md shrink-0"
      >
        {/* Dust Puffs at feet when pulling */}
        {(isPulling || isWinner) && (
          <g className="animate-pulse opacity-80">
            <circle cx="28" cy="162" r="7" fill="#cbd5e1" opacity="0.6" />
            <circle cx="22" cy="160" r="5" fill="#94a3b8" opacity="0.7" />
            <circle cx="36" cy="164" r="4" fill="#cbd5e1" opacity="0.5" />
          </g>
        )}

        {/* Back Leg (bracing firmly behind) */}
        <g id="mendel-back-leg">
          {/* Robe fold over back thigh */}
          <path
            d="M50 115 L26 148 L18 144 L42 110 Z"
            fill="#1e293b"
          />
          {/* Lower leg & Boot */}
          <path
            d="M26 148 L20 156 L12 158 L10 165 L28 165 L28 152 Z"
            fill="#451a03"
            stroke="#291202"
            strokeWidth="1.5"
          />
        </g>

        {/* Front Leg (bent at knee, digging into grass) */}
        <g id="mendel-front-leg">
          {/* Robe fold over front thigh */}
          <path
            d="M58 116 L68 144 L60 148 L48 118 Z"
            fill="#0f172a"
          />
          {/* Lower leg & Boot */}
          <path
            d="M68 144 L66 156 L62 165 L78 165 L76 154 L72 144 Z"
            fill="#542307"
            stroke="#291202"
            strokeWidth="1.5"
          />
          {/* Grass kick marks */}
          <path d="M78 165 L84 161 M80 166 L86 166" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Torso & Augustinian Friar Habit Robe */}
        <g id="mendel-torso">
          {/* Dark Robe */}
          <path
            d="M45 58 C38 75 35 100 42 125 C48 128 66 128 72 122 C76 98 74 74 65 58 Z"
            fill="#0f172a"
            stroke="#1e293b"
            strokeWidth="1.5"
          />
          {/* Monastic white collar / shoulder mantle */}
          <path
            d="M46 56 C52 64 62 64 66 56 L69 70 C64 74 48 74 43 70 Z"
            fill="#334155"
          />
          {/* Hemp Rope Belt with wooden beads */}
          <path
            d="M40 96 C48 100 64 99 71 94"
            stroke="#d97706"
            strokeWidth="3.5"
            strokeDasharray="2 1"
          />
          {/* Pea Vine tucked into belt (Mendel's signature Pisum sativum) */}
          <g transform="translate(62, 92) rotate(15)">
            <path d="M0 0 Q6 8 4 18 Q2 24 6 28" stroke="#16a34a" strokeWidth="2" fill="none" />
            {/* Pea pods */}
            <path d="M2 10 Q8 12 6 18 Q3 16 2 10 Z" fill="#22c55e" stroke="#15803d" strokeWidth="0.8" />
            <circle cx="4" cy="13" r="1" fill="#86efac" />
            <circle cx="5" cy="16" r="1" fill="#86efac" />
            <path d="M3 20 Q10 24 8 30 Q5 28 3 20 Z" fill="#22c55e" stroke="#15803d" strokeWidth="0.8" />
          </g>
        </g>

        {/* Head & Facial Expression */}
        <g id="mendel-head">
          {/* Neck */}
          <rect x="51" y="48" width="10" height="12" fill="#fbcfe8" rx="2" />
          
          {/* Head Shape */}
          <circle cx="56" cy="38" r="16" fill="#fed7aa" stroke="#f97316" strokeWidth="0.8" />
          
          {/* Monastic Tonsure Hair (Brown fringe around sides) */}
          <path
            d="M40 38 C39 26 50 20 62 21 C71 22 73 30 72 38 C70 32 68 25 56 25 C44 25 42 32 40 38 Z"
            fill="#78350f"
          />
          {/* Side hair locks */}
          <path d="M39 36 C38 44 41 48 43 50 C41 46 40 40 40 36 Z" fill="#78350f" />
          <path d="M72 36 C73 44 70 48 68 50 C70 46 72 40 72 36 Z" fill="#78350f" />

          {/* Ears */}
          <circle cx="40" cy="40" r="3" fill="#fdba74" />
          <circle cx="72" cy="40" r="3" fill="#fdba74" />

          {/* Round Spectacles */}
          <circle cx="50" cy="38" r="4.5" fill="#e0f2fe" fillOpacity="0.6" stroke="#475569" strokeWidth="1.5" />
          <circle cx="62" cy="38" r="4.5" fill="#e0f2fe" fillOpacity="0.6" stroke="#475569" strokeWidth="1.5" />
          <line x1="54.5" y1="38" x2="57.5" y2="38" stroke="#475569" strokeWidth="1.5" />
          <line x1="45.5" y1="38" x2="41" y2="39" stroke="#475569" strokeWidth="1" />
          <line x1="66.5" y1="38" x2="71" y2="39" stroke="#475569" strokeWidth="1" />

          {/* Eyes behind glasses */}
          {isLoser ? (
            /* Worried eyes */
            <>
              <circle cx="50" cy="38" r="1.5" fill="#1e293b" />
              <circle cx="62" cy="38" r="1.5" fill="#1e293b" />
              <path d="M47 32 Q50 35 53 32" stroke="#78350f" strokeWidth="1.2" fill="none" />
              <path d="M59 32 Q62 35 65 32" stroke="#78350f" strokeWidth="1.2" fill="none" />
            </>
          ) : (
            /* Determined, focused pulling eyes */
            <>
              <circle cx="51" cy="37.5" r="1.6" fill="#1e293b" />
              <circle cx="63" cy="37.5" r="1.6" fill="#1e293b" />
              <path d="M47 33 L53 35" stroke="#78350f" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M65 35 L59 33" stroke="#78350f" strokeWidth="1.6" strokeLinecap="round" />
            </>
          )}

          {/* Nose */}
          <path d="M56 38 L58 42 L55 42" stroke="#ea580c" strokeWidth="1" fill="none" strokeLinecap="round" />

          {/* Mouth */}
          {isWinner ? (
            /* Huge victorious smile */
            <path d="M51 46 Q56 52 61 46 Z" fill="#991b1b" stroke="#7f1d1d" strokeWidth="0.8" />
          ) : isPulling ? (
            /* Gritting teeth / roaring effort */
            <g>
              <rect x="52" y="44" width="9" height="5" rx="1.5" fill="#f8fafc" stroke="#1e293b" strokeWidth="0.8" />
              <line x1="52" y1="46.5" x2="61" y2="46.5" stroke="#94a3b8" strokeWidth="0.6" />
            </g>
          ) : isLoser ? (
            /* Shivering mouth */
            <path d="M52 47 Q56 44 60 47" stroke="#1e293b" strokeWidth="1.2" fill="none" />
          ) : (
            /* Determined grit */
            <line x1="52" y1="46" x2="60" y2="46" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
          )}

          {/* Sweat drop when straining or losing */}
          {(isPulling || isLoser) && (
            <path
              d="M68 28 C69 26 71 29 70 32 C69 33 67 33 67 31 C67 30 68 28 68 28 Z"
              fill="#38bdf8"
            />
          )}
        </g>

        {/* Both Arms Gripping the Rope Directly */}
        <g id="mendel-arms-and-hands">
          {/* Back Arm reaching forward to grip rope */}
          <path
            d="M48 68 L78 84 L88 88"
            stroke="#1e293b"
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Back Hand wrapped on rope (First Grip) */}
          <rect x="84" y="81" width="9" height="12" rx="3" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
          {/* Knuckles and fingers wrapped */}
          <line x1="86" y1="84" x2="86" y2="90" stroke="#c2410c" strokeWidth="1" />
          <line x1="89" y1="84" x2="89" y2="90" stroke="#c2410c" strokeWidth="1" />

          {/* Front Arm reaching out further (Main Pulling Arm) */}
          <path
            d="M62 70 L98 84 L110 88"
            stroke="#0f172a"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Front Hand wrapped tight around rope (Second Grip) */}
          <rect x="105" y="82" width="11" height="13" rx="3.5" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
          {/* Fingers clasped tightly */}
          <line x1="108" y1="85" x2="108" y2="92" stroke="#c2410c" strokeWidth="1.2" />
          <line x1="111" y1="85" x2="111" y2="92" stroke="#c2410c" strokeWidth="1.2" />
          <line x1="114" y1="85" x2="114" y2="92" stroke="#c2410c" strokeWidth="1.2" />
          {/* Thumb locking the grip */}
          <ellipse cx="106" cy="85" rx="2" ry="3" fill="#fdba74" />
        </g>
      </svg>
    </motion.div>
  );
}
