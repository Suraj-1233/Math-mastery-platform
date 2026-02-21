export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';
export type Frequency = 'Very High' | 'High' | 'Medium' | 'Low';

export interface QuestionPattern {
    id: string;
    topic: string; // e.g., "Percentage", "Algebra"
    patternName: string;
    description: string;
    exampleQuestion: string;
    solvingApproach: string;
    shortTrick?: string;
    timeToSolve: number; // Suggested time in seconds
    difficultyLevel: DifficultyLevel;
    frequency: Frequency;
    trapPoints?: string[];
    // Hindi Support
    patternNameHi?: string;
    descriptionHi?: string;
    exampleQuestionHi?: string;
    solvingApproachHi?: string;
    shortTrickHi?: string;
    trapPointsHi?: string[];
}

export const patterns: QuestionPattern[] = [
    // ==========================================
    // 📊 ARITHMETIC PATTERNS
    // ==========================================

    // --- PERCENTAGE ---
    {
        id: 'PAT_PERC_01',
        topic: 'Percentage',
        patternName: 'Price & Consumption (Budget Constant)',
        patternNameHi: 'मूल्य और खपत (बजट स्थिर)',
        description: 'When price increases by x%, how much should consumption decrease to keep expenditure unchanged?',
        descriptionHi: 'जब कीमत x% बढ़ जाती है, तो खर्च को अपरिवर्तित रखने के लिए खपत में कितनी कमी होनी चाहिए?',
        exampleQuestion: 'Price of sugar increases by 20%. By how much % should a family reduce consumption to keep budget same?',
        exampleQuestionHi: 'चीनी की कीमत 20% बढ़ जाती है। परिवार को खपत में कितने % की कमी करनी चाहिए ताकि बजट वही रहे?',
        solvingApproach: 'Use formula or Fraction method. 20% = 1/5 increase -> consumption decrease = 1/(5+1) = 1/6.',
        solvingApproachHi: 'सूत्र या भिन्न विधि का प्रयोग करें। 20% = 1/5 वृद्धि -> खपत में कमी = 1/(5+1) = 1/6 = 16.66%।',
        shortTrick: 'R / (100 + R) * 100',
        shortTrickHi: 'R / (100 + R) * 100',
        timeToSolve: 15,
        difficultyLevel: 'Easy',
        frequency: 'Very High',
        trapPoints: ['Confusing (100+R) with (100-R) when price decreases'],
        trapPointsHi: ['कीमत कम होने पर (100+R) को (100-R) के साथ भ्रमित करना']
    },
    {
        id: 'PAT_PERC_02',
        topic: 'Percentage',
        patternName: 'Successive Percentage Change (A + B + AB/100)',
        patternNameHi: 'क्रमागत प्रतिशत परिवर्तन (A + B + AB/100)',
        description: 'Net effect of two successive percentage changes.',
        descriptionHi: 'दो लगातार प्रतिशत परिवर्तनों का शुद्ध प्रभाव।',
        exampleQuestion: 'Salary increased by 10% then decreased by 10%. Net change?',
        exampleQuestionHi: 'वेतन 10% बढ़ा फिर 10% घटा। शुद्ध परिवर्तन क्या है?',
        solvingApproach: 'Net% = x + y + (xy)/100. Here 10 - 10 + (10*-10)/100 = -1%.',
        solvingApproachHi: 'शुद्ध% = x + y + (xy)/100. यहाँ 10 - 10 + (10*-10)/100 = -1%।',
        shortTrick: 'Square of % / 100 (always loss for same increase/decrease)',
        shortTrickHi: '% का वर्ग / 100 (समान वृद्धि/कमी के लिए हमेशा हानि)',
        timeToSolve: 10,
        difficultyLevel: 'Easy',
        frequency: 'Very High',
        trapPoints: ['Thinking 0% change'],
        trapPointsHi: ['सोचना कि कोई परिवर्तन नहीं हुआ (0%)']
    },
    {
        id: 'PAT_PERC_03',
        topic: 'Percentage',
        patternName: 'Passing Marks / Venn Diagram',
        patternNameHi: 'उत्तीर्ण अंक / वेन आरेख',
        description: 'Students passing in subject A, B, and both.',
        descriptionHi: 'विषय A, B और दोनों में उत्तीर्ण होने वाले छात्र।',
        exampleQuestion: '60% passed Math, 50% passed English, 20% passed both. Find failed %.',
        exampleQuestionHi: '60% गणित में, 50% अंग्रेजी में, 20% दोनों में पास हुए। अनुत्तीर्ण % ज्ञात करें।',
        solvingApproach: 'Total Pass = A + B - Both. Failed = 100 - Total Pass.',
        solvingApproachHi: 'कुल पास = A + B - दोनों। फेल = 100 - कुल पास।',
        shortTrick: 'Venn Diagram Visualization',
        shortTrickHi: 'वेन आरेख विज़ुअलाइज़ेशन',
        timeToSolve: 30,
        difficultyLevel: 'Medium',
        frequency: 'High'
    },

    // --- PROFIT & LOSS ---
    {
        id: 'PAT_PL_01',
        topic: 'Profit & Loss',
        patternName: 'Dishonest Dealer (False Weight)',
        patternNameHi: 'बेईमान दुकानदार (गलत वजन)',
        description: 'Shopkeeper sells at CP but uses less weight.',
        descriptionHi: 'दुकानदार क्रय मूल्य पर बेचता है लेकिन कम वजन का उपयोग करता है।',
        exampleQuestion: 'A dealer sells goods at Cost Price but uses 900g weight instead of 1kg. Find Profit%.',
        exampleQuestionHi: 'एक डीलर क्रय मूल्य पर सामान बेचता है लेकिन 1kg के बजाय 900g वजन का उपयोग करता है। लाभ% ज्ञात करें।',
        solvingApproach: 'Profit% = (Error / True Value - Error) * 100. (100/900)*100.',
        solvingApproachHi: 'लाभ% = (त्रुटि / सही मान - त्रुटि) * 100। (100/900)*100 = 11.11%',
        shortTrick: 'Profit % = (Difference / Weight Used) * 100',
        shortTrickHi: 'लाभ % = (अंतर / उपयोग किया गया वजन) * 100',
        timeToSolve: 25,
        difficultyLevel: 'Medium',
        frequency: 'Very High',
        trapPoints: ['Calculating on 1000g instead of 900g'],
        trapPointsHi: ['900g के बजाय 1000g पर गणना करना']
    },
    {
        id: 'PAT_PL_02',
        topic: 'Profit & Loss',
        patternName: 'Sell x, Buy y Free',
        patternNameHi: 'x खरीदें, y मुफ्त पाएं',
        description: 'Calculating discount percentage for offers.',
        descriptionHi: 'प्रस्तावों के लिए छूट प्रतिशत की गणना करना।',
        exampleQuestion: 'Buy 3 Get 2 Free. Calculate Discount %.',
        exampleQuestionHi: '3 खरीदें 2 मुफ्त पाएं। छूट % की गणना करें।',
        solvingApproach: 'Discount = Free / Total Items. Here 2 / (3+2) = 2/5 = 40%.',
        solvingApproachHi: 'छूट = मुफ्त / कुल आइटम। यहाँ 2 / (3+2) = 2/5 = 40%।',
        shortTrick: 'Free / Total * 100',
        shortTrickHi: 'मुफ्त / कुल * 100',
        timeToSolve: 10,
        difficultyLevel: 'Easy',
        frequency: 'High',
        trapPoints: ['Dividing by paid items only (2/3)'],
        trapPointsHi: ['केवल भुगतान की गई वस्तुओं (2/3) से समान्तर करना']
    },
    {
        id: 'PAT_PL_03',
        topic: 'Profit & Loss',
        patternName: 'CP = SP Relationship',
        patternNameHi: 'क्रय मूल्य = विक्रय मूल्य संबंध',
        description: 'CP of x articles equals SP of y articles.',
        descriptionHi: 'x वस्तुओं का क्रय मूल्य y वस्तुओं के विक्रय मूल्य के बराबर है।',
        exampleQuestion: 'CP of 10 items equals SP of 8 items. Find Profit%.',
        exampleQuestionHi: '10 वस्तुओं का CP 8 वस्तुओं के SP के बराबर है। लाभ% ज्ञात करें।',
        solvingApproach: 'Take LCM or Ratio. CP/SP = 8/10 = 4/5. Profit 1 on 4 = 25%.',
        solvingApproachHi: 'LCM या अनुपात लें। CP/SP = 8/10 = 4/5। 4 पर 1 लाभ = 25%।',
        shortTrick: '(Diff / SP_qty) * 100',
        shortTrickHi: '(अंतर / SP_मात्रा) * 100',
        timeToSolve: 20,
        difficultyLevel: 'Easy',
        frequency: 'High'
    },

    // --- SI & CI ---
    {
        id: 'PAT_SICI_01',
        topic: 'SI & CI',
        patternName: 'Difference between CI and SI (2 Years)',
        patternNameHi: 'CI और SI के बीच अंतर (2 वर्ष)',
        description: 'Direct formula for difference between Compound and Simple Interest for 2 years.',
        descriptionHi: '2 साल के लिए चक्रवृद्धि और साधारण ब्याज के बीच अंतर का सीधा सूत्र।',
        exampleQuestion: 'Diff between CI and SI for 2 years at 10% is Rs 50. Find Sum.',
        exampleQuestionHi: '10% पर 2 साल के लिए CI और SI के बीच का अंतर 50 रुपये है। राशि ज्ञात करें।',
        solvingApproach: 'Diff = P * (R/100)^2',
        solvingApproachHi: 'अंतर = P * (R/100)^2',
        shortTrick: 'D = P(R/100)² for 2 years',
        shortTrickHi: 'D = P(R/100)² (2 साल के लिए)',
        timeToSolve: 20,
        difficultyLevel: 'Medium',
        frequency: 'Very High',
        trapPoints: ['Trying to calculate SI and CI separately'],
        trapPointsHi: ['SI और CI को अलग-अलग गणना करने की कोशिश करना']
    },
    {
        id: 'PAT_SICI_02',
        topic: 'SI & CI',
        patternName: 'Installments (CI)',
        patternNameHi: 'किस्तें (CI)',
        description: 'Equal annual installments in Compound Interest.',
        descriptionHi: 'चक्रवृद्धि ब्याज में समान वार्षिक किस्तें।',
        exampleQuestion: 'Loan of 2100 paid in 2 equal annual installments at 10% CI.',
        exampleQuestionHi: '2100 का ऋण 10% CI पर 2 समान वार्षिक किस्तों में चुकाया गया।',
        solvingApproach: 'Use PV Factor. P = x/(1+r) + x/(1+r)^2...',
        solvingApproachHi: 'PV फैक्टर का प्रयोग करें। P = x/(1+r) + x/(1+r)^2...',
        timeToSolve: 60,
        difficultyLevel: 'Hard',
        frequency: 'Medium'
    },

    // --- TIME & WORK ---
    {
        id: 'PAT_TW_01',
        topic: 'Time & Work',
        patternName: 'Alternate Days Work',
        patternNameHi: 'वैकल्पिक दिन कार्य',
        description: 'Two people working on alternate days.',
        descriptionHi: 'दो लोग एक-एक दिन छोड़कर काम कर रहे हैं।',
        exampleQuestion: 'A does in 10, B in 15. A starts, alternate days. Time?',
        exampleQuestionHi: 'A 10 में करता है, B 15 में। A शुरू करता है, वैकल्पिक दिन। समय?',
        solvingApproach: 'LCM=30. Eff: A=3, B=2. 2 days = 5 units. 12 days = 30 units.',
        solvingApproachHi: 'LCM=30. क्षमता: A=3, B=2. 2 दिन = 5 इकाइयाँ। 12 दिन = 30 इकाइयाँ।',
        shortTrick: 'Group work in cycles of 2 or 3 days',
        shortTrickHi: '2 या 3 दिनों के चक्र में काम समूह बनाएं',
        timeToSolve: 40,
        difficultyLevel: 'Medium',
        frequency: 'High',
        trapPoints: ['Not calculating the remaining work correctly after cycles'],
        trapPointsHi: ['चक्र के बाद शेष कार्य की सही गणना न करना']
    },
    {
        id: 'PAT_TW_02',
        topic: 'Time & Work',
        patternName: 'Efficiency Ratio (Men/Women/Boys)',
        patternNameHi: 'दक्षता अनुपात (पुरुष/महिलाएं/लड़के)',
        description: 'Comparing efficiency or "OR" type questions.',
        descriptionHi: 'दक्षता की तुलना या "या" प्रकार के प्रश्न।',
        exampleQuestion: '3 Men or 6 Women can do work in 10 days.',
        exampleQuestionHi: '3 पुरुष या 6 महिलाएं 10 दिनों में कार्य कर सकते हैं।',
        solvingApproach: 'Convert all to one unit (Men or Women). M1*D1 = M2*D2.',
        solvingApproachHi: 'सभी को एक इकाई में बदलें। M1*D1 = M2*D2।',
        shortTrick: 'And/Or Formula: Days / (M2/M1 + W2/W1)',
        shortTrickHi: 'सूत्र: दिन / (M2/M1 + W2/W1)',
        timeToSolve: 45,
        difficultyLevel: 'Medium',
        frequency: 'High'
    },

    // --- TIME SPEED DISTANCE ---
    {
        id: 'PAT_TSD_01',
        topic: 'Time Speed Distance',
        patternName: 'Late / Early Concept',
        patternNameHi: 'देर / जल्दी अवधारणा',
        description: 'Reach late at speed S1, reach early at speed S2.',
        descriptionHi: 'गति S1 पर देर से पहुँचना, गति S2 पर जल्दी पहुँचना।',
        exampleQuestion: 'Walking at 3kmph late by 10m, at 4kmph early by 10m. Find distance.',
        exampleQuestionHi: '3kmph पर चलने पर 10 मिनट देरी, 4kmph पर 10 मिनट जल्दी। दूरी ज्ञात करें।',
        solvingApproach: 'Distance = (S1*S2)/(S1~S2) * TimeDiff',
        solvingApproachHi: 'दूरी = (S1*S2)/(S1~S2) * समयांतर',
        shortTrick: 'Product/Diff * (Total Time Diff)',
        shortTrickHi: 'गुणनफल/अंतर * (कुल समयांतर)',
        timeToSolve: 25,
        difficultyLevel: 'Medium',
        frequency: 'Very High'
    },
    {
        id: 'PAT_TSD_02',
        topic: 'Time Speed Distance',
        patternName: 'Stoppage Time',
        patternNameHi: 'रुकने का समय (Stoppage Time)',
        description: 'Difference in speed with and without stoppages.',
        descriptionHi: 'रुकने के साथ और बिना रुकने की गति में अंतर।',
        exampleQuestion: 'Speed without stop 60, with stop 48. Min/hr stopped?',
        exampleQuestionHi: 'बिना रुके गति 60, रुकने के साथ 48। प्रति घंटे कितने मिनट रुका?',
        solvingApproach: 'Difference/Original * 60. (12/60)*60 = 12 mins.',
        solvingApproachHi: 'अंतर/मूल * 60। (12/60)*60 = 12 मिनट।',
        shortTrick: '(Diff / Fast_Speed) * 60',
        shortTrickHi: '(अंतर / तेज गति) * 60',
        timeToSolve: 15,
        difficultyLevel: 'Easy',
        frequency: 'High'
    },

    // ==========================================
    // 📐 ADVANCED MATH PATTERNS
    // ==========================================

    // --- ALGEBRA ---
    {
        id: 'PAT_ALG_01',
        topic: 'Algebra',
        patternName: 'x + 1/x Pattern (Square/Cube)',
        patternNameHi: 'x + 1/x पैटर्न (वर्ग/घन)',
        description: 'Given x + 1/x = k, find higher powers.',
        descriptionHi: 'यदि x + 1/x = k दिया गया है, तो उच्च घात ज्ञात करें।',
        exampleQuestion: 'If x + 1/x = 3, find x² + 1/x² and x³ + 1/x³.',
        exampleQuestionHi: 'यदि x + 1/x = 3, तो x² + 1/x² और x³ + 1/x³ ज्ञात करें।',
        solvingApproach: 'Square: k² - 2. Cube: k³ - 3k.',
        solvingApproachHi: 'वर्ग: k² - 2. घन: k³ - 3k.',
        shortTrick: 'k²-2, k³-3k',
        shortTrickHi: 'k²-2, k³-3k',
        timeToSolve: 10,
        difficultyLevel: 'Easy',
        frequency: 'Very High'
    },
    {
        id: 'PAT_ALG_02',
        topic: 'Algebra',
        patternName: 'Value Putting (Variables > Equations)',
        patternNameHi: 'मान रखना (Value Putting)',
        description: 'When equations < variables, put excess variables = 0 or 1.',
        descriptionHi: 'जब समीकरण < चर, अतिरिक्त चर = 0 या 1 रखें।',
        exampleQuestion: 'If a+b+c=0, find a²/bc + b²/ac + c²/ab.',
        exampleQuestionHi: 'यदि a+b+c=0, तो a²/bc + b²/ac + c²/ab ज्ञात करें।',
        solvingApproach: 'Put a=1, b=1, c=-2 (satisfies cond). Calc value.',
        solvingApproachHi: 'a=1, b=1, c=-2 (शर्त पूरी करता है) रखें। मान की गणना करें।',
        shortTrick: 'Put 0, 1, -1 carefully to avoid /0',
        shortTrickHi: '0, 1, -1 सावधानी से रखें ताकि /0 न हो',
        timeToSolve: 30,
        difficultyLevel: 'Medium',
        frequency: 'Very High',
        trapPoints: ['Making denominator zero'],
        trapPointsHi: ['हर (denominator) को शून्य बनाना']
    },
    {
        id: 'PAT_ALG_03',
        topic: 'Algebra',
        patternName: 'Symmetry Pattern',
        patternNameHi: 'सममित पैटर्न (Symmetry)',
        description: 'Expression is symmetrical in a, b, c.',
        descriptionHi: 'व्यंजक a, b, c में सममित है।',
        exampleQuestion: 'x/(y+z) + y/(z+x) + z/(x+y) = 1. Find...',
        exampleQuestionHi: 'x/(y+z) + y/(z+x) + z/(x+y) = 1. ज्ञात करें...',
        solvingApproach: 'Put a = b = c.',
        solvingApproachHi: 'a = b = c रखें।',
        shortTrick: 'Equate all variables',
        shortTrickHi: 'सभी चर बराबर करें',
        timeToSolve: 20,
        difficultyLevel: 'Medium',
        frequency: 'Medium'
    },

    // --- GEOMETRY ---
    {
        id: 'PAT_GEO_01',
        topic: 'Geometry',
        patternName: 'Incenter Angle Property',
        patternNameHi: 'अंतःकेंद्र कोण गुणधर्म',
        description: 'Angle formed at Incenter by angle bisectors.',
        descriptionHi: 'कोण समद्विभाजक द्वारा अंतःकेंद्र पर बना कोण।',
        exampleQuestion: 'In triangle ABC, I is incenter. Angle A=60. Find Angle BIC.',
        exampleQuestionHi: 'त्रिभुज ABC में, I अंतःकेंद्र है। कोण A=60. कोण BIC ज्ञात करें।',
        solvingApproach: 'Angle BIC = 90 + A/2.',
        solvingApproachHi: 'कोण BIC = 90 + A/2.',
        shortTrick: '90 + A/2',
        shortTrickHi: '90 + A/2',
        timeToSolve: 10,
        difficultyLevel: 'Easy',
        frequency: 'Very High',
        trapPoints: ['Confusing with Circumcenter (2A) or Orthocenter (180-A)'],
        trapPointsHi: ['परिकेंद्र (2A) या लंबकेंद्र (180-A) के साथ भ्रमित होना']
    },
    {
        id: 'PAT_GEO_02',
        topic: 'Geometry',
        patternName: 'Tangent from External Point',
        patternNameHi: 'बाहरी बिंदु से स्पर्शरेखा',
        description: 'PA and PB are tangents. Properties of quadrilateral OAPB.',
        descriptionHi: 'PA और PB स्पर्शरेखाएँ हैं। चतुर्भुज OAPB के गुण।',
        exampleQuestion: 'Angle between tangents is 60. Find angle at center.',
        exampleQuestionHi: 'स्पर्शरेखाओं के बीच का कोण 60 है। केंद्र पर कोण ज्ञात करें।',
        solvingApproach: 'Opposite angles sum to 180. Angle at center = 180 - 60 = 120.',
        solvingApproachHi: 'विपरीत कोणों का योग 180 होता है। केंद्र पर कोण = 180 - 60 = 120.',
        shortTrick: 'Tangent angle + Center angle = 180',
        shortTrickHi: 'स्पर्शरेखा कोण + केंद्र कोण = 180',
        timeToSolve: 10,
        difficultyLevel: 'Easy',
        frequency: 'High'
    },
    {
        id: 'PAT_GEO_03',
        topic: 'Geometry',
        patternName: 'Centroid \u0026 Area Division',
        patternNameHi: 'केंद्रक और क्षेत्रफल विभाजन',
        description: 'Medians divide triangle into 6 equal areas.',
        descriptionHi: 'माध्यिकाएं त्रिभुज को 6 समान क्षेत्रफलों में विभाजित करती हैं।',
        exampleQuestion: 'G is centroid. Area of ABC=60. Find area of GAB.',
        exampleQuestionHi: 'G केंद्रक है। ABC का क्षेत्रफल=60. GAB का क्षेत्रफल ज्ञात करें।',
        solvingApproach: 'Area GAB = 1/3 of ABC. 60/3 = 20.',
        solvingApproachHi: 'GAB का क्षेत्रफल = 1/3 ABC. 60/3 = 20.',
        timeToSolve: 15,
        difficultyLevel: 'Easy',
        frequency: 'Medium'
    },

    // --- TRIGONOMETRY ---
    {
        id: 'PAT_TRIG_01',
        topic: 'Trigonometry',
        patternName: 'Complementary Angles (A+B=90)',
        patternNameHi: 'पूरक कोण (A+B=90)',
        description: 'tanA*tanB = 1 if A+B=90.',
        descriptionHi: 'tanA*tanB = 1 यदि A+B=90.',
        exampleQuestion: 'Value of tan1° tan2° tan3° ... tan89°.',
        exampleQuestionHi: 'tan1° tan2° tan3° ... tan89° का मान।',
        solvingApproach: 'Pairs form 1 (tan1*tan89=1). Mid term tan45=1. Result 1.',
        solvingApproachHi: 'जोड़े 1 बनाते हैं (tan1*tan89=1)। मध्य पद tan45=1. परिणाम 1.',
        shortTrick: 'Look for pairs summing to 90',
        shortTrickHi: '90 तक जुड़ने वाले जोड़े देखें',
        timeToSolve: 10,
        difficultyLevel: 'Easy',
        frequency: 'Very High'
    },
    {
        id: 'PAT_TRIG_02',
        topic: 'Trigonometry',
        patternName: 'Max/Min Value (a sin + b cos)',
        patternNameHi: 'अधिकतम/न्यूनतम मान (a sin + b cos)',
        description: 'Range of a sin(th) + b cos(th).',
        descriptionHi: 'a sin(th) + b cos(th) की रेंज।',
        exampleQuestion: 'Max value of 3 sin x + 4 cos x.',
        exampleQuestionHi: '3 sin x + 4 cos x का अधिकतम मान।',
        solvingApproach: 'Max = sqrt(a^2 + b^2). Min = -sqrt(a^2 + b^2).',
        solvingApproachHi: 'अधिकतम = sqrt(a^2 + b^2). न्यूनतम = -sqrt(a^2 + b^2).',
        shortTrick: 'Triplets help (3,4 -> 5)',
        shortTrickHi: 'दिमाग में ट्रिपलेट (3,4 -> 5) का प्रयोग करें',
        timeToSolve: 10,
        difficultyLevel: 'Easy',
        frequency: 'High'
    },
    {
        id: 'PAT_TRIG_03',
        topic: 'Trigonometry',
        patternName: 'Value Putting (Theta)',
        patternNameHi: 'कोण मान रखना (Value Putting)',
        description: 'Put 0, 30, 45, etc. to solve identities.',
        descriptionHi: 'सर्वसमिकाओं को हल करने के लिए 0, 30, 45, आदि रखें।',
        exampleQuestion: '(secA - cosA)(cosec A - sinA)...',
        exampleQuestionHi: '(secA - cosA)(cosec A - sinA)... का मान।',
        solvingApproach: 'Put A=45. Check options.',
        solvingApproachHi: 'A=45 रखें। विकल्पों की जाँच करें।',
        shortTrick: 'Avoid undefined values (0 for cosec/cot)',
        shortTrickHi: 'अपरिभाषित मानों से बचें (cosec/cot के लिए 0)',
        timeToSolve: 30,
        difficultyLevel: 'Medium',
        frequency: 'Very High'
    },

    // --- NUMBER SYSTEM ---
    {
        id: 'PAT_NUM_01',
        topic: 'Number System',
        patternName: 'Divisibility by 7, 11, 13',
        patternNameHi: '7, 11, 13 से विभाज्यता',
        description: 'Combined rule for 7, 11, 13 (1001).',
        descriptionHi: '7, 11, 13 (1001) के लिए संयुक्त नियम।',
        exampleQuestion: 'Number 5xy5xy is divisible by 7, 11, 13. Find x,y.',
        exampleQuestionHi: 'संख्या 5xy5xy 7, 11, 13 से विभाज्य है। x,y ज्ञात करें।',
        solvingApproach: 'ABCABC type numbers are divisible by 1001 (7*11*13).',
        solvingApproachHi: 'ABCABC प्रकार की संख्याएँ 1001 (7*11*13) से विभाज्य होती हैं।',
        shortTrick: 'Repeating triplet pattern',
        shortTrickHi: 'दोहराए जाने वाले ट्रिपलेट पैटर्न',
        timeToSolve: 20,
        difficultyLevel: 'Medium',
        frequency: 'High'
    },
    {
        id: 'PAT_NUM_02',
        topic: 'Number System',
        patternName: 'Unit Digit Calculation',
        patternNameHi: 'इकाई अंक गणना',
        description: 'Identify cyclicity of numbers 2,3,7,8 (cyclicity 4).',
        descriptionHi: 'संख्या 2,3,7,8 की चक्रीयता (cyclicity 4) पहचानें।',
        exampleQuestion: 'Find unit digit of 23^34.',
        exampleQuestionHi: '23^34 का इकाई अंक ज्ञात करें।',
        solvingApproach: 'Power/4 rem. 34/4 rem 2. 3^2 = 9.',
        solvingApproachHi: 'घात/4 शेष। 34/4 शेष 2. 3^2 = 9.',
        shortTrick: 'Divide power by 4, take remainder',
        shortTrickHi: 'घात को 4 से विभाजित करें, शेषफल लें',
        timeToSolve: 20,
        difficultyLevel: 'Easy',
        frequency: 'High'
    },
    {
        id: 'PAT_NUM_03',
        topic: 'Number System',
        patternName: 'Remainder Theorem (Format/Wilson)',
        patternNameHi: 'शेषफल प्रमेय (Fermat/Wilson)',
        description: 'Finding remainder of big powers.',
        descriptionHi: 'बड़ी घातों का शेषफल ज्ञात करना।',
        exampleQuestion: '2^30 divided by 31.',
        exampleQuestionHi: '2^30 को 31 से विभाजित करने पर शेष।',
        solvingApproach: 'a^(p-1)/p rem is 1 if p is prime.',
        solvingApproachHi: 'a^(p-1)/p शेष 1 है यदि p अभाज्य है।',
        shortTrick: 'Fermats Little Theorem',
        shortTrickHi: 'फर्मेंट का लघु प्रमेय',
        timeToSolve: 15,
        difficultyLevel: 'Hard',
        frequency: 'Low'
    }
];

export const getPatternsByTopic = (topic: string) => patterns.filter(p => p.topic === topic);
export const getHighFrequencyPatterns = () => patterns.filter(p => p.frequency === 'Very High');
