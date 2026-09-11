import { Question } from '../types';
import mendelAvatar from '../assets/images/mendel_portrait_1788943551781.jpg';
import morganAvatar from '../assets/images/morgan_portrait_1788943564933.jpg';

// Bộ câu hỏi dành riêng cho Bên A (Gregor Mendel) - Sinh học 12 Giữa kì 1
export const MENDEL_QUESTIONS: Question[] = [
  {
    id: 101,
    topic: 'Mã di truyền',
    question: 'Trong các bộ ba sau đây, bộ ba nào làm nhiệm vụ mang tín hiệu mở đầu quá trình dịch mã ở sinh vật nhân thực?',
    options: [
      '5\' AUG 3\' (mã hóa axit amin Mêtiônin)',
      '5\' UAA 3\' (mã hóa axit amin Valin)',
      '5\' UGA 3\' (mã hóa axit amin Foocmin mêtiônin)',
      '3\' AUG 5\' (mã hóa axit amin Mêtiônin)'
    ],
    correctIndex: 0,
    explanation: 'Bộ ba mở đầu trên mARN là 5\' AUG 3\', quy định mở đầu dịch mã và mã hóa axit amin Mêtiônin ở sinh vật nhân thực (hoặc Foocmin mêtiônin ở nhân sơ).'
  },
  {
    id: 102,
    topic: 'Nhân đôi ADN',
    question: 'Enzim chính thực hiện chức năng kéo dài mạch mới trong quá trình nhân đôi ADN là:',
    options: [
      'ARN pôlimeraza',
      'ADN pôlimeraza',
      'ADN ligaza (enzim nối)',
      'Enzim tháo xoắn (Helicase)'
    ],
    correctIndex: 1,
    explanation: 'ADN pôlimeraza chỉ có thể lắp ráp nuclêôtit mới vào đầu 3\'-OH tự do của mạch khuôn theo nguyên tắc bổ sung, giúp tổng hợp mạch ADN mới theo chiều 5\' → 3\'.'
  },
  {
    id: 103,
    topic: 'Cấu trúc Operon Lac',
    question: 'Trong mô hình cấu trúc của Ôpêron Lac ở vi khuẩn E. coli, vùng vận hành (O) là nơi:',
    options: [
      'Mang thông tin mã hóa prôtêin ức chế',
      'ARN pôlimeraza bám vào để khởi đầu phiên mã',
      'Prôtêin ức chế có thể liên kết làm ngăn cản phiên mã',
      'Chứa các gen cấu trúc Z, Y, A quy định enzim phân giải lactôzơ'
    ],
    correctIndex: 2,
    explanation: 'Vùng vận hành (O - Operator) là trình tự nuclêôtit đặc biệt nơi prôtêin ức chế bám vào để kiểm soát và ức chế sự phiên mã của nhóm gen cấu trúc.'
  },
  {
    id: 104,
    topic: 'Đột biến gen',
    question: 'Đột biến thay thế một cặp nuclêôtit ở vị trí giữa gen cấu trúc nhưng không làm thay đổi trình tự axit amin trong chuỗi pôlipeptit là do đặc tính nào của mã di truyền?',
    options: [
      'Tính phổ biến của mã di truyền',
      'Tính đặc hiệu của mã di truyền',
      'Tính thoái hóa của mã di truyền',
      'Tính liên tục không gối lên nhau'
    ],
    correctIndex: 2,
    explanation: 'Tính thoái hóa (nhiều bộ ba khác nhau cùng mã hóa cho một loại axit amin) giúp cho đột biến thay thế nucleotit có thể tạo ra codon đồng nghĩa, không làm đổi axit amin.'
  },
  {
    id: 105,
    topic: 'Cấu trúc Nhiễm sắc thể',
    question: 'Mỗi nuclêôxôm trong cấu trúc siêu hiển vi của nhiễm sắc thể sinh vật nhân thực gồm có:',
    options: [
      'Một đoạn ADN dài 146 cặp nuclêôtit quấn 1 ¾ vòng quanh khối cầu gồm 8 phân tử prôtêin histon',
      'Một đoạn ADN dài 140 cặp nuclêôtit quấn 2 vòng quanh khối cầu gồm 6 phân tử prôtêin histon',
      'Một đoạn ADN dài 164 cặp nuclêôtit quấn 3 vòng quanh phân tử prôtêin phi histon',
      'Một đoạn ADN dài 200 cặp nuclêôtit quấn 1 vòng quanh 8 phân tử ARN pôlimeraza'
    ],
    correctIndex: 0,
    explanation: 'Mỗi nucleoxom gồm lõi là 8 phân tử prôtêin histon được quấn quanh bởi một đoạn phân tử ADN dài 146 cặp nucleotit với 1 ¾ vòng.'
  },
  {
    id: 106,
    topic: 'Đột biến cấu trúc NST',
    question: 'Dạng đột biến cấu trúc nhiễm sắc thể nào sau đây làm tăng cường hoặc giảm bớt mức biểu hiện của tính trạng?',
    options: [
      'Mất đoạn',
      'Lặp đoạn',
      'Đảo đoạn',
      'Chuyển đoạn tương hỗ'
    ],
    correctIndex: 1,
    explanation: 'Đột biến lặp đoạn làm tăng số lượng bản sao của gen trên NST, từ đó có thể làm tăng cường hoặc giảm bớt mức biểu hiện của tính trạng (ví dụ lặp đoạn ở ruồi giấm làm mắt lồi thành mắt dẹt).'
  },
  {
    id: 107,
    topic: 'Quy luật Menđen',
    question: 'Phương pháp độc đáo và quan trọng nhất giúp Menđen phát hiện ra các quy luật di truyền là:',
    options: [
      'Quan sát tế bào học dưới kính hiển vi điện tử',
      'Phân tích cơ thể lai qua các thế hệ và sử dụng toán xác suất thống kê',
      'Gây đột biến bằng hóa chất rồi chọn lọc kiểu hình',
      'Lai phân tích giữa nhiều loài động vật khác nhau'
    ],
    correctIndex: 1,
    explanation: 'Menđen đã sử dụng phương pháp phân tích cơ thể lai: tạo dòng thuần, lai các cặp tính trạng tương phản, theo dõi riêng rẽ từng tính trạng qua các thế hệ lai và dùng toán thống kê để rút ra quy luật.'
  },
  {
    id: 108,
    topic: 'Phân ly độc lập Menđen',
    question: 'Khi lai hai thứ đậu Hà Lan thuần chủng hạt vàng, trơn với hạt xanh, nhăn, Menđen thu được ở thế hệ F2 tỉ lệ phân ly kiểu hình là:',
    options: [
      '3 hạt vàng, trơn : 1 hạt xanh, nhăn',
      '9 vàng, trơn : 3 vàng, nhăn : 3 xanh, trơn : 1 xanh, nhăn',
      '1 vàng, trơn : 1 vàng, nhăn : 1 xanh, trơn : 1 xanh, nhăn',
      '9 vàng, nhăn : 3 vàng, trơn : 3 xanh, nhăn : 1 xanh, trơn'
    ],
    correctIndex: 1,
    explanation: 'Tỉ lệ kiểu hình F2 kinh điển của phép lai hai cặp tính trạng phân ly độc lập là 9 : 3 : 3 : 1 (9 Vàng, trơn : 3 Vàng, nhăn : 3 Xanh, trơn : 1 Xanh, nhăn).'
  },
  {
    id: 109,
    topic: 'Đột biến số lượng NST',
    question: 'Ở một loài sinh vật có bộ nhiễm sắc thể lưỡng bội 2n = 24. Số lượng nhiễm sắc thể có trong một tế bào sinh dưỡng của thể ba (2n + 1) là:',
    options: [
      '23',
      '25',
      '26',
      '48'
    ],
    correctIndex: 1,
    explanation: 'Thể ba là dạng đột biến lệch bội có thêm 1 chiếc ở một cặp NST: 2n + 1 = 24 + 1 = 25 NST.'
  },
  {
    id: 110,
    topic: 'Di truyền học quần thể',
    question: 'Cơ sở tế bào học của quy luật phân ly Menđen là:',
    options: [
      'Sự nhân đôi và phân ly độc lập của các phân tử ARN',
      'Sự phân ly đồng đều của các nhiễm sắc thể tương đồng trong giảm phân dẫn đến sự phân ly của các alen',
      'Sự tiếp hợp và trao đổi chéo giữa các cromatit',
      'Sự kết hợp ngẫu nhiên của các giao tử trong quá trình thụ tinh'
    ],
    correctIndex: 1,
    explanation: 'Trong tế bào sinh dưỡng các gen tồn tại thành từng cặp alen trên cặp NST tương đồng. Khi giảm phân hình thành giao tử, cặp NST tương đồng phân ly đồng đều kéo theo cặp alen phân ly về các giao tử.'
  },
  {
    id: 111,
    topic: 'Điều hòa hoạt động gen',
    question: 'Khi môi trường có lactôzơ, điều gì xảy ra làm cho các gen cấu trúc của Ôpêron Lac bắt đầu phiên mã?',
    options: [
      'Gen điều hòa R ngừng tổng hợp prôtêin ức chế',
      'Lactôzơ gắn vào prôtêin ức chế làm biến đổi cấu hình, khiến nó không bám được vào vùng vận hành O',
      'Lactôzơ bám trực tiếp vào vùng P kích thích ARN pôlimeraza',
      'Enzim ADN pôlimeraza tiến hành phân giải prôtêin ức chế'
    ],
    correctIndex: 1,
    explanation: 'Lactôzơ đóng vai trò chất cảm ứng gắn vào prôtêin ức chế làm biến đổi cấu hình không gian của nó, không bám được vào vùng vận hành O, giải phóng cho ARN pôlimeraza tiến hành phiên mã.'
  },
  {
    id: 112,
    topic: 'Đột biến điểm',
    question: 'Dạng đột biến điểm nào sau đây làm thay đổi nhiều nhất trật tự axit amin trong chuỗi pôlipeptit kể từ vị trí xảy ra đột biến?',
    options: [
      'Thay thế một cặp A - T bằng một cặp G - X',
      'Thay thế một cặp G - X bằng một cặp A - T',
      'Mất một cặp nucleotit ở đầu gen',
      'Thay thế một cặp nucleotit ở bộ ba sát bộ ba kết thúc'
    ],
    correctIndex: 2,
    explanation: 'Đột biến mất (hoặc thêm) một cặp nuclêôtit gây hiện tượng dịch khung đọc mã di truyền, làm thay đổi toàn bộ trình tự axit amin từ vị trí đột biến cho đến cuối chuỗi.'
  }
];

// Bộ câu hỏi dành riêng cho Bên B (Thomas Hunt Morgan) - Sinh học 12 Giữa kì 1
export const MORGAN_QUESTIONS: Question[] = [
  {
    id: 201,
    topic: 'Liên kết gen Moocgan',
    question: 'Đối tượng sinh học nổi tiếng mà Thomas Hunt Morgan đã sử dụng để phát hiện ra quy luật liên kết gen và hoán vị gen là:',
    options: [
      'Đậu Hà Lan (Pisum sativum)',
      'Ruồi giấm (Drosophila melanogaster)',
      'Vi khuẩn đường ruột (Escherichia coli)',
      'Cây ngô (Zea mays)'
    ],
    correctIndex: 1,
    explanation: 'Morgan chọn ruồi giấm (Drosophila melanogaster) vì dễ nuôi trong ống nghiệm, vòng đời ngắn (10-14 ngày), đẻ nhiều con, số lượng NST ít (2n = 8) và có nhiều biến dị quan sát rõ.'
  },
  {
    id: 202,
    topic: 'Liên kết gen hoàn toàn',
    question: 'Hiện tượng di truyền liên kết gen hoàn toàn xảy ra khi:',
    options: [
      'Các gen quy định các tính trạng khác nhau cùng nằm trên một nhiễm sắc thể và di truyền cùng nhau',
      'Mỗi gen nằm trên một cặp nhiễm sắc thể tương đồng riêng biệt',
      'Các gen trao đổi chéo cho nhau trong quá trình giảm phân',
      'Các tính trạng chỉ di truyền theo dòng mẹ'
    ],
    correctIndex: 0,
    explanation: 'Liên kết gen là hiện tượng các gen nằm trên cùng một phân tử ADN (cùng một NST) có xu hướng di truyền cùng nhau qua các thế hệ tế bào và thế hệ cơ thể.'
  },
  {
    id: 203,
    topic: 'Hoán vị gen',
    question: 'Cơ sở tế bào học của hiện tượng hoán vị gen là:',
    options: [
      'Sự phân ly độc lập và tổ hợp tự do của các nhiễm sắc thể ở kì sau giảm phân I',
      'Sự tiếp hợp và trao đổi chéo đoạn tương ứng giữa 2 crômatit khác nguồn gốc của cặp NST tương đồng ở kì đầu giảm phân I',
      'Sự không phân ly của một cặp nhiễm sắc thể ở kì sau nguyên phân',
      'Sự đứt gãy và tiêu biến của một cánh nhiễm sắc thể trong kì trung gian'
    ],
    correctIndex: 1,
    explanation: 'Hoán vị gen xảy ra do sự tiếp hợp và trao đổi đoạn tương ứng giữa 2 trong 4 cromatit khác nguồn gốc (không chị em) trong cặp NST kép tương đồng ở kì đầu giảm phân I.'
  },
  {
    id: 204,
    topic: 'Tần số hoán vị gen',
    question: 'Tần số hoán vị gen (f) giữa hai gen trên cùng một nhiễm sắc thể có đặc điểm nào sau đây?',
    options: [
      'Luôn bằng 50% trong mọi trường hợp',
      'Tỉ lệ nghịch với khoảng cách giữa các gen trên nhiễm sắc thể',
      'Không bao giờ vượt quá 50% và phản ánh khoảng cách tương đối giữa hai gen',
      'Càng gần tâm động thì tần số hoán vị càng lớn'
    ],
    correctIndex: 2,
    explanation: 'Tần số hoán vị gen f ≤ 50% vì chỉ có 2 trong 4 cromatit tham gia trao đổi chéo, và các tế bào không trao đổi chéo vẫn chiếm tỉ lệ lớn; 1% hoán vị gen ứng với 1 cM khoảng cách.'
  },
  {
    id: 205,
    topic: 'Di truyền liên kết giới tính',
    question: 'Khi Morgan lai ruồi cái mắt đỏ thuần chủng với ruồi đực mắt trắng, thu được F1 toàn ruồi mắt đỏ. Khi cho F1 giao phối với nhau, ở F2 ông thu được kết quả đặc biệt nào?',
    options: [
      'Toàn bộ ruồi cái và đực đều có mắt trắng',
      'Tỉ lệ 3 mắt đỏ : 1 mắt trắng, nhưng tất cả ruồi mắt trắng đều là ruồi đực',
      'Tất cả ruồi mắt trắng đều là ruồi cái',
      'Tỉ lệ 9 mắt đỏ : 7 mắt trắng phân ly đồng đều ở cả hai giới'
    ],
    correctIndex: 1,
    explanation: 'Ở F2 tỉ lệ kiểu hình là 3 mắt đỏ : 1 mắt trắng, nhưng tính trạng mắt trắng chỉ xuất hiện ở ruồi đực. Điều này chứng tỏ gen quy định màu mắt nằm trên NST giới tính X không có alen tương ứng trên Y.'
  },
  {
    id: 206,
    topic: 'Di truyền ngoài nhân',
    question: 'Đặc điểm nổi bật nhất của hiện tượng di truyền tế bào chất (di truyền ngoài nhân) là:',
    options: [
      'Kết quả phép lai thuận và lai nghịch luôn giống nhau',
      'Kết quả phép lai thuận và lai nghịch khác nhau, đời con luôn biểu hiện tính trạng giống mẹ',
      'Tính trạng phân ly theo đúng tỉ lệ Menđen 3 trội : 1 lặn ở F2',
      'Tính trạng chỉ biểu hiện ở giới dị giao tử XY'
    ],
    correctIndex: 1,
    explanation: 'Di truyền ngoài nhân (gen trong ti thể, lục lạp) di truyền theo dòng mẹ vì giao tử cái (trứng) đóng góp gần như toàn bộ tế bào chất cho hợp tử, còn tinh trùng chỉ đóng góp nhân.'
  },
  {
    id: 207,
    topic: 'Dịch mã',
    question: 'Phân tử ARN nào sau đây mang bộ ba đối mã (anticôđon) làm nhiệm vụ vận chuyển axit amin tới ribôxôm trong quá trình dịch mã?',
    options: [
      'mARN (ARN thông tin)',
      'tARN (ARN vận chuyển)',
      'rARN (ARN ribôxôm)',
      'snARN (ARN nhân nhỏ)'
    ],
    correctIndex: 1,
    explanation: 'tARN (ARN vận chuyển) có một đầu liên kết đặc hiệu với axit amin và một thùy chứa bộ ba đối mã (anticôđon) để khớp bổ sung với côđon trên mARN.'
  },
  {
    id: 208,
    topic: 'Phiên mã',
    question: 'Trong quá trình phiên mã tổng hợp mARN ở sinh vật nhân sơ, mạch khuôn của gen được đọc theo chiều nào và phân tử ARN được tổng hợp theo chiều nào?',
    options: [
      'Mạch khuôn đọc theo chiều 3\' → 5\', phân tử ARN được tổng hợp theo chiều 5\' → 3\'',
      'Mạch khuôn đọc theo chiều 5\' → 3\', phân tử ARN được tổng hợp theo chiều 3\' → 5\'',
      'Cả hai mạch đều được đọc theo chiều 5\' → 3\'',
      'Mạch khuôn đọc theo chiều 3\' → 5\', phân tử ARN được tổng hợp theo chiều 3\' → 5\''
    ],
    correctIndex: 0,
    explanation: 'ARN pôlimeraza di chuyển trượt trên mạch khuôn theo chiều 3\' → 5\' để tổng hợp chuỗi poliribonuclêôtit mới theo chiều ngược lại là 5\' → 3\'.'
  },
  {
    id: 209,
    topic: 'Đột biến cấu trúc NST',
    question: 'Hội chứng "tiếng mèo kêu" (cri-du-chat) ở người là do dạng đột biến cấu trúc nhiễm sắc thể nào gây ra?',
    options: [
      'Lặp đoạn trên nhiễm sắc thể số 21',
      'Mất đoạn ở cánh ngắn của nhiễm sắc thể số 5',
      'Đảo đoạn quanh tâm động trên nhiễm sắc thể số 9',
      'Chuyển đoạn không tương hỗ giữa NST số 22 và NST số 9'
    ],
    correctIndex: 1,
    explanation: 'Hội chứng tiếng mèo kêu (khóc như mèo kêu, chậm phát triển trí tuệ) ở người là do đột biến mất một đoạn cánh ngắn của nhiễm sắc thể số 5.'
  },
  {
    id: 210,
    topic: 'Ý nghĩa của liên kết gen',
    question: 'Ý nghĩa sinh học quan trọng nhất của hiện tượng liên kết gen hoàn toàn là:',
    options: [
      'Làm tăng biến dị tổ hợp phong phú cho chọn giống',
      'Hạn chế xuất hiện biến dị tổ hợp, duy trì sự ổn định của các nhóm tính trạng tốt luôn đi cùng nhau',
      'Tạo điều kiện để xác định vị trí tương đối của các gen trên bản đồ di truyền',
      'Làm tăng tỉ lệ thụ tinh thành công ở giới đực'
    ],
    correctIndex: 1,
    explanation: 'Liên kết gen hoàn toàn hạn chế biến dị tổ hợp, giúp các gen tốt luôn di truyền cùng nhau thành từng nhóm liên kết bền vững, có ý nghĩa lớn trong chọn giống.'
  },
  {
    id: 211,
    topic: 'Đột biến dị đa bội',
    question: 'Thể song nhị bội (dị đa bội) thường được hình thành qua con đường nào trong tự nhiên?',
    options: [
      'Lai cùng loài kết hợp với đột biến mất đoạn NST',
      'Lai xa giữa hai loài khác nhau kèm theo đa bội hóa (gấp đôi bộ NST của con lai)',
      'Gây đột biến bằng tác nhân consixin trên hạt nảy mầm cùng loài',
      'Thụ phấn tự do qua nhiều thế hệ liên tiếp'
    ],
    correctIndex: 1,
    explanation: 'Thể dị đa bội (song nhị bội) hình thành do lai xa giữa 2 loài khác nhau tạo con lai bất thụ (chứa nA + nB), sau đó được đa bội hóa thành 2nA + 2nB sinh sản hữu tính bình thường (ví dụ thí nghiệm củ cải lai bắp cải của Kapetrenko).'
  },
  {
    id: 212,
    topic: 'Quy luật di truyền giới tính',
    question: 'Ở động vật có vú và người, cơ chế xác định giới tính theo kiểu nào sau đây?',
    options: [
      'Giới cái là XX (đồng giao tử), giới đực là XY (dị giao tử)',
      'Giới cái là XY (dị giao tử), giới đực là XX (đồng giao tử)',
      'Giới cái là XO, giới đực là XX',
      'Giới tính hoàn toàn do nhiệt độ môi trường quyết định'
    ],
    correctIndex: 0,
    explanation: 'Ở người và động vật có vú (và ruồi giấm), con cái mang cặp NST giới tính XX (đồng giao tử), con đực mang cặp NST giới tính XY (dị giao tử).'
  }
];

export const TEAM_A_PROFILE = {
  id: 'A' as const,
  name: 'Gregor Mendel',
  fullName: 'Gregor Johann Mendel (1822 - 1884)',
  title: 'Cha đẻ của Di truyền học hiện đại',
  organism: 'Đậu Hà Lan (Pisum sativum)',
  quote: 'Quy luật phân ly & Phân ly độc lập',
  colorTheme: 'emerald',
  avatarUrl: mendelAvatar,
  keyHints: ['1', '2', '3', '4']
};

export const TEAM_B_PROFILE = {
  id: 'B' as const,
  name: 'Thomas Hunt Morgan',
  fullName: 'Thomas Hunt Morgan (1866 - 1945)',
  title: 'Giải Nobel Y học 1933 - Thuyết Di truyền NST',
  organism: 'Ruồi giấm (Drosophila melanogaster)',
  quote: 'Liên kết gen, Hoán vị gen & Giới tính',
  colorTheme: 'amber',
  avatarUrl: morganAvatar,
  keyHints: ['7', '8', '9', '0']
};
