event_list_kr = ["수료식", "폐회식", "개회식", "입학식", "입학식", "졸업식", "졸업식",
                 "겨울방학", "겨울방학", "여름방학", "여름방학", "봄방학", "소풍", "소풍", "소풍", "캠프", "현장체험학습", "현장체험", "견학", "수학 여행",
                 "임의휴일", "임의휴일", "체육대회", "체육회", "학부모개방일", "학부모개강일", "참여교실", "참여교실",
                 "학교기념일", "방과후", "방과후 프로그램", "컨설팅", "상담", "설문조사", "설문지",
                 "지필평가", "지필평가", "시험", "전시회", "실천대회", "미술대전",
                 "수학 올림피아드", "과학 올림피아드", "신체 검사", "예방 접종",
                 "운동회", "탐색", "민방위", "소방훈련", "축제"]
event_list_en = ["commencement", "closing ceremony", "opening ceremony", "entrance ceremony", "admission ceremony", "diploma award ceremony", "graduation ceremony",
                 "winter vacation", "winter break", "summer vacation", "summer break", "spring break", "picnic", "jaunt", "excursion", "camp", "field experiential learning", "field experience study", "field trip", "school trip",
                 "discretionary holiday", "discretionary days off", "athletic competition", "athletic meet", "parent open class day", "parents' open day", "participatory class", "participation class",
                 "school anniversary", "after school", "after-school program", "consulting", "counseling", "survey", "questionnaire",
                 "paper-based evaluation", "paper-written evaluation", "exam",
                 "exhibition", "practical competition", "art competition",
                 "mathematics olympiad", "science olympiad", "physical examination", "vaccination",
                 "sports day", "exploration", "civil defense", "fire drill", "Festival"]
event_list_th = ["เริ่มต้น", "พิธีปิด", "พิธีเปิด", "พิธีเข้า", "พิธีรับเข้าเรียน", "พิธีมอบประกาศนียบัตร", "พิธีสำเร็จการศึกษา",
                 "วันหยุดฤดูหนาว", "พักร้อน", "วันหยุดฤดูร้อน", "พักร้อน", "พักร้อน", "ปิกนิก", "เที่ยวเล่น", "ทัศนศึกษา", "แคมป์", "การเรียนรู้จากประสบการณ์ภาคสนาม", "ประสบการณ์ภาคสนามเรียน", "ทัศนศึกษา", "ทัศนศึกษา",
                 "วันหยุดตามดุลยพินิจ", "วันหยุดตามดุลยพินิจ", "การแข่งขันกีฬา", "พบปะนักกีฬา", "วันเปิดเรียนผู้ปกครอง", "วันเปิดเทอมของผู้ปกครอง", "ชั้นเรียนแบบมีส่วนร่วม", "ชั้นเรียนที่เข้าร่วม",
                 "วันครบรอบเรียน", "หลังเลิกเรียน", "โปรแกรมหลังเลิกเรียน", "การให้คำปรึกษา", "การให้คำปรึกษา", "แบบสำรวจ", "แบบสอบถาม",
                 "การประเมินแบบกระดาษ", "การประเมินแบบเขียนด้วยกระดาษ", "ข้อสอบ",
                 "นิทรรศการ", "การแข่งขันจริง", "การแข่งขันศิลปะ",
                 "คณิตศาสตร์โอลิมปิก", "โอลิมปิกวิทยาศาสตร์", "การตรวจร่างกาย", "การฉีดวัคซีน",
                 "วันกีฬา", "สำรวจ", "ป้องปราม", "ซ้อมดับเพลิง", "เทศกาล"]
event_list_km = ["ចាប់ផ្តើម", "ពិធីបិទ", "ពិធីបើក", "ពិធីចូល", "ពិធីចូលរៀន", "ពិធីប្រគល់សញ្ញាបត្រ", "ពិធីបញ្ចប់ការសិក្សា",
                 "វិស្សមកាលរដូវរងារ", "វិស្សមកាលរដូវរងារ", "វិស្សមកាលរដូវក្តៅ", "សម្រាករដូវក្តៅ", "សម្រាកនិទាឃរដូវ", "ភីកនិច", "jaunt", "ដំណើរកំសាន្ត", "បោះជំរុំ", "ការសិក្សាពិសោធន៍", "បទពិសោធន៍វាល។ ការសិក្សា", "ដំណើរកំសាន្ត", "ដំណើរកម្សាន្តទៅកាន់សាលារៀន",
                 "ថ្ងៃឈប់សំរាក", "ថ្ងៃឈប់សំរាក", "ការប្រកួតកីឡា", "ការជួបជុំអត្តពលិក", "ថ្ងៃបើកថ្នាក់មេ", "ថ្ងៃបើករបស់ឪពុកម្តាយ", "ថ្នាក់ចូលរួម", "ថ្នាក់ចូលរួម",
                 "ខួបសិក្សា", "ក្រោយសាលា", "កម្មវិធីក្រោយសាលា", "ការប្រឹក្សា", "ការប្រឹក្សា", "ការស្ទង់មតិ", "កម្រងសំណួរ",
                 "ការវាយតម្លៃផ្អែកលើក្រដាស", "ការវាយតម្លៃដែលសរសេរដោយក្រដាស", "ការប្រឡង",
                 "ការតាំងពិព័រណ៍", "ការប្រកួតប្រជែងជាក់ស្តែង", "ការប្រកួតប្រជែងសិល្បៈ",
                 "គណិតវិទ្យាអូឡាំព្យាដ", "វិទ្យាសាស្ត្រអូឡាំព្យាដ", "ការពិនិត្យរាងកាយ", "ការចាក់វ៉ាក់សាំង",
                 "ថ្ងៃកីឡា", "ការរុករក", "ការការពារស៊ីវិល", "ការហ្វឹកហាត់ភ្លើង", "ពិធីបុណ្យ"]
event_list_vi = ["bắt đầu", "lễ bế giảng", "lễ khai giảng", "lễ nhập học", "lễ nhập học", "lễ trao bằng tốt nghiệp", "lễ tốt nghiệp",
                 "kỳ nghỉ đông", "kỳ nghỉ đông", "kỳ nghỉ hè", "kỳ nghỉ hè", "kỳ nghỉ xuân", "dã ngoại", "vui chơi", "du ngoạn", "cắm trại", "học tập trải nghiệm thực địa", "trải nghiệm thực địa học tập ", " chuyến đi thực tế ", " chuyến đi học ",
                 "ngày nghỉ tùy ý", "ngày nghỉ tùy ý", "cuộc thi thể thao", "cuộc họp thể thao", "ngày mở lớp dành cho phụ huynh", "ngày khai giảng của phụ huynh", "lớp học có sự tham gia", "lớp học tham gia",
                 "kỷ niệm trường", "sau giờ học", "chương trình sau giờ học", "tư vấn", "tư vấn", "khảo sát", "bảng câu hỏi",
                 "đánh giá trên giấy", "đánh giá trên giấy", "kỳ thi",
                 "triển lãm", "cuộc thi thực hành", "cuộc thi nghệ thuật",
                 "Olympic toán học", "Olympic khoa học", "kiểm tra thể chất", "tiêm chủng",
                 "ngày hội thể thao", "khám phá", "phòng thủ dân sự", "diễn tập chữa cháy", "Lễ hội"]
event_list_ja = ["開始", "閉会式", "開会式", "入場式", "入学式", "卒業証書授与式", "卒業式",
                 "冬休み", "冬休み", "夏休み", "夏休み", "春休み", "ピクニック", "遠足", "遠足", "キャンプ", "野外体験学習", "野外体験勉強", "フィールドトリップ", "スクールトリップ",
                 "裁量の休日", "裁量の休日", "運動競技", "運動会", "親のオープンクラスの日", "親のオープンの日", "参加クラス", "参加クラス",
                 "学校の記念日", "放課後", "放課後プログラム", "コンサルティング", "カウンセリング", "調査", "アンケート",
                 "紙ベースの評価", "紙による評価", "試験", "展示会", "実戦", "アートコンペ", "数学オリンピック", "科学オリンピック", "身体検査", "ワクチン接種",
                 "スポーツデー", "探検", "市民防衛", "ファイアドリル", "フェスティバル"]
event_list_zh = ["开始", "闭幕式", "开幕式", "入学典礼", "入学典礼", "认证典礼", "毕业典礼",
                 "寒假", "假期", "暑假", "假期", "假期", "野餐", "旅行", "远足", "营地", "实地体验学习", "实地体验学习", "实地考察", "实地考察",
                 "不鼓励假期", "歧视性假期", "体育赛事", "运动员大会", "家长开放日", "家长开放日", "参与班", "服务员班",
                 "周年纪念", "放学后", "放学后计划", "辅导", "辅导", "调查", "问卷",
                 "论文评估", "论文评估", "考试", "展览", "真实比赛", "艺术比赛", "数学奥林匹克", "科学奥林匹克", "体格检查", "疫苗接种",
                 "运动会", "探索", "威慑", "消防演习", "节日"]
