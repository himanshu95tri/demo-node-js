import sgMail from '@sendgrid/mail';
const env = process.env.NODE_ENV || "local";
const config = require("../config/default.json")[env];


sgMail.setApiKey(config.sendgridApiKey);

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text: string;
}

const sendEmail = async ({ to, subject, html, text }: EmailOptions) => {
  if (env === 'local') {
    console.log('--- EMAIL CONTENT ---');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log('--- HTML ---');
    console.log(html);
    console.log('--- TEXT ---');
    console.log(text);
    console.log('--- END EMAIL CONTENT ---');
    return;
  }

  const msg = {
    to,
    from: 'info@creatorapps.ai',
    subject,
    html,
    text,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully');
  } catch (error: any) {
    console.error('Error sending email:', error.response?.body || error);
    throw new Error('Failed to send email');
  }
};

export default sendEmail;
