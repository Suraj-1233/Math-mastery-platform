export type ShortcutCategory = 'Calculation' | 'Percentage' | 'Algebra' | 'Geometry' | 'Number System' | 'Trigonometry';

export interface Shortcut {
    id: string;
    category: ShortcutCategory;
    title: string;
    description?: string;
    formula?: string;
    example: string;
    whenToUse: string;
    // Hindi Support
    titleHi?: string;
    descriptionHi?: string;
    exampleHi?: string;
    whenToUseHi?: string;
}

export const shortcuts: Shortcut[] = [
    // ==========================================
    // 🧮 CALCULATION SHORTCUTS
    // ==========================================
    {
        id: 'SC_CALC_01',
        category: 'Calculation',
        title: 'Digital Sum Method',
        titleHi: 'डिजिटल सम मेथड (अंक योग)',
        description: 'Sum of digits of LHS = Sum of digits of RHS. Used to verify options.',
        descriptionHi: 'LHS के अंकों का योग = RHS के अंकों का योग। विकल्पों को सत्यापित करने के लिए उपयोग किया जाता है।',
        example: '123 × 456 = ? Sum(123)=6, Sum(456)=15->6. 6×6=36->9. Option with sum 9 is answer.',
        exampleHi: '123 × 456 = ? योग(123)=6, योग(456)=15->6. 6×6=36->9. योग 9 वाला विकल्प उत्तर है।',
        whenToUse: 'Complex multiplication/division where options have different digit sums.',
        whenToUseHi: 'जटिल गुणा/भाग जहाँ विकल्पों के अंकों का योग अलग-अलग हो।'
    },
    {
        id: 'SC_CALC_02',
        category: 'Calculation',
        title: 'Square of Number ending in 5',
        titleHi: '5 पर समाप्त होने वाली संख्या का वर्ग',
        description: 'Append 25 at end. Multiply first part by (n)*(n+1).',
        descriptionHi: 'अंत में 25 जोड़ें। पहले भाग को (n)*(n+1) से गुणा करें।',
        formula: '(n5)² = [n*(n+1)] | 25',
        example: '35² -> 3*4=12 | 25 -> 1225. 75² -> 7*8=56 | 25 -> 5625.',
        exampleHi: '35² -> 3*4=12 | 25 -> 1225. 75² -> 7*8=56 | 25 -> 5625.',
        whenToUse: 'Squaring numbers like 15, 25, 35... 95.',
        whenToUseHi: '15, 25, 35... 95 जैसी संख्याओं का वर्ग करना।'
    },
    {
        id: 'SC_CALC_03',
        category: 'Calculation',
        title: 'Multiply by 11',
        titleHi: '11 से गुणा',
        description: 'Add neighbors. 123 × 11 -> 1 (1+2) (2+3) 3 -> 1353.',
        descriptionHi: 'पड़ोसियों को जोड़ें। 123 × 11 -> 1 (1+2) (2+3) 3 -> 1353.',
        example: '43 × 11 -> 4 (4+3) 3 -> 473.',
        exampleHi: '43 × 11 -> 4 (4+3) 3 -> 473.',
        whenToUse: 'Multiplication by 11, 121, etc.',
        whenToUseHi: '11, 121, आदि से गुणा।'
    },
    {
        id: 'SC_CALC_04',
        category: 'Calculation',
        title: 'Base 50 Square Method',
        titleHi: 'बेस 50 वर्ग विधि',
        description: 'Diff from 50. Add/Sub diff from 25. Append square of diff.',
        descriptionHi: '50 से अंतर। 25 में अंतर जोड़ें/घटाएं। अंतर का वर्ग जोड़ें।',
        formula: '(50 ± x)² = (25 ± x) | x²',
        example: '48² (-2 from 50) -> 25-2=23 | 04 -> 2304. 54² (+4) -> 29 | 16 -> 2916.',
        exampleHi: '48² (-2 50 से) -> 25-2=23 | 04 -> 2304. 54² (+4) -> 29 | 16 -> 2916.',
        whenToUse: 'Squaring numbers near 50 (30-70).',
        whenToUseHi: '50 के निकट संख्याओं (30-70) का वर्ग करना।'
    },
    {
        id: 'SC_CALC_05',
        category: 'Calculation',
        title: 'Base 100 Square Method',
        titleHi: 'बेस 100 वर्ग विधि',
        description: 'Diff from 100. Add/Sub diff from Number itself. Append square of diff.',
        descriptionHi: '100 से अंतर। संख्या से ही अंतर जोड़ें/घटाएं। अंतर का वर्ग जोड़ें।',
        formula: '(100 ± x)² = (Num ± x) | x²',
        example: '98² (-2) -> 98-2=96 | 04 -> 9604. 106² (+6) -> 106+6=112 | 36 -> 11236.',
        exampleHi: '98² (-2) -> 98-2=96 | 04 -> 9604. 106² (+6) -> 106+6=112 | 36 -> 11236.',
        whenToUse: 'Squaring numbers near 100 (80-120).',
        whenToUseHi: '100 के निकट संख्याओं (80-120) का वर्ग करना।'
    },

    // ==========================================
    // 📊 PERCENTAGE FRACTIONS
    // ==========================================
    {
        id: 'SC_PERC_01',
        category: 'Percentage',
        title: 'Standard Fractions (1/2 to 1/10)',
        titleHi: 'मानक भिन्न (Standard Fractions)',
        description: 'Memorize: 1/2=50%, 1/3=33.33%, 1/4=25%, 1/5=20%, 1/6=16.66%, 1/7=14.28%, 1/8=12.5%, 1/9=11.11%, 1/10=10%.',
        descriptionHi: 'याद रखें: 1/2=50%, 1/3=33.33%, 1/4=25%...',
        example: '16.66% of 36 -> 1/6 * 36 = 6.',
        exampleHi: '36 का 16.66% -> 1/6 * 36 = 6.',
        whenToUse: 'Converting % to Fraction in DI/Arithmetic.',
        whenToUseHi: 'DI/अंकगणित में % को भिन्न में बदलना।'
    },
    {
        id: 'SC_PERC_02',
        category: 'Percentage',
        title: 'Advanced Fractions (1/11 to 1/20)',
        titleHi: 'उन्नत भिन्न (1/11 से 1/20)',
        description: '1/11=9.09%, 1/12=8.33%, 1/13=7.69%, 1/14=7.14%, 1/15=6.66%, 1/16=6.25%, 1/17=5.88%, 1/18=5.55%, 1/19=5.26%, 1/20=5%.',
        descriptionHi: '1/11=9.09%, 1/12=8.33%, 1/13=7.69%...',
        example: '9.09% profit -> 1/11 profit -> SP = 12/11 CP.',
        exampleHi: '9.09% लाभ -> 1/11 लाभ -> SP = 12/11 CP.',
        whenToUse: 'Calculating CI/SI rates, Profit/Loss.',
        whenToUseHi: 'CI/SI दरों, लाभ/हानि की गणना करना।'
    },
    {
        id: 'SC_PERC_03',
        category: 'Percentage',
        title: 'Derived Fractions',
        titleHi: 'व्युत्पन्न भिन्न (Derived Fractions)',
        description: '3/8=37.5%, 5/8=62.5%, 7/8=87.5%, 4/7=57.14%, 5/6=83.33%.',
        descriptionHi: '3/8=37.5%, 5/8=62.5%, 7/8=87.5%...',
        example: '37.5% increase -> 3/8 increase -> Final = 11/8 Initial.',
        exampleHi: '37.5% वृद्धि -> 3/8 वृद्धि -> अंतिम = 11/8 प्रारंभिक।',
        whenToUse: 'Complex percentage calculations.',
        whenToUseHi: 'जटिल प्रतिशत गणना।'
    },

    // ==========================================
    // 📐 GEOMETRY TRIPLETS
    // ==========================================
    {
        id: 'SC_GEO_01',
        category: 'Geometry',
        title: 'Basic Pythagorean Triplets',
        titleHi: 'मूल पाइथागोरस ट्रिपलेट्स',
        description: '(3,4,5), (5,12,13), (6,8,10), (7,24,25), (8,15,17).',
        descriptionHi: '(3,4,5), (5,12,13), (6,8,10), (7,24,25), (8,15,17).',
        example: 'Triangle sides 5, 12, x. x must be 13 if right angled.',
        exampleHi: 'त्रिभुज की भुजाएँ 5, 12, x. x 13 होना चाहिए यदि समकोण है।',
        whenToUse: 'Identifying Right Angled Triangles instantly.',
        whenToUseHi: 'समकोण त्रिभुजों को तुरंत पहचानना।'
    },
    {
        id: 'SC_GEO_02',
        category: 'Geometry',
        title: 'Advanced Pythagorean Triplets',
        titleHi: 'उन्नत पाइथागोरस ट्रिपलेट्स',
        description: '(9,40,41), (11,60,61), (12,35,37), (20,21,29), (28,45,53).',
        descriptionHi: '(9,40,41), (11,60,61), (12,35,37), (20,21,29), (28,45,53).',
        example: 'Hypotenuse 29, one side 21. Other side is 20.',
        exampleHi: 'कर्ण 29, एक भुजा 21. दूसरी भुजा 20 है।',
        whenToUse: 'Mensuration and Geometry problems.',
        whenToUseHi: 'क्षेत्रमिति और ज्यामिति की समस्याएं।'
    },
    {
        id: 'SC_GEO_03',
        category: 'Geometry',
        title: 'Equilateral Triangle Properties',
        titleHi: 'समबाहु त्रिभुज गुण',
        description: 'Height = (√3/2)a, Area = (√3/4)a², Inradius = a/2√3, Circumradius = a/√3.',
        descriptionHi: 'ऊँचाई = (√3/2)a, क्षेत्रफल = (√3/4)a²',
        example: 'Side 6 -> Height 3√3, Area 9√3.',
        exampleHi: 'भुजा 6 -> ऊँचाई 3√3, क्षेत्रफल 9√3.',
        whenToUse: 'Mensuration 2D/3D problems involving equilateral triangles.',
        whenToUseHi: 'समबाहु त्रिभुजों को शामिल करने वाली समस्याएं।'
    },
    {
        id: 'SC_GEO_04',
        category: 'Geometry',
        title: 'Hexagon Shortcuts',
        titleHi: 'षट्भुज (Hexagon) शॉर्टकट्स',
        description: 'Area = 6 * Equilateral Triangle Area = 6*(√3/4)a² = (3√3/2)a².',
        descriptionHi: 'क्षेत्रफल = 6 * समबाहु त्रिभुज क्षेत्रफल',
        example: 'Side 4 -> Area = 6 * 4√3 = 24√3.',
        exampleHi: 'भुजा 4 -> क्षेत्रफल = 6 * 4√3 = 24√3.',
        whenToUse: 'Mensuration: Prism base, Regular Hexagon.',
        whenToUseHi: 'क्षेत्रमिति: प्रिज्म बेस, नियमित षट्भुज।'
    },

    // ==========================================
    // ✖️ ALGEBRA identities
    // ==========================================
    {
        id: 'SC_ALG_01',
        category: 'Algebra',
        title: 'x + 1/x = 2 Case',
        titleHi: 'x + 1/x = 2 स्थिति',
        description: 'If x + 1/x = 2, then x = 1.',
        descriptionHi: 'यदि x + 1/x = 2, तो x = 1.',
        example: 'x + 1/x = 2, find x^100 + 1/x^100. -> 1 + 1 = 2.',
        exampleHi: 'x + 1/x = 2, x^100 + 1/x^100 ज्ञात करें -> 1 + 1 = 2.',
        whenToUse: 'When sum of reciprocal is 2.',
        whenToUseHi: 'जब व्युत्क्रम का योग 2 हो।'
    },
    {
        id: 'SC_ALG_02',
        category: 'Algebra',
        title: 'x + 1/x = -2 Case',
        titleHi: 'x + 1/x = -2 स्थिति',
        description: 'If x + 1/x = -2, then x = -1.',
        descriptionHi: 'यदि x + 1/x = -2, तो x = -1.',
        example: 'x + 1/x = -2, find x^32 + 1/x^33. -> 1 + (-1) = 0.',
        exampleHi: 'मान ज्ञात करें -> 1 + (-1) = 0.',
        whenToUse: 'When sum of reciprocal is -2.',
        whenToUseHi: 'जब व्युत्क्रम का योग -2 हो।'
    },
    {
        id: 'SC_ALG_03',
        category: 'Algebra',
        title: 'x + 1/x = 1 Case',
        titleHi: 'x + 1/x = 1 स्थिति',
        description: 'If x + 1/x = 1, then x³ = -1.',
        descriptionHi: 'यदि x + 1/x = 1, तो x³ = -1.',
        formula: 'x³ + 1 = 0',
        example: 'x + 1/x = 1, find x³ + 1. -> 0.',
        exampleHi: 'x³ + 1 ज्ञात करें -> 0.',
        whenToUse: 'Critical: Remember x is NOT cube root of -1.',
        whenToUseHi: 'याद रखें x -1 का घनमूल नहीं है।'
    },
    {
        id: 'SC_ALG_04',
        category: 'Algebra',
        title: 'x + 1/x = √3 Case',
        titleHi: 'x + 1/x = √3 स्थिति',
        description: 'If x + 1/x = √3, then x⁶ = -1.',
        descriptionHi: 'यदि x + 1/x = √3, तो x⁶ = -1.',
        formula: 'x⁶ + 1 = 0',
        example: 'x + 1/x = √3, find x^18 + x^12. -> (x^6)^3 + (x^6)^2 -> -1 + 1 = 0.',
        exampleHi: 'x^18 + x^12 -> -1 + 1 = 0.',
        whenToUse: 'Higher powers of x with gap of 6.',
        whenToUseHi: 'x की उच्च घात जिसमें 6 का अंतर हो।'
    },
    {
        id: 'SC_ALG_05',
        category: 'Algebra',
        title: 'Value Putting (a+b+c=0)',
        titleHi: 'मान रखना (a+b+c=0)',
        description: 'If a+b+c=0, then a³+b³+c³ = 3abc.',
        descriptionHi: 'यदि a+b+c=0, तो a³+b³+c³ = 3abc.',
        example: 'Solve a³+b³+c³-3abc if a=20, b=30, c=-50. -> 0.',
        exampleHi: 'a=20, b=30, c=-50 होने पर हल करें -> 0.',
        whenToUse: 'Standard identity checking.',
        whenToUseHi: 'मानक सर्वसमिका जाँच।'
    },

    // ==========================================
    // 🔢 NUMBER SYSTEM
    // ==========================================
    {
        id: 'SC_NUM_01',
        category: 'Number System',
        title: 'Sum of First n Natural Numbers',
        titleHi: 'प्रथम n प्राकृत संख्याओं का योग',
        formula: 'n(n+1)/2',
        example: 'Sum of 1-10 -> 10*11/2 = 55.',
        exampleHi: '1-10 का योग -> 10*11/2 = 55.',
        whenToUse: 'Average, AP series.',
        whenToUseHi: 'औसत, AP श्रृंखला।'
    },
    {
        id: 'SC_NUM_02',
        category: 'Number System',
        title: 'Sum of Squares',
        titleHi: 'वर्गों का योग',
        formula: 'n(n+1)(2n+1)/6',
        example: 'Sum of 1²+2²...10² -> 10*11*21/6 = 385.',
        exampleHi: '1²+2²...10² का योग -> 385.',
        whenToUse: 'Series summation.',
        whenToUseHi: 'श्रृंखला योग।'
    },
    {
        id: 'SC_NUM_03',
        category: 'Number System',
        title: 'Sum of Cubes',
        titleHi: 'घनों का योग',
        formula: '[n(n+1)/2]²',
        example: 'Sum of 1³+2³...10³ -> (55)² = 3025.',
        exampleHi: '1³+2³...10³ का योग -> 3025.',
        whenToUse: 'Series summation.',
        whenToUseHi: 'श्रृंखला योग।'
    },
    {
        id: 'SC_NUM_04',
        category: 'Number System',
        title: 'Number of Factors',
        titleHi: 'गुणनखंडों की संख्या',
        description: 'If N = a^p * b^q * c^r, Total Factors = (p+1)(q+1)(r+1).',
        descriptionHi: 'यदि N = a^p * b^q * c^r, कुल गुणनखंड = (p+1)(q+1)(r+1).',
        example: '12 = 2² * 3¹. Factors = (2+1)(1+1) = 3*2 = 6.',
        exampleHi: '12 = 2² * 3¹. गुणनखंड = (2+1)(1+1) = 6.',
        whenToUse: 'Finding total divisors.',
        whenToUseHi: 'कुल भाजक ज्ञात करना।'
    }
];

export const getShortcutsByCategory = (cat: ShortcutCategory) => shortcuts.filter(s => s.category === cat);
export const getAllShortcuts = () => shortcuts;
