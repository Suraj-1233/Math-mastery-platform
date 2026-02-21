export type ExamType = 'SSC CGL Tier 1' | 'SSC CGL Tier 2' | 'SSC CHSL' | 'SSC CPO';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type QuestionType = 'Conceptual' | 'Calculation' | 'Tricky' | 'Standard';

export interface PYQ {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;

    // Exam Metadata
    exam: ExamType;
    year: number;
    shift: string;
    date?: string;

    // Classification
    topic: string; // e.g., "Percentage"
    subtopic: string; // e.g., "Successive Change"
    patternId?: string; // Links to patterns.ts

    // Analysis
    difficulty: Difficulty;
    type: QuestionType;
    commonTrap?: string;
    timeExpected: number; // seconds

    // Solution Metrics
    formulaUsed?: string[];
    shortcutAvailable: boolean;
    shortcutId?: string; // Links to shortcuts.ts
    idealMethod: string;
    trapPoint?: string;
    // Hindi Support
    questionHi?: string;
    explanationHi?: string;
    idealMethodHi?: string;
    trapPointHi?: string;
    subtopicHi?: string;
}

export const pyqDatabase: PYQ[] = [
    // ==========================================
    // 📊 PERCENTAGE PYQs
    // ==========================================
    {
        id: 'PYQ_2023_T1_01',
        question: 'A number is first increased by 20% and then decreased by 20%. The number effectively:',
        questionHi: 'एक संख्या को पहले 20% बढ़ाया जाता है और फिर 20% घटाया जाता है। संख्या में प्रभावी रूप से:',
        options: ['Does not change', 'Decreases by 4%', 'Increases by 4%', 'Decreases by 0.4%'],
        correctAnswer: 'Decreases by 4%',
        exam: 'SSC CGL Tier 1',
        year: 2023,
        shift: 'Shift 1',
        topic: 'Percentage',
        subtopic: 'Successive Change',
        subtopicHi: 'क्रमागत परिवर्तन',
        patternId: 'PAT_PERC_02',
        difficulty: 'Easy',
        type: 'Standard',
        commonTrap: 'Thinking net change is 0%',
        timeExpected: 10,
        shortcutAvailable: true,
        shortcutId: 'SC_PERC_02',
        idealMethod: 'x + y + xy/100 -> 20 - 20 - 400/100 = -4%',
        idealMethodHi: 'x + y + xy/100 -> 20 - 20 - 400/100 = -4%'
    },
    {
        id: 'PYQ_2022_T1_05',
        question: 'If A is 40% more than B, then B is how much percent less than A?',
        questionHi: 'यदि A, B से 40% अधिक है, तो B, A से कितना प्रतिशत कम है?',
        options: ['28.57%', '40%', '33.33%', '25%'],
        correctAnswer: '28.57%',
        exam: 'SSC CGL Tier 1',
        year: 2022,
        shift: 'Shift 2',
        topic: 'Percentage',
        subtopic: 'A vs B Comparison',
        subtopicHi: 'A बनाम B तुलना',
        difficulty: 'Easy',
        type: 'Conceptual',
        timeExpected: 15,
        shortcutAvailable: true,
        idealMethod: '1/5 -> 2/5 more -> 2/7 less. 2/7 = 28.57%',
        idealMethodHi: '40% = 2/5 अधिक -> 2/(5+2) कम = 2/7 कम। 2/7 = 28.57%'
    },

    // ==========================================
    // 💰 PROFIT & LOSS PYQs
    // ==========================================
    {
        id: 'PYQ_2023_T2_02',
        question: 'A shopkeeper earns a profit of 20% even after offering a discount of 10% on the MP. Find the ratio of CP to MP.',
        questionHi: 'एक दुकानदार अंकित मूल्य पर 10% की छूट देने के बाद भी 20% का लाभ कमाता है। क्रय मूल्य और अंकित मूल्य का अनुपात ज्ञात करें।',
        options: ['3:4', '4:5', '2:3', '9:8'],
        correctAnswer: '3:4',
        exam: 'SSC CGL Tier 2',
        year: 2023,
        shift: 'Mains',
        topic: 'Profit & Loss',
        subtopic: 'Discount & Markup',
        subtopicHi: 'छूट और मार्कअप',
        patternId: 'PAT_PL_03', // Related to CP/SP ratio
        difficulty: 'Medium',
        type: 'Standard',
        timeExpected: 20,
        shortcutAvailable: true,
        idealMethod: 'CP/MP = (100-D)/(100+P) = 90/120 = 3/4',
        idealMethodHi: 'CP/MP = (100-D)/(100+P) = 90/120 = 3/4'
    },
    {
        id: 'PYQ_2022_T1_12',
        question: 'By selling an article for ₹500, a man incurs a loss of 10%. At what price should he sell it to gain 20%?',
        questionHi: 'एक वस्तु को ₹500 में बेचने पर एक आदमी को 10% की हानि होती है। 20% लाभ कमाने के लिए उसे किस कीमत पर बेचना चाहिए?',
        options: ['₹600', '₹666.66', '₹700', '₹550'],
        correctAnswer: '₹666.66',
        exam: 'SSC CGL Tier 1',
        year: 2022,
        shift: 'Shift 3',
        topic: 'Profit & Loss',
        subtopic: 'SP to New SP',
        subtopicHi: 'विक्रय मूल्य से नया विक्रय मूल्य',
        difficulty: 'Easy',
        type: 'Calculation',
        timeExpected: 25,
        shortcutAvailable: true,
        idealMethod: 'SP2 = SP1 * (120/90) = 500 * 4/3 = 2000/3',
        idealMethodHi: 'SP2 = SP1 * (120/90) = 500 * 4/3 = 2000/3'
    },

    // ==========================================
    // 📐 ALGEBRA PYQs
    // ==========================================
    {
        id: 'PYQ_2023_T1_08',
        question: 'If x + 1/x = 4, then find the value of x² + 1/x².',
        questionHi: 'यदि x + 1/x = 4, तो x² + 1/x² का मान ज्ञात करें।',
        options: ['16', '14', '12', '18'],
        correctAnswer: '14',
        exam: 'SSC CGL Tier 1',
        year: 2023,
        shift: 'Shift 1',
        topic: 'Algebra',
        subtopic: 'Reciprocal Identities',
        subtopicHi: 'व्युत्क्रम सर्वसमिकाएँ',
        patternId: 'PAT_ALG_01',
        difficulty: 'Easy',
        type: 'Standard',
        timeExpected: 10,
        shortcutAvailable: true,
        idealMethod: 'k² - 2 -> 4² - 2 = 14',
        idealMethodHi: 'k² - 2 -> 4² - 2 = 14'
    },
    {
        id: 'PYQ_2022_T2_03',
        question: 'If x + 1/x = √3, find the value of x¹⁸ + x¹² + x⁶ + 1.',
        questionHi: 'यदि x + 1/x = √3, तो x¹⁸ + x¹² + x⁶ + 1 का मान ज्ञात करें।',
        options: ['0', '1', '2', '-1'],
        correctAnswer: '0',
        exam: 'SSC CGL Tier 2',
        year: 2022,
        shift: 'Mains',
        topic: 'Algebra',
        subtopic: 'Special Cases',
        subtopicHi: 'विशेष मामले',
        patternId: 'PAT_ALG_04', // Link to High Power Pattern?
        difficulty: 'Medium',
        type: 'Tricky',
        shortcutAvailable: true,
        shortcutId: 'SC_ALG_04',
        timeExpected: 20,
        idealMethod: 'x⁶ = -1. Pairs sum to 0.',
        idealMethodHi: 'x⁶ = -1 होता है। घातों का अंतर 6 होने पर योग 0 होता है।'
    },

    // ==========================================
    // 🔢 NUMBER SYSTEM PYQs
    // ==========================================
    {
        id: 'PYQ_2023_T1_15',
        question: 'Find the unit digit of (23)⁵⁷.',
        questionHi: '(23)⁵⁷ का इकाई अंक ज्ञात करें।',
        options: ['3', '7', '9', '1'],
        correctAnswer: '3',
        exam: 'SSC CGL Tier 1',
        year: 2023,
        shift: 'Shift 2',
        topic: 'Number System',
        subtopic: 'Unit Digit',
        subtopicHi: 'इकाई अंक',
        patternId: 'PAT_NUM_02',
        difficulty: 'Easy',
        type: 'Standard',
        timeExpected: 15,
        shortcutAvailable: true,
        idealMethod: '57/4 rem 1. 3¹ = 3',
        idealMethodHi: '57/4 शेष 1। 3¹ = 3'
    },
    {
        id: 'PYQ_2022_T1_18',
        question: 'The number 5432x7 is divisible by 9. Find the digit x.',
        questionHi: 'संख्या 5432x7, 9 से विभाज्य है। अंक x ज्ञात करें।',
        options: ['0', '6', '1', '9'],
        correctAnswer: '6',
        exam: 'SSC CGL Tier 1',
        year: 2022,
        shift: 'Shift 1',
        topic: 'Number System',
        subtopic: 'Divisibility',
        subtopicHi: 'विभाज्यता',
        difficulty: 'Easy',
        type: 'Standard',
        timeExpected: 15,
        shortcutAvailable: true,
        shortcutId: 'SC_CALC_01', // Digital sum related
        idealMethod: 'Sum of digits must be div by 9. 21+x -> x=6',
        idealMethodHi: 'अंकों का योग 9 से विभाज्य होना चाहिए। 21+x -> x=6'
    },

    // ==========================================
    // 🔺 TRIGONOMETRY PYQs
    // ==========================================
    {
        id: 'PYQ_2023_T2_05',
        question: 'Find the value of tan 10° tan 20° tan 70° tan 80°.',
        questionHi: 'tan 10° tan 20° tan 70° tan 80° का मान ज्ञात करें।',
        options: ['0', '1', '√3', '1/√3'],
        correctAnswer: '1',
        exam: 'SSC CGL Tier 2',
        year: 2023,
        shift: 'Mains',
        topic: 'Trigonometry',
        subtopic: 'Complementary Angles',
        subtopicHi: 'पूरक कोण',
        patternId: 'PAT_TRIG_01',
        difficulty: 'Easy',
        type: 'Standard',
        timeExpected: 10,
        shortcutAvailable: true,
        idealMethod: 'Pairs matching 90 cancel out to 1',
        idealMethodHi: '90° बनाने वाले जोड़े 1 हो जाते हैं (tan10 tan80 = 1)'
    },

    // ==========================================
    // 🛤️ TIME SPEED DISTANCE PYQs
    // ==========================================
    {
        id: 'PYQ_2022_T1_22',
        question: 'A policeman sees a thief at 200m. Police starts chasing. Police speed 12km/h, Thief 10km/h. Distance thief runs before caught?',
        questionHi: 'एक पुलिसकर्मी 200 मीटर की दूरी पर चोर को देखता है और पीछा करना शुरू करता है। पुलिस की गति 12 किमी/घंटा और चोर की 10 किमी/घंटा है। पकड़े जाने से पहले चोर कितनी दूरी तय करेगा?',
        options: ['1km', '2km', '1.5km', '800m'],
        correctAnswer: '1km',
        exam: 'SSC CGL Tier 1',
        year: 2022,
        shift: 'Shift 1',
        topic: 'Time Speed Distance',
        subtopic: 'Relative Speed',
        subtopicHi: 'सापेक्ष गति',
        difficulty: 'Medium',
        type: 'Calculation',
        commonTrap: 'Calculating time instead of distance',
        timeExpected: 30,
        shortcutAvailable: false,
        idealMethod: 'Relative speed 2kmph. Time = 0.2/2 = 0.1hr. Thief Dist = 10 * 0.1 = 1km',
        idealMethodHi: 'सापेक्ष गति 2kmph. समय = 0.2/2 = 0.1 घंटा। चोर की दूरी = 10 * 0.1 = 1km'
    },

    // ==========================================
    // ⏳ TIME & WORK PYQs
    // ==========================================
    {
        id: 'PYQ_2023_T1_20',
        question: 'A can do a work in 10 days, B in 15 days. They work together for 4 days then A leaves. In how many days will B finish remaining work?',
        questionHi: 'A एक कार्य को 10 दिनों में और B 15 दिनों में कर सकता है। वे 4 दिनों तक एक साथ काम करते हैं फिर A छोड़ देता है। B शेष कार्य को कितने दिनों में पूरा करेगा?',
        options: ['2 days', '3 days', '5 days', '4 days'],
        correctAnswer: '5 days',
        exam: 'SSC CGL Tier 1',
        year: 2023,
        shift: 'Shift 3',
        topic: 'Time & Work',
        subtopic: 'Leaving/Joining',
        subtopicHi: 'छोड़ना/जुड़ना',
        difficulty: 'Medium',
        type: 'Standard',
        timeExpected: 35,
        shortcutAvailable: false,
        idealMethod: 'LCM 30. Eff(A)=3, B=2. Total 5. 4 days=20 units. Left 10. B time = 10/2 = 5',
        idealMethodHi: 'LCM 30. क्षमता(A)=3, B=2. कुल 5. 4 दिन=20 इकाइयाँ। शेष 10. B का समय = 10/2 = 5'
    }
];

export const getPYQsByTopic = (topic: string) => pyqDatabase.filter(q => q.topic === topic);
export const getPYQsByExam = (exam: ExamType) => pyqDatabase.filter(q => q.exam === exam);
export const getPYQsByYear = (year: number) => pyqDatabase.filter(q => q.year === year);
