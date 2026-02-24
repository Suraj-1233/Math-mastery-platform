
/**
 * Email Service for Math Mastery Platform
 * In production, you would use Resend, Amazon SES, or SendGrid.
 * For now, this logs to the console for development.
 */

const domain = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:4000";

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `${domain}/reset-password?token=${token}`;

    // --- LOG TO CONSOLE FOR DEVELOPMENT ---
    console.log("-----------------------------------------");
    console.log("📧 TRANSACTIONAL EMAIL (MOCK)");
    console.log(`TO: ${email}`);
    console.log(`SUBJECT: Reset your password`);
    console.log(`BODY: Click here to reset: ${resetLink}`);
    console.log("-----------------------------------------");

    // In production, uncomment and configure:
    /*
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Math Mastery <onboarding@resend.dev>",
      to: email,
      subject: "Reset your password",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
    });
    */

    return { success: true };
};

export const sendWelcomeEmail = async (email: string, name: string) => {
    console.log("-----------------------------------------");
    console.log("📧 TRANSACTIONAL EMAIL (MOCK)");
    console.log(`TO: ${email}`);
    console.log(`SUBJECT: Welcome to Math Mastery!`);
    console.log(`BODY: Hi ${name}, welcome to the platform!`);
    console.log("-----------------------------------------");
    return { success: true };
}

export const sendVerificationEmail = async (email: string, token: string) => {
    console.log("-----------------------------------------");
    console.log("📧 TRANSACTIONAL EMAIL (MOCK)");
    console.log(`TO: ${email}`);
    console.log(`SUBJECT: Verify your email`);
    console.log(`BODY: Your verification code is: ${token}`);
    console.log("-----------------------------------------");
    return { success: true };
}
