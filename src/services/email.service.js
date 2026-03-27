import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
      },
    });

    const info = await transporter.sendMail({
      from: `"Payment System" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("Message sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const sendRegistrationEmail = async (name, userEmail) => {
  const subject = "Welcome to Payment System!";

  const text = `Hello ${name},

Thank you for registering with Payment System.

Best regards,
Payment System Team`;

  const html = `
  <p>Hello ${name},</p>
  <p>Thank you for registering with Payment System.</p>
  <p>Best regards,<br/>Payment System Team</p>
  `;

  await sendEmail(userEmail, subject, text, html);
};

export const sendTransactionEmail = async (name, userEmail, amount, toAccount) => {
  const subject = "Transaction Update";
  const text = `Hello ${name},

Your transaction of amount ${amount} to account ${toAccount} has been completed.

Best regards,
Payment System Team`;

  const html = `
  <p>Hello ${name},</p>
  <p>Your transaction of amount <strong>${amount}</strong> to account <strong>${toAccount}</strong> has been completed.</p>
  <p>Best regards,<br/>Payment System Team</p>
  `;

  await sendEmail(userEmail, subject, text, html);
};

export const sendFailureEmail = async (name, userEmail, amount, toAccount) => {
  const subject = "Transaction Failed";
  const text = `Hello ${name},
Your transaction of amount ${amount} to account ${toAccount} has failed. Please try again.
Best regards,
Payment System Team`
  const html = `
  <p>Hello ${name},</p>
  <p>Your transaction of amount <strong>${amount}</strong> to account <strong>${toAccount}</strong> has failed. Please try again.</p>
  <p>Best regards,<br/>Payment System Team</p>
  `;
  await sendEmail(userEmail, subject, text, html);

};
