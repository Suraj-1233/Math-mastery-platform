const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../../extracted_questions.json');
const outputPath = '/tmp/extracted_questions_clean.json';

console.log('Reading data...');
const rawData = fs.readFileSync(inputPath, 'utf8');
const questions = JSON.parse(rawData);

console.log(`Processing ${questions.length} questions...`);

let newQuestions = [];
let idCounter = 1;

// Common question starters to split merged text
const splitRegex = /(?=\b(?:If a|If the|Which of|Find the|A \d+-digit|The \d+-digit|What is|Let x|When \d+|Two numbers|A number|An integer)\b)/g;

function extractOptions(text) {
    // Try to find options like (a) ..., (b) ..., (c) ..., (d) ...
    const optionRegex = /\(\s*[a-d]\s*\)\s*([^()]+?)(?=\(\s*[a-d]\s*\)|$)/gi;
    let options = [];
    let match;
    let cleanText = text;

    // Check if options actually exist
    if (text.match(/\(\s*[a-d]\s*\)/i)) {
        while ((match = optionRegex.exec(text)) !== null) {
            options.push(match[1].trim());
        }
        cleanText = text.replace(optionRegex, '').trim();
    }

    // Also remove generic exam tags like {CGL 2022 Pre}
    cleanText = cleanText.replace(/\{[^}]+\}/g, '').trim();
    cleanText = cleanText.replace(/\([^)]*CGL[^)]*\)/gi, '').trim();
    cleanText = cleanText.replace(/\([^)]*CHSL[^)]*\)/gi, '').trim();

    return { cleanText, options };
}

function formatToMarkdown(text, topic) {
    // Add professional markdown formatting
    let md = `### **Problem Description**\n${text}\n\n`;

    // Extract given data (numbers, equations)
    const numbers = text.match(/\b\d+(?:\.\d+)?\b/g);
    if (numbers && numbers.length > 0) {
        md += `**Given Data:**\n`;
        md += `* Key values: **${[...new Set(numbers)].join(', ')}**\n\n`;
    }

    md += `**Topic:** ${topic}\n`;
    return md;
}

questions.forEach(q => {
    // If text is unusually long, it might be clustered
    if (q.question_text.length > 300 && !q.question_text.includes('Table Based') && !q.question_text.includes('Pie-Chart')) {
        // Attempt to split clustered questions
        const parts = q.question_text.split(splitRegex).filter(p => p.trim().length > 20);

        if (parts.length > 1) {
            parts.forEach(part => {
                const { cleanText, options } = extractOptions(part.trim());
                newQuestions.push({
                    id: `Q_${idCounter.toString().padStart(4, '0')}`,
                    question_text: formatToMarkdown(cleanText, q.topic),
                    options: options.length > 0 ? options : q.options,
                    answer: q.answer,
                    exam: q.exam,
                    year: q.year,
                    page: q.page,
                    difficulty: q.difficulty,
                    topic: q.topic
                });
                idCounter++;
            });
        } else {
            const { cleanText, options } = extractOptions(q.question_text);
            newQuestions.push({
                ...q,
                id: `Q_${idCounter.toString().padStart(4, '0')}`,
                question_text: formatToMarkdown(cleanText, q.topic),
                options: options.length > 0 ? options : q.options
            });
            idCounter++;
        }
    } else {
        const { cleanText, options } = extractOptions(q.question_text);
        newQuestions.push({
            ...q,
            id: `Q_${idCounter.toString().padStart(4, '0')}`,
            question_text: formatToMarkdown(cleanText, q.topic),
            options: options.length > 0 ? options : q.options
        });
        idCounter++;
    }
});

console.log(`Generated ${newQuestions.length} cleaned questions!`);
fs.writeFileSync(outputPath, JSON.stringify(newQuestions, null, 2));
console.log('Saved to extracted_questions_clean.json');
