import { motion } from 'motion/react';
import { CharacterSkinId } from '../types';
import { getSkinDef } from '../data/characterSkins';

interface MorganCharacterProps {
  isPulling: boolean;
  pullPosition: number; // positive is Morgan leading, negative is losing
  isWinner: boolean;
  isLoser: boolean;
  skinId?: CharacterSkinId;
}

export default function MorganCharacter({
  isPulling,
  pullPosition,
  isWinner,
  isLoser,
  skinId = 'classic'
}: MorganCharacterProps) {
  const skin = getSkinDef(skinId);

  // Body lean angle: Morgan pulls to the right, so positive rotation leans him back
  const baseAngle = isWinner ? 24 : isLoser ? -12 : pullPosition > 0 ? 18 : 10;
  const currentAngle = isPulling ? baseAngle + 8 : baseAngle;

  return (
    <motion.div
      id="game-character-morgan"
      className="relative flex flex-col items-center select-none"
      animate={{
        x: isPulling ? [2, 10, 4] : isLoser ? [0, -6, -2] : 0,
        rotate: currentAngle,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
    >
      {/* Exertion Speech Bubble */}
      {isPulling && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: -8, scale: 1 }}
          exit={{ opacity: 0 }}
          className="absolute -top-9 right-2 z-20 bg-amber-500 text-slate-950 font-black text-[11px] px-2.5 py-0.5 rounded-full shadow-lg border border-amber-300 whitespace-nowrap"
        >
          {skin.morgan.pullQuoteVi}
        </motion.div>
      )}

      {isLoser && (
        <div className="absolute -top-7 right-0 z-20 bg-rose-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow border border-rose-400 whitespace-nowrap animate-bounce">
          Ối... Dây tuột rồi! 💦
        </div>
      )}

      {isWinner && (
        <div className="absolute -top-9 right-2 z-20 bg-yellow-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-xl border-2 border-yellow-200 whitespace-nowrap animate-pulse">
          🏆 {skin.morgan.winQuoteVi}
        </div>
      )}

      {/* SVG 2D Character Body in Tug-of-War Pulling Pose */}
      <svg
        viewBox="0 0 140 170"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-24 h-32 sm:w-28 sm:h-36 md:w-32 md:h-40 xl:w-36 xl:h-44 overflow-visible filter drop-shadow-md shrink-0"
      >
        {/* Animated Fruit Flies (Drosophila) buzzing around Morgan - Styled by skin! */}
        <g className="animate-pulse">
          {/* Fly 1 */}
          <g transform="translate(105, 20)">
            <ellipse cx="0" cy="0" rx="3.5" ry="2" fill={skinId === 'cyber' ? '#0891b2' : skinId === 'halloween' ? '#475569' : '#78350f'} />
            <ellipse cx="-2" cy="-3" rx="4" ry="2" fill={skinId === 'cyber' ? '#22d3ee' : '#bae6fd'} opacity="0.8" transform="rotate(-20)" />
            <ellipse cx="2" cy="-3" rx="4" ry="2" fill={skinId === 'cyber' ? '#22d3ee' : '#bae6fd'} opacity="0.8" transform="rotate(20)" />
            <circle cx="3" cy="0" r="1.5" fill={skinId === 'cyber' ? '#06b6d4' : '#ef4444'} />
            {skinId === 'christmas' && (
              /* Tiny Santa Hat on Fly */
              <polygon points="0,-2 2,-6 4,-2" fill="#ef4444" />
            )}
          </g>
          {/* Fly 2 */}
          <g transform="translate(120, 36)">
            <ellipse cx="0" cy="0" rx="2.8" ry="1.6" fill={skinId === 'cyber' ? '#0891b2' : skinId === 'halloween' ? '#475569' : '#78350f'} />
            <ellipse cx="-1" cy="-2.5" rx="3" ry="1.5" fill={skinId === 'cyber' ? '#22d3ee' : '#bae6fd'} opacity="0.8" />
            <circle cx="2.2" cy="0" r="1" fill={skinId === 'cyber' ? '#06b6d4' : '#ef4444'} />
          </g>
        </g>

        {/* Ambient theme effects */}
        {skinId === 'tet' && (
          <g className="animate-bounce opacity-80">
            <circle cx="122" cy="20" r="2.2" fill="#f43f5e" />
            <circle cx="102" cy="14" r="1.8" fill="#fb7185" />
          </g>
        )}
        {skinId === 'cyber' && (
          <g className="opacity-75">
            <circle cx="118" cy="18" r="1.5" fill="#f59e0b" className="animate-ping" />
          </g>
        )}

        {/* Dust Puffs at feet when pulling */}
        {(isPulling || isWinner) && (
          <g className="animate-pulse opacity-80">
            <circle cx="112" cy="162" r="7" fill="#cbd5e1" opacity="0.6" />
            <circle cx="118" cy="160" r="5" fill="#94a3b8" opacity="0.7" />
            <circle cx="104" cy="164" r="4" fill="#cbd5e1" opacity="0.5" />
          </g>
        )}

        {/* Back Leg (bracing firmly behind to the right) */}
        <g id="morgan-back-leg">
          <path
            d="M90 115 L114 148 L122 144 L98 110 Z"
            fill={
              skinId === 'christmas'
                ? '#166534'
                : skinId === 'tet'
                ? '#ca8a04'
                : skinId === 'halloween'
                ? '#0f172a'
                : skinId === 'teacher'
                ? '#1e293b'
                : skinId === 'cyber'
                ? '#0f172a'
                : skinId === 'summer'
                ? '#f8fafc'
                : '#334155'
            }
          />
          {/* Lower leg & Oxford Shoe */}
          <path
            d="M114 148 L120 156 L128 158 L130 165 L112 165 L112 152 Z"
            fill={
              skinId === 'christmas'
                ? '#1c1917'
                : skinId === 'tet'
                ? '#78350f'
                : skinId === 'cyber'
                ? '#d97706'
                : '#292524'
            }
            stroke="#1c1917"
            strokeWidth="1.5"
          />
        </g>

        {/* Front Leg (bent at knee, digging into grass to the left) */}
        <g id="morgan-front-leg">
          <path
            d="M82 116 L72 144 L80 148 L92 118 Z"
            fill={
              skinId === 'christmas'
                ? '#15803d'
                : skinId === 'tet'
                ? '#eab308'
                : skinId === 'halloween'
                ? '#1e1b4b'
                : skinId === 'teacher'
                ? '#0f172a'
                : skinId === 'cyber'
                ? '#1e293b'
                : skinId === 'summer'
                ? '#e2e8f0'
                : '#1e293b'
            }
          />
          {/* Lower leg & Oxford Shoe */}
          <path
            d="M72 144 L74 156 L78 165 L62 165 L64 154 L68 144 Z"
            fill={
              skinId === 'christmas'
                ? '#1c1917'
                : skinId === 'tet'
                ? '#854d0e'
                : skinId === 'cyber'
                ? '#f59e0b'
                : '#1c1917'
            }
            stroke="#0c0a09"
            strokeWidth="1.5"
          />
          {/* Grass kick marks */}
          <path d="M62 165 L56 161 M60 166 L54 166" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Torso: Tweed Vest, Rolled Shirt, Tie OR Skin Attire */}
        <g id="morgan-torso">
          {/* White Shirt base */}
          <path
            d="M95 58 C102 75 105 100 98 125 C92 128 74 128 68 122 C64 98 66 74 75 58 Z"
            fill={
              skinId === 'christmas'
                ? '#15803d'
                : skinId === 'tet'
                ? '#eab308'
                : skinId === 'halloween'
                ? '#09090b'
                : skinId === 'teacher'
                ? '#ffffff'
                : skinId === 'cyber'
                ? '#0f172a'
                : skinId === 'summer'
                ? '#0284c7'
                : '#f8fafc'
            }
            stroke={
              skinId === 'tet'
                ? '#ca8a04'
                : skinId === 'cyber'
                ? '#f59e0b'
                : '#e2e8f0'
            }
            strokeWidth="1.2"
          />

          {skinId === 'christmas' && (
            <>
              {/* Christmas sweater knitted snowflake / stripes */}
              <path d="M72 80 L94 80 M70 94 L96 94" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 2" />
              <circle cx="83" cy="87" r="2.5" fill="#f87171" />
              {/* Candy cane necktie */}
              <path d="M83 66 L87 66 L89 90 L85 96 L81 90 Z" fill="#ef4444" />
              <path d="M81 72 L87 76 M81 82 L87 86" stroke="#ffffff" strokeWidth="1.5" />
            </>
          )}

          {skinId === 'tet' && (
            <>
              {/* Golden Yellow Áo Dài with Pink Peach Blossom (Hoa Đào) motifs */}
              <circle cx="75" cy="76" r="2.5" fill="#fb7185" />
              <circle cx="90" cy="85" r="2" fill="#fb7185" />
              <circle cx="78" cy="105" r="2.5" fill="#fb7185" />
              <circle cx="88" cy="115" r="2" fill="#fb7185" />
              {/* Gold button row */}
              <line x1="84" y1="62" x2="84" y2="120" stroke="#ca8a04" strokeWidth="1" />
            </>
          )}

          {skinId === 'halloween' && (
            <>
              {/* Dracula Vampire Cape Collar & Tuxedo */}
              <path d="M72 58 L64 42 L76 56 Z" fill="#991b1b" />
              <path d="M94 58 L102 42 L90 56 Z" fill="#991b1b" />
              <path d="M78 62 L85 86 L92 62 Z" fill="#991b1b" />
              {/* Bat brooch bowtie */}
              <polygon points="80,68 85,71 90,68 87,74 83,74" fill="#18181b" />
            </>
          )}

          {skinId === 'teacher' && (
            <>
              {/* White Lab Coat (Áo Blouse trắng) with Tweed Vest underneath */}
              <path d="M78 62 L85 86 L92 62 Z" fill="#78350f" />
              <path d="M83 66 L87 66 L89 90 L85 96 L81 90 Z" fill="#991b1b" />
              {/* Lab coat lapels */}
              <path d="M70 60 L78 86 L74 122" stroke="#cbd5e1" strokeWidth="2.5" fill="none" />
              <path d="M96 60 L88 86 L92 122" stroke="#cbd5e1" strokeWidth="2.5" fill="none" />
              {/* Pen in pocket */}
              <rect x="73" y="78" width="2" height="7" rx="1" fill="#2563eb" />
            </>
          )}

          {skinId === 'cyber' && (
            <>
              {/* Cyber exoskeleton plating & amber neon power core */}
              <circle cx="84" cy="88" r="4" fill="#f59e0b" className="animate-pulse" />
              <circle cx="84" cy="88" r="2" fill="#fef08a" />
              <line x1="74" y1="88" x2="94" y2="88" stroke="#f59e0b" strokeWidth="1.5" />
              <line x1="84" y1="65" x2="84" y2="120" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 1" />
            </>
          )}

          {skinId === 'summer' && (
            <>
              {/* Ocean Blue Polo shirt */}
              <path d="M78 62 L85 76 L92 62 Z" fill="#ffffff" />
              <circle cx="85" cy="72" r="1.5" fill="#0284c7" />
              {/* Mini lifebuoy accessory */}
              <g transform="translate(85, 96)">
                <circle cx="0" cy="0" r="6" fill="#f8fafc" stroke="#ef4444" strokeWidth="2" />
                <circle cx="0" cy="0" r="2.5" fill="#0284c7" />
              </g>
            </>
          )}

          {skinId === 'classic' && (
            <>
              {/* Warm Brown Tweed Vest */}
              <path
                d="M95 62 C101 78 103 100 97 122 C90 125 78 125 70 120 C66 98 68 78 75 62 Z"
                fill="#78350f"
                stroke="#451a03"
                strokeWidth="1.2"
              />
              {/* Vest V-Neck opening */}
              <path d="M78 62 L85 86 L92 62 Z" fill="#f8fafc" />
              {/* Crimson Necktie */}
              <path d="M83 66 L87 66 L89 90 L85 96 L81 90 Z" fill="#991b1b" />
              {/* Gold Watch Chain draped on vest */}
              <path d="M88 95 Q95 100 96 108" stroke="#eab308" strokeWidth="1.5" fill="none" />
              {/* Vest Buttons */}
              <circle cx="85" cy="100" r="1.2" fill="#451a03" />
              <circle cx="85" cy="108" r="1.2" fill="#451a03" />
              <circle cx="85" cy="116" r="1.2" fill="#451a03" />
            </>
          )}
        </g>

        {/* Head & Morgan's Features (Hair, Glasses, Mustache, Hats per Skin) */}
        <g id="morgan-head">
          {/* Neck */}
          <rect x="79" y="48" width="10" height="12" fill="#fed7aa" rx="2" />

          {/* Head Shape */}
          <circle cx="84" cy="38" r="16" fill="#fed7aa" stroke="#f97316" strokeWidth="0.8" />

          {/* Hair base (if not covered by hat) */}
          {skinId !== 'christmas' && skinId !== 'tet' && skinId !== 'summer' && (
            <>
              <path
                d="M68 36 C68 24 78 19 90 20 C99 21 101 28 100 38 C98 30 94 25 84 25 C74 25 71 30 68 36 Z"
                fill="#57534e"
              />
              <path d="M68 34 C67 42 70 46 72 48 C70 44 69 38 68 34 Z" fill="#57534e" />
              <path d="M100 34 C101 42 98 46 96 48 C98 44 99 38 100 34 Z" fill="#57534e" />
            </>
          )}

          {/* Ears */}
          <circle cx="68" cy="40" r="3" fill="#fdba74" />
          <circle cx="100" cy="40" r="3" fill="#fdba74" />

          {/* HATS / HEADWEAR PER SKIN */}
          {skinId === 'christmas' && (
            /* Green Elf / Holiday Hat */
            <g id="morgan-holiday-hat">
              <path d="M70 27 Q84 8 102 26 L96 16 Q82 6 68 26 Z" fill="#15803d" stroke="#166534" strokeWidth="1" />
              <rect x="66" y="24" width="36" height="6" rx="3" fill="#ffffff" />
              <circle cx="103" cy="27" r="4" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
            </g>
          )}

          {skinId === 'tet' && (
            /* Vietnamese Traditional Khăn Đóng (Golden Yellow) */
            <g id="morgan-khan-dong">
              <path
                d="M66 28 C66 18 84 16 102 28 L101 34 C84 22 66 25 66 34 Z"
                fill="#ca8a04"
              />
              <path d="M65 29 Q84 20 102 29" stroke="#fef08a" strokeWidth="2.5" fill="none" />
              <path d="M66 32 Q84 23 102 32" stroke="#ca8a04" strokeWidth="2" fill="none" />
              <path d="M67 34 Q84 26 101 34" stroke="#fef08a" strokeWidth="1.5" fill="none" />
            </g>
          )}

          {skinId === 'summer' && (
            /* Sporty Sun Cap */
            <g id="morgan-summer-cap">
              <path d="M68 28 C68 18 100 18 100 28 Z" fill="#0284c7" />
              <path d="M62 28 L80 26 L80 30 Z" fill="#0369a1" />
            </g>
          )}

          {/* EYEWEAR / GLASSES */}
          {skinId === 'cyber' ? (
            /* Cyber Scouter Monocle with Laser Target */
            <g id="morgan-cyber-scouter">
              <circle cx="90" cy="38" r="6" fill="#f59e0b" fillOpacity="0.5" stroke="#f59e0b" strokeWidth="1.5" />
              <line x1="84" y1="38" x2="96" y2="38" stroke="#fef08a" strokeWidth="1" />
              <line x1="90" y1="32" x2="90" y2="44" stroke="#fef08a" strokeWidth="1" />
              <line x1="96" y1="38" x2="102" y2="36" stroke="#f59e0b" strokeWidth="1.5" />
            </g>
          ) : skinId === 'summer' ? (
            /* Aviator Sunglasses */
            <g id="morgan-sunglasses">
              <rect x="73" y="34" width="10" height="8" rx="2.5" fill="#0f172a" stroke="#eab308" strokeWidth="1" />
              <rect x="85" y="34" width="10" height="8" rx="2.5" fill="#0f172a" stroke="#eab308" strokeWidth="1" />
              <line x1="83" y1="36" x2="85" y2="36" stroke="#eab308" strokeWidth="1.5" />
            </g>
          ) : (
            /* Round Glasses */
            <g>
              <circle cx="78" cy="38" r="4.5" fill="#e0f2fe" fillOpacity="0.6" stroke="#334155" strokeWidth="1.5" />
              <circle cx="90" cy="38" r="4.5" fill="#e0f2fe" fillOpacity="0.6" stroke="#334155" strokeWidth="1.5" />
              <line x1="82.5" y1="38" x2="85.5" y2="38" stroke="#334155" strokeWidth="1.5" />
              <line x1="73.5" y1="38" x2="69" y2="39" stroke="#334155" strokeWidth="1" />
              <line x1="94.5" y1="38" x2="99" y2="39" stroke="#334155" strokeWidth="1" />
            </g>
          )}

          {/* Eyes behind glasses */}
          {skinId !== 'summer' && (
            <>
              {isLoser ? (
                <>
                  <circle cx="78" cy="38" r="1.5" fill="#1e293b" />
                  <circle cx="90" cy="38" r="1.5" fill="#1e293b" />
                  <path d="M75 32 Q78 35 81 32" stroke="#44403c" strokeWidth="1.2" fill="none" />
                  <path d="M87 32 Q90 35 93 32" stroke="#44403c" strokeWidth="1.2" fill="none" />
                </>
              ) : (
                <>
                  <circle cx="77" cy="37.5" r="1.6" fill="#1e293b" />
                  <circle cx="89" cy="37.5" r="1.6" fill="#1e293b" />
                  <path d="M75 35 L81 33" stroke="#44403c" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M93 33 L87 35" stroke="#44403c" strokeWidth="1.6" strokeLinecap="round" />
                </>
              )}
            </>
          )}

          {/* Nose */}
          <path d="M84 38 L82 42 L85 42" stroke="#ea580c" strokeWidth="1" fill="none" strokeLinecap="round" />

          {/* Trademark Morgan Mustache */}
          <path
            d="M77 44 Q81 42 84 45 Q87 42 91 44 Q88 47 84 46 Q80 47 77 44 Z"
            fill={skinId === 'christmas' ? '#ffffff' : '#44403c'}
            stroke={skinId === 'christmas' ? '#e2e8f0' : undefined}
            strokeWidth={skinId === 'christmas' ? '0.5' : undefined}
          />

          {/* Mouth */}
          {isWinner ? (
            <path d="M79 48 Q84 54 89 48 Z" fill="#991b1b" stroke="#7f1d1d" strokeWidth="0.8" />
          ) : isPulling ? (
            <g>
              <rect x="79" y="47" width="10" height="5" rx="1.5" fill="#f8fafc" stroke="#1e293b" strokeWidth="0.8" />
              <line x1="79" y1="49.5" x2="89" y2="49.5" stroke="#94a3b8" strokeWidth="0.6" />
            </g>
          ) : isLoser ? (
            <path d="M80 49 Q84 46 88 49" stroke="#1e293b" strokeWidth="1.2" fill="none" />
          ) : (
            <line x1="80" y1="48" x2="88" y2="48" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
          )}

          {/* Sweat drop */}
          {(isPulling || isLoser) && (
            <path
              d="M72 28 C71 26 69 29 70 32 C71 33 73 33 73 31 C73 30 72 28 72 28 Z"
              fill="#38bdf8"
            />
          )}
        </g>

        {/* Both Arms Gripping the Rope Directly to the Left */}
        <g id="morgan-arms-and-hands">
          {/* Back Arm reaching forward to the left to grip rope */}
          <path
            d="M92 68 L62 84 L52 88"
            stroke={
              skinId === 'christmas'
                ? '#15803d'
                : skinId === 'tet'
                ? '#ca8a04'
                : skinId === 'halloween'
                ? '#18181b'
                : skinId === 'teacher'
                ? '#f8fafc'
                : skinId === 'cyber'
                ? '#0f172a'
                : skinId === 'summer'
                ? '#0284c7'
                : '#e2e8f0'
            }
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Rolled cuff */}
          <ellipse cx="68" cy="80" rx="3" ry="6" fill="#cbd5e1" transform="rotate(-25 68 80)" />
          {/* Back Hand wrapped on rope (First Grip) */}
          <rect x="47" y="81" width="9" height="12" rx="3" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
          <line x1="50" y1="84" x2="50" y2="90" stroke="#c2410c" strokeWidth="1" />
          <line x1="53" y1="84" x2="53" y2="90" stroke="#c2410c" strokeWidth="1" />

          {/* Front Arm reaching out further (Main Pulling Arm) */}
          <path
            d="M78 70 L42 84 L30 88"
            stroke={
              skinId === 'christmas'
                ? '#16a34a'
                : skinId === 'tet'
                ? '#eab308'
                : skinId === 'halloween'
                ? '#27272a'
                : skinId === 'teacher'
                ? '#ffffff'
                : skinId === 'cyber'
                ? '#1e293b'
                : skinId === 'summer'
                ? '#0369a1'
                : '#f8fafc'
            }
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Rolled cuff */}
          <ellipse cx="48" cy="81" rx="3.5" ry="6" fill="#cbd5e1" transform="rotate(-25 48 81)" />
          {/* Front Hand wrapped tight around rope (Second Grip) */}
          <rect x="24" y="82" width="11" height="13" rx="3.5" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
          <line x1="27" y1="85" x2="27" y2="92" stroke="#c2410c" strokeWidth="1.2" />
          <line x1="30" y1="85" x2="30" y2="92" stroke="#c2410c" strokeWidth="1.2" />
          <line x1="33" y1="85" x2="33" y2="92" stroke="#c2410c" strokeWidth="1.2" />
          <ellipse cx="34" cy="85" rx="2" ry="3" fill="#fdba74" />
        </g>
      </svg>
    </motion.div>
  );
}

