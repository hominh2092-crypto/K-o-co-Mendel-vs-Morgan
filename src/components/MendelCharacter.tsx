import { motion } from 'motion/react';
import { CharacterSkinId } from '../types';
import { getSkinDef } from '../data/characterSkins';

interface MendelCharacterProps {
  isPulling: boolean;
  pullPosition: number; // negative is Mendel leading, positive is losing
  isWinner: boolean;
  isLoser: boolean;
  skinId?: CharacterSkinId;
}

export default function MendelCharacter({
  isPulling,
  pullPosition,
  isWinner,
  isLoser,
  skinId = 'classic'
}: MendelCharacterProps) {
  const skin = getSkinDef(skinId);

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
          {skin.mendel.pullQuoteVi}
        </motion.div>
      )}

      {isLoser && (
        <div className="absolute -top-7 left-0 z-20 bg-rose-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow border border-rose-400 whitespace-nowrap animate-bounce">
          Á... Trượt chân! 💦
        </div>
      )}

      {isWinner && (
        <div className="absolute -top-9 left-2 z-20 bg-yellow-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-xl border-2 border-yellow-200 whitespace-nowrap animate-pulse">
          🏆 {skin.mendel.winQuoteVi}
        </div>
      )}

      {/* SVG 2D Character Body in Tug-of-War Pulling Pose */}
      <svg
        viewBox="0 0 140 170"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-24 h-32 sm:w-28 sm:h-36 md:w-32 md:h-40 xl:w-36 xl:h-44 overflow-visible filter drop-shadow-md shrink-0"
      >
        {/* Skin-specific atmospheric ambient particles */}
        {skinId === 'christmas' && (
          <g className="animate-pulse opacity-70">
            <circle cx="15" cy="20" r="2.5" fill="#f8fafc" />
            <circle cx="35" cy="12" r="1.8" fill="#e2e8f0" />
            <circle cx="10" cy="50" r="2" fill="#ffffff" />
          </g>
        )}
        {skinId === 'tet' && (
          <g className="animate-bounce opacity-80">
            <circle cx="20" cy="22" r="2" fill="#facc15" />
            <circle cx="38" cy="14" r="2.5" fill="#fbbf24" />
          </g>
        )}
        {skinId === 'halloween' && (
          <g transform="translate(18, 14) scale(0.8)">
            {/* Little Bat */}
            <path d="M0 4 Q6 -2 12 4 Q14 1 18 3 Q14 8 10 7 Q6 10 0 4 Z" fill="#382bf0" opacity="0.8" />
          </g>
        )}

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
          <path
            d="M50 115 L26 148 L18 144 L42 110 Z"
            fill={
              skinId === 'christmas'
                ? '#991b1b'
                : skinId === 'tet'
                ? '#b91c1c'
                : skinId === 'halloween'
                ? '#3b0764'
                : skinId === 'teacher'
                ? '#1e293b'
                : skinId === 'cyber'
                ? '#0f172a'
                : skinId === 'summer'
                ? '#0284c7'
                : '#1e293b'
            }
          />
          {/* Lower leg & Boot */}
          <path
            d="M26 148 L20 156 L12 158 L10 165 L28 165 L28 152 Z"
            fill={
              skinId === 'christmas'
                ? '#1c1917'
                : skinId === 'tet'
                ? '#78350f'
                : skinId === 'cyber'
                ? '#0891b2'
                : '#451a03'
            }
            stroke="#291202"
            strokeWidth="1.5"
          />
        </g>

        {/* Front Leg (bent at knee, digging into grass) */}
        <g id="mendel-front-leg">
          <path
            d="M58 116 L68 144 L60 148 L48 118 Z"
            fill={
              skinId === 'christmas'
                ? '#b91c1c'
                : skinId === 'tet'
                ? '#dc2626'
                : skinId === 'halloween'
                ? '#581c87'
                : skinId === 'teacher'
                ? '#0f172a'
                : skinId === 'cyber'
                ? '#1e293b'
                : skinId === 'summer'
                ? '#0369a1'
                : '#0f172a'
            }
          />
          {/* Lower leg & Boot */}
          <path
            d="M68 144 L66 156 L62 165 L78 165 L76 154 L72 144 Z"
            fill={
              skinId === 'christmas'
                ? '#1c1917'
                : skinId === 'tet'
                ? '#854d0e'
                : skinId === 'cyber'
                ? '#06b6d4'
                : '#542307'
            }
            stroke="#291202"
            strokeWidth="1.5"
          />
          <path d="M78 165 L84 161 M80 166 L86 166" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Torso & Robe / Suit / Shirt */}
        <g id="mendel-torso">
          {/* Base Robe/Shirt */}
          <path
            d="M45 58 C38 75 35 100 42 125 C48 128 66 128 72 122 C76 98 74 74 65 58 Z"
            fill={
              skinId === 'christmas'
                ? '#b91c1c'
                : skinId === 'tet'
                ? '#dc2626'
                : skinId === 'halloween'
                ? '#2e1065'
                : skinId === 'teacher'
                ? '#1e3a8a'
                : skinId === 'cyber'
                ? '#0f172a'
                : skinId === 'summer'
                ? '#0284c7'
                : '#0f172a'
            }
            stroke={
              skinId === 'christmas'
                ? '#f8fafc'
                : skinId === 'tet'
                ? '#facc15'
                : skinId === 'cyber'
                ? '#06b6d4'
                : '#1e293b'
            }
            strokeWidth="1.5"
          />

          {/* Skin specific Robe / Collar / Pattern details */}
          {skinId === 'christmas' && (
            <>
              {/* White fur collar & center trim */}
              <path d="M46 56 C52 64 62 64 66 56 L69 68 C64 72 48 72 43 68 Z" fill="#ffffff" />
              <path d="M54 68 L54 125 L58 125 L58 68 Z" fill="#ffffff" />
              <circle cx="56" cy="78" r="2" fill="#eab308" />
              <circle cx="56" cy="90" r="2" fill="#eab308" />
            </>
          )}

          {skinId === 'tet' && (
            <>
              {/* Gold embroidered collar & floral motifs */}
              <path d="M46 56 C52 64 62 64 66 56 L69 66 C64 70 48 70 43 66 Z" fill="#eab308" />
              {/* Gold floral dots */}
              <circle cx="50" cy="78" r="2" fill="#fef08a" />
              <circle cx="62" cy="85" r="2.5" fill="#fef08a" />
              <circle cx="48" cy="108" r="2" fill="#fef08a" />
              <circle cx="60" cy="115" r="2" fill="#fef08a" />
            </>
          )}

          {skinId === 'halloween' && (
            <>
              {/* Dark wizard collar & glowing stars */}
              <path d="M46 56 C52 64 62 64 66 56 L69 68 C64 72 48 72 43 68 Z" fill="#581c87" />
              <circle cx="52" cy="76" r="1.5" fill="#facc15" />
              <circle cx="60" cy="88" r="1.5" fill="#c084fc" />
              <circle cx="50" cy="110" r="1.5" fill="#facc15" />
            </>
          )}

          {skinId === 'teacher' && (
            <>
              {/* White shirt triangle and red tie under blazer */}
              <path d="M50 56 L56 70 L62 56 Z" fill="#f8fafc" />
              <path d="M54 58 L58 58 L57 74 L55 74 Z" fill="#dc2626" />
              <path d="M44 58 L48 78 L53 66 Z" fill="#1e40af" />
              <path d="M68 58 L64 78 L59 66 Z" fill="#1e40af" />
            </>
          )}

          {skinId === 'cyber' && (
            <>
              {/* Neon circuits and armor plating */}
              <path d="M46 62 L56 72 L66 62 L63 80 L49 80 Z" fill="#083344" stroke="#06b6d4" strokeWidth="1" />
              <circle cx="56" cy="75" r="3" fill="#22d3ee" className="animate-pulse" />
              <line x1="56" y1="78" x2="56" y2="120" stroke="#06b6d4" strokeWidth="1.5" />
              <line x1="50" y1="95" x2="62" y2="95" stroke="#22d3ee" strokeWidth="1" />
            </>
          )}

          {skinId === 'summer' && (
            <>
              {/* Hawaiian Shirt tropical flower pattern */}
              <circle cx="48" cy="72" r="3" fill="#facc15" />
              <circle cx="62" cy="76" r="3" fill="#f43f5e" />
              <circle cx="52" cy="98" r="3.5" fill="#a855f7" />
              <circle cx="62" cy="112" r="3" fill="#38bdf8" />
              <path d="M52 56 L56 68 L60 56 Z" fill="#fed7aa" />
            </>
          )}

          {skinId === 'classic' && (
            <path
              d="M46 56 C52 64 62 64 66 56 L69 70 C64 74 48 74 43 70 Z"
              fill="#334155"
            />
          )}

          {/* Belt / Waist Accessory */}
          {skinId === 'christmas' ? (
            /* Black Santa Belt with Gold Buckle */
            <g>
              <path d="M40 96 C48 100 64 99 71 94" stroke="#09090b" strokeWidth="5" />
              <rect x="51" y="94" width="10" height="8" rx="1.5" fill="none" stroke="#eab308" strokeWidth="2" />
              {/* Jingle Bell */}
              <circle cx="65" cy="100" r="3" fill="#fbbf24" stroke="#d97706" strokeWidth="0.8" />
            </g>
          ) : skinId === 'tet' ? (
            /* Gold Sash with Lucky Red Envelope */
            <g>
              <path d="M40 96 C48 100 64 99 71 94" stroke="#eab308" strokeWidth="4.5" />
              {/* Red Envelope (Bao lì xì 🧧) */}
              <g transform="translate(62, 92) rotate(12)">
                <rect x="0" y="0" width="10" height="15" rx="1" fill="#dc2626" stroke="#facc15" strokeWidth="1" />
                <circle cx="5" cy="7" r="2.5" fill="#facc15" />
              </g>
            </g>
          ) : skinId === 'halloween' ? (
            /* Mystic Belt with Jack-o'-Lantern */
            <g>
              <path d="M40 96 C48 100 64 99 71 94" stroke="#581c87" strokeWidth="4" />
              {/* Mini glowing pumpkin */}
              <g transform="translate(60, 92)">
                <ellipse cx="6" cy="6" rx="6" ry="5" fill="#ea580c" stroke="#9a3412" strokeWidth="1" />
                <path d="M4 5 L6 4 L8 5 L6 7 Z" fill="#fef08a" />
                <path d="M3 8 Q6 10 9 8 Z" fill="#fef08a" />
              </g>
            </g>
          ) : skinId === 'teacher' ? (
            /* Leather Belt with Biology Textbook */
            <g>
              <path d="M40 96 C48 100 64 99 71 94" stroke="#78350f" strokeWidth="3.5" />
              {/* Textbook Sinh 12 */}
              <g transform="translate(60, 91) rotate(10)">
                <rect x="0" y="0" width="12" height="16" rx="1.5" fill="#0284c7" stroke="#0369a1" strokeWidth="1" />
                <rect x="2" y="2" width="8" height="3" fill="#ffffff" />
                <text x="3" y="11" fill="#ffffff" fontSize="4" fontWeight="bold">BIO</text>
              </g>
            </g>
          ) : skinId === 'cyber' ? (
            /* Cyber utility belt with glowing DNA capsule */
            <g>
              <path d="M40 96 C48 100 64 99 71 94" stroke="#06b6d4" strokeWidth="3" />
              <g transform="translate(62, 92)">
                <rect x="0" y="0" width="6" height="14" rx="2" fill="#083344" stroke="#22d3ee" strokeWidth="1" />
                <circle cx="3" cy="7" r="2" fill="#4ade80" className="animate-pulse" />
              </g>
            </g>
          ) : skinId === 'summer' ? (
            /* Beach belt with coconut */
            <g>
              <path d="M40 96 C48 100 64 99 71 94" stroke="#0284c7" strokeWidth="3.5" />
              <g transform="translate(62, 92)">
                <circle cx="5" cy="6" r="5" fill="#78350f" stroke="#451a03" strokeWidth="1" />
                <line x1="5" y1="1" x2="8" y2="-4" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
              </g>
            </g>
          ) : (
            /* Classic Hemp Rope Belt & Pea Vine */
            <g>
              <path
                d="M40 96 C48 100 64 99 71 94"
                stroke="#d97706"
                strokeWidth="3.5"
                strokeDasharray="2 1"
              />
              <g transform="translate(62, 92) rotate(15)">
                <path d="M0 0 Q6 8 4 18 Q2 24 6 28" stroke="#16a34a" strokeWidth="2" fill="none" />
                <path d="M2 10 Q8 12 6 18 Q3 16 2 10 Z" fill="#22c55e" stroke="#15803d" strokeWidth="0.8" />
                <circle cx="4" cy="13" r="1" fill="#86efac" />
                <circle cx="5" cy="16" r="1" fill="#86efac" />
                <path d="M3 20 Q10 24 8 30 Q5 28 3 20 Z" fill="#22c55e" stroke="#15803d" strokeWidth="0.8" />
              </g>
            </g>
          )}
        </g>

        {/* Head & Facial Expression & Hats */}
        <g id="mendel-head">
          {/* Neck */}
          <rect x="51" y="48" width="10" height="12" fill="#fed7aa" rx="2" />
          
          {/* Head Shape */}
          <circle cx="56" cy="38" r="16" fill="#fed7aa" stroke="#f97316" strokeWidth="0.8" />
          
          {/* Base Hair (if not covered completely by hat) */}
          {skinId !== 'christmas' && skinId !== 'tet' && skinId !== 'halloween' && (
            <>
              <path
                d="M40 38 C39 26 50 20 62 21 C71 22 73 30 72 38 C70 32 68 25 56 25 C44 25 42 32 40 38 Z"
                fill="#78350f"
              />
              <path d="M39 36 C38 44 41 48 43 50 C41 46 40 40 40 36 Z" fill="#78350f" />
              <path d="M72 36 C73 44 70 48 68 50 C70 46 72 40 72 36 Z" fill="#78350f" />
            </>
          )}

          {/* Ears */}
          <circle cx="40" cy="40" r="3" fill="#fdba74" />
          <circle cx="72" cy="40" r="3" fill="#fdba74" />

          {/* HEADWEAR / HATS PER SKIN */}
          {skinId === 'christmas' && (
            /* Santa Claus Hat */
            <g id="mendel-santa-hat">
              {/* Red curved cone */}
              <path
                d="M38 27 Q54 6 74 24 Q64 12 40 27 Z"
                fill="#dc2626"
                stroke="#b91c1c"
                strokeWidth="1"
              />
              <path d="M38 27 Q56 16 74 27 L68 18 Q50 8 38 27 Z" fill="#ef4444" />
              {/* White fur trim brim */}
              <rect x="36" y="24" width="39" height="7" rx="3.5" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
              {/* White fluffy pom-pom hanging down */}
              <circle cx="77" cy="25" r="4.5" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
            </g>
          )}

          {skinId === 'tet' && (
            /* Vietnamese Traditional Khăn Đóng (Red & Gold) */
            <g id="mendel-khan-dong">
              <path
                d="M37 28 C37 18 56 16 75 28 L74 34 C56 22 37 25 37 34 Z"
                fill="#b91c1c"
              />
              {/* Pleated wrap bands */}
              <path d="M36 29 Q56 20 75 29" stroke="#facc15" strokeWidth="2.5" fill="none" />
              <path d="M37 32 Q56 23 75 32" stroke="#b91c1c" strokeWidth="2" fill="none" />
              <path d="M38 34 Q56 26 74 34" stroke="#facc15" strokeWidth="1.5" fill="none" />
            </g>
          )}

          {skinId === 'halloween' && (
            /* Pointed Witch / Wizard Hat */
            <g id="mendel-witch-hat">
              {/* Wide brim */}
              <ellipse cx="56" cy="27" rx="26" ry="6" fill="#1e1b4b" stroke="#4338ca" strokeWidth="1" />
              {/* Tall cone */}
              <path d="M42 27 L55 2 L68 27 Z" fill="#2e1065" stroke="#4338ca" strokeWidth="1" />
              {/* Gold buckle on hat ribbon */}
              <rect x="47" y="22" width="18" height="5" fill="#facc15" />
              <rect x="52" y="21" width="8" height="7" fill="none" stroke="#78350f" strokeWidth="1.5" />
            </g>
          )}

          {skinId === 'teacher' && (
            /* Graduation Cap (Mortarboard) */
            <g id="mendel-mortarboard">
              {/* Diamond board */}
              <polygon points="56,12 78,20 56,28 34,20" fill="#0f172a" stroke="#334155" strokeWidth="1" />
              {/* Skull cap band */}
              <path d="M44 23 Q56 28 68 23 L67 29 Q56 34 45 29 Z" fill="#1e293b" />
              {/* Golden button and tassel */}
              <circle cx="56" cy="20" r="2" fill="#facc15" />
              <path d="M56 20 Q68 24 66 35" stroke="#eab308" strokeWidth="1.5" fill="none" />
              <circle cx="66" cy="36" r="2" fill="#ca8a04" />
            </g>
          )}

          {skinId === 'cyber' && (
            /* Cyber HUD Visor */
            <g id="mendel-cyber-visor">
              <rect x="42" y="32" width="28" height="11" rx="3" fill="#0891b2" fillOpacity="0.75" stroke="#22d3ee" strokeWidth="1.5" />
              <line x1="44" y1="37" x2="68" y2="37" stroke="#a5f3fc" strokeWidth="1" strokeDasharray="2 1" />
            </g>
          )}

          {skinId === 'summer' && (
            /* Straw Sun Hat & Cool Sunglasses */
            <g id="mendel-straw-hat">
              <ellipse cx="56" cy="26" rx="25" ry="6" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
              <path d="M42 26 C42 16 70 16 70 26 Z" fill="#fde047" stroke="#ca8a04" strokeWidth="1" />
              <rect x="42" y="23" width="28" height="3" fill="#16a34a" />
            </g>
          )}

          {/* EYEWEAR / GLASSES (When not covered by cyber visor) */}
          {skinId !== 'cyber' && (
            <>
              {skinId === 'summer' ? (
                /* Cool Sunglasses */
                <g>
                  <rect x="45" y="34" width="10" height="7" rx="2" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
                  <rect x="57" y="34" width="10" height="7" rx="2" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
                  <line x1="55" y1="36" x2="57" y2="36" stroke="#0f172a" strokeWidth="1.5" />
                </g>
              ) : (
                /* Round Spectacles */
                <g>
                  <circle cx="50" cy="38" r="4.5" fill="#e0f2fe" fillOpacity="0.6" stroke={skinId === 'tet' ? '#b45309' : '#475569'} strokeWidth="1.5" />
                  <circle cx="62" cy="38" r="4.5" fill="#e0f2fe" fillOpacity="0.6" stroke={skinId === 'tet' ? '#b45309' : '#475569'} strokeWidth="1.5" />
                  <line x1="54.5" y1="38" x2="57.5" y2="38" stroke={skinId === 'tet' ? '#b45309' : '#475569'} strokeWidth="1.5" />
                  <line x1="45.5" y1="38" x2="41" y2="39" stroke={skinId === 'tet' ? '#b45309' : '#475569'} strokeWidth="1" />
                  <line x1="66.5" y1="38" x2="71" y2="39" stroke={skinId === 'tet' ? '#b45309' : '#475569'} strokeWidth="1" />
                </g>
              )}
            </>
          )}

          {/* Eyes behind glasses (hidden if sunglasses) */}
          {skinId !== 'summer' && skinId !== 'cyber' && (
            <>
              {isLoser ? (
                <>
                  <circle cx="50" cy="38" r="1.5" fill="#1e293b" />
                  <circle cx="62" cy="38" r="1.5" fill="#1e293b" />
                  <path d="M47 32 Q50 35 53 32" stroke="#78350f" strokeWidth="1.2" fill="none" />
                  <path d="M59 32 Q62 35 65 32" stroke="#78350f" strokeWidth="1.2" fill="none" />
                </>
              ) : (
                <>
                  <circle cx="51" cy="37.5" r="1.6" fill="#1e293b" />
                  <circle cx="63" cy="37.5" r="1.6" fill="#1e293b" />
                  <path d="M47 33 L53 35" stroke="#78350f" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M65 35 L59 33" stroke="#78350f" strokeWidth="1.6" strokeLinecap="round" />
                </>
              )}
            </>
          )}

          {/* Nose */}
          <path d="M56 38 L58 42 L55 42" stroke="#ea580c" strokeWidth="1" fill="none" strokeLinecap="round" />

          {/* Mouth */}
          {isWinner ? (
            <path d="M51 46 Q56 52 61 46 Z" fill="#991b1b" stroke="#7f1d1d" strokeWidth="0.8" />
          ) : isPulling ? (
            <g>
              <rect x="52" y="44" width="9" height="5" rx="1.5" fill="#f8fafc" stroke="#1e293b" strokeWidth="0.8" />
              <line x1="52" y1="46.5" x2="61" y2="46.5" stroke="#94a3b8" strokeWidth="0.6" />
            </g>
          ) : isLoser ? (
            <path d="M52 47 Q56 44 60 47" stroke="#1e293b" strokeWidth="1.2" fill="none" />
          ) : (
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
            stroke={
              skinId === 'christmas'
                ? '#b91c1c'
                : skinId === 'tet'
                ? '#dc2626'
                : skinId === 'halloween'
                ? '#2e1065'
                : skinId === 'teacher'
                ? '#1e3a8a'
                : skinId === 'cyber'
                ? '#0f172a'
                : skinId === 'summer'
                ? '#0284c7'
                : '#1e293b'
            }
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {skinId === 'christmas' && (
            /* White furry cuff */
            <ellipse cx="85" cy="86" rx="4" ry="7" fill="#ffffff" />
          )}
          {/* Back Hand wrapped on rope (First Grip) */}
          <rect x="84" y="81" width="9" height="12" rx="3" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
          <line x1="86" y1="84" x2="86" y2="90" stroke="#c2410c" strokeWidth="1" />
          <line x1="89" y1="84" x2="89" y2="90" stroke="#c2410c" strokeWidth="1" />

          {/* Front Arm reaching out further (Main Pulling Arm) */}
          <path
            d="M62 70 L98 84 L110 88"
            stroke={
              skinId === 'christmas'
                ? '#dc2626'
                : skinId === 'tet'
                ? '#b91c1c'
                : skinId === 'halloween'
                ? '#3b0764'
                : skinId === 'teacher'
                ? '#1e40af'
                : skinId === 'cyber'
                ? '#1e293b'
                : skinId === 'summer'
                ? '#0369a1'
                : '#0f172a'
            }
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {skinId === 'christmas' && (
            <ellipse cx="104" cy="86" rx="4.5" ry="7.5" fill="#ffffff" />
          )}
          {/* Front Hand wrapped tight around rope (Second Grip) */}
          <rect x="105" y="82" width="11" height="13" rx="3.5" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
          <line x1="108" y1="85" x2="108" y2="92" stroke="#c2410c" strokeWidth="1.2" />
          <line x1="111" y1="85" x2="111" y2="92" stroke="#c2410c" strokeWidth="1.2" />
          <line x1="114" y1="85" x2="114" y2="92" stroke="#c2410c" strokeWidth="1.2" />
          <ellipse cx="106" cy="85" rx="2" ry="3" fill="#fdba74" />
        </g>
      </svg>
    </motion.div>
  );
}

