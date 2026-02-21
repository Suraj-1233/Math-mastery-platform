export interface RevisionSheet {
    id: string;
    topic: string;
    title: string;
    description: string;
    mustMemorize: string[];
    crucialTricks: string[];
    commonMistakes: string[];
    patternChecklist: string[];
    // Hindi Support
    titleHi?: string;
    descriptionHi?: string;
    mustMemorizeHi?: string[];
    crucialTricksHi?: string[];
    commonMistakesHi?: string[];
    patternChecklistHi?: string[];
}

export const revisionSheets: RevisionSheet[] = [
    // ==========================================
    // 📊 PERCENTAGE REVISION
    // ==========================================
    {
        id: 'REV_PERC',
        topic: 'Percentage',
        title: 'Percentage Master Sheet',
        titleHi: 'प्रतिशत मास्टर शीट',
        description: 'Complete revision of Percentage concepts, fractions, and standard patterns.',
        descriptionHi: 'प्रतिशत अवधारणाओं, भिन्नों और मानक पैटर्न का पूरा रिवीजन।',
        mustMemorize: [
            '1/2=50%, 1/3=33.33%, 1/4=25%, 1/5=20%, 1/6=16.66%',
            '1/7=14.28%, 1/8=12.5%, 1/9=11.11%, 1/11=9.09%',
            '3/8=37.5%, 4/7=57.14%, 5/6=83.33%',
            'Successive Change Formula: x + y + xy/100'
        ],
        mustMemorizeHi: [
            '1/2=50%, 1/3=33.33%, 1/4=25%, 1/5=20%, 1/6=16.66%',
            '1/7=14.28%, 1/8=12.5%, 1/9=11.11%, 1/11=9.09%',
            '3/8=37.5%, 4/7=57.14%, 5/6=83.33%',
            'क्रमागत परिवर्तन सूत्र: x + y + xy/100'
        ],
        crucialTricks: [
            'Price × Consumption = Expenditure. If Exp constant, Price Ratio = 1 / Cons. Ratio.',
            'A is x% more than B -> B is [x/(100+x)]*100 % less than A.',
            'Population after n years = P(1 ± R/100)^n.'
        ],
        crucialTricksHi: [
            'मूल्य × खपत = व्यय। यदि व्यय स्थिर है, मूल्य अनुपात = 1 / खपत अनुपात।',
            'A, B से x% अधिक है -> B, A से [x/(100+x)]*100 % कम है।',
            'n वर्षों बाद जनसंख्या = P(1 ± R/100)^n.'
        ],
        commonMistakes: [
            'Confusing "decreased by" vs "decreased to".',
            'Taking base as 100 when calculation is on a different value.',
            'Thinking +10% and -10% results in 0% change (Actual: -1%).'
        ],
        commonMistakesHi: [
            '"decreased by" (से कम) और "decreased to" (तक कम) में भ्रम।',
            'आधार 100 लेना जब गणना अलग मान पर हो।',
            '+10% और -10% को 0% परिवर्तन समझना (वास्तविक: -1%)।'
        ],
        patternChecklist: [
            'Price & Consumption',
            'Successive Percentage',
            'Election Problems (Valid/Invalid votes)',
            'Venn Diagrams (Pass/Fail)'
        ],
        patternChecklistHi: [
            'मूल्य और खपत',
            'क्रमागत प्रतिशत',
            'चुनाव समस्याएं (वैध/अवैध वोट)',
            'वेन आरेख (पास/फेल)'
        ]
    },

    // ==========================================
    // ✖️ ALGEBRA REVISION
    // ==========================================
    {
        id: 'REV_ALG',
        topic: 'Algebra',
        title: 'Algebra Formula Sheet',
        titleHi: 'बीजगणित सूत्र शीट',
        description: 'Essential identities and value putting rules.',
        descriptionHi: 'आवश्यक सर्वसमिकाएँ और मान रखने (Value Putting) के नियम।',
        mustMemorize: [
            '(a+b)³ = a³ + b³ + 3ab(a+b)',
            'a³+b³+c³-3abc = (a+b+c)(a²+b²+c²-ab-bc-ca)',
            'If x + 1/x = 2, then x = 1.',
            'If x + 1/x = -2, then x = -1.',
            'If x + 1/x = 1, then x³ = -1.'
        ],
        mustMemorizeHi: [
            '(a+b)³ = a³ + b³ + 3ab(a+b)',
            'a³+b³+c³-3abc = (a+b+c)(a²+b²+c²-ab-bc-ca)',
            'यदि x + 1/x = 2, तो x = 1.',
            'यदि x + 1/x = -2, तो x = -1.',
            'यदि x + 1/x = 1, तो x³ = -1.'
        ],
        crucialTricks: [
            'Value Putting: If equation < variables, put extra vars = 0 or 1.',
            'Symmetry: If a, b, c are symmetric, put a = b = c.',
            'x + 1/x = √3 -> x⁶ = -1.'
        ],
        crucialTricksHi: [
            'मान रखना: यदि समीकरण < चर, अतिरिक्त चर = 0 या 1 रखें।',
            'सममितता: यदि a, b, c सममित हैं, तो a = b = c रखें।',
            'x + 1/x = √3 -> x⁶ = -1.'
        ],
        commonMistakes: [
            'Assuming x = 1 when x + 1/x = -2 (It is -1).',
            'Putting 0 in denominator during value putting.',
            'Forgetting the 3abc term in cubic identity.'
        ],
        commonMistakesHi: [
            'x = 1 मानना जब x + 1/x = -2 (यह -1 है)।',
            'मान रखते समय हर (denominator) में 0 रखना।',
            'घन सर्वसमिका में 3abc पद भूल जाना।'
        ],
        patternChecklist: [
            'x + 1/x Pattern',
            'Square/Cube Root Patterns',
            'Components & Dividendo',
            'Value Putting Questions'
        ],
        patternChecklistHi: [
            'x + 1/x पैटर्न',
            'वर्ग/घन मूल पैटर्न',
            'योगांतरानुपात (Componendo & Dividendo)',
            'मान रखने वाले प्रश्न'
        ]
    },

    // ==========================================
    // 📐 GEOMETRY REVISION
    // ==========================================
    {
        id: 'REV_GEO',
        topic: 'Geometry',
        title: 'Geometry Theorems Recap',
        titleHi: 'ज्यामिति प्रमेय पुनरावृत्ति',
        description: 'Triangle centers, circles, and tangents.',
        descriptionHi: 'त्रिभुज केंद्र, वृत्त और स्पर्शरेखाएँ।',
        mustMemorize: [
            'Incenter Angle: 90° + A/2',
            'Circumcenter Angle: 2A',
            'Orthocenter Angle: 180° - A',
            'Centroid divides median in 2:1',
            'Sum of interior angles = (n-2) × 180°'
        ],
        mustMemorizeHi: [
            'अंतःकेंद्र कोण: 90° + A/2',
            'परिकेंद्र कोण: 2A',
            'लंबकेंद्र कोण: 180° - A',
            'केंद्रक माध्यिका को 2:1 में विभाजित करता है',
            'आंतरिक कोणों का योग = (n-2) × 180°'
        ],
        crucialTricks: [
            'Right Angled Triangle Inradius = (P+B-H)/2',
            'Equilateral Triangle: h = (√3/2)a, Area = (√3/4)a²',
            'Angle in semicircle is 90°.'
        ],
        crucialTricksHi: [
            'समकोण त्रिभुज की अंतःत्रिज्या = (P+B-H)/2',
            'समबाहु त्रिभुज: h = (√3/2)a, क्षे = (√3/4)a²',
            'अर्धवृत्त में कोण 90° होता है।'
        ],
        commonMistakes: [
            'Confusing Incenter and Circumcenter formulas.',
            'Applying Pythagoras theorem to non-right triangles.',
            'Assuming a triangle is equilateral without proof.'
        ],
        commonMistakesHi: [
            'अंतःकेंद्र और परिकेंद्र सूत्रों में भ्रम।',
            'गैर-समकोण त्रिभुजों पर पाइथागोरस प्रमेय लगाना।',
            'बिना प्रमाण के त्रिभुज को समबाहु मान लेना।'
        ],
        patternChecklist: [
            'Triangle Centers Properties',
            'Tangent-Secant Theorem (PT² = PA × PB)',
            'Similarity Ratios (Area ratio = Side ratio²)',
            'Cyclic Quadrilateral Properties'
        ],
        patternChecklistHi: [
            'त्रिभुज केंद्र गुण',
            'स्पर्शरेखा-छेदक प्रमेय (PT² = PA × PB)',
            'समरूपता अनुपात (क्षे अनुपात = भुजा अनुपात²)',
            'चक्रीय चतुर्भुज गुण'
        ]
    },

    // ==========================================
    // 🔢 NUMBER SYSTEM REVISION
    // ==========================================
    {
        id: 'REV_NUM',
        topic: 'Number System',
        title: 'Number Theory Sheet',
        titleHi: 'संख्या सिद्धांत शीट',
        description: 'Divisibility, Unit digit, and Factors.',
        descriptionHi: 'विभाज्यता, इकाई अंक और गुणनखंड।',
        mustMemorize: [
            'Divisibility by 3/9: Sum of digits',
            'Divisibility by 11: Diff of sum of alt digits',
            'aⁿ - bⁿ is divisible by a-b (for all n)',
            'aⁿ + bⁿ is divisible by a+b (for odd n)'
        ],
        mustMemorizeHi: [
            '3/9 से विभाज्यता: अंकों का योग',
            '11 से विभाज्यता: एकांतर अंकों के योग का अंतर',
            'aⁿ - bⁿ, a-b से विभाज्य है (सभी n के लिए)',
            'aⁿ + bⁿ, a+b से विभाज्य है (विषम n के लिए)'
        ],
        crucialTricks: [
            '7, 11, 13 divisibility -> Check 1001 (abcabc format)',
            'Unit digit of 2, 3, 7, 8 repeats cycle of 4: Divide power by 4.',
            'Digital Sum for verifying answers.'
        ],
        crucialTricksHi: [
            '7, 11, 13 विभाज्यता -> 1001 (abcabc प्रारूप) की जाँच करें',
            '2, 3, 7, 8 का इकाई अंक 4 के चक्र में दोहराता है: घात को 4 से भाग दें।',
            'उत्तर सत्यापित करने के लिए डिजिटल सम (C9)।'
        ],
        commonMistakes: [
            'Checking divisibility by 4 using sum of digits (Use last 2 digits).',
            'Thinking 1 is a prime number (It is not).',
            'Remainder > Divisor error.'
        ],
        commonMistakesHi: [
            'अंकों के योग का उपयोग करके 4 से विभाज्यता की जाँच करना (अंतिम 2 अंक देखें)।',
            'सोचना कि 1 एक अभाज्य संख्या है (यह नहीं है)।',
            'शेषफल > भाजक त्रुटि।'
        ],
        patternChecklist: [
            'Unit Digit Calculation',
            'Remainder Theorem',
            'LCM/HCF Word Problems',
            'Number of Zeroes'
        ],
        patternChecklistHi: [
            'इकाई अंक गणना',
            'शेषफल प्रमेय',
            'LCM/HCF शब्द समस्याएं',
            'शून्यों की संख्या'
        ]
    },

    // ==========================================
    // 🔺 TRIGONOMETRY REVISION
    // ==========================================
    {
        id: 'REV_TRIG',
        topic: 'Trigonometry',
        title: 'Trig Identities & Values',
        titleHi: 'त्रिकोणमिति सर्वसमिकाएँ और मान',
        description: 'Standard values, identities, and height & distance.',
        descriptionHi: 'मानक मान, सर्वसमिकाएँ, और ऊँचाई और दूरी।',
        mustMemorize: [
            'sin²θ + cos²θ = 1',
            'sec²θ - tan²θ = 1',
            'cosec²θ - cot²θ = 1',
            'Values table (0, 30, 45, 60, 90)',
            'sin(90-θ) = cosθ'
        ],
        mustMemorizeHi: [
            'sin²θ + cos²θ = 1',
            'sec²θ - tan²θ = 1',
            'cosec²θ - cot²θ = 1',
            'मान तालिका (0, 30, 45, 60, 90)',
            'sin(90-θ) = cosθ'
        ],
        crucialTricks: [
            'Put θ = 45° for sin/cos questions (Check options don\'t match).',
            'If tanA × tanB = 1, then A + B = 90°.',
            'Max value of a sinθ + b cosθ = √(a² + b²).'
        ],
        crucialTricksHi: [
            'sin/cos प्रश्नों के लिए θ = 45° रखें (विकल्पों की जाँच करें)।',
            'यदि tanA × tanB = 1, तो A + B = 90°.',
            'a sinθ + b cosθ का अधिकतम मान = √(a² + b²).'
        ],
        commonMistakes: [
            'Using degrees instead of radians in calculus (not for SSC, but general).',
            'Putting θ=90 for tan/sec (Undefined).',
            'Sign errors in quadrants (ASTC Rule).'
        ],
        commonMistakesHi: [
            'कैलकुलस में रेडियन के बजाय डिग्री का उपयोग करना।',
            'tan/sec के लिए θ=90 रखना (अपरिभाषित)।',
            'चतुर्थांशों में चिह्न त्रुटियाँ (ASTC नियम)।'
        ],
        patternChecklist: [
            'Standard Identities',
            'Height & Distance (Shadow problems)',
            'Max/Min Values',
            'Complementary Angles'
        ],
        patternChecklistHi: [
            'मानक सर्वसमिकाएँ',
            'ऊँचाई और दूरी (छाया समस्याएं)',
            'अधिकतम/न्यूनतम मान',
            'पूरक कोण'
        ]
    }
];

export const getRevisionSheetByTopic = (topic: string) => revisionSheets.find(sheet => sheet.topic === topic);
