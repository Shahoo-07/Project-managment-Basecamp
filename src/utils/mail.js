import Mailgen from "mailgen";
import nodemailer from "nodemailer"

const sendEmail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Task Manager",
            link: "https://taskmanagelink.com"
        }
    })
    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
    const emailhtml = mailGenerator.generate(options.mailgenContent);


    const transpoter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS
        }
    });

    const mail = {
        from: "mail.taskmanager@example.com",
        to: options.email,
        subject: options.subject,
        text: emailTextual,
        html: emailhtml
    }

    try {
        await transpoter.sendMail(mail)
    } catch (error) { }
};

const emailVerificationMailgenContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: 'Welcome to Mailgen! We\'re very excited to have you on board.',
            action: {
                instructions: 'To verify your email please click on button',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Confirm your account',
                    link: verificationUrl
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }
};

const forgotPasswordMailgenContent = (username, passwordReseturl) => {
    return {
        body: {
            name: username,
            intro: 'Reset password of account',
            action: {
                instructions: 'To reset your password please click on button',
                button: {
                    color: '#0f4cbd', // Optional action button color
                    text: 'Confirm your password reset',
                    link: passwordReseturl
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }
};

export {
    emailVerificationMailgenContent,
    forgotPasswordMailgenContent,
    sendEmail
};