// Math Mastery Platform - COMPLETE Content Database
// Updated with ALL topics from SSC Math syllabus

export const modules = [
    {
        id: 'M01',
        name: 'Geometry Fundamentals',
        description: 'Master the basics of lines, angles, and triangles',
        difficulty: 'Foundation',
        estimatedHours: 12,
        icon: '📐',
        color: 'bg-blue-500',
        lessons: [
            { id: 'M01L01', name: 'Lines and Angles', duration: 45, concepts: ['Point, Line, Ray', 'Angle types', 'Complementary & Supplementary', 'Vertically opposite angles'], completed: false },
            { id: 'M01L02', name: 'Parallel Lines & Transversals', duration: 50, concepts: ['Corresponding angles', 'Alternate angles', 'Co-interior angles', 'Angle relationships'], completed: false },
            { id: 'M01L03', name: 'Triangle Basics', duration: 60, concepts: ['Triangle classification', 'Angle sum property', 'Exterior angle theorem', 'Triangle inequality'], completed: false },
            { id: 'M01L04', name: 'Pythagoras Theorem', duration: 50, concepts: ['Right triangles', 'Pythagorean triplets', 'Applications', 'Converse theorem'], completed: false },
            { id: 'M01L05', name: 'Special Right Triangles', duration: 45, concepts: ['30-60-90 triangle', '45-45-90 triangle', 'Ratios and patterns'], completed: false }
        ]
    },
    {
        id: 'M02',
        name: 'Advanced Triangle Geometry',
        description: 'Similarity, congruency, and triangle centers',
        difficulty: 'Intermediate',
        estimatedHours: 15,
        icon: '🔺',
        color: 'bg-purple-500',
        lessons: [
            { id: 'M02L01', name: 'Triangle Similarity', duration: 55, concepts: ['AA criterion', 'SAS criterion', 'SSS criterion', 'Applications'], completed: false },
            { id: 'M02L02', name: 'Triangle Congruency', duration: 50, concepts: ['SSS', 'SAS', 'ASA', 'AAS', 'RHS rules'], completed: false },
            { id: 'M02L03', name: 'Triangle Centers - Part 1', duration: 70, concepts: ['Centroid', 'Circumcentre', 'Properties and formulas'], completed: false },
            { id: 'M02L04', name: 'Triangle Centers - Part 2', duration: 65, concepts: ['Orthocentre', 'Incentre', 'Coordinate geometry'], completed: false },
            { id: 'M02L05', name: 'Advanced Theorems', duration: 60, concepts: ['Sine rule', 'Cosine rule', 'Angle bisector theorem'], completed: false }
        ]
    },
    {
        id: 'M03',
        name: 'Quadrilaterals & Polygons',
        description: 'Properties of quadrilaterals and polygon formulas',
        difficulty: 'Intermediate',
        estimatedHours: 10,
        icon: '◼️',
        color: 'bg-green-500',
        lessons: [
            { id: 'M03L01', name: 'Quadrilateral Basics', duration: 45, concepts: ['Types', 'Angle sum property', 'Properties'], completed: false },
            { id: 'M03L02', name: 'Parallelograms & Rectangles', duration: 50, concepts: ['Properties', 'Area formulas', 'Diagonal properties'], completed: false },
            { id: 'M03L03', name: 'Rhombus & Trapezium', duration: 50, concepts: ['Special properties', 'Area calculations', 'Applications'], completed: false },
            { id: 'M03L04', name: 'Polygons', duration: 55, concepts: ['Interior angles', 'Exterior angles', 'Diagonals', 'Regular polygons'], completed: false }
        ]
    },
    {
        id: 'M04',
        name: 'Circles',
        description: 'Circle theorems, tangents, and chords',
        difficulty: 'Intermediate',
        estimatedHours: 12,
        icon: '⭕',
        color: 'bg-yellow-500',
        lessons: [
            { id: 'M04L01', name: 'Circle Basics', duration: 40, concepts: ['Radius, Diameter, Chord', 'Arc, Sector, Segment', 'Basic formulas'], completed: false },
            { id: 'M04L02', name: 'Circle Theorems - Angles', duration: 60, concepts: ['Angle at center', 'Angle in semicircle', 'Cyclic quadrilateral'], completed: false },
            { id: 'M04L03', name: 'Tangents & Chords', duration: 65, concepts: ['Tangent properties', 'Chord theorems', 'Power of point'], completed: false },
            { id: 'M04L04', name: 'Advanced Circle Problems', duration: 70, concepts: ['Intersecting chords', 'Secant-tangent', 'Applications'], completed: false }
        ]
    },
    {
        id: 'M05',
        name: 'Coordinate Geometry',
        description: 'Distance, section formula, and coordinate applications',
        difficulty: 'Intermediate',
        estimatedHours: 10,
        icon: '📍',
        color: 'bg-indigo-500',
        lessons: [
            { id: 'M05L01', name: 'Distance & Midpoint', duration: 45, concepts: ['Distance formula', 'Midpoint formula', 'Applications'], completed: false },
            { id: 'M05L02', name: 'Section Formula', duration: 50, concepts: ['Internal division', 'External division', 'Centroid'], completed: false },
            { id: 'M05L03', name: 'Area & Collinearity', duration: 55, concepts: ['Area of triangle', 'Collinearity condition', 'Applications'], completed: false },
            { id: 'M05L04', name: 'Slope & Lines', duration: 50, concepts: ['Slope formula', 'Parallel lines', 'Perpendicular lines'], completed: false }
        ]
    },
    {
        id: 'M06',
        name: '2D Mensuration',
        description: 'Area and perimeter of all 2D shapes',
        difficulty: 'Foundation',
        estimatedHours: 8,
        icon: '📏',
        color: 'bg-red-500',
        lessons: [
            { id: 'M06L01', name: 'Triangle Area', duration: 45, concepts: ['Base × Height', "Heron's formula", 'Coordinate method', 'Sine formula'], completed: false },
            { id: 'M06L02', name: 'Quadrilaterals', duration: 50, concepts: ['Rectangle', 'Square', 'Parallelogram', 'Rhombus', 'Trapezium'], completed: false },
            { id: 'M06L03', name: 'Circles & Sectors', duration: 55, concepts: ['Circle area', 'Circumference', 'Sector', 'Segment'], completed: false },
            { id: 'M06L04', name: 'Combined Shapes', duration: 50, concepts: ['Path problems', 'Shaded regions', 'Complex figures'], completed: false }
        ]
    },
    {
        id: 'M07',
        name: '3D Mensuration',
        description: 'Volume and surface area of 3D shapes',
        difficulty: 'Intermediate',
        estimatedHours: 12,
        icon: '📦',
        color: 'bg-orange-500',
        lessons: [
            { id: 'M07L01', name: 'Cube and Cuboid', duration: 45, concepts: ['Volume formulas', 'Surface area', 'Diagonal', 'Applications'], completed: false },
            { id: 'M07L02', name: 'Cylinder', duration: 50, concepts: ['Volume', 'CSA & TSA', 'Hollow cylinder'], completed: false },
            { id: 'M07L03', name: 'Cone & Frustum', duration: 55, concepts: ['Cone volume', 'Slant height', 'Frustum formulas'], completed: false },
            { id: 'M07L04', name: 'Sphere & Hemisphere', duration: 50, concepts: ['Sphere formulas', 'Hemisphere', 'Applications'], completed: false },
            { id: 'M07L05', name: 'Prism & Pyramid', duration: 55, concepts: ['Prism volume', 'Pyramid volume', "Euler's formula"], completed: false }
        ]
    },
    {
        id: 'M08',
        name: 'Algebra',
        description: 'Identities, patterns, and quadratic equations',
        difficulty: 'Intermediate',
        estimatedHours: 10,
        icon: '🔢',
        color: 'bg-teal-500',
        lessons: [
            { id: 'M08L01', name: 'Basic Identities', duration: 50, concepts: ['(a+b)²', '(a-b)²', 'a²-b²', 'Cubic identities'], completed: false },
            { id: 'M08L02', name: 'x + 1/x Patterns', duration: 55, concepts: ['Special patterns', 'Shortcuts', 'Advanced applications'], completed: false },
            { id: 'M08L03', name: 'Quadratic Equations - Part 1', duration: 60, concepts: ['Standard form', 'Quadratic formula', 'Factorization'], completed: false },
            { id: 'M08L04', name: 'Quadratic Equations - Part 2', duration: 55, concepts: ['Roots', 'Discriminant', 'Forming equations'], completed: false }
        ]
    },
    {
        id: 'M09',
        name: 'Trigonometry',
        description: 'Ratios, identities, and applications',
        difficulty: 'Advanced',
        estimatedHours: 14,
        icon: '📊',
        color: 'bg-pink-500',
        lessons: [
            { id: 'M09L01', name: 'Basic Ratios', duration: 50, concepts: ['sin, cos, tan', 'Standard angles', 'ASTC rule', 'Reciprocal ratios'], completed: false },
            { id: 'M09L02', name: 'Fundamental Identities', duration: 55, concepts: ['Pythagorean identities', 'Reciprocal relations', 'Applications'], completed: false },
            { id: 'M09L03', name: 'Compound Angles', duration: 60, concepts: ['sin(A±B)', 'cos(A±B)', 'tan(A±B)', 'Applications'], completed: false },
            { id: 'M09L04', name: 'Multiple Angles', duration: 55, concepts: ['Double angle', 'Triple angle', 'Product to sum'], completed: false },
            { id: 'M09L05', name: 'Maxima-Minima', duration: 50, concepts: ['Range of expressions', 'Optimization problems'], completed: false },
            { id: 'M09L06', name: 'Height and Distance', duration: 60, concepts: ['Angle of elevation', 'Angle of depression', 'Real-world applications'], completed: false }
        ]
    },
    {
        id: 'M10',
        name: 'Number System',
        description: 'HCF, LCM, divisibility, and number properties',
        difficulty: 'Foundation',
        estimatedHours: 8,
        icon: '🔢',
        color: 'bg-cyan-500',
        lessons: [
            { id: 'M10L01', name: 'Number Classification', duration: 40, concepts: ['Natural, Whole, Integer', 'Rational, Irrational', 'Prime, Composite'], completed: false },
            { id: 'M10L02', name: 'HCF & LCM', duration: 55, concepts: ['Prime factorization', 'Division method', 'HCF × LCM = Product'], completed: false },
            { id: 'M10L03', name: 'Divisibility Rules', duration: 45, concepts: ['Rules for 2-11', 'Applications', 'Shortcuts'], completed: false },
            { id: 'M10L04', name: 'Number Properties', duration: 50, concepts: ['Even-Odd', 'Perfect squares', 'Unit digits'], completed: false }
        ]
    },
    {
        id: 'M11',
        name: 'Percentage & Ratio',
        description: 'Percentage calculations, ratio, and proportion',
        difficulty: 'Foundation',
        estimatedHours: 9,
        icon: '%',
        color: 'bg-lime-500',
        lessons: [
            { id: 'M11L01', name: 'Percentage Basics', duration: 45, concepts: ['Conversion', 'Increase/Decrease', 'Applications'], completed: false },
            { id: 'M11L02', name: 'Ratio & Proportion', duration: 50, concepts: ['Simplification', 'Compound ratio', 'Continued proportion'], completed: false },
            { id: 'M11L03', name: 'Mixture & Alligation', duration: 60, concepts: ['Alligation rule', 'Mixture problems', 'Replacement'], completed: false },
            { id: 'M11L04', name: 'Advanced Applications', duration: 55, concepts: ['Population', 'Price changes', 'Exam problems'], completed: false }
        ]
    },
    {
        id: 'M12',
        name: 'Profit & Loss',
        description: 'CP, SP, profit, loss, and discount calculations',
        difficulty: 'Foundation',
        estimatedHours: 7,
        icon: '💰',
        color: 'bg-emerald-500',
        lessons: [
            { id: 'M12L01', name: 'Basic Concepts', duration: 40, concepts: ['CP, SP', 'Profit, Loss', 'Percentage formulas'], completed: false },
            { id: 'M12L02', name: 'Discount & Marked Price', duration: 50, concepts: ['MP, Discount', 'Successive discounts', 'Applications'], completed: false },
            { id: 'M12L03', name: 'Advanced Problems', duration: 55, concepts: ['False weights', 'Partnership', 'Shortcuts'], completed: false }
        ]
    },
    {
        id: 'M13',
        name: 'Simple & Compound Interest',
        description: 'Interest calculations and applications',
        difficulty: 'Intermediate',
        estimatedHours: 6,
        icon: '💵',
        color: 'bg-amber-500',
        lessons: [
            { id: 'M13L01', name: 'Simple Interest', duration: 45, concepts: ['SI formula', 'Principal, Rate, Time', 'Applications'], completed: false },
            { id: 'M13L02', name: 'Compound Interest', duration: 55, concepts: ['CI formula', 'Compounding periods', 'Difference SI-CI'], completed: false },
            { id: 'M13L03', name: 'Advanced CI Problems', duration: 50, concepts: ['Population growth', 'Depreciation', 'Installments'], completed: false }
        ]
    },
    {
        id: 'M14',
        name: 'Time & Work',
        description: 'Work efficiency, pipes & cisterns',
        difficulty: 'Intermediate',
        estimatedHours: 8,
        icon: '⏱️',
        color: 'bg-rose-500',
        lessons: [
            { id: 'M14L01', name: 'Work Basics', duration: 45, concepts: ['Work = Rate × Time', 'Efficiency', 'Man-days'], completed: false },
            { id: 'M14L02', name: 'Combined Work', duration: 50, concepts: ['Multiple workers', 'Alternate days', 'Group work'], completed: false },
            { id: 'M14L03', name: 'Pipes & Cisterns', duration: 55, concepts: ['Inlet, Outlet', 'Combined pipes', 'Leak problems'], completed: false }
        ]
    },
    {
        id: 'M15',
        name: 'Time, Speed & Distance',
        description: 'Motion problems, trains, boats & streams',
        difficulty: 'Intermediate',
        estimatedHours: 10,
        icon: '🚄',
        color: 'bg-violet-500',
        lessons: [
            { id: 'M15L01', name: 'Speed Basics', duration: 45, concepts: ['Speed = Distance/Time', 'Unit conversion', 'Average speed'], completed: false },
            { id: 'M15L02', name: 'Relative Speed', duration: 50, concepts: ['Same direction', 'Opposite direction', 'Circular track'], completed: false },
            { id: 'M15L03', name: 'Trains', duration: 60, concepts: ['Train length', 'Platform', 'Two trains'], completed: false },
            { id: 'M15L04', name: 'Boats & Streams', duration: 55, concepts: ['Upstream', 'Downstream', 'Still water'], completed: false }
        ]
    },
    {
        id: 'M16',
        name: 'Data Interpretation',
        description: 'Tables, charts, graphs, and data analysis',
        difficulty: 'Advanced',
        estimatedHours: 9,
        icon: '📈',
        color: 'bg-fuchsia-500',
        lessons: [
            { id: 'M16L01', name: 'Tables & Charts', duration: 50, concepts: ['Reading tables', 'Bar charts', 'Pie charts'], completed: false },
            { id: 'M16L02', name: 'Line Graphs', duration: 45, concepts: ['Trend analysis', 'Multiple lines', 'Comparisons'], completed: false },
            { id: 'M16L03', name: 'Advanced DI', duration: 60, concepts: ['Mixed charts', 'Caselets', 'Data sufficiency'], completed: false }
        ]
    },
    {
        id: 'M17',
        name: 'Simplification',
        description: 'BODMAS, approximation, and quick calculation',
        difficulty: 'Foundation',
        estimatedHours: 5,
        icon: '🧮',
        color: 'bg-sky-500',
        lessons: [
            { id: 'M17L01', name: 'BODMAS Rules', duration: 40, concepts: ['Order of operations', 'Brackets', 'Priority rules', 'Common mistakes'], completed: false },
            { id: 'M17L02', name: 'Approximation', duration: 45, concepts: ['Rounding off', 'Estimation', 'Quick calculation', 'SSC tricks'], completed: false },
            { id: 'M17L03', name: 'Fraction \u0026 Decimal', duration: 50, concepts: ['Fraction operations', 'Decimal operations', 'Conversion', 'Shortcuts'], completed: false },
            { id: 'M17L04', name: 'Surds \u0026 Indices', duration: 55, concepts: ['Square roots', 'Cube roots', 'Laws of indices', 'Simplification'], completed: false }
        ]
    },
    {
        id: 'M18',
        name: 'Average',
        description: 'Mean, weighted average, and age problems',
        difficulty: 'Foundation',
        estimatedHours: 6,
        icon: '📊',
        color: 'bg-slate-500',
        lessons: [
            { id: 'M18L01', name: 'Average Basics', duration: 40, concepts: ['Mean formula', 'Sum method', 'New average', 'Replacement'], completed: false },
            { id: 'M18L02', name: 'Weighted Average', duration: 50, concepts: ['Weight concept', 'Mixture problems', 'Alligation link', 'Applications'], completed: false },
            { id: 'M18L03', name: 'Age Problems', duration: 45, concepts: ['Present age', 'Past/Future age', 'Ratio method', 'Tricks'], completed: false },
            { id: 'M18L04', name: 'Advanced Average', duration: 55, concepts: ['Running average', 'Grouped data', 'SSC patterns', 'Speed tricks'], completed: false }
        ]
    },
    {
        id: 'M19',
        name: 'Mixture \u0026 Alligation',
        description: 'Alligation rule, mixture problems, and replacement',
        difficulty: 'Intermediate',
        estimatedHours: 7,
        icon: '🧪',
        color: 'bg-orange-600',
        lessons: [
            { id: 'M19L01', name: 'Alligation Basics', duration: 50, concepts: ['Alligation rule', 'Mean price', 'Ratio method', 'Visual approach'], completed: false },
            { id: 'M19L02', name: 'Mixture Problems', duration: 55, concepts: ['Two mixtures', 'Multiple mixtures', 'Concentration', 'Ratio problems'], completed: false },
            { id: 'M19L03', name: 'Replacement', duration: 50, concepts: ['Successive replacement', 'Formula method', 'Shortcut', 'Applications'], completed: false },
            { id: 'M19L04', name: 'Advanced Alligation', duration: 60, concepts: ['Complex mixtures', 'SSC patterns', 'Trap questions', 'Speed methods'], completed: false }
        ]
    },
    {
        id: 'M20',
        name: 'Permutation \u0026 Combination',
        description: 'Arrangements, selections, and counting principles',
        difficulty: 'Advanced',
        estimatedHours: 10,
        icon: '🎲',
        color: 'bg-indigo-600',
        lessons: [
            { id: 'M20L01', name: 'Fundamental Principles', duration: 50, concepts: ['Addition rule', 'Multiplication rule', 'Factorial', 'Basic counting'], completed: false },
            { id: 'M20L02', name: 'Permutation', duration: 60, concepts: ['nPr formula', 'Arrangements', 'Circular permutation', 'Restricted cases'], completed: false },
            { id: 'M20L03', name: 'Combination', duration: 55, concepts: ['nCr formula', 'Selection', 'Properties', 'nCr = nC(n-r)'], completed: false },
            { id: 'M20L04', name: 'Advanced P\u0026C', duration: 65, concepts: ['Derangement', 'Distribution', 'Identical objects', 'SSC patterns'], completed: false },
            { id: 'M20L05', name: 'Word Problems', duration: 60, concepts: ['Letter arrangements', 'Group formation', 'Committee problems', 'Tricks'], completed: false }
        ]
    },
    {
        id: 'M21',
        name: 'Probability',
        description: 'Basic probability, events, and conditional probability',
        difficulty: 'Advanced',
        estimatedHours: 8,
        icon: '🎯',
        color: 'bg-red-600',
        lessons: [
            { id: 'M21L01', name: 'Probability Basics', duration: 50, concepts: ['Definition', 'Sample space', 'Events', 'P(E) formula'], completed: false },
            { id: 'M21L02', name: 'Addition \u0026 Multiplication', duration: 55, concepts: ['OR rule', 'AND rule', 'Mutually exclusive', 'Independent events'], completed: false },
            { id: 'M21L03', name: 'Conditional Probability', duration: 60, concepts: ['P(A|B)', 'Dependent events', 'Bayes theorem', 'Applications'], completed: false },
            { id: 'M21L04', name: 'Advanced Probability', duration: 65, concepts: ['Cards problems', 'Dice problems', 'Balls problems', 'SSC patterns'], completed: false }
        ]
    }
];

export const formulas = [
    // GEOMETRY - Triangles
    { id: 'F001', category: 'Triangles', formula: 'Area = ½ × base × height', variables: 'base = base length, height = perpendicular height', whenToUse: 'When base and height are known', memoryTrick: 'Half of rectangle', difficulty: 'Easy' },
    { id: 'F002', category: 'Triangles', formula: 'Area = ½ × a × b × sinC', variables: 'a, b = two sides, C = included angle', whenToUse: 'When two sides and included angle known', memoryTrick: 'Sine for area', difficulty: 'Medium' },
    { id: 'F003', category: 'Triangles', formula: 'Area = √[s(s-a)(s-b)(s-c)]', variables: 's = (a+b+c)/2, a,b,c = sides', whenToUse: 'When all three sides known (Heron)', memoryTrick: 'Square root of s-products', difficulty: 'Medium' },
    { id: 'F004', category: 'Triangles', formula: 'a² + b² = c²', variables: 'a, b = legs, c = hypotenuse', whenToUse: 'Right triangles only (Pythagoras)', memoryTrick: 'Squares of legs = square of hypotenuse', difficulty: 'Easy' },
    { id: 'F005', category: 'Triangles', formula: 'sin A/a = sin B/b = sin C/c', variables: 'A,B,C = angles; a,b,c = opposite sides', whenToUse: 'Sine Rule - 2 angles + 1 side OR 2 sides + 1 non-included angle', memoryTrick: 'Sine over side is constant', difficulty: 'Hard' },
    { id: 'F006', category: 'Triangles', formula: 'a² = b² + c² - 2bc cosA', variables: 'a = side opposite to angle A', whenToUse: 'Cosine Rule - 2 sides + included angle OR all 3 sides', memoryTrick: 'Like Pythagoras with correction term', difficulty: 'Hard' },
    { id: 'F007', category: 'Triangles', formula: 'Equilateral Area = (√3/4) × a²', variables: 'a = side length', whenToUse: 'Equilateral triangle area', memoryTrick: 'Root 3 by 4 times side squared', difficulty: 'Easy' },

    // GEOMETRY - Circles
    { id: 'F008', category: 'Circles', formula: 'Area = πr²', variables: 'r = radius', whenToUse: 'Finding circle area', memoryTrick: 'Pi r squared', difficulty: 'Easy' },
    { id: 'F009', category: 'Circles', formula: 'Circumference = 2πr', variables: 'r = radius', whenToUse: 'Finding circle perimeter', memoryTrick: '2 pi r', difficulty: 'Easy' },
    { id: 'F010', category: 'Circles', formula: 'Arc length = (θ/360) × 2πr', variables: 'θ = angle in degrees, r = radius', whenToUse: 'Part of circumference', memoryTrick: 'Fraction of full circle', difficulty: 'Medium' },
    { id: 'F011', category: 'Circles', formula: 'Sector area = (θ/360) × πr²', variables: 'θ = angle in degrees, r = radius', whenToUse: 'Pie-slice area', memoryTrick: 'Fraction of full area', difficulty: 'Medium' },

    // GEOMETRY - Quadrilaterals
    { id: 'F012', category: 'Quadrilaterals', formula: 'Rectangle Area = l × b', variables: 'l = length, b = breadth', whenToUse: 'Rectangle area', memoryTrick: 'Length times breadth', difficulty: 'Easy' },
    { id: 'F013', category: 'Quadrilaterals', formula: 'Square Area = a²', variables: 'a = side', whenToUse: 'Square area', memoryTrick: 'Side squared', difficulty: 'Easy' },
    { id: 'F014', category: 'Quadrilaterals', formula: 'Parallelogram Area = base × height', variables: 'base, height = perpendicular height', whenToUse: 'Parallelogram area', memoryTrick: 'Like rectangle', difficulty: 'Easy' },
    { id: 'F015', category: 'Quadrilaterals', formula: 'Rhombus Area = ½ × d₁ × d₂', variables: 'd₁, d₂ = diagonals', whenToUse: 'Rhombus area', memoryTrick: 'Half product of diagonals', difficulty: 'Easy' },
    { id: 'F016', category: 'Quadrilaterals', formula: 'Trapezium Area = ½(a+b) × h', variables: 'a, b = parallel sides, h = height', whenToUse: 'Trapezium area', memoryTrick: 'Average of parallel sides times height', difficulty: 'Medium' },

    // COORDINATE GEOMETRY
    { id: 'F017', category: 'Coordinate Geometry', formula: 'Distance = √[(x₂-x₁)² + (y₂-y₁)²]', variables: '(x₁,y₁), (x₂,y₂) = two points', whenToUse: 'Distance between points', memoryTrick: 'Pythagoras in coordinates', difficulty: 'Easy' },
    { id: 'F018', category: 'Coordinate Geometry', formula: 'Midpoint = ((x₁+x₂)/2, (y₁+y₂)/2)', variables: '(x₁,y₁), (x₂,y₂) = endpoints', whenToUse: 'Find middle point', memoryTrick: 'Average of coordinates', difficulty: 'Easy' },
    { id: 'F019', category: 'Coordinate Geometry', formula: 'Slope = (y₂-y₁)/(x₂-x₁)', variables: '(x₁,y₁), (x₂,y₂) = two points', whenToUse: 'Find line inclination', memoryTrick: 'Rise over run', difficulty: 'Easy' },

    // 3D MENSURATION
    { id: 'F020', category: '3D Mensuration', formula: 'Cube Volume = a³', variables: 'a = edge', whenToUse: 'Cube volume', memoryTrick: 'Edge cubed', difficulty: 'Easy' },
    { id: 'F021', category: '3D Mensuration', formula: 'Cube Surface Area = 6a²', variables: 'a = edge', whenToUse: 'Cube surface area', memoryTrick: '6 faces, each a²', difficulty: 'Easy' },
    { id: 'F022', category: '3D Mensuration', formula: 'Cuboid Volume = l × b × h', variables: 'l = length, b = breadth, h = height', whenToUse: 'Cuboid volume', memoryTrick: 'Length times breadth times height', difficulty: 'Easy' },
    { id: 'F023', category: '3D Mensuration', formula: 'Cylinder Volume = πr²h', variables: 'r = radius, h = height', whenToUse: 'Cylinder volume', memoryTrick: 'Circle area times height', difficulty: 'Easy' },
    { id: 'F024', category: '3D Mensuration', formula: 'Cone Volume = ⅓πr²h', variables: 'r = radius, h = height', whenToUse: 'Cone volume', memoryTrick: 'One-third of cylinder', difficulty: 'Medium' },
    { id: 'F025', category: '3D Mensuration', formula: 'Sphere Volume = 4/3 πr³', variables: 'r = radius', whenToUse: 'Sphere volume', memoryTrick: 'Four-thirds pi r cubed', difficulty: 'Medium' },
    { id: 'F026', category: '3D Mensuration', formula: 'Sphere Surface Area = 4πr²', variables: 'r = radius', whenToUse: 'Sphere surface area', memoryTrick: '4 times circle area', difficulty: 'Medium' },

    // ALGEBRA
    { id: 'F027', category: 'Algebra', formula: '(a + b)² = a² + b² + 2ab', variables: 'a, b = any numbers', whenToUse: 'Squaring sum of two terms', memoryTrick: 'Square of first + square of second + twice the product', difficulty: 'Easy' },
    { id: 'F028', category: 'Algebra', formula: '(a - b)² = a² + b² - 2ab', variables: 'a, b = any numbers', whenToUse: 'Squaring difference', memoryTrick: 'Same as (a+b)² but minus 2ab', difficulty: 'Easy' },
    { id: 'F029', category: 'Algebra', formula: 'a² - b² = (a+b)(a-b)', variables: 'a, b = any numbers', whenToUse: 'Difference of squares', memoryTrick: 'Sum times difference', difficulty: 'Easy' },
    { id: 'F030', category: 'Algebra', formula: '(a+b)³ = a³ + b³ + 3ab(a+b)', variables: 'a, b = any numbers', whenToUse: 'Cubing sum', memoryTrick: 'Cubes plus 3ab times sum', difficulty: 'Medium' },
    { id: 'F031', category: 'Algebra', formula: 'a³ + b³ = (a+b)(a² - ab + b²)', variables: 'a, b = any numbers', whenToUse: 'Sum of cubes', memoryTrick: 'Sum times (squares minus product)', difficulty: 'Medium' },
    { id: 'F032', category: 'Algebra', formula: 'x² + 1/x² = (x + 1/x)² - 2', variables: 'x = any number', whenToUse: 'x + 1/x pattern', memoryTrick: 'Square minus 2', difficulty: 'Medium' },
    { id: 'F033', category: 'Algebra', formula: 'Quadratic Formula: x = [-b ± √(b²-4ac)] / 2a', variables: 'ax² + bx + c = 0', whenToUse: 'Solving quadratic equations', memoryTrick: 'Minus b plus-minus root, over 2a', difficulty: 'Hard' },

    // TRIGONOMETRY
    { id: 'F034', category: 'Trigonometry', formula: 'sin²θ + cos²θ = 1', variables: 'θ = angle', whenToUse: 'Most common trig identity', memoryTrick: 'Always equals 1', difficulty: 'Easy' },
    { id: 'F035', category: 'Trigonometry', formula: '1 + tan²θ = sec²θ', variables: 'θ = angle', whenToUse: 'When tan and sec involved', memoryTrick: '1 plus tan squared', difficulty: 'Easy' },
    { id: 'F036', category: 'Trigonometry', formula: '1 + cot²θ = cosec²θ', variables: 'θ = angle', whenToUse: 'When cot and cosec involved', memoryTrick: '1 plus cot squared', difficulty: 'Easy' },
    { id: 'F037', category: 'Trigonometry', formula: 'sin(A+B) = sinA cosB + cosA sinB', variables: 'A, B = angles', whenToUse: 'Compound angles', memoryTrick: 'Same operation (+ stays +)', difficulty: 'Medium' },
    { id: 'F038', category: 'Trigonometry', formula: 'cos(A+B) = cosA cosB - sinA sinB', variables: 'A, B = angles', whenToUse: 'Compound angles', memoryTrick: 'Opposite operation (+ becomes -)', difficulty: 'Medium' },
    { id: 'F039', category: 'Trigonometry', formula: 'tan(A+B) = (tanA + tanB)/(1 - tanA tanB)', variables: 'A, B = angles', whenToUse: 'Compound angles', memoryTrick: 'Fraction form, opposite in denominator', difficulty: 'Hard' },
    { id: 'F040', category: 'Trigonometry', formula: 'sin 2θ = 2 sinθ cosθ', variables: 'θ = angle', whenToUse: 'Double angle', memoryTrick: '2 sine cosine', difficulty: 'Medium' },

    // NUMBER SYSTEM
    { id: 'F041', category: 'Number System', formula: 'HCF × LCM = Product of numbers', variables: 'For two numbers a, b', whenToUse: 'Finding HCF or LCM when one is known', memoryTrick: 'Product equals HCF times LCM', difficulty: 'Easy' },
    { id: 'F042', category: 'Number System', formula: 'Sum of first n natural numbers = n(n+1)/2', variables: 'n = count of numbers', whenToUse: 'Series sum 1+2+3+...+n', memoryTrick: 'n times n+1 divided by 2', difficulty: 'Easy' },

    // PERCENTAGE
    { id: 'F043', category: 'Percentage', formula: 'Percentage = (Part/Whole) × 100', variables: 'Part, Whole', whenToUse: 'Converting to percentage', memoryTrick: 'Part by whole times 100', difficulty: 'Easy' },
    { id: 'F044', category: 'Percentage', formula: 'Increase% = [(New-Old)/Old] × 100', variables: 'New, Old values', whenToUse: 'Percentage increase', memoryTrick: 'Change by original times 100', difficulty: 'Easy' },

    // PROFIT & LOSS
    { id: 'F045', category: 'Profit & Loss', formula: 'Profit% = (Profit/CP) × 100', variables: 'Profit, CP = Cost Price', whenToUse: 'Finding profit percentage', memoryTrick: 'Profit by CP times 100', difficulty: 'Easy' },
    { id: 'F046', category: 'Profit & Loss', formula: 'SP = CP × (100+Profit%)/100', variables: 'SP = Selling Price, CP = Cost Price', whenToUse: 'Finding SP from CP and profit%', memoryTrick: 'Add profit% to 100', difficulty: 'Easy' },

    // SIMPLE INTEREST
    { id: 'F047', category: 'Interest', formula: 'SI = (P × R × T)/100', variables: 'P = Principal, R = Rate, T = Time', whenToUse: 'Simple interest calculation', memoryTrick: 'PRT by 100', difficulty: 'Easy' },
    { id: 'F048', category: 'Interest', formula: 'CI = P[(1+R/100)^T - 1]', variables: 'P = Principal, R = Rate, T = Time', whenToUse: 'Compound interest', memoryTrick: 'Principal times compound factor minus 1', difficulty: 'Medium' },

    // TIME & WORK
    { id: 'F049', category: 'Time & Work', formula: 'Work = Rate × Time', variables: 'Rate = efficiency, Time = duration', whenToUse: 'Basic work problems', memoryTrick: 'Like Distance = Speed × Time', difficulty: 'Easy' },
    { id: 'F050', category: 'Time & Work', formula: '1/A + 1/B = 1/T', variables: 'A, B = individual times, T = combined time', whenToUse: 'Combined work', memoryTrick: 'Add reciprocals', difficulty: 'Medium' },

    // SPEED & DISTANCE
    { id: 'F051', category: 'Speed & Distance', formula: 'Speed = Distance/Time', variables: 'Distance, Time', whenToUse: 'Basic speed problems', memoryTrick: 'Distance by time', difficulty: 'Easy' },
    { id: 'F052', category: 'Speed & Distance', formula: 'Average Speed = Total Distance/Total Time', variables: 'Total distance, Total time', whenToUse: 'Multiple journeys', memoryTrick: 'NOT average of speeds', difficulty: 'Medium' },

    // SIMPLIFICATION
    { id: 'F053', category: 'Simplification', formula: 'BODMAS: Brackets, Of, Division, Multiplication, Addition, Subtraction', variables: 'Order of operations', whenToUse: 'All simplification problems', memoryTrick: 'Please Excuse My Dear Aunt Sally', difficulty: 'Easy' },
    { id: 'F054', category: 'Simplification', formula: '√(a²) = |a|', variables: 'a = any number', whenToUse: 'Square root simplification', memoryTrick: 'Square root of square is absolute value', difficulty: 'Easy' },
    { id: 'F055', category: 'Simplification', formula: 'a^m × a^n = a^(m+n)', variables: 'a = base, m,n = exponents', whenToUse: 'Multiplying same bases', memoryTrick: 'Same base, add powers', difficulty: 'Easy' },
    { id: 'F056', category: 'Simplification', formula: 'a^m ÷ a^n = a^(m-n)', variables: 'a = base, m,n = exponents', whenToUse: 'Dividing same bases', memoryTrick: 'Same base, subtract powers', difficulty: 'Easy' },
    { id: 'F057', category: 'Simplification', formula: '(a^m)^n = a^(mn)', variables: 'a = base, m,n = exponents', whenToUse: 'Power of a power', memoryTrick: 'Power of power, multiply', difficulty: 'Easy' },

    // AVERAGE
    { id: 'F058', category: 'Average', formula: 'Average = Sum of observations / Number of observations', variables: 'Sum, Count', whenToUse: 'Basic average problems', memoryTrick: 'Total divided by count', difficulty: 'Easy' },
    { id: 'F059', category: 'Average', formula: 'Sum = Average × Number', variables: 'Average, Count', whenToUse: 'Finding total from average', memoryTrick: 'Reverse of average formula', difficulty: 'Easy' },
    { id: 'F060', category: 'Average', formula: 'New Average = (Old Sum + New Value) / (n+1)', variables: 'n = original count', whenToUse: 'When new value added', memoryTrick: 'Add to sum, increase count', difficulty: 'Medium' },
    { id: 'F061', category: 'Average', formula: 'Weighted Average = (w₁×a₁ + w₂×a₂) / (w₁+w₂)', variables: 'w = weights, a = values', whenToUse: 'Different weights/quantities', memoryTrick: 'Weight times value, divide by total weight', difficulty: 'Medium' },
    { id: 'F062', category: 'Average', formula: 'Average of first n natural numbers = (n+1)/2', variables: 'n = count', whenToUse: 'Natural number series', memoryTrick: 'Half of (n+1)', difficulty: 'Easy' },

    // MIXTURE & ALLIGATION
    { id: 'F063', category: 'Mixture & Alligation', formula: 'Alligation: (Cheaper quantity)/(Dearer quantity) = (Dearer price - Mean)/(Mean - Cheaper price)', variables: 'Prices and mean price', whenToUse: 'Two items mixed at mean price', memoryTrick: 'Cross difference method', difficulty: 'Medium' },
    { id: 'F064', category: 'Mixture & Alligation', formula: 'Final concentration = (Quantity₁×C₁ + Quantity₂×C₂)/(Quantity₁ + Quantity₂)', variables: 'Q = quantities, C = concentrations', whenToUse: 'Mixing two solutions', memoryTrick: 'Weighted average of concentrations', difficulty: 'Medium' },
    { id: 'F065', category: 'Mixture & Alligation', formula: 'After n replacements: Final = Initial × (1 - R/T)^n', variables: 'R = replaced, T = total, n = times', whenToUse: 'Successive replacement', memoryTrick: 'Compound formula for replacement', difficulty: 'Hard' },
    { id: 'F066', category: 'Mixture & Alligation', formula: 'Ratio of mixtures = (d - m)/(m - c)', variables: 'd = dearer, c = cheaper, m = mean', whenToUse: 'Alligation rule application', memoryTrick: 'Dearer minus mean over mean minus cheaper', difficulty: 'Medium' },

    // PERMUTATION & COMBINATION
    { id: 'F067', category: 'Permutation & Combination', formula: 'n! = n × (n-1) × (n-2) × ... × 2 × 1', variables: 'n = positive integer', whenToUse: 'Factorial calculation', memoryTrick: 'Multiply all numbers down to 1', difficulty: 'Easy' },
    { id: 'F068', category: 'Permutation & Combination', formula: 'nPr = n!/(n-r)!', variables: 'n = total, r = selected', whenToUse: 'Arrangements (order matters)', memoryTrick: 'P for Position matters', difficulty: 'Medium' },
    { id: 'F069', category: 'Permutation & Combination', formula: 'nCr = n!/[r!(n-r)!]', variables: 'n = total, r = selected', whenToUse: 'Selections (order doesn\'t matter)', memoryTrick: 'C for Choice, order doesn\'t matter', difficulty: 'Medium' },
    { id: 'F070', category: 'Permutation & Combination', formula: 'nCr = nC(n-r)', variables: 'n = total, r = selected', whenToUse: 'Simplifying combinations', memoryTrick: 'Selecting r is same as leaving (n-r)', difficulty: 'Easy' },
    { id: 'F071', category: 'Permutation & Combination', formula: 'Circular Permutation = (n-1)!', variables: 'n = objects', whenToUse: 'Arranging in circle', memoryTrick: 'Fix one, arrange rest', difficulty: 'Medium' },
    { id: 'F072', category: 'Permutation & Combination', formula: 'nC0 + nC1 + nC2 + ... + nCn = 2^n', variables: 'n = total objects', whenToUse: 'Sum of all combinations', memoryTrick: 'Total subsets = 2^n', difficulty: 'Hard' },

    // PROBABILITY
    { id: 'F073', category: 'Probability', formula: 'P(E) = Number of favorable outcomes / Total outcomes', variables: 'E = event', whenToUse: 'Basic probability', memoryTrick: 'Favorable by total', difficulty: 'Easy' },
    { id: 'F074', category: 'Probability', formula: 'P(not E) = 1 - P(E)', variables: 'E = event', whenToUse: 'Complementary probability', memoryTrick: 'Probability of opposite', difficulty: 'Easy' },
    { id: 'F075', category: 'Probability', formula: 'P(A or B) = P(A) + P(B) - P(A and B)', variables: 'A, B = events', whenToUse: 'Either event occurs', memoryTrick: 'Add then subtract overlap', difficulty: 'Medium' },
    { id: 'F076', category: 'Probability', formula: 'P(A and B) = P(A) × P(B)', variables: 'A, B = independent events', whenToUse: 'Both events occur (independent)', memoryTrick: 'Multiply for AND', difficulty: 'Medium' },
    { id: 'F077', category: 'Probability', formula: 'P(A|B) = P(A and B) / P(B)', variables: 'A|B = A given B', whenToUse: 'Conditional probability', memoryTrick: 'Intersection by condition', difficulty: 'Hard' },
    { id: 'F078', category: 'Probability', formula: '0 ≤ P(E) ≤ 1', variables: 'E = any event', whenToUse: 'Checking validity', memoryTrick: 'Probability always between 0 and 1', difficulty: 'Easy' }
];

export const practiceQuestions = [
    // TRIANGLES - Easy
    { id: 'Q001', module: 'M01', topic: 'Triangles', difficulty: 'Easy', question: 'In △ABC, ∠A = 50° and ∠B = 60°. Find ∠C.', options: ['60°', '70°', '80°', '90°'], correctAnswer: '70°', explanation: 'Sum of angles in triangle = 180°. So ∠C = 180° - 50° - 60° = 70°', formulaUsed: 'A + B + C = 180°', timeEstimate: 30 },
    { id: 'Q002', module: 'M01', topic: 'Pythagoras', difficulty: 'Easy', question: 'The sides of a triangle are 3 cm, 4 cm, and 5 cm. Is it a right triangle?', options: ['Yes', 'No', 'Cannot determine', 'Need more information'], correctAnswer: 'Yes', explanation: '3² + 4² = 9 + 16 = 25 = 5². This satisfies Pythagoras theorem.', formulaUsed: 'a² + b² = c²', timeEstimate: 45 },
    { id: 'Q003', module: 'M01', topic: 'Triangles', difficulty: 'Easy', question: 'If two angles of a triangle are 45° each, find the third angle.', options: ['45°', '60°', '90°', '120°'], correctAnswer: '90°', explanation: '180° - 45° - 45° = 90°', formulaUsed: 'Sum of angles = 180°', timeEstimate: 25 },
    { id: 'Q004', module: 'M01', topic: 'Triangles', difficulty: 'Easy', question: 'Find the perimeter of a triangle with sides 7 cm, 8 cm, and 9 cm.', options: ['20 cm', '22 cm', '24 cm', '26 cm'], correctAnswer: '24 cm', explanation: 'Perimeter = 7 + 8 + 9 = 24 cm', formulaUsed: 'P = a + b + c', timeEstimate: 20 },

    // TRIANGLES - Medium
    { id: 'Q005', module: 'M01', topic: 'Triangles', difficulty: 'Medium', question: 'Find the area of a triangle with sides 5 cm, 6 cm, and 7 cm using Heron\'s formula.', options: ['6√6 cm²', '12√6 cm²', '6√3 cm²', '12√3 cm²'], correctAnswer: '6√6 cm²', explanation: 's = 9, Area = √[9×4×3×2] = √216 = 6√6 cm²', formulaUsed: 'Heron\'s formula', timeEstimate: 90 },
    { id: 'Q006', module: 'M01', topic: 'Pythagoras', difficulty: 'Medium', question: 'In △ABC, AB = 8 cm, BC = 6 cm, and ∠B = 90°. Find AC.', options: ['8 cm', '10 cm', '12 cm', '14 cm'], correctAnswer: '10 cm', explanation: 'AC = √(64 + 36) = √100 = 10 cm', formulaUsed: 'Pythagoras theorem', timeEstimate: 60 },

    // CIRCLES
    { id: 'Q007', module: 'M04', topic: 'Circles', difficulty: 'Easy', question: 'Find the circumference of a circle with radius 7 cm. (Use π = 22/7)', options: ['22 cm', '44 cm', '66 cm', '88 cm'], correctAnswer: '44 cm', explanation: 'Circumference = 2πr = 2 × (22/7) × 7 = 44 cm', formulaUsed: 'C = 2πr', timeEstimate: 40 },
    { id: 'Q008', module: 'M04', topic: 'Circles', difficulty: 'Medium', question: 'Find the area of a circle with radius 7 cm. (Use π = 22/7)', options: ['144 cm²', '154 cm²', '164 cm²', '174 cm²'], correctAnswer: '154 cm²', explanation: 'Area = πr² = (22/7) × 7 × 7 = 154 cm²', formulaUsed: 'Area = πr²', timeEstimate: 60 },
    { id: 'Q009', module: 'M04', topic: 'Circles', difficulty: 'Medium', question: 'Find the area of a sector with radius 14 cm and angle 90°. (Use π = 22/7)', options: ['77 cm²', '154 cm²', '231 cm²', '308 cm²'], correctAnswer: '154 cm²', explanation: 'Sector area = (90/360) × π × 14² = (1/4) × (22/7) × 196 = 154 cm²', formulaUsed: 'Sector area = (θ/360) × πr²', timeEstimate: 90 },

    // 3D MENSURATION
    { id: 'Q010', module: 'M07', topic: '3D Mensuration', difficulty: 'Easy', question: 'Find the volume of a cube with edge 5 cm.', options: ['100 cm³', '125 cm³', '150 cm³', '175 cm³'], correctAnswer: '125 cm³', explanation: 'Volume of cube = a³ = 5³ = 125 cm³', formulaUsed: 'V = a³', timeEstimate: 30 },
    { id: 'Q011', module: 'M07', topic: '3D Mensuration', difficulty: 'Easy', question: 'Find the surface area of a cube with edge 4 cm.', options: ['64 cm²', '80 cm²', '96 cm²', '112 cm²'], correctAnswer: '96 cm²', explanation: 'Surface area = 6a² = 6 × 16 = 96 cm²', formulaUsed: 'SA = 6a²', timeEstimate: 35 },
    { id: 'Q012', module: 'M07', topic: '3D Mensuration', difficulty: 'Medium', question: 'Find the volume of a cylinder with radius 7 cm and height 10 cm. (Use π = 22/7)', options: ['1540 cm³', '1640 cm³', '1740 cm³', '1840 cm³'], correctAnswer: '1540 cm³', explanation: 'Volume = πr²h = (22/7) × 49 × 10 = 1540 cm³', formulaUsed: 'V = πr²h', timeEstimate: 75 },
    { id: 'Q013', module: 'M07', topic: '3D Mensuration', difficulty: 'Medium', question: 'Find the volume of a sphere with radius 3 cm. (Use π = 22/7)', options: ['113.14 cm³', '123.14 cm³', '133.14 cm³', '143.14 cm³'], correctAnswer: '113.14 cm³', explanation: 'Volume = (4/3)πr³ = (4/3) × (22/7) × 27 ≈ 113.14 cm³', formulaUsed: 'V = 4/3 πr³', timeEstimate: 90 },

    // ALGEBRA
    { id: 'Q014', module: 'M08', topic: 'Algebra', difficulty: 'Easy', question: 'Expand: (x + 5)²', options: ['x² + 10x + 25', 'x² + 5x + 25', 'x² + 10x + 10', 'x² + 25'], correctAnswer: 'x² + 10x + 25', explanation: '(x + 5)² = x² + 2(x)(5) + 5² = x² + 10x + 25', formulaUsed: '(a+b)² = a² + 2ab + b²', timeEstimate: 40 },
    { id: 'Q015', module: 'M08', topic: 'Algebra', difficulty: 'Easy', question: 'Factorize: x² - 16', options: ['(x+4)(x-4)', '(x+8)(x-2)', '(x+2)(x-8)', '(x-4)²'], correctAnswer: '(x+4)(x-4)', explanation: 'x² - 16 = x² - 4² = (x+4)(x-4)', formulaUsed: 'a² - b² = (a+b)(a-b)', timeEstimate: 35 },
    { id: 'Q016', module: 'M08', topic: 'Algebra', difficulty: 'Medium', question: 'If x + 1/x = 5, find x² + 1/x²', options: ['21', '23', '25', '27'], correctAnswer: '23', explanation: '(x + 1/x)² = x² + 1/x² + 2. So x² + 1/x² = 25 - 2 = 23', formulaUsed: 'x² + 1/x² = (x + 1/x)² - 2', timeEstimate: 90 },
    { id: 'Q017', module: 'M08', topic: 'Algebra', difficulty: 'Medium', question: 'If x - 1/x = 4, find x² + 1/x²', options: ['16', '18', '20', '22'], correctAnswer: '18', explanation: '(x - 1/x)² = x² + 1/x² - 2. So x² + 1/x² = 16 + 2 = 18', formulaUsed: 'x² + 1/x² = (x - 1/x)² + 2', timeEstimate: 90 },

    // TRIGONOMETRY
    { id: 'Q018', module: 'M09', topic: 'Trigonometry', difficulty: 'Easy', question: 'Find sin 30°', options: ['0', '1/2', '1/√2', '√3/2'], correctAnswer: '1/2', explanation: 'sin 30° = 1/2 (standard angle value)', formulaUsed: 'Standard angles table', timeEstimate: 20 },
    { id: 'Q019', module: 'M09', topic: 'Trigonometry', difficulty: 'Easy', question: 'Find cos 60°', options: ['0', '1/2', '1/√2', '√3/2'], correctAnswer: '1/2', explanation: 'cos 60° = 1/2 (standard angle value)', formulaUsed: 'Standard angles table', timeEstimate: 20 },
    { id: 'Q020', module: 'M09', topic: 'Trigonometry', difficulty: 'Easy', question: 'Find tan 45°', options: ['0', '1', '√3', '1/√3'], correctAnswer: '1', explanation: 'tan 45° = 1 (standard angle value)', formulaUsed: 'Standard angles table', timeEstimate: 20 },
    { id: 'Q021', module: 'M09', topic: 'Trigonometry', difficulty: 'Medium', question: 'If sin θ = 3/5, find cos θ (θ is acute)', options: ['3/5', '4/5', '5/3', '5/4'], correctAnswer: '4/5', explanation: 'sin²θ + cos²θ = 1, so cos²θ = 1 - 9/25 = 16/25, cos θ = 4/5', formulaUsed: 'sin²θ + cos²θ = 1', timeEstimate: 75 },
    { id: 'Q022', module: 'M09', topic: 'Trigonometry', difficulty: 'Medium', question: 'Find the value of sin²30° + cos²30°', options: ['0', '1/2', '1', '2'], correctAnswer: '1', explanation: 'sin²θ + cos²θ = 1 for any angle θ', formulaUsed: 'Fundamental identity', timeEstimate: 40 },

    // COORDINATE GEOMETRY
    { id: 'Q023', module: 'M05', topic: 'Coordinate Geometry', difficulty: 'Medium', question: 'Find the distance between points (3, 4) and (0, 0).', options: ['3', '4', '5', '7'], correctAnswer: '5', explanation: 'Distance = √[(3-0)² + (4-0)²] = √(9+16) = √25 = 5', formulaUsed: 'Distance formula', timeEstimate: 60 },
    { id: 'Q024', module: 'M05', topic: 'Coordinate Geometry', difficulty: 'Easy', question: 'Find the midpoint of (2, 4) and (6, 8).', options: ['(4, 6)', '(4, 8)', '(6, 4)', '(8, 6)'], correctAnswer: '(4, 6)', explanation: 'Midpoint = ((2+6)/2, (4+8)/2) = (4, 6)', formulaUsed: 'Midpoint formula', timeEstimate: 45 },

    // QUADRILATERALS
    { id: 'Q025', module: 'M03', topic: 'Quadrilaterals', difficulty: 'Easy', question: 'Find the area of a rectangle with length 12 cm and breadth 8 cm.', options: ['80 cm²', '90 cm²', '96 cm²', '100 cm²'], correctAnswer: '96 cm²', explanation: 'Area = l × b = 12 × 8 = 96 cm²', formulaUsed: 'Area = l × b', timeEstimate: 25 },
    { id: 'Q026', module: 'M03', topic: 'Quadrilaterals', difficulty: 'Easy', question: 'Find the area of a square with side 9 cm.', options: ['72 cm²', '81 cm²', '90 cm²', '99 cm²'], correctAnswer: '81 cm²', explanation: 'Area = a² = 9² = 81 cm²', formulaUsed: 'Area = a²', timeEstimate: 20 },
    { id: 'Q027', module: 'M03', topic: 'Quadrilaterals', difficulty: 'Medium', question: 'Find the area of a rhombus with diagonals 10 cm and 12 cm.', options: ['50 cm²', '60 cm²', '70 cm²', '80 cm²'], correctAnswer: '60 cm²', explanation: 'Area = ½ × d₁ × d₂ = ½ × 10 × 12 = 60 cm²', formulaUsed: 'Area = ½ × d₁ × d₂', timeEstimate: 50 },
    { id: 'Q028', module: 'M03', topic: 'Quadrilaterals', difficulty: 'Medium', question: 'Find the area of a trapezium with parallel sides 8 cm and 12 cm, and height 5 cm.', options: ['40 cm²', '50 cm²', '60 cm²', '70 cm²'], correctAnswer: '50 cm²', explanation: 'Area = ½(a+b) × h = ½(8+12) × 5 = ½ × 20 × 5 = 50 cm²', formulaUsed: 'Area = ½(a+b) × h', timeEstimate: 65 },

    // HARD QUESTIONS
    { id: 'Q029', module: 'M02', topic: 'Triangle Centers', difficulty: 'Hard', question: 'In △ABC, if the centroid divides median AD in ratio 2:1, and AD = 12 cm, find AG (where G is centroid).', options: ['4 cm', '6 cm', '8 cm', '10 cm'], correctAnswer: '8 cm', explanation: 'Centroid divides median in 2:1 from vertex. AG:GD = 2:1, so AG = (2/3) × 12 = 8 cm', formulaUsed: 'Centroid property', timeEstimate: 120 },
    { id: 'Q030', module: 'M09', topic: 'Trigonometry', difficulty: 'Hard', question: 'Find maximum value of 3 sin θ + 4 cos θ', options: ['3', '4', '5', '7'], correctAnswer: '5', explanation: 'Maximum value = √(a² + b²) = √(9 + 16) = √25 = 5', formulaUsed: 'Max of a sinθ + b cosθ = √(a²+b²)', timeEstimate: 100 },

    // NUMBER SYSTEM
    { id: 'Q031', module: 'M10', topic: 'Number System', difficulty: 'Easy', question: 'Find the HCF of 12 and 18.', options: ['2', '3', '6', '9'], correctAnswer: '6', explanation: 'Factors of 12: 1,2,3,4,6,12. Factors of 18: 1,2,3,6,9,18. HCF = 6', formulaUsed: 'Prime factorization', timeEstimate: 50 },
    { id: 'Q032', module: 'M10', topic: 'Number System', difficulty: 'Easy', question: 'Find the LCM of 4 and 6.', options: ['8', '10', '12', '24'], correctAnswer: '12', explanation: 'Multiples of 4: 4,8,12,16... Multiples of 6: 6,12,18... LCM = 12', formulaUsed: 'Common multiples', timeEstimate: 50 },

    // PERCENTAGE
    { id: 'Q033', module: 'M11', topic: 'Percentage', difficulty: 'Easy', question: 'Convert 3/4 to percentage.', options: ['60%', '70%', '75%', '80%'], correctAnswer: '75%', explanation: '(3/4) × 100 = 0.75 × 100 = 75%', formulaUsed: 'Percentage = (Part/Whole) × 100', timeEstimate: 30 },
    { id: 'Q034', module: 'M11', topic: 'Percentage', difficulty: 'Medium', question: 'If a number is increased by 20%, what is the new value if original was 50?', options: ['55', '60', '65', '70'], correctAnswer: '60', explanation: 'Increase = 20% of 50 = 10. New value = 50 + 10 = 60', formulaUsed: 'New = Old + (Old × %/100)', timeEstimate: 60 },

    // PROFIT & LOSS
    { id: 'Q035', module: 'M12', topic: 'Profit & Loss', difficulty: 'Easy', question: 'If CP = ₹100 and SP = ₹120, find profit%.', options: ['10%', '15%', '20%', '25%'], correctAnswer: '20%', explanation: 'Profit = 120-100 = 20. Profit% = (20/100) × 100 = 20%', formulaUsed: 'Profit% = (Profit/CP) × 100', timeEstimate: 45 },
    { id: 'Q036', module: 'M12', topic: 'Profit & Loss', difficulty: 'Medium', question: 'A shopkeeper marks price 25% above CP and gives 10% discount. Find profit%.', options: ['10%', '12.5%', '15%', '17.5%'], correctAnswer: '12.5%', explanation: 'Let CP = 100. MP = 125. SP = 125 - 12.5 = 112.5. Profit% = 12.5%', formulaUsed: 'SP = MP × (100-D%)/100', timeEstimate: 90 },

    // SIMPLE INTEREST
    { id: 'Q037', module: 'M13', topic: 'Simple Interest', difficulty: 'Easy', question: 'Find SI on ₹1000 at 10% per annum for 2 years.', options: ['₹100', '₹150', '₹200', '₹250'], correctAnswer: '₹200', explanation: 'SI = (1000 × 10 × 2)/100 = 200', formulaUsed: 'SI = (P × R × T)/100', timeEstimate: 50 },
    { id: 'Q038', module: 'M13', topic: 'Compound Interest', difficulty: 'Medium', question: 'Find CI on ₹1000 at 10% per annum for 2 years.', options: ['₹200', '₹210', '₹220', '₹230'], correctAnswer: '₹210', explanation: 'Amount = 1000(1.1)² = 1210. CI = 1210-1000 = 210', formulaUsed: 'CI = P[(1+R/100)^T - 1]', timeEstimate: 80 },

    // TIME & WORK
    { id: 'Q039', module: 'M14', topic: 'Time & Work', difficulty: 'Easy', question: 'A can do a work in 10 days. In how many days can he complete 1/2 of the work?', options: ['3 days', '4 days', '5 days', '6 days'], correctAnswer: '5 days', explanation: 'If full work in 10 days, half work in 10/2 = 5 days', formulaUsed: 'Work = Rate × Time', timeEstimate: 40 },
    { id: 'Q040', module: 'M14', topic: 'Time & Work', difficulty: 'Medium', question: 'A can do work in 10 days, B in 15 days. Together in how many days?', options: ['5 days', '6 days', '7 days', '8 days'], correctAnswer: '6 days', explanation: '1/10 + 1/15 = 1/T. T = 6 days', formulaUsed: '1/A + 1/B = 1/T', timeEstimate: 75 },

    // SPEED & DISTANCE
    { id: 'Q041', module: 'M15', topic: 'Speed & Distance', difficulty: 'Easy', question: 'A car travels 100 km in 2 hours. Find its speed.', options: ['40 km/h', '45 km/h', '50 km/h', '55 km/h'], correctAnswer: '50 km/h', explanation: 'Speed = Distance/Time = 100/2 = 50 km/h', formulaUsed: 'Speed = Distance/Time', timeEstimate: 30 },
    { id: 'Q042', module: 'M15', topic: 'Speed & Distance', difficulty: 'Medium', question: 'A train 100m long crosses a pole in 10 seconds. Find its speed in m/s.', options: ['5 m/s', '8 m/s', '10 m/s', '12 m/s'], correctAnswer: '10 m/s', explanation: 'Speed = Distance/Time = 100/10 = 10 m/s', formulaUsed: 'Speed = Distance/Time', timeEstimate: 60 },
];
