import { NextResponse } from "next/server";
import nodemailer from "nodemailer"

export async function POST(req){
    try {
        const {firstName,lastName,message,email,ownerEmail}= await req.json()
        

         // Set up Nodemailer transporter
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_PORT,
          secure: true, // true for 465 port
          auth: {
            user: process.env.EMAIL, // organisation Gmail email address
            pass: process.env.PASSWORD, // organisation Gmail account password or app-specific password if 2FA is enabled
          },
        });
  
        // Set up the email content
        const mailOptions = {
          from: `"${firstName} ${lastName}" <${process.env.EMAIL}>`, // organisation email
          to: ownerEmail.ownerEmail, // Owner's email
          subject: `Interest in Property: ${firstName} ${lastName} `, // Subject
          text: message, // The message the user wants to send
          html: `<H1>${message}</H1>`, // HTML version of the message
          replyTo: email, // User's email for replies
        };
  
        // Send the email
        await transporter.sendMail(mailOptions);
  
        return NextResponse.json({ success: true, response: "Email sent to owner successfully!" });
      } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ success: false, response: "Failed to send email" });
      }

} 

