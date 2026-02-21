export type ActivityType = 'Video' | 'Reading' | 'Practice' | 'Test' | 'Memorization';

export interface LearningStep {
    step: number;
    name: string;
    type: ActivityType;
    duration: number; // minutes
    description: string;
    activities: string[];
    resources?: string[]; // IDs of resources
    completionCriteria: string;
}

export interface LearningPath {
    id: string;
    topic: string;
    title: string;
    description: string;
    totalDuration: number; // minutes
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    steps: LearningStep[];
}

export const learningPaths: LearningPath[] = [
    // ==========================================
    // 📊 PERCENTAGE LEARNING PATH
    // ==========================================
    {
        id: 'LP_PERC',
        topic: 'Percentage',
        title: 'Percentage: Zero to Hero',
        description: 'Master Percentage from basic fractions to complex election problems.',
        totalDuration: 360, // 6 hours
        difficulty: 'Beginner',
        steps: [
            {
                step: 1,
                name: 'Concept Building',
                type: 'Reading',
                duration: 60,
                description: 'Understand the core meaning of Percentage and Fraction links.',
                activities: [
                    'Read Definition',
                    'Understand Base Value Concept',
                    'Visualize Percentage as Fraction'
                ],
                completionCriteria: 'Can explain what 20% increase means conceptually'
            },
            {
                step: 2,
                name: 'Formula & Fraction Mastery',
                type: 'Memorization',
                duration: 45,
                description: 'Memorize standard fractions 1/2 to 1/20.',
                activities: [
                    'Memorize Table 1/1 to 1/11',
                    'Practice Derived Fractions (3/8, 4/7)',
                    'Learn Successive Change Formula'
                ],
                completionCriteria: 'Can recall 1/7 = 14.28% instantly'
            },
            {
                step: 3,
                name: 'Pattern Recognition',
                type: 'Reading',
                duration: 60,
                description: 'Study the 5 most common SSC Percentage patterns.',
                activities: [
                    'Study Price-Consumption Pattern',
                    'Study Election Pattern',
                    'Study Venn Diagram Pattern'
                ],
                completionCriteria: 'Can identify pattern type in <10 seconds'
            },
            {
                step: 4,
                name: 'PYQ Practice',
                type: 'Practice',
                duration: 90,
                description: 'Solve last 3 years PYQs topic-wise.',
                activities: [
                    'Solve 20 Easy PYQs',
                    'Solve 15 Medium PYQs',
                    'Analyze Mistakes'
                ],
                completionCriteria: '90% Accuracy on Easy, 80% on Medium'
            },
            {
                step: 5,
                name: 'Speed Building',
                type: 'Practice',
                duration: 60,
                description: 'Apply shortcuts to solve faster.',
                activities: [
                    'Practice Digital Sum on Percentage',
                    'Use Ratio Method for calculations',
                    'Timed Drills (10 Qs in 5 mins)'
                ],
                completionCriteria: 'Solve 10 questions in 15 mins'
            },
            {
                step: 6,
                name: 'Mock Test',
                type: 'Test',
                duration: 15,
                description: 'Final topic-wise test.',
                activities: [
                    'Take Percentage Mini Mock',
                    'Review Score'
                ],
                completionCriteria: 'Score > 20/25'
            }
        ]
    },

    // ==========================================
    // ✖️ ALGEBRA LEARNING PATH
    // ==========================================
    {
        id: 'LP_ALG',
        topic: 'Algebra',
        title: 'Algebra: Identity Master',
        description: 'Dominate Algebra with value putting and identities.',
        totalDuration: 420, // 7 hours
        difficulty: 'Intermediate',
        steps: [
            {
                step: 1,
                name: 'Core Identities',
                type: 'Memorization',
                duration: 60,
                description: 'Memorize (a+b)^2 to a^3+b^3+c^3-3abc.',
                activities: [
                    'Write all 10 identities',
                    'Practice basic substitution',
                    'Understand derivation'
                ],
                completionCriteria: 'Can write all derived forms of a^3+b^3+c^3-3abc'
            },
            {
                step: 2,
                name: 'x + 1/x Mastery',
                type: 'Reading',
                duration: 60,
                description: 'The most important SSC Algebra pattern.',
                activities: [
                    'Study squaring/cubing shortcuts',
                    'Learn cases for 2, -2, 1, -1, √3',
                    'Practice power reduction'
                ],
                completionCriteria: 'Can find x^5 + 1/x^5 in 30 seconds'
            },
            {
                step: 3,
                name: 'Value Putting Tricks',
                type: 'Practice',
                duration: 60,
                description: 'Learn when and how to put values.',
                activities: [
                    'Practice a=0, b=0 method',
                    'Practice symmetry (a=b=c)',
                    'Solve 20 questions using value putting'
                ],
                completionCriteria: 'Identify value putting questions instantly'
            },
            {
                step: 4,
                name: 'PYQ Drill',
                type: 'Practice',
                duration: 120,
                description: 'Heavy practice on Algebra PYQs.',
                activities: [
                    'Solve T1 2023 Algebra Qs',
                    'Solve T2 2022 Algebra Qs'
                ],
                completionCriteria: 'Solve 40 PYQs with 85% accuracy'
            },
            {
                step: 5,
                name: 'Final Mock',
                type: 'Test',
                duration: 20,
                description: 'Algebra specific timed test.',
                activities: [
                    'Take Algebra Challenge',
                    'Check time per question'
                ],
                completionCriteria: 'Score > 40/50'
            }
        ]
    }
];

export const getLearningPathByTopic = (topic: string) => learningPaths.find(path => path.topic === topic);
