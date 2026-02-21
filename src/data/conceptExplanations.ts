export type ConceptExplanation = {
    title: string;
    definition: string;
    explanation: string;
    formula: string;
    example: string;
    memoryTrick: string;
    applications: string[];
};

type ConceptExplanationsType = {
    [key: string]: {
        en: ConceptExplanation;
        hi: ConceptExplanation;
    };
};

// Detailed explanations for all concepts
export const conceptExplanations: ConceptExplanationsType = {
    // Geometry Fundamentals - M01
    "Point, Line, Ray": {
        en: {
            title: "Point, Line, Ray",
            definition: "Basic building blocks of geometry",
            explanation: "A point is a location in space with no dimensions. A line extends infinitely in both directions. A ray starts at one point and extends infinitely in one direction.",
            formula: "No formula - these are fundamental geometric objects",
            example: "Point A, Line AB, Ray AB (starts at A, goes through B)",
            memoryTrick: "Point = Dot, Line = ←→, Ray = →",
            applications: ["Drawing shapes", "Measuring angles", "Coordinate geometry"]
        },
        hi: {
            title: "बिंदु, रेखा, किरण",
            definition: "ज्यामिति के मूल तत्व",
            explanation: "बिंदु अंतरिक्ष में एक स्थान है जिसका कोई आयाम नहीं है। रेखा दोनों दिशाओं में अनंत तक फैली होती है। किरण एक बिंदु से शुरू होकर एक दिशा में अनंत तक जाती है।",
            formula: "कोई सूत्र नहीं - ये मूलभूत ज्यामितीय वस्तुएं हैं",
            example: "बिंदु A, रेखा AB, किरण AB (A से शुरू, B से होकर जाती है)",
            memoryTrick: "बिंदु = बिंदी, रेखा = ←→, किरण = →",
            applications: ["आकृतियाँ बनाना", "कोण मापना", "निर्देशांक ज्यामिति"]
        }
    },

    "Angle types": {
        en: {
            title: "Types of Angles",
            definition: "Classification of angles based on their measure",
            explanation: "Angles are classified into: Acute (< 90°), Right (= 90°), Obtuse (> 90° and < 180°), Straight (= 180°), Reflex (> 180° and < 360°), Complete (= 360°)",
            formula: "Angle measurement in degrees (°)",
            example: "45° is acute, 90° is right, 120° is obtuse, 180° is straight",
            memoryTrick: "A-R-O-S-R-C: Acute, Right, Obtuse, Straight, Reflex, Complete",
            applications: ["Triangle problems", "Parallel lines", "Circle theorems"]
        },
        hi: {
            title: "कोणों के प्रकार",
            definition: "कोणों का उनके माप के आधार पर वर्गीकरण",
            explanation: "कोणों को इस प्रकार वर्गीकृत किया जाता है: न्यून (< 90°), समकोण (= 90°), अधिक कोण (> 90° और < 180°), सरल रेखा (= 180°), प्रतिवर्त (> 180° और < 360°), पूर्ण (= 360°)",
            formula: "कोण माप डिग्री (°) में",
            example: "45° न्यून है, 90° समकोण है, 120° अधिक कोण है, 180° सरल रेखा है",
            memoryTrick: "न-स-अ-स-प-पू: न्यून, समकोण, अधिक, सरल, प्रतिवर्त, पूर्ण",
            applications: ["त्रिभुज समस्याएं", "समानांतर रेखाएं", "वृत्त प्रमेय"]
        }
    },

    "Complementary & Supplementary": {
        en: {
            title: "Complementary & Supplementary Angles",
            definition: "Pairs of angles with specific sum properties",
            explanation: "Complementary angles: Two angles whose sum is 90°. Supplementary angles: Two angles whose sum is 180°.",
            formula: "Complementary: A + B = 90°, Supplementary: A + B = 180°",
            example: "30° and 60° are complementary. 120° and 60° are supplementary.",
            memoryTrick: "C for Corner (90°), S for Straight (180°)",
            applications: ["Finding unknown angles", "Triangle angle sum", "Parallel line problems"]
        },
        hi: {
            title: "पूरक और संपूरक कोण",
            definition: "विशिष्ट योग गुणों वाले कोणों के जोड़े",
            explanation: "पूरक कोण: दो कोण जिनका योग 90° है। संपूरक कोण: दो कोण जिनका योग 180° है।",
            formula: "पूरक: A + B = 90°, संपूरक: A + B = 180°",
            example: "30° और 60° पूरक हैं। 120° और 60° संपूरक हैं।",
            memoryTrick: "पू = पूरा समकोण (90°), सं = सीधी रेखा (180°)",
            applications: ["अज्ञात कोण ढूंढना", "त्रिभुज कोण योग", "समानांतर रेखा समस्याएं"]
        }
    },

    "Vertically opposite angles": {
        en: {
            title: "Vertically Opposite Angles",
            definition: "Angles formed when two lines intersect",
            explanation: "When two lines intersect, they form two pairs of vertically opposite angles. Vertically opposite angles are always equal.",
            formula: "∠1 = ∠3, ∠2 = ∠4 (opposite angles are equal)",
            example: "If one angle is 60°, its vertically opposite angle is also 60°",
            memoryTrick: "V.O.A = Very Obviously Always equal",
            applications: ["Intersection problems", "Parallel lines with transversal", "Geometry proofs"]
        },
        hi: {
            title: "शीर्षाभिमुख कोण",
            definition: "दो रेखाओं के प्रतिच्छेद पर बने कोण",
            explanation: "जब दो रेखाएं प्रतिच्छेद करती हैं, तो शीर्षाभिमुख कोणों के दो जोड़े बनते हैं। शीर्षाभिमुख कोण हमेशा बराबर होते हैं।",
            formula: "∠1 = ∠3, ∠2 = ∠4 (विपरीत कोण बराबर हैं)",
            example: "यदि एक कोण 60° है, तो उसका शीर्षाभिमुख कोण भी 60° है",
            memoryTrick: "शी.अ.को = शीर्ष पर आमने-सामने कोण बराबर",
            applications: ["प्रतिच्छेद समस्याएं", "तिर्यक रेखा के साथ समानांतर रेखाएं", "ज्यामिति प्रमाण"]
        }
    },

    // 3D Mensuration - M07
    "Volume formulas": {
        en: {
            title: "Volume Formulas",
            definition: "Formulas to calculate the space occupied by 3D objects",
            explanation: "Volume is the amount of space inside a 3D object. Different shapes have different volume formulas based on their dimensions.",
            formula: "Cube: V = a³, Cuboid: V = l × b × h, Cylinder: V = πr²h, Sphere: V = (4/3)πr³, Cone: V = (1/3)πr²h",
            example: "Cube with side 5 cm: V = 5³ = 125 cm³",
            memoryTrick: "Cube = a³ (all sides same), Cuboid = l×b×h (3 different sides)",
            applications: ["Finding capacity", "Water tank problems", "Package volume"]
        },
        hi: {
            title: "आयतन सूत्र",
            definition: "3D वस्तुओं द्वारा घेरे गए स्थान की गणना के सूत्र",
            explanation: "आयतन एक 3D वस्तु के अंदर की जगह की मात्रा है। विभिन्न आकृतियों के आयतन सूत्र उनके आयामों के आधार पर अलग होते हैं।",
            formula: "घन: V = a³, घनाभ: V = l × b × h, बेलन: V = πr²h, गोला: V = (4/3)πr³, शंकु: V = (1/3)πr²h",
            example: "5 सेमी भुजा वाला घन: V = 5³ = 125 सेमी³",
            memoryTrick: "घन = a³ (सभी भुजाएं समान), घनाभ = l×b×h (3 अलग भुजाएं)",
            applications: ["क्षमता ढूंढना", "पानी की टंकी की समस्याएं", "पैकेज आयतन"]
        }
    },

    "Surface area": {
        en: {
            title: "Surface Area",
            definition: "Total area of all surfaces of a 3D object",
            explanation: "Surface area is the sum of areas of all faces of a 3D shape. It tells us how much material is needed to cover the object completely.",
            formula: "Cube: 6a², Cuboid: 2(lb + bh + hl), Cylinder: 2πr(r + h), Sphere: 4πr², Cone: πr(r + l)",
            example: "Cube with side 4 cm: Surface Area = 6 × 4² = 96 cm²",
            memoryTrick: "Surface = Outside covering, Volume = Inside space",
            applications: ["Painting walls", "Wrapping gifts", "Material cost calculation"]
        },
        hi: {
            title: "पृष्ठीय क्षेत्रफल",
            definition: "3D वस्तु की सभी सतहों का कुल क्षेत्रफल",
            explanation: "पृष्ठीय क्षेत्रफल एक 3D आकृति के सभी फलकों के क्षेत्रफलों का योग है। यह बताता है कि वस्तु को पूरी तरह से ढकने के लिए कितनी सामग्री की आवश्यकता है।",
            formula: "घन: 6a², घनाभ: 2(lb + bh + hl), बेलन: 2πr(r + h), गोला: 4πr², शंकु: πr(r + l)",
            example: "4 सेमी भुजा वाला घन: पृष्ठीय क्षेत्रफल = 6 × 4² = 96 सेमी²",
            memoryTrick: "पृष्ठ = बाहरी आवरण, आयतन = अंदर की जगह",
            applications: ["दीवारों को रंगना", "उपहार लपेटना", "सामग्री लागत गणना"]
        }
    },

    "Diagonal": {
        en: {
            title: "Diagonal",
            definition: "Line segment connecting opposite vertices of a 3D shape",
            explanation: "In a cuboid, there are 4 space diagonals. The length of the space diagonal can be found using 3D Pythagoras theorem.",
            formula: "Cube diagonal = a√3, Cuboid diagonal = √(l² + b² + h²)",
            example: "Cube with edge 2 cm: Diagonal = 2√3 cm",
            memoryTrick: "3D diagonal uses √3 for cube",
            applications: ["Finding maximum distance", "3D geometry problems", "Packaging design"]
        },
        hi: {
            title: "विकर्ण",
            definition: "3D आकृति के विपरीत शीर्षों को जोड़ने वाला रेखाखंड",
            explanation: "घनाभ में 4 अंतरिक्ष विकर्ण होते हैं। अंतरिक्ष विकर्ण की लंबाई 3D पाइथागोरस प्रमेय का उपयोग करके पाई जा सकती है।",
            formula: "घन विकर्ण = a√3, घनाभ विकर्ण = √(l² + b² + h²)",
            example: "2 सेमी किनारे वाला घन: विकर्ण = 2√3 सेमी",
            memoryTrick: "3D विकर्ण घन के लिए √3 का उपयोग करता है",
            applications: ["अधिकतम दूरी ढूंढना", "3D ज्यामिति समस्याएं", "पैकेजिंग डिज़ाइन"]
        }
    },

    "Applications": {
        en: {
            title: "Real-World Applications",
            definition: "Practical uses of 3D mensuration in daily life",
            explanation: "3D mensuration is used in construction, packaging, water storage, manufacturing, and many engineering applications.",
            formula: "Apply volume and surface area formulas to real problems",
            example: "Calculating paint needed for a room, water tank capacity, box volume for shipping",
            memoryTrick: "Think: What needs to be filled (volume) or covered (surface area)?",
            applications: ["Construction planning", "Material estimation", "Capacity calculation", "Cost estimation"]
        },
        hi: {
            title: "वास्तविक दुनिया के अनुप्रयोग",
            definition: "दैनिक जीवन में 3D क्षेत्रमिति के व्यावहारिक उपयोग",
            explanation: "3D क्षेत्रमिति का उपयोग निर्माण, पैकेजिंग, जल भंडारण, विनिर्माण और कई इंजीनियरिंग अनुप्रयोगों में किया जाता है।",
            formula: "वास्तविक समस्याओं पर आयतन और पृष्ठीय क्षेत्रफल सूत्र लागू करें",
            example: "कमरे के लिए आवश्यक पेंट की गणना, पानी की टंकी की क्षमता, शिपिंग के लिए बॉक्स का आयतन",
            memoryTrick: "सोचें: क्या भरने की आवश्यकता है (आयतन) या ढकने की (पृष्ठीय क्षेत्रफल)?",
            applications: ["निर्माण योजना", "सामग्री अनुमान", "क्षमता गणना", "लागत अनुमान"]
        }
    },

    // M01L02 - Parallel Lines & Transversals
    "Corresponding angles": {
        en: {
            title: "Corresponding Angles",
            definition: "Angles in matching positions when a transversal cuts two parallel lines",
            explanation: "When a transversal intersects two parallel lines, corresponding angles are equal. They are in the same relative position at each intersection.",
            formula: "∠1 = ∠5, ∠2 = ∠6, ∠3 = ∠7, ∠4 = ∠8 (when lines are parallel)",
            example: "If ∠1 = 60°, then ∠5 = 60° (corresponding angles)",
            memoryTrick: "'F' pattern - angles in same position are equal",
            applications: ["Proving lines parallel", "Finding unknown angles", "Railway track problems"]
        },
        hi: {
            title: "संगत कोण",
            definition: "जब एक तिर्यक रेखा दो समानांतर रेखाओं को काटती है तो मिलान स्थिति में कोण",
            explanation: "जब एक तिर्यक रेखा दो समानांतर रेखाओं को काटती है, तो संगत कोण बराबर होते हैं। वे प्रत्येक प्रतिच्छेदन पर समान सापेक्ष स्थिति में होते हैं।",
            formula: "∠1 = ∠5, ∠2 = ∠6, ∠3 = ∠7, ∠4 = ∠8 (जब रेखाएं समानांतर हों)",
            example: "यदि ∠1 = 60°, तो ∠5 = 60° (संगत कोण)",
            memoryTrick: "'F' पैटर्न - समान स्थिति में कोण बराबर होते हैं",
            applications: ["रेखाओं को समानांतर सिद्ध करना", "अज्ञात कोण ढूंढना", "रेलवे ट्रैक समस्याएं"]
        }
    },

    "Alternate angles": {
        en: {
            title: "Alternate Angles",
            definition: "Angles on opposite sides of the transversal between parallel lines",
            explanation: "Alternate interior angles are equal when a transversal cuts parallel lines. They form a 'Z' pattern.",
            formula: "∠3 = ∠6, ∠4 = ∠5 (alternate interior angles)",
            example: "If ∠3 = 70°, then ∠6 = 70° (alternate angles)",
            memoryTrick: "'Z' pattern for alternate interior angles",
            applications: ["Angle calculations", "Parallel line proofs", "Geometry problems"]
        },
        hi: {
            title: "एकांतर कोण",
            definition: "समानांतर रेखाओं के बीच तिर्यक रेखा के विपरीत पक्षों पर कोण",
            explanation: "जब एक तिर्यक रेखा समानांतर रेखाओं को काटती है तो एकांतर आंतरिक कोण बराबर होते हैं। वे 'Z' पैटर्न बनाते हैं।",
            formula: "∠3 = ∠6, ∠4 = ∠5 (एकांतर आंतरिक कोण)",
            example: "यदि ∠3 = 70°, तो ∠6 = 70° (एकांतर कोण)",
            memoryTrick: "एकांतर आंतरिक कोणों के लिए 'Z' पैटर्न",
            applications: ["कोण गणना", "समानांतर रेखा प्रमाण", "ज्यामिति समस्याएं"]
        }
    },

    "Co-interior angles": {
        en: {
            title: "Co-interior Angles",
            definition: "Interior angles on the same side of the transversal",
            explanation: "Co-interior angles (also called consecutive interior angles) are supplementary when lines are parallel. They add up to 180°.",
            formula: "∠3 + ∠5 = 180°, ∠4 + ∠6 = 180° (when lines are parallel)",
            example: "If ∠3 = 110°, then ∠5 = 70° (co-interior angles)",
            memoryTrick: "'C' pattern - Co-interior angles add to 180°",
            applications: ["Finding supplementary angles", "Parallel line problems", "Angle sum calculations"]
        },
        hi: {
            title: "सह-आंतरिक कोण",
            definition: "तिर्यक रेखा के एक ही पक्ष पर आंतरिक कोण",
            explanation: "सह-आंतरिक कोण (जिन्हें क्रमागत आंतरिक कोण भी कहा जाता है) जब रेखाएं समानांतर होती हैं तो संपूरक होते हैं। वे 180° तक जुड़ते हैं।",
            formula: "∠3 + ∠5 = 180°, ∠4 + ∠6 = 180° (जब रेखाएं समानांतर हों)",
            example: "यदि ∠3 = 110°, तो ∠5 = 70° (सह-आंतरिक कोण)",
            memoryTrick: "'C' पैटर्न - सह-आंतरिक कोण 180° तक जोड़ते हैं",
            applications: ["संपूरक कोण ढूंढना", "समानांतर रेखा समस्याएं", "कोण योग गणना"]
        }
    },

    "Angle relationships": {
        en: {
            title: "Angle Relationships",
            definition: "Various relationships between angles formed by intersecting lines",
            explanation: "Includes vertically opposite angles (equal), linear pairs (supplementary), corresponding angles, alternate angles, and co-interior angles.",
            formula: "Vertically opposite: ∠1 = ∠3, Linear pair: ∠1 + ∠2 = 180°",
            example: "Two intersecting lines form 4 angles: opposite angles are equal",
            memoryTrick: "V for Vertically opposite = equal, L for Linear pair = 180°",
            applications: ["Solving angle problems", "Geometric proofs", "Real-world angle calculations"]
        },
        hi: {
            title: "कोण संबंध",
            definition: "प्रतिच्छेदन रेखाओं द्वारा बनाए गए कोणों के बीच विभिन्न संबंध",
            explanation: "इसमें शीर्षाभिमुख कोण (बराबर), रैखिक युग्म (संपूरक), संगत कोण, एकांतर कोण और सह-आंतरिक कोण शामिल हैं।",
            formula: "शीर्षाभिमुख: ∠1 = ∠3, रैखिक युग्म: ∠1 + ∠2 = 180°",
            example: "दो प्रतिच्छेदन रेखाएं 4 कोण बनाती हैं: विपरीत कोण बराबर होते हैं",
            memoryTrick: "V शीर्षाभिमुख के लिए = बराबर, L रैखिक युग्म के लिए = 180°",
            applications: ["कोण समस्याओं को हल करना", "ज्यामितीय प्रमाण", "वास्तविक दुनिया कोण गणना"]
        }
    },

    // M01L03 - Triangle Basics
    "Triangle classification": {
        en: {
            title: "Triangle Classification",
            definition: "Categorizing triangles by sides and angles",
            explanation: "By sides: Equilateral (all equal), Isosceles (2 equal), Scalene (all different). By angles: Acute (all < 90°), Right (one = 90°), Obtuse (one > 90°).",
            formula: "No specific formula - classification based on properties",
            example: "Triangle with sides 3,4,5 is scalene and right-angled",
            memoryTrick: "EIS for sides (Equilateral, Isosceles, Scalene), ARO for angles (Acute, Right, Obtuse)",
            applications: ["Identifying triangle types", "Choosing correct formulas", "Geometry problems"]
        },
        hi: {
            title: "त्रिभुज वर्गीकरण",
            definition: "भुजाओं और कोणों द्वारा त्रिभुजों को वर्गीकृत करना",
            explanation: "भुजाओं द्वारा: समबाहु (सभी बराबर), समद्विबाहु (2 बराबर), विषमबाहु (सभी अलग)। कोणों द्वारा: न्यूनकोण (सभी < 90°), समकोण (एक = 90°), अधिककोण (एक > 90°)।",
            formula: "कोई विशिष्ट सूत्र नहीं - गुणों के आधार पर वर्गीकरण",
            example: "3,4,5 भुजाओं वाला त्रिभुज विषमबाहु और समकोण है",
            memoryTrick: "भुजाओं के लिए EIS (समबाहु, समद्विबाहु, विषमबाहु), कोणों के लिए ARO (न्यूनकोण, समकोण, अधिककोण)",
            applications: ["त्रिभुज प्रकार पहचानना", "सही सूत्र चुनना", "ज्यामिति समस्याएं"]
        }
    },

    "Angle sum property": {
        en: {
            title: "Angle Sum Property",
            definition: "Sum of all angles in a triangle equals 180°",
            explanation: "This is a fundamental property of triangles. No matter what type of triangle, the three interior angles always add up to 180 degrees.",
            formula: "∠A + ∠B + ∠C = 180°",
            example: "If ∠A = 60° and ∠B = 70°, then ∠C = 50°",
            memoryTrick: "Triangle = 180° (always!)",
            applications: ["Finding unknown angles", "Proving triangle properties", "All triangle problems"]
        },
        hi: {
            title: "कोण योग गुण",
            definition: "त्रिभुज में सभी कोणों का योग 180° के बराबर होता है",
            explanation: "यह त्रिभुजों का एक मौलिक गुण है। त्रिभुज किसी भी प्रकार का हो, तीन आंतरिक कोण हमेशा 180 डिग्री तक जुड़ते हैं।",
            formula: "∠A + ∠B + ∠C = 180°",
            example: "यदि ∠A = 60° और ∠B = 70°, तो ∠C = 50°",
            memoryTrick: "त्रिभुज = 180° (हमेशा!)",
            applications: ["अज्ञात कोण ढूंढना", "त्रिभुज गुण सिद्ध करना", "सभी त्रिभुज समस्याएं"]
        }
    },

    "Exterior angle theorem": {
        en: {
            title: "Exterior Angle Theorem",
            definition: "Exterior angle equals sum of two opposite interior angles",
            explanation: "When one side of a triangle is extended, the exterior angle formed equals the sum of the two non-adjacent interior angles.",
            formula: "Exterior angle = ∠A + ∠B (where A and B are non-adjacent interior angles)",
            example: "If ∠A = 50° and ∠B = 60°, exterior angle at C = 110°",
            memoryTrick: "Exterior = Sum of two remote interiors",
            applications: ["Finding exterior angles", "Angle calculations", "Geometry proofs"]
        },
        hi: {
            title: "बाह्य कोण प्रमेय",
            definition: "बाह्य कोण दो विपरीत आंतरिक कोणों के योग के बराबर होता है",
            explanation: "जब त्रिभुज की एक भुजा को बढ़ाया जाता है, तो बना बाह्य कोण दो गैर-आसन्न आंतरिक कोणों के योग के बराबर होता है।",
            formula: "बाह्य कोण = ∠A + ∠B (जहां A और B गैर-आसन्न आंतरिक कोण हैं)",
            example: "यदि ∠A = 50° और ∠B = 60°, तो C पर बाह्य कोण = 110°",
            memoryTrick: "बाह्य = दो दूरस्थ आंतरिक का योग",
            applications: ["बाह्य कोण ढूंढना", "कोण गणना", "ज्यामिति प्रमाण"]
        }
    },

    "Triangle inequality": {
        en: {
            title: "Triangle Inequality",
            definition: "Sum of any two sides must be greater than the third side",
            explanation: "For a triangle to exist, the sum of lengths of any two sides must be greater than the length of the third side. This must be true for all three combinations.",
            formula: "a + b > c, b + c > a, c + a > b",
            example: "Sides 3, 4, 5: 3+4>5 ✓, 4+5>3 ✓, 5+3>4 ✓ (valid triangle)",
            memoryTrick: "Two sides together beat the third!",
            applications: ["Checking if triangle is possible", "Finding range of third side", "Geometry problems"]
        },
        hi: {
            title: "त्रिभुज असमानता",
            definition: "किन्हीं दो भुजाओं का योग तीसरी भुजा से बड़ा होना चाहिए",
            explanation: "त्रिभुज के अस्तित्व के लिए, किन्हीं दो भुजाओं की लंबाई का योग तीसरी भुजा की लंबाई से अधिक होना चाहिए। यह तीनों संयोजनों के लिए सत्य होना चाहिए।",
            formula: "a + b > c, b + c > a, c + a > b",
            example: "भुजाएं 3, 4, 5: 3+4>5 ✓, 4+5>3 ✓, 5+3>4 ✓ (मान्य त्रिभुज)",
            memoryTrick: "दो भुजाएं मिलकर तीसरी को हराती हैं!",
            applications: ["त्रिभुज संभव है या नहीं जांचना", "तीसरी भुजा की सीमा ढूंढना", "ज्यामिति समस्याएं"]
        }
    },

    // M01L04 - Pythagoras Theorem
    "Right triangles": {
        en: {
            title: "Right Triangles",
            definition: "Triangles with one 90° angle",
            explanation: "A right triangle has one right angle (90°). The side opposite to the right angle is called the hypotenuse (longest side). The other two sides are called legs or perpendicular and base.",
            formula: "a² + b² = c² (Pythagoras theorem)",
            example: "Triangle with sides 3, 4, 5 is a right triangle",
            memoryTrick: "Right angle = 90°, Hypotenuse = longest side",
            applications: ["Distance calculations", "Height and distance", "Construction"]
        },
        hi: {
            title: "समकोण त्रिभुज",
            definition: "एक 90° कोण वाले त्रिभुज",
            explanation: "समकोण त्रिभुज में एक समकोण (90°) होता है। समकोण के विपरीत भुजा को कर्ण (सबसे लंबी भुजा) कहा जाता है। अन्य दो भुजाओं को पाद या लंब और आधार कहा जाता है।",
            formula: "a² + b² = c² (पाइथागोरस प्रमेय)",
            example: "3, 4, 5 भुजाओं वाला त्रिभुज समकोण त्रिभुज है",
            memoryTrick: "समकोण = 90°, कर्ण = सबसे लंबी भुजा",
            applications: ["दूरी गणना", "ऊंचाई और दूरी", "निर्माण"]
        }
    },

    "Pythagorean triplets": {
        en: {
            title: "Pythagorean Triplets",
            definition: "Sets of three integers that satisfy Pythagoras theorem",
            explanation: "Common triplets: (3,4,5), (5,12,13), (8,15,17), (7,24,25). Any multiple of these is also a triplet.",
            formula: "a² + b² = c² where a, b, c are integers",
            example: "3,4,5): 3² + 4² = 9 + 16 = 25 = 5²",
            memoryTrick: "Remember 3-4-5 and 5-12-13, multiply for more!",
            applications: ["Quick calculations", "Checking right triangles", "Shortcut methods"]
        },
        hi: {
            title: "पाइथागोरियन त्रिक",
            definition: "तीन पूर्णांकों के सेट जो पाइथागोरस प्रमेय को संतुष्ट करते हैं",
            explanation: "सामान्य त्रिक: (3,4,5), (5,12,13), (8,15,17), (7,24,25)। इनका कोई भी गुणज भी एक त्रिक है।",
            formula: "a² + b² = c² जहां a, b, c पूर्णांक हैं",
            example: "(3,4,5): 3² + 4² = 9 + 16 = 25 = 5²",
            memoryTrick: "3-4-5 और 5-12-13 याद रखें, अधिक के लिए गुणा करें!",
            applications: ["त्वरित गणना", "समकोण त्रिभुज जांचना", "शॉर्टकट विधियां"]
        }
    },

    "Converse theorem": {
        en: {
            title: "Converse of Pythagoras Theorem",
            definition: "If a² + b² = c², then the triangle is right-angled",
            explanation: "This is the reverse of Pythagoras theorem. If three sides satisfy the equation a² + b² = c², then the triangle must have a right angle opposite to side c.",
            formula: "If a² + b² = c², then ∠C = 90°",
            example: "Sides 6, 8, 10: 6² + 8² = 36 + 64 = 100 = 10², so it's a right triangle",
            memoryTrick: "Equation satisfied → Right angle confirmed",
            applications: ["Proving right angles", "Verifying triangle type", "Geometry proofs"]
        },
        hi: {
            title: "पाइथागोरस प्रमेय का विलोम",
            definition: "यदि a² + b² = c², तो त्रिभुज समकोण है",
            explanation: "यह पाइथागोरस प्रमेय का उल्टा है। यदि तीन भुजाएं समीकरण a² + b² = c² को संतुष्ट करती हैं, तो त्रिभुज में भुजा c के विपरीत एक समकोण होना चाहिए।",
            formula: "यदि a² + b² = c², तो ∠C = 90°",
            example: "भुजाएं 6, 8, 10: 6² + 8² = 36 + 64 = 100 = 10², तो यह समकोण त्रिभुज है",
            memoryTrick: "समीकरण संतुष्ट → समकोण पुष्टि",
            applications: ["समकोण सिद्ध करना", "त्रिभुज प्रकार सत्यापित करना", "ज्यामिति प्रमाण"]
        }
    },

    // M01L05 - Special Right Triangles
    "30-60-90 triangle": {
        en: {
            title: "30-60-90 Triangle",
            definition: "Special right triangle with angles 30°, 60°, and 90°",
            explanation: "In a 30-60-90 triangle, the sides are in the ratio 1 : √3 : 2. The side opposite to 30° is shortest, opposite to 60° is √3 times the shortest, and hypotenuse is twice the shortest.",
            formula: "Sides ratio = 1 : √3 : 2 (opposite to 30° : 60° : 90°)",
            example: "If shortest side = 5, then sides are 5, 5√3, 10",
            memoryTrick: "1-root3-2 for 30-60-90",
            applications: ["Quick calculations", "Trigonometry", "Geometry shortcuts"]
        },
        hi: {
            title: "30-60-90 त्रिभुज",
            definition: "30°, 60°, और 90° कोणों वाला विशेष समकोण त्रिभुज",
            explanation: "30-60-90 त्रिभुज में, भुजाएं 1 : √3 : 2 के अनुपात में होती हैं। 30° के विपरीत भुजा सबसे छोटी है, 60° के विपरीत सबसे छोटी का √3 गुना है, और कर्ण सबसे छोटी का दोगुना है।",
            formula: "भुजा अनुपात = 1 : √3 : 2 (30° : 60° : 90° के विपरीत)",
            example: "यदि सबसे छोटी भुजा = 5, तो भुजाएं 5, 5√3, 10 हैं",
            memoryTrick: "30-60-90 के लिए 1-रूट3-2",
            applications: ["त्वरित गणना", "त्रिकोणमिति", "ज्यामिति शॉर्टकट"]
        }
    },

    "45-45-90 triangle": {
        en: {
            title: "45-45-90 Triangle",
            definition: "Isosceles right triangle with angles 45°, 45°, and 90°",
            explanation: "In a 45-45-90 triangle, the two legs are equal and the hypotenuse is √2 times each leg. This is also called an isosceles right triangle.",
            formula: "Sides ratio = 1 : 1 : √2 (leg : leg : hypotenuse)",
            example: "If each leg = 6, then hypotenuse = 6√2",
            memoryTrick: "1-1-root2 for 45-45-90",
            applications: ["Square diagonal problems", "Quick calculations", "Coordinate geometry"]
        },
        hi: {
            title: "45-45-90 त्रिभुज",
            definition: "45°, 45°, और 90° कोणों वाला समद्विबाहु समकोण त्रिभुज",
            explanation: "45-45-90 त्रिभुज में, दोनों पाद बराबर होते हैं और कर्ण प्रत्येक पाद का √2 गुना होता है। इसे समद्विबाहु समकोण त्रिभुज भी कहा जाता है।",
            formula: "भुजा अनुपात = 1 : 1 : √2 (पाद : पाद : कर्ण)",
            example: "यदि प्रत्येक पाद = 6, तो कर्ण = 6√2",
            memoryTrick: "45-45-90 के लिए 1-1-रूट2",
            applications: ["वर्ग विकर्ण समस्याएं", "त्वरित गणना", "निर्देशांक ज्यामिति"]
        }
    },

    "Ratios and patterns": {
        en: {
            title: "Ratios and Patterns in Special Triangles",
            definition: "Fixed ratios of sides in special right triangles",
            explanation: "Special right triangles have predictable side ratios: 30-60-90 has 1:√3:2, and 45-45-90 has 1:1:√2. These patterns allow quick calculations without using Pythagoras theorem.",
            formula: "30-60-90: 1:√3:2, 45-45-90: 1:1:√2",
            example: "In 30-60-90 with hypotenuse 20, sides are 10, 10√3, 20",
            memoryTrick: "Memorize the two patterns, use them everywhere!",
            applications: ["Fast problem solving", "Avoiding complex calculations", "Competitive exams"]
        },
        hi: {
            title: "विशेष त्रिभुजों में अनुपात और पैटर्न",
            definition: "विशेष समकोण त्रिभुजों में भुजाओं के निश्चित अनुपात",
            explanation: "विशेष समकोण त्रिभुजों में पूर्वानुमानित भुजा अनुपात होते हैं: 30-60-90 में 1:√3:2 है, और 45-45-90 में 1:1:√2 है। ये पैटर्न पाइथागोरस प्रमेय का उपयोग किए बिना त्वरित गणना की अनुमति देते हैं।",
            formula: "30-60-90: 1:√3:2, 45-45-90: 1:1:√2",
            example: "कर्ण 20 वाले 30-60-90 में, भुजाएं 10, 10√3, 20 हैं",
            memoryTrick: "दो पैटर्न याद करें, उन्हें हर जगह उपयोग करें!",
            applications: ["तेज समस्या समाधान", "जटिल गणनाओं से बचना", "प्रतियोगी परीक्षाएं"]
        }
    }
};
