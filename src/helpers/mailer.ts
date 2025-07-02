import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async({email, emailType, userId}:any) => {

    try {
      const hashedToken = await bcryptjs.hash(userId.toString(), 10);

      if (emailType === "VERIFY") {
        await User.findByIdAndUpdate(
          userId,
          {
            verifyToken: hashedToken,
            verifyTokenExpiry: Date.now() + 3600000,
          },
          { new: true, runValidators: true }
        );
      } else if (emailType === "RESET") {
        await User.findByIdAndUpdate(
          userId,
          {
            forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpiry: Date.now() + 3600000,
          },
          { new: true, runValidators: true }
        );
      }

      // Looking to send emails in production? Check out our Email API/SMTP product!
      var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      const link = process.env.DOMAIN + '/verifyemail/' + hashedToken;


      const mailOptions = {
        from: "techtechnicalshrey@gmail.com",
        to: email,
        subject:
          emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
        html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
      <h2 style="color: #333;">${
        emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"
      }</h2>
      <p>Hello,</p>
      <p>${
        emailType === "VERIFY"
          ? "Please verify your email address by clicking the button below."
          : "Click the button below to reset your password."
      }</p>
      <a href="${link}" style="display: inline-block; margin-top: 15px; padding: 10px 20px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px;">
        ${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}
      </a>
      <p style="margin-top: 20px; font-size: 12px; color: #666;">
        If you didn't request this, you can safely ignore this email.
      </p>
    </div>
  `,};

  const mailResponse = await transport.sendMail(mailOptions);
  return mailResponse;

    } catch (error: any) {
        throw new Error(`Email sending failed: ${error.message}`);
    }
}