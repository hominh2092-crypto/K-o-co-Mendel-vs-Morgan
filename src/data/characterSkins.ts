import { CharacterSkinId } from '../types';

export interface CharacterSkinDef {
  id: CharacterSkinId;
  nameVi: string;
  nameEn: string;
  icon: string;
  themeTagVi: string;
  themeTagEn: string;
  descriptionVi: string;
  descriptionEn: string;
  gradientClass: string;
  borderClass: string;
  bgGlow: string;
  mendel: {
    titleVi: string;
    titleEn: string;
    outfitDescVi: string;
    outfitDescEn: string;
    pullQuoteVi: string;
    pullQuoteEn: string;
    winQuoteVi: string;
    winQuoteEn: string;
  };
  morgan: {
    titleVi: string;
    titleEn: string;
    outfitDescVi: string;
    outfitDescEn: string;
    pullQuoteVi: string;
    pullQuoteEn: string;
    winQuoteVi: string;
    winQuoteEn: string;
  };
}

export const CHARACTER_SKINS: CharacterSkinDef[] = [
  {
    id: 'classic',
    nameVi: 'Nguyên Bản Lịch Sử',
    nameEn: 'Historical Classic',
    icon: '🏛️',
    themeTagVi: 'Truyền thống',
    themeTagEn: 'Classic',
    descriptionVi: 'Trang phục chuẩn xác theo chân dung lịch sử: Áo thầy tu Augustinô và Giáo sư Đại học Columbia thế kỷ 20.',
    descriptionEn: 'Authentic historical attire: Augustinian friar habit and 20th-century Columbia University professor suit.',
    gradientClass: 'from-emerald-950/60 to-amber-950/60',
    borderClass: 'border-slate-700 hover:border-emerald-500/50',
    bgGlow: 'rgba(16, 185, 129, 0.1)',
    mendel: {
      titleVi: 'Viện phụ Gregor Mendel',
      titleEn: 'Abbot Gregor Mendel',
      outfitDescVi: 'Áo tu sĩ dòng Augustinô màu sẫm, tràng hạt gai và nhánh dây leo Đậu Hà Lan (Pisum sativum).',
      outfitDescEn: 'Augustinian monastic habit, hemp rope belt and climbing garden pea vines.',
      pullQuoteVi: 'Hây... DÔ DÂY! 🌱',
      pullQuoteEn: 'Heave... PULL! 🌱',
      winQuoteVi: 'Quy luật Phân li chiến thắng! 🏆',
      winQuoteEn: 'Law of Segregation prevails! 🏆',
    },
    morgan: {
      titleVi: 'Giáo sư Thomas H. Morgan',
      titleEn: 'Professor Thomas H. Morgan',
      outfitDescVi: 'Áo gi-lê dạ tweed cổ điển, cà vạt đỏ, đồng hồ bỏ túi quả quýt bằng vàng và bầy ruồi giấm mắt đỏ.',
      outfitDescEn: 'Classic tweed vest, crimson tie, gold pocket watch chain, and red-eyed fruit flies.',
      pullQuoteVi: 'Ráng lên... LIÊN KẾT GEN! 🪰',
      pullQuoteEn: 'Hold tight... GENE LINKAGE! 🪰',
      winQuoteVi: 'Thuyết Di truyền Nhiễm sắc thể vinh quang! 🏆',
      winQuoteEn: 'Chromosome Theory triumphs! 🏆',
    },
  },
  {
    id: 'christmas',
    nameVi: 'Giáng Sinh Ấm Áp',
    nameEn: 'Cozy Christmas',
    icon: '🎄',
    themeTagVi: 'Lễ Hội Mùa Đông',
    themeTagEn: 'Winter Holiday',
    descriptionVi: 'Không khí Noel rộn rã với mũ len Noel viền bông tuyết, áo ấm lễ hội, chuông vàng và kẹo que bạc hà.',
    descriptionEn: 'Holiday cheer featuring fluffy Santa hats, cozy festive sweaters, golden jingle bells, and peppermint canes.',
    gradientClass: 'from-red-950/70 via-emerald-950/50 to-red-900/60',
    borderClass: 'border-red-500/40 hover:border-emerald-400',
    bgGlow: 'rgba(239, 68, 68, 0.15)',
    mendel: {
      titleVi: 'Mendel Ông Già Noel',
      titleEn: 'Santa Mendel',
      outfitDescVi: 'Áo choàng nhung đỏ thắm viền lông tuyết trắng, mũ chóp Noel quả bông tròn, thắt lưng đính quả chuông giáng sinh.',
      outfitDescEn: 'Crimson velvet coat with snow-white fur lining, pom-pom Santa hat, and golden holiday bells.',
      pullQuoteVi: 'Merry Christmas! Kéo quà về nào! 🎁',
      pullQuoteEn: 'Merry Christmas! Pull the gifts! 🎁',
      winQuoteVi: 'Giáng sinh an lành & chiến thắng! ❄️',
      winQuoteEn: 'Peace on Earth & Victory! ❄️',
    },
    morgan: {
      titleVi: 'Morgan Yêu Tinh Giáng Sinh',
      titleEn: 'Holiday Elf Morgan',
      outfitDescVi: 'Áo len đan họa tiết cây thông tuyết, cà vạt kẹo que đỏ trắng Candy Cane, ruồi giấm đội nón Noel tí hon.',
      outfitDescEn: 'Festive snowflake sweater, candy cane striped tie, and fruit flies sporting tiny elf caps.',
      pullQuoteVi: 'Chuông ngân vang! Kéo hết sức! 🔔',
      pullQuoteEn: 'Jingle bells! Pull with all might! 🔔',
      winQuoteVi: 'Món quà Noel tuyệt nhất là Thắng lợi! 🎄',
      winQuoteEn: 'Best gift of all is Victory! 🎄',
    },
  },
  {
    id: 'tet',
    nameVi: 'Tết Cổ Truyền 🌸',
    nameEn: 'Lunar New Year',
    icon: '🧧',
    themeTagVi: 'Xuân Sum Vầy',
    themeTagEn: 'Spring Festival',
    descriptionVi: 'Đậm đà phong vị Tết Việt Nam: Áo dài gấm thêu hoa mai hoa đào, khăn đóng hoàng gia, pháo hoa và bao lì xì may mắn.',
    descriptionEn: 'Traditional Vietnamese Tet: Silk Áo Dài embroidered with apricot & peach blossoms, royal headwraps, and lucky red envelopes.',
    gradientClass: 'from-amber-950/70 via-red-950/70 to-yellow-950/60',
    borderClass: 'border-amber-500/50 hover:border-red-400',
    bgGlow: 'rgba(245, 158, 11, 0.15)',
    mendel: {
      titleVi: 'Cụ Mendel Áo Dài Mai Vàng',
      titleEn: 'Scholar Mendel Golden Blossom',
      outfitDescVi: 'Áo dài gấm đỏ truyền thống thêu cành hoa mai vàng, khăn đóng đỏ chỉ kim tuyến, dắt bao lì xì tài lộc 🧧.',
      outfitDescEn: 'Imperial red silk Áo Dài with yellow apricot blossoms, traditional red turban, and lucky red envelopes.',
      pullQuoteVi: 'Vạn sự như ý! Kéo tài lộc về! 🧧',
      pullQuoteEn: 'Auspicious Spring! Pull prosperity! 🧧',
      winQuoteVi: 'Xuân đắc thắng, cả năm phát tài! 🌸',
      winQuoteEn: 'Spring triumph, prosperity year-round! 🌸',
    },
    morgan: {
      titleVi: 'Thầy Morgan Áo Dài Cành Đào',
      titleEn: 'Master Morgan Peach Blossom',
      outfitDescVi: 'Áo dài lụa vàng kim rực rỡ thêu hoa đào hồng thắm, khăn đóng vàng sang trọng, pháo sáng Tết reo vui.',
      outfitDescEn: 'Radiant golden silk Áo Dài with pink peach blossoms, golden headwrap, and cheerful festive sparklers.',
      pullQuoteVi: 'Khai xuân như ý! Dô ta kéo dây! 🧨',
      pullQuoteEn: 'Spring kickoff! Pull with vigor! 🧨',
      winQuoteVi: 'Cung chúc tân xuân, thắng lợi vẻ vang! 🏮',
      winQuoteEn: 'New Year blessings and glorious win! 🏮',
    },
  },
  {
    id: 'halloween',
    nameVi: 'Halloween Huyền Bí',
    nameEn: 'Spooky Halloween',
    icon: '🎃',
    themeTagVi: 'Lễ Hội Ma Quái',
    themeTagEn: 'Spooky Night',
    descriptionVi: 'Màn đêm ma mị với nón phù thủy cổ đại, áo choàng Bá tước Dracula ma cà rồng, lồng đèn bí ngô Jack-o\'-Lantern và cánh dơi chập chờn.',
    descriptionEn: 'Eerie twilight featuring ancient wizard hats, Count Dracula vampire cloaks, glowing Jack-o\'-Lanterns, and bats.',
    gradientClass: 'from-purple-950/80 via-slate-950 to-amber-950/70',
    borderClass: 'border-purple-500/40 hover:border-orange-500',
    bgGlow: 'rgba(168, 85, 247, 0.15)',
    mendel: {
      titleVi: 'Phù Thủy Thảo Dược Mendel',
      titleEn: 'Alchemist Sorcerer Mendel',
      outfitDescVi: 'Mũ phù thủy nhọn màu tím viền vàng, áo choàng thần bí bóng đêm, quả bí ngô phát sáng bí thuật ở thắt lưng.',
      outfitDescEn: 'Pointed purple wizard hat with gold buckle, mystical dark cloak, and glowing magical pumpkin belt.',
      pullQuoteVi: 'Trick or Treat! Kéo tung bùa phép! 🔮',
      pullQuoteEn: 'Trick or Treat! Cast the pull spell! 🔮',
      winQuoteVi: 'Bí thuật Di truyền làm chủ bóng đêm! 🎃',
      winQuoteEn: 'Genetics Sorcery rules the night! 🎃',
    },
    morgan: {
      titleVi: 'Bá Tước Ma Cà Rồng Morgan',
      titleEn: 'Count Morgan Dracula',
      outfitDescVi: 'Áo choàng đen lót lụa đỏ thẫm với cổ dựng cao kiêu hãnh, nơ dơi quý tộc, ruồi giấm biến thành tiểu dạ điệp ma quái.',
      outfitDescEn: 'High-collared black cape lined with blood-red silk, bat bowtie, and fruit flies fluttering like shadow bats.',
      pullQuoteVi: 'Hahaha! Sức mạnh bóng đêm kéo dây! 🦇',
      pullQuoteEn: 'Muahaha! Shadows guide my pull! 🦇',
      winQuoteVi: 'Đêm vĩnh hằng thuộc về Nhiễm sắc thể! 🩸',
      winQuoteEn: 'Eternal night bows to Chromosomes! 🩸',
    },
  },
  {
    id: 'teacher',
    nameVi: 'Thầy Cô Giáo & Giảng Đường',
    nameEn: 'Educators & Academy',
    icon: '👨‍🏫',
    themeTagVi: 'Học Đường Kính Yêu',
    themeTagEn: 'School Campus',
    descriptionVi: 'Tôn vinh nghề giáo cao quý: Mũ cử nhân tốt nghiệp, áo sơ mi phấn trắng, thước kẻ gỗ và sách giáo khoa Sinh học 12.',
    descriptionEn: 'Honoring dedicated teachers: Mortarboard graduation caps, chalk dust coats, wooden rulers, and textbook.',
    gradientClass: 'from-blue-950/70 via-slate-900 to-indigo-950/70',
    borderClass: 'border-sky-500/40 hover:border-indigo-400',
    bgGlow: 'rgba(56, 189, 248, 0.15)',
    mendel: {
      titleVi: 'Thầy Giáo Sinh Học Mendel',
      titleEn: 'Biology Instructor Mendel',
      outfitDescVi: 'Mũ cử nhân đại học vuông vắn có tua rua vàng, áo sơ mi carô chỉn chu, tay kẹp sách Sinh học 12 và thước đo di truyền.',
      outfitDescEn: 'Graduation mortarboard cap with golden tassel, neat school shirt, and Biology 12 textbook on belt.',
      pullQuoteVi: 'Học tập chăm chỉ! Ghi 10 điểm vào sổ! 📝',
      pullQuoteEn: 'Study diligently! Pull for top grades! 📝',
      winQuoteVi: 'Điểm 10 tuyệt đối môn Di truyền! 💯',
      winQuoteEn: 'Perfect score in Genetics exam! 💯',
    },
    morgan: {
      titleVi: 'Giáo Sư Viện Hàn Lâm Morgan',
      titleEn: 'Distinguished Dean Morgan',
      outfitDescVi: 'Áo Blouse phòng lab trắng tinh khôi của nhà nghiên cứu, kính lúp phóng đại nhiễm sắc thể, cặp kính giảng viên uyên bác.',
      outfitDescEn: 'Pristine white laboratory coat, chromosomal magnifying glass, and distinguished academic spectacles.',
      pullQuoteVi: 'Vào giờ thực hành! Kéo theo công thức! 📐',
      pullQuoteEn: 'Lab time begins! Pull by the formula! 📐',
      winQuoteVi: 'Bảo vệ thành công Luận án Tiến sĩ! 🎓',
      winQuoteEn: 'Successfully defended the Doctoral thesis! 🎓',
    },
  },
  {
    id: 'cyber',
    nameVi: 'Chiến Binh Sinh Học 2099',
    nameEn: 'Cyberpunk Bio 2099',
    icon: '⚡',
    themeTagVi: 'Tương Lai Viễn Tưởng',
    themeTagEn: 'Futuristic Sci-Fi',
    descriptionVi: 'Kỷ nguyên di truyền học tương lai: Mắt kính Hologram HUD, giáp trợ lực nano phát quang, ống nghiệm ADN xoắn kép phát sáng neon.',
    descriptionEn: 'Next-gen genetics: Holographic HUD visor, glowing powered exosuits, and luminescent nano DNA double helices.',
    gradientClass: 'from-cyan-950/80 via-emerald-950/60 to-purple-950/80',
    borderClass: 'border-cyan-500/50 hover:border-teal-400',
    bgGlow: 'rgba(6, 182, 212, 0.2)',
    mendel: {
      titleVi: 'Mendel Cybersuit X-7',
      titleEn: 'Cybersuit Mendel X-7',
      outfitDescVi: 'Kính thực tế tăng cường Neon Cyan, giáp trợ lực sợi carbon nano sinh học, ống nghiệm chứa mã gen phát quang.',
      outfitDescEn: 'Neon cyan AR visor, carbon-nanofiber power suit, and glowing bioluminescent gene capsule.',
      pullQuoteVi: 'Kích hoạt gia tốc lượng tử! DÔ TA! ⚡',
      pullQuoteEn: 'Quantum drive engaged! PULL NOW! ⚡',
      winQuoteVi: 'Mã di truyền 2099 đồng bộ 100%! 🚀',
      winQuoteEn: 'Genetic code 2099 fully synchronized! 🚀',
    },
    morgan: {
      titleVi: 'Chỉ Huy Robot Morgan Cyber',
      titleEn: 'Cyber Commander Morgan',
      outfitDescVi: 'Mắt kính Scouter quét chỉ số ADN, khung xương trợ lực Neon Hổ phách, đàn ruồi giấm nano drone trinh sát laser.',
      outfitDescEn: 'DNA Scouter monocle eyepiece, amber neon exoskeleton, and micro-drone laser scouting fruit flies.',
      pullQuoteVi: 'Quá tải động cơ gen! Kéo toàn lực! 🤖',
      pullQuoteEn: 'Gene thrusters overloaded! Maximum pull! 🤖',
      winQuoteVi: 'Phân tích hoàn tất: Chiến thắng áp đảo! 🌐',
      winQuoteEn: 'Analysis complete: Absolute victory! 🌐',
    },
  },
  {
    id: 'summer',
    nameVi: 'Mùa Hè Nhiệt Đới',
    nameEn: 'Tropical Summer',
    icon: '🏖️',
    themeTagVi: 'Biển Xanh Nắng Vàng',
    themeTagEn: 'Beach & Palms',
    descriptionVi: 'Kỳ nghỉ hè thư thái: Áo sơ mi hoa lá Hawaii rực rỡ, nón cói đi biển, kính râm phong cách và nước dừa tươi mát lạnh.',
    descriptionEn: 'Vacation vibes: Hawaiian floral shirts, woven straw hats, trendy shades, and refreshing coconut drinks.',
    gradientClass: 'from-sky-950/70 via-teal-950/60 to-amber-950/70',
    borderClass: 'border-teal-500/40 hover:border-amber-400',
    bgGlow: 'rgba(20, 184, 166, 0.15)',
    mendel: {
      titleVi: 'Mendel Du Hí Hawaii',
      titleEn: 'Island Mendel',
      outfitDescVi: 'Nón cói che nắng viền lá cọ, áo Hawaii hoa lá xanh tươi mát rượi, kính râm đen phong độ và trái dừa nhiệt đới.',
      outfitDescEn: 'Palm-leaf straw hat, breezy Hawaiian aloha shirt, dark sunglasses, and a fresh tropical coconut drink.',
      pullQuoteVi: 'Sóng biển dâng trào! Kéo mát lành! 🌊',
      pullQuoteEn: 'Catch the wave! Cool seaside pull! 🌊',
      winQuoteVi: 'Kỳ nghỉ hè vô địch rực rỡ nắng vàng! ☀️',
      winQuoteEn: 'Championship summer under golden sunshine! ☀️',
    },
    morgan: {
      titleVi: 'Morgan Lướt Sóng Biển',
      titleEn: 'Surfer Morgan',
      outfitDescVi: 'Mũ lưỡi trai thể thao cá tính, kính mát phi công vàng kim, áo polo xanh biển phối phao cứu sinh mini ngộ nghĩnh.',
      outfitDescEn: 'Sporty baseball cap, gold aviator sunglasses, ocean-blue polo, and a cute mini lifebuoy accessory.',
      pullQuoteVi: 'Gió biển lộng thổi! Kéo hết ga! 🏄‍♂️',
      pullQuoteEn: 'Ocean breeze blows! Pull full throttle! 🏄‍♂️',
      winQuoteVi: 'Cúp vô địch lướt sóng kéo co thuộc về Morgan! 🏖️',
      winQuoteEn: 'Surfing tug-of-war trophy goes to Morgan! 🏖️',
    },
  },
];

export function getSkinDef(skinId: CharacterSkinId): CharacterSkinDef {
  return CHARACTER_SKINS.find((s) => s.id === skinId) || CHARACTER_SKINS[0];
}
