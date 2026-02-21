
'use client';

import { Share2, Download } from 'lucide-react';
import { useToast } from '@/contexts/ToastContext';

interface ShareReportButtonProps {
    userName: string;
    score: number;
    maxScore: number;
    testTitle: string;
    accuracy: string;
    testId: string;
}

export function ShareReportButton({ userName, score, maxScore, testTitle, accuracy, testId }: ShareReportButtonProps) {
    const { showToast } = useToast();

    const handleShare = () => {
        const reportUrl = window.location.href;
        const testUrl = `${window.location.origin}/tests/${testId}`;
        const text = `🏆 ${userName} scored ${score}/${maxScore} (${accuracy}% Accuracy) in "${testTitle}" on Math Mastery! 🚀\n\n📊 My Full Report: ${reportUrl}\n\n🎯 Challenge yourself here: ${testUrl}`;

        if (navigator.share) {
            navigator.share({
                title: 'Math Mastery Test Report',
                text: text,
            }).catch(() => { });
        } else {
            navigator.clipboard.writeText(text);
            showToast('Score and links copied to clipboard!', 'success');
        }
    };

    const handleDownload = () => {
        showToast('Generating Premium Certificate...', 'info');

        setTimeout(() => {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = 1600;
                canvas.height = 900;
                const ctx = canvas.getContext('2d');
                if (!ctx) return;

                // 1. Premium Dark Background
                const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
                gradient.addColorStop(0, '#020617'); // slate-950
                gradient.addColorStop(1, '#0f172a'); // slate-900
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // 2. Subtle Glow Effect in the Center
                const glow = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, 700);
                glow.addColorStop(0, 'rgba(56, 189, 248, 0.15)'); // sky-400
                glow.addColorStop(1, 'rgba(2, 6, 23, 0)');
                ctx.fillStyle = glow;
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // 3. Elegant Nested Borders
                ctx.strokeStyle = '#38bdf8'; // sky-400 primary accent
                ctx.lineWidth = 4;
                ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

                ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
                ctx.lineWidth = 1;
                ctx.strokeRect(65, 65, canvas.width - 130, canvas.height - 130);

                // 4. Background Watermark Lettermak
                ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
                ctx.font = '900 180px system-ui, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('MATH MASTERY', canvas.width / 2, canvas.height / 2);
                ctx.textBaseline = 'alphabetic'; // reset

                // 5. Header / Category
                ctx.fillStyle = '#38bdf8'; // sky-400
                ctx.font = '600 25px system-ui, sans-serif';
                // Fake letter spacing with spaces
                ctx.fillText('P E R F O R M A N C E   C E R T I F I C A T E', canvas.width / 2, 180);

                // 6. Main Test Title
                ctx.fillStyle = '#ffffff';
                ctx.font = '900 70px system-ui, sans-serif';
                ctx.fillText(`"${testTitle}"`, canvas.width / 2, 300);

                // 7. Presented To
                ctx.fillStyle = '#94a3b8'; // slate-400
                ctx.font = '400 35px system-ui, sans-serif';
                ctx.fillText('proudly presented to', canvas.width / 2, 410);

                // 8. User Name
                ctx.fillStyle = '#ffffff';
                ctx.font = '800 80px system-ui, sans-serif';
                ctx.fillText(userName, canvas.width / 2, 510);

                // Divider Under Name
                ctx.beginPath();
                ctx.moveTo(canvas.width / 2 - 150, 560);
                ctx.lineTo(canvas.width / 2 + 150, 560);
                ctx.strokeStyle = '#38bdf8';
                ctx.lineWidth = 3;
                ctx.stroke();

                // 9. Score Metrics Box & Text
                ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
                ctx.fillRect(canvas.width / 2 - 350, 620, 700, 100);

                // Score inside box
                ctx.font = 'bold 35px system-ui, sans-serif';
                ctx.fillStyle = '#4ade80'; // green-400
                ctx.textAlign = 'right';
                // Use a non-fractional approximation if needed, but toFixed(1) is fine here
                ctx.fillText(`SCORE: ${score.toFixed(1)} / ${maxScore}`, canvas.width / 2 - 40, 680);

                // Accuracy inside box
                ctx.fillStyle = '#fbbf24'; // amber-400
                ctx.textAlign = 'left';
                ctx.fillText(`ACCURACY: ${accuracy}%`, canvas.width / 2 + 40, 680);

                // Divider inside box
                ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
                ctx.fillRect(canvas.width / 2 - 2, 640, 4, 60);

                // 10. Footer Website URL (The call to action)
                ctx.textAlign = 'center';
                const platformUrl = window.location.host;
                ctx.fillStyle = '#94a3b8';
                ctx.font = '400 30px system-ui, sans-serif';
                ctx.fillText('Take the challenge yourself & track your progress at:', canvas.width / 2, 790);

                ctx.fillStyle = '#38bdf8';
                ctx.font = 'bold 35px system-ui, sans-serif';
                ctx.fillText(`👉 ${platformUrl} 🚀`, canvas.width / 2, 840);

                // 11. Trigger Download
                const dataUrl = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.download = `Math_Mastery_Certificate_${userName.replace(/\s+/g, '_')}.png`;
                link.href = dataUrl;
                link.click();

                showToast('Certificate downloaded successfully!', 'success');

            } catch (error) {
                console.error(error);
                showToast('Failed to generate certificate', 'error');
            }
        }, 500); // Give toast time to appear
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4">
            <button
                onClick={handleShare}
                className="btn btn-secondary flex items-center gap-2 shadow-lg hover:ring-2 hover:ring-secondary/50 transition-all rounded-full px-8 py-4 text-lg"
            >
                <Share2 className="w-5 h-5" />
                Share Your Success
            </button>
            <button
                onClick={handleDownload}
                className="btn btn-outline border-primary text-primary flex items-center gap-2 shadow-lg hover:bg-primary-light transition-all rounded-full px-8 py-4 text-lg"
            >
                <Download className="w-5 h-5" />
                Download Certificate
            </button>
        </div>
    );
}
