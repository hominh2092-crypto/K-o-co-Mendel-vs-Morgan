import { Language } from '../types';

export const translations = {
  vi: {
    // App Brand & Subtitle
    gameTitle: 'ĐẤU TRƯỜNG KÉO CO SINH HỌC 12',
    gameSubtitle: 'Gregor Mendel vs Thomas Hunt Morgan — Đỉnh cao tranh tài Di truyền học',
    tagline: 'Kéo dây bằng tri thức: Trả lời đúng kéo dây về đội mình, trả lời sai giữ nguyên vị trí!',

    // Main Lobby Buttons
    btnPlay: 'CHƠI NGAY',
    btnPlayDesc: 'Bắt đầu kéo co trí tuệ',
    btnSettings: 'CÀI ĐẶT',
    btnSettingsDesc: 'Ngôn ngữ, âm lượng & thời gian',
    btnQuestions: 'QUẢN LÝ CÂU HỎI',
    btnQuestionsDesc: 'Tự biên soạn ngân hàng đề thi',
    btnRules: 'LUẬT CHƠI & LỊCH SỬ',
    btnBackToLobby: 'Sảnh chính',

    // Play Setup Flow
    setupTitle: 'THIẾT LẬP TRẬN ĐẤU',
    step1Title: '1. Chọn hình thức thi đấu',
    step1Desc: 'Chọn đối thủ bạn muốn so tài kiến thức Sinh học 12',
    modeVsBot: 'Kéo với máy (Vs AI)',
    modeVsBotDesc: 'Đấu trí trực tiếp với AI thông minh mô phỏng nhà khoa học',
    modePvP: '2 Người chơi (PvP)',
    modePvPDesc: 'Thi đấu đối kháng 2 người trên cùng một thiết bị',

    pvpSubModeTitle: 'Thể thức 2 người chơi:',
    pvpSimultaneous: '2 Người cùng lúc',
    pvpSimultaneousDesc: 'Cả 2 bên trả lời độc lập cùng lúc trên bàn phím',
    pvpTurnBased: 'Chơi theo lượt',
    pvpTurnBasedDesc: 'Từng bên lần lượt trả lời câu hỏi',

    step2Title: '2. Chọn nhà khoa học đại diện',
    step2DescVsBot: 'Chọn nhân vật bạn sẽ điều khiển (Máy sẽ chọn nhà khoa học còn lại):',
    step2DescPvP: 'Chọn nhân vật cho Người chơi 1 (Người chơi 2 sẽ nhận nhân vật còn lại):',

    mendelName: 'Gregor Mendel',
    mendelTitle: 'Cha đẻ Di truyền học cổ điển',
    mendelOrganism: 'Cây Đậu Hà Lan (Pisum sativum)',
    mendelSpecialty: 'Quy luật Phân li & Phân li độc lập',
    mendelColorLabel: 'Đội Xanh Ngọc (Bên Trái)',

    morganName: 'Thomas Hunt Morgan',
    morganTitle: 'Bậc thầy Di truyền học Nhiễm sắc thể',
    morganOrganism: 'Ruồi giấm (Drosophila melanogaster)',
    morganSpecialty: 'Liên kết gen, Hoán vị gen & Di truyền liên kết giới tính',
    morganColorLabel: 'Đội Hổ Phách (Bên Phải)',

    btnStartMatch: 'BẮT ĐẦU KÉO CO',
    btnCancel: 'Quay lại',

    // Settings Modal
    settingsTitle: 'CÀI ĐẶT HỆ THỐNG',
    settingsDesc: 'Tùy chỉnh ngôn ngữ, âm thanh và trải nghiệm trò chơi',
    langSectionTitle: 'Ngôn ngữ hiển thị (Language)',
    langVi: 'Tiếng Việt',
    langEn: 'English',
    langChangedNotice: 'Đã chuyển sang Tiếng Việt',

    volumeSectionTitle: 'Âm lượng (Master Volume)',
    volumePercent: 'Mức âm:',
    btnMute: 'Tắt tiếng',
    btnUnmute: 'Bật tiếng',
    btnTestSound: 'Nghe thử âm thanh',
    soundDisabledNotice: 'Âm thanh hiện đang bị tắt',

    timeSectionTitle: 'Thời gian suy nghĩ',
    btnCustomizeTime: 'Tùy chỉnh thời gian thi đấu',
    currentTimeLabel: 'Thời gian hiện tại:',

    btnClose: 'Đóng cài đặt',
    btnApply: 'Lưu thay đổi',

    // In-game Headers & Badges
    arenaTab: 'Đấu trường kéo co',
    managerTab: 'Quản lý câu hỏi',
    turnA: 'Lượt đội Mendel',
    turnB: 'Lượt đội Morgan',
    round: 'Câu',
    timeRemaining: 'Thời gian',
    timeOutNotice: 'Hết thời gian suy nghĩ!',
    unlimited: 'Vô hạn',

    // Controls hints
    controlsMendel: 'Phím điều khiển: 1, 2, 3, 4 (hoặc A, S, D, F)',
    controlsMorgan: 'Phím điều khiển: 7, 8, 9, 0 (hoặc H, J, K, L)',

    // Skin Selection
    skinSelectorTitle: 'TRANG PHỤC NHÂN VẬT',
    skinSelectorDesc: 'Chọn chủ đề trang phục độc đáo cho Mendel & Morgan',
    btnOpenWardrobe: 'Xem chi tiết tủ đồ',
    btnEquipSkin: 'Mặc trang phục này',
    equippedBadge: 'Đang mặc',
    wardrobeModalTitle: 'BỘ SƯU TẬP TRANG PHỤC (CHARACTER WARDROBE)',
    wardrobeModalDesc: 'Tùy biến ngoại hình, mũ đội và phụ kiện của hai nhà khoa học theo các sự kiện & chủ đề đặc biệt',
  },
  en: {
    // App Brand & Subtitle
    gameTitle: 'BIOLOGY 12 TUG OF WAR',
    gameSubtitle: 'Gregor Mendel vs Thomas Hunt Morgan — The Ultimate Genetics Battle',
    tagline: 'Pull with your intellect: Correct answers tug the rope closer, wrong answers leave it in place!',

    // Main Lobby Buttons
    btnPlay: 'PLAY NOW',
    btnPlayDesc: 'Start the genetics tug of war',
    btnSettings: 'SETTINGS',
    btnSettingsDesc: 'Language, volume & timer',
    btnQuestions: 'QUESTION MANAGER',
    btnQuestionsDesc: 'Customize genetics questions',
    btnRules: 'RULES & LORE',
    btnBackToLobby: 'Main Menu',

    // Play Setup Flow
    setupTitle: 'MATCH SETUP',
    step1Title: '1. Select Game Mode',
    step1Desc: 'Choose how you want to challenge your Biology 12 knowledge',
    modeVsBot: 'Vs Computer (Bot AI)',
    modeVsBotDesc: 'Face off against an intelligent AI simulating the opposing scientist',
    modePvP: '2 Players (PvP)',
    modePvPDesc: 'Head-to-head battle between two players on the same screen',

    pvpSubModeTitle: '2-Player match format:',
    pvpSimultaneous: 'Simultaneous Speed',
    pvpSimultaneousDesc: 'Both sides answer questions simultaneously in real-time',
    pvpTurnBased: 'Turn-Based',
    pvpTurnBasedDesc: 'Teams take alternating turns to answer',

    step2Title: '2. Choose Your Scientist',
    step2DescVsBot: 'Select your scientist (The computer will control the other):',
    step2DescPvP: 'Select scientist for Player 1 (Player 2 will take the remaining scientist):',

    mendelName: 'Gregor Mendel',
    mendelTitle: 'Father of Classical Genetics',
    mendelOrganism: 'Garden Pea (Pisum sativum)',
    mendelSpecialty: 'Law of Segregation & Independent Assortment',
    mendelColorLabel: 'Emerald Team (Left Side)',

    morganName: 'Thomas Hunt Morgan',
    morganTitle: 'Master of Chromosomal Genetics',
    morganOrganism: 'Fruit Fly (Drosophila melanogaster)',
    morganSpecialty: 'Gene Linkage, Crossing Over & Sex-linked Inheritance',
    morganColorLabel: 'Amber Team (Right Side)',

    btnStartMatch: 'START BATTLE',
    btnCancel: 'Cancel',

    // Settings Modal
    settingsTitle: 'SYSTEM SETTINGS',
    settingsDesc: 'Configure language, audio volume, and game preferences',
    langSectionTitle: 'Display Language',
    langVi: 'Tiếng Việt',
    langEn: 'English',
    langChangedNotice: 'Switched to English',

    volumeSectionTitle: 'Master Volume',
    volumePercent: 'Volume level:',
    btnMute: 'Mute',
    btnUnmute: 'Unmute',
    btnTestSound: 'Test Sound',
    soundDisabledNotice: 'Sound is currently muted',

    timeSectionTitle: 'Answer Time Limit',
    btnCustomizeTime: 'Customize Timer Settings',
    currentTimeLabel: 'Current setting:',

    btnClose: 'Close Settings',
    btnApply: 'Save Changes',

    // In-game Headers & Badges
    arenaTab: 'Tug of War Arena',
    managerTab: 'Question Manager',
    turnA: "Mendel's Turn",
    turnB: "Morgan's Turn",
    round: 'Question',
    timeRemaining: 'Time',
    timeOutNotice: 'Time limit exceeded!',
    unlimited: 'Unlimited',

    // Controls hints
    controlsMendel: 'Controls: Keys 1, 2, 3, 4 (or A, S, D, F)',
    controlsMorgan: 'Controls: Keys 7, 8, 9, 0 (or H, J, K, L)',

    // Skin Selection
    skinSelectorTitle: 'CHARACTER SKINS',
    skinSelectorDesc: 'Choose special themed outfits for Mendel & Morgan',
    btnOpenWardrobe: 'View Full Wardrobe',
    btnEquipSkin: 'Equip This Skin',
    equippedBadge: 'Equipped',
    wardrobeModalTitle: 'CHARACTER WARDROBE & SKINS',
    wardrobeModalDesc: 'Customize outfits, headwear, and accessories for both scientists across special events & holidays',
  },
};

export function getT(lang: Language) {
  return translations[lang] || translations.vi;
}
