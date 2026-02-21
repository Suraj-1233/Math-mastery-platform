export type TestType = 'Topic' | 'Sectional' | 'Full' | 'Speed';

export interface MockTest {
    id: string;
    title: string;
    description: string;
    type: TestType;
    topicId?: string; // Links to content.ts module ID
    duration: number; // minutes
    questionCount: number;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    totalMarks: number;
    negativeMarking: number; // per wrong answer
    questions: string[]; // List of Question IDs (will link to a question bank later)
    // Hindi Support
    titleHi?: string;
    descriptionHi?: string;
}

export const mockTests: MockTest[] = [
    // ==========================================
    // 📊 PERCENTAGE MINI MOCK
    // ==========================================
    {
        id: 'MOCK_PERC_01',
        title: 'Percentage Foundation Test',
        titleHi: 'प्रतिशत फाउंडेशन टेस्ट',
        description: 'Test your basic understanding of percentage fractions and simple word problems.',
        descriptionHi: 'प्रतिशत, भिन्नों और सरल शब्द समस्याओं की अपनी बुनियादी समझ का परीक्षण करें।',
        type: 'Topic',
        topicId: 'M11', // Percentage Module
        duration: 15,
        questionCount: 10,
        difficulty: 'Easy',
        totalMarks: 20,
        negativeMarking: 0.5,
        questions: [
            'Q_PERC_001', 'Q_PERC_002', 'Q_PERC_003', 'Q_PERC_004', 'Q_PERC_005',
            'Q_PERC_006', 'Q_PERC_007', 'Q_PERC_008', 'Q_PERC_009', 'Q_PERC_010'
        ]
    },

    // ==========================================
    // ✖️ ALGEBRA CHALLENGE
    // ==========================================
    {
        id: 'MOCK_ALG_01',
        title: 'Algebra Advanced Challenge',
        titleHi: 'बीजगणित एडवांस्ड चुनौती',
        description: 'Hard level test covering x+1/x patterns and value putting.',
        descriptionHi: 'x+1/x पैटर्न और मान रखने (Value Putting) को कवर करने वाला कठिन स्तर का परीक्षण।',
        type: 'Topic',
        topicId: 'M08', // Algebra Module
        duration: 25,
        questionCount: 15,
        difficulty: 'Hard',
        totalMarks: 30,
        negativeMarking: 0.5,
        questions: [
            'Q_ALG_001', 'Q_ALG_002', 'Q_ALG_003', 'Q_ALG_004', 'Q_ALG_005',
            'Q_ALG_006', 'Q_ALG_007', 'Q_ALG_008', 'Q_ALG_009', 'Q_ALG_010',
            'Q_ALG_011', 'Q_ALG_012', 'Q_ALG_013', 'Q_ALG_014', 'Q_ALG_015'
        ]
    },

    // ==========================================
    // ⚡ SPEED CALCULATION DRILL
    // ==========================================
    {
        id: 'MOCK_SPEED_01',
        title: 'Calculation Speed Drill',
        titleHi: 'कैलकुलेशन स्पीड ड्रिल',
        description: 'High-speed test for Simplification, Squares, and Cubes.',
        descriptionHi: 'सरलीकरण, वर्ग और घन के लिए उच्च गति परीक्षण।',
        type: 'Speed',
        topicId: 'M17', // Simplification Module
        duration: 10,
        questionCount: 20,
        difficulty: 'Medium',
        totalMarks: 40,
        negativeMarking: 0, // No negative marking in speed drills usually
        questions: [
            'Q_CALC_001', 'Q_CALC_002', 'Q_CALC_003', 'Q_CALC_004', 'Q_CALC_005',
            'Q_CALC_006', 'Q_CALC_007', 'Q_CALC_008', 'Q_CALC_009', 'Q_CALC_010',
            'Q_CALC_011', 'Q_CALC_012', 'Q_CALC_013', 'Q_CALC_014', 'Q_CALC_015',
            'Q_CALC_016', 'Q_CALC_017', 'Q_CALC_018', 'Q_CALC_019', 'Q_CALC_020'
        ]
    },

    // ==========================================
    // 🏆 GEOMETRY MASTERY TEST
    // ==========================================
    {
        id: 'MOCK_GEO_01',
        title: 'Geometry Centers & Triangles',
        titleHi: 'ज्यामिति केंद्र और त्रिभुज',
        description: 'Focus on Incenter, Circumcenter, and Orthocenter properties.',
        descriptionHi: 'अंतःकेंद्र, परिकेंद्र और लंबकेंद्र गुणों पर ध्यान केंद्रित करें।',
        type: 'Topic',
        topicId: 'M01', // Geometry Module
        duration: 20,
        questionCount: 10,
        difficulty: 'Medium',
        totalMarks: 20,
        negativeMarking: 0.5,
        questions: [
            'Q_GEO_001', 'Q_GEO_002', 'Q_GEO_003', 'Q_GEO_004', 'Q_GEO_005',
            'Q_GEO_006', 'Q_GEO_007', 'Q_GEO_008', 'Q_GEO_009', 'Q_GEO_010'
        ]
    }
];

export const getTestsByTopic = (topicId: string) => mockTests.filter(test => test.topicId === topicId);
export const getTestsByType = (type: TestType) => mockTests.filter(test => test.type === type);
