import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Sparkles, Shirt, Award, ChevronRight } from 'lucide-react';
import { CharacterSkinId, Language } from '../types';
import { CHARACTER_SKINS, getSkinDef } from '../data/characterSkins';
import { getT } from '../utils/translations';
import MendelCharacter from './MendelCharacter';
import MorganCharacter from './MorganCharacter';
import { sound } from '../utils/soundEffects';

interface SkinSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSkin: CharacterSkinId;
  onSelectSkin: (skinId: CharacterSkinId) => void;
  language: Language;
}

export default function SkinSelectorModal({
  isOpen,
  onClose,
  selectedSkin,
  onSelectSkin,
  language,
}: SkinSelectorModalProps) {
  const t = getT(language);
  const [previewSkinId, setPreviewSkinId] = useState<CharacterSkinId>(selectedSkin);

  if (!isOpen) return null;

  const currentPreviewSkin = getSkinDef(previewSkinId);
  const isCurrentlyEquipped = selectedSkin === previewSkinId;

  const handleSelect = (skinId: CharacterSkinId) => {
    sound.playClick();
    setPreviewSkinId(skinId);
  };

  const handleEquip = () => {
    sound.playCorrect();
    onSelectSkin(previewSkinId);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-800 bg-slate-950/70 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-linear-to-br from-emerald-500 to-amber-500 flex items-center justify-center text-slate-950 shadow-md">
                <Shirt className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                  <span>{t.wardrobeModalTitle}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                    7 Chủ Đề
                  </span>
                </h2>
                <p className="text-[11px] text-slate-400 hidden sm:block">
                  {t.wardrobeModalDesc}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body: Two columns (Skin List & Live Preview) */}
          <div className="flex-1 overflow-y-auto min-h-0 grid grid-cols-1 md:grid-cols-12">
            {/* Left: Theme Selector List (5 cols) */}
            <div className="md:col-span-5 p-3 sm:p-4 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col gap-2 overflow-y-auto bg-slate-950/40">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1 mb-1">
                Danh sách chủ đề trang phục:
              </div>

              {CHARACTER_SKINS.map((skin) => {
                const isSelected = previewSkinId === skin.id;
                const isEquipped = selectedSkin === skin.id;

                return (
                  <button
                    key={skin.id}
                    type="button"
                    onClick={() => handleSelect(skin.id)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 relative group ${
                      isSelected
                        ? 'bg-slate-800/90 border-amber-400 shadow-md shadow-slate-950/60'
                        : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/60 hover:border-slate-700'
                    }`}
                  >
                    {/* Icon Badge */}
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-xl shrink-0 shadow-inner">
                      {skin.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs sm:text-sm text-white truncate">
                          {language === 'vi' ? skin.nameVi : skin.nameEn}
                        </span>
                        {isEquipped && (
                          <span className="shrink-0 text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700">
                            {t.equippedBadge}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                        {language === 'vi' ? skin.themeTagVi : skin.themeTagEn} • {language === 'vi' ? skin.descriptionVi : skin.descriptionEn}
                      </p>
                    </div>

                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-amber-400 translate-x-0.5' : 'text-slate-600'}`} />
                  </button>
                );
              })}
            </div>

            {/* Right: Live Character Showcase & Lore (7 cols) */}
            <div className="md:col-span-7 p-4 sm:p-6 flex flex-col justify-between overflow-y-auto bg-linear-to-b from-slate-900 via-slate-900/90 to-slate-950">
              <div>
                {/* Active Theme Banner */}
                <div className={`p-3 rounded-xl border bg-linear-to-r ${currentPreviewSkin.gradientClass} ${currentPreviewSkin.borderClass} mb-4 relative overflow-hidden`}>
                  <div className="flex items-center justify-between gap-2 relative z-10">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xl">{currentPreviewSkin.icon}</span>
                        <h3 className="font-black text-sm sm:text-base text-white">
                          {language === 'vi' ? currentPreviewSkin.nameVi : currentPreviewSkin.nameEn}
                        </h3>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                        {language === 'vi' ? currentPreviewSkin.descriptionVi : currentPreviewSkin.descriptionEn}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2D Animated Stage Live Preview */}
                <div className="p-3 sm:p-4 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-inner relative overflow-hidden">
                  <div className="text-center text-[10px] font-bold tracking-wider uppercase text-slate-500 mb-2">
                    — XEM TRƯỚC NGOẠI HÌNH ĐẤU TRƯỜNG KÉO CO —
                  </div>

                  <div className="flex items-center justify-around gap-2 py-2">
                    {/* Mendel Preview */}
                    <div className="flex flex-col items-center">
                      <MendelCharacter
                        isPulling={false}
                        pullPosition={-1}
                        isWinner={false}
                        isLoser={false}
                        skinId={previewSkinId}
                      />
                      <div className="mt-2 text-center">
                        <div className="text-xs font-extrabold text-emerald-400">
                          {language === 'vi' ? currentPreviewSkin.mendel.titleVi : currentPreviewSkin.mendel.titleEn}
                        </div>
                        <div className="text-[9.5px] text-slate-400 max-w-[140px] mt-0.5 leading-tight">
                          {language === 'vi' ? currentPreviewSkin.mendel.outfitDescVi : currentPreviewSkin.mendel.outfitDescEn}
                        </div>
                      </div>
                    </div>

                    {/* VS divider */}
                    <div className="flex flex-col items-center justify-center shrink-0 text-slate-600 font-black text-sm">
                      <span>V</span>
                      <span>S</span>
                    </div>

                    {/* Morgan Preview */}
                    <div className="flex flex-col items-center">
                      <MorganCharacter
                        isPulling={false}
                        pullPosition={1}
                        isWinner={false}
                        isLoser={false}
                        skinId={previewSkinId}
                      />
                      <div className="mt-2 text-center">
                        <div className="text-xs font-extrabold text-amber-400">
                          {language === 'vi' ? currentPreviewSkin.morgan.titleVi : currentPreviewSkin.morgan.titleEn}
                        </div>
                        <div className="text-[9.5px] text-slate-400 max-w-[140px] mt-0.5 leading-tight">
                          {language === 'vi' ? currentPreviewSkin.morgan.outfitDescVi : currentPreviewSkin.morgan.outfitDescEn}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quotes and Exertion Voice Preview */}
                <div className="grid grid-cols-2 gap-2.5 mt-3 text-[10.5px]">
                  <div className="p-2 rounded-xl bg-emerald-950/30 border border-emerald-900/40">
                    <span className="text-[9px] font-bold text-emerald-400 block uppercase">
                      Khẩu hiệu kéo của Mendel:
                    </span>
                    <span className="font-semibold text-slate-200 italic">
                      "{language === 'vi' ? currentPreviewSkin.mendel.pullQuoteVi : currentPreviewSkin.mendel.pullQuoteEn}"
                    </span>
                  </div>

                  <div className="p-2 rounded-xl bg-amber-950/30 border border-amber-900/40">
                    <span className="text-[9px] font-bold text-amber-400 block uppercase">
                      Khẩu hiệu kéo của Morgan:
                    </span>
                    <span className="font-semibold text-slate-200 italic">
                      "{language === 'vi' ? currentPreviewSkin.morgan.pullQuoteVi : currentPreviewSkin.morgan.pullQuoteEn}"
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Equip Action */}
              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between gap-3 shrink-0">
                <div className="text-[11px] text-slate-400">
                  {isCurrentlyEquipped ? (
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <Check className="w-3.5 h-3.5" />
                      Trang phục này đang được áp dụng trong game
                    </span>
                  ) : (
                    <span>Nhấn nút bên cạnh để áp dụng trang phục</span>
                  )}
                </div>

                <button
                  type="button"
                  id="btn-confirm-equip-skin"
                  disabled={isCurrentlyEquipped}
                  onClick={handleEquip}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg ${
                    isCurrentlyEquipped
                      ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/60 cursor-default opacity-80'
                      : 'bg-linear-to-r from-emerald-500 to-amber-500 hover:from-emerald-400 hover:to-amber-400 text-slate-950 hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                >
                  {isCurrentlyEquipped ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{t.equippedBadge}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>{t.btnEquipSkin}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
