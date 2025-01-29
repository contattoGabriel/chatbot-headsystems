import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.office365.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }

    async sendMeetingConfirmation(meetingDetails, clientEmail) {
        const emailBody = `
            <h2>Confirmação de Agendamento - Head Systems</h2>
            <p>Olá! Seu agendamento foi confirmado com sucesso.</p>
            <p><strong>Detalhes da Reunião:</strong></p>
            <ul>
                <li><strong>Data:</strong> ${meetingDetails.date}</li>
                <li><strong>Horário:</strong> ${meetingDetails.time}</li>
                <li><strong>Assunto:</strong> ${meetingDetails.subject}</li>
            </ul>
            <p>Em caso de dúvidas, entre em contato conosco:</p>
            <p>📞 (31) 3772-0172<br>
            📧 contato@headsystems.com.br</p>
        `;

        try {
            await this.transporter.sendMail({
                from: `"Head Systems" <${process.env.EMAIL_USER}>`,
                to: clientEmail,
                cc: process.env.EMAIL_CC || 'suporte@headsystems.com.br',
                subject: "Confirmação de Agendamento - Head Systems",
                html: emailBody
            });
            
            return true;
        } catch (error) {
            console.error('Erro ao enviar email:', error);
            return false;
        }
    }
}

export default new EmailService();