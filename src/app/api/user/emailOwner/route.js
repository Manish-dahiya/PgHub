import { NextResponse } from "next/server";
import nodemailer from "nodemailer"

export async function POST(req){
    try {
        const {firstName,lastName,message,email,ownerEmail}= await req.json()
  
        // Set up Nodemailer transporter
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_PORT,
          secure: false, // false for 587 port
          auth: {
            user: email, // Your Gmail email address
            pass: '1234', // Your Gmail account password or app-specific password if 2FA is enabled
          },
        });
  
        // Set up the email content
        const mailOptions = {
          from: email, // User's email as the sender
          to:ownerEmail , // Owner's email
          subject: `Interest in Property:`, // Subjmect
          text: message, // The message the user wants to send
          html: `<p>${message}</p>`, // HTML version of the message
        };
  
        // Send the email
        await transporter.sendMail(mailOptions);
  
        return res.status(200).json({ success: true, message: "Email sent to owner successfully!" });
      } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ success: false, error: "Failed to send email" });
      }

} 

