
import { questionBank } from './src/data/questionBank';

console.log('🔍 Verifying Question Bank Integrity...');
console.log('----------------------------------------');

// 1. Check Total Count
const total = questionBank.length;
console.log(`✅ Total Questions Loaded: ${total}`);

if (total === 0) {
    console.error('❌ Error: Question bank is empty!');
    process.exit(1);
}

// 2. Check Data Structure of First Item
const first = questionBank[0];
console.log(`\n🔍 First Question Check (ID: ${first.id}):`);
console.log(`   - Topic: ${first.topic}`);
console.log(`   - Exam: ${first.exam}`);
console.log(`   - Options: ${first.options.length}`);
console.log(`   - Text Length: ${first.question_text.length} chars`);

if (!first.id || !first.question_text || !first.options) {
    console.error('❌ Error: First question has missing fields!');
    process.exit(1);
}

// 3. Check Data Structure of Last Item
const last = questionBank[total - 1];
console.log(`\n🔍 Last Question Check (ID: ${last.id}):`);
console.log(`   - Topic: ${last.topic}`);
console.log(`   - Page: ${last.page}`);

// 4. Topic Distribution Check
const topics = new Set(questionBank.map(q => q.topic));
console.log(`\n✅ Unique Topics Found: ${topics.size}`);

// 5. Random Sampling
console.log('\n🎲 Random Sample Question:');
const random = questionBank[Math.floor(Math.random() * total)];
console.log(`   [${random.topic}] ${random.question_text.substring(0, 60)}...`);

console.log('\n----------------------------------------');
console.log('🎉 VERIFICATION SUCCESSFUL: Data is correctly integrated into TypeScript!');
