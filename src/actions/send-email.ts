
"use server";

import { z } from "zod";
import nodemailer from "nodemailer";
import { SITE_NAME } from "@/lib/constants"; // Import SITE_NAME for branding

const ContactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters."}),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export type ContactFormState = {
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    subject?: string[];
    message?: string[];
  };
  success: boolean;
};

// WARNING: Hardcoding credentials is a security risk. Use environment variables in production.
const GMAIL_USER = "zainabhamid2468@gmail.com";
const GMAIL_APP_PASSWORD = "gbrcntrpqierdeqv";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});

export async function sendEmail(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validatedFields = ContactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      message: "Failed to send message. Please check the errors.",
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const { name, email, subject, message } = validatedFields.data;

  const mailToOwnerOptions = {
    from: `"${name}" <${email}>`, // Show client's name and email as sender
    to: GMAIL_USER,
    subject: `New Contact Form Submission: ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #D2042D;">New Message via ${SITE_NAME} Contact Form</h2>
        <p>You have received a new message from your portfolio website:</p>
        <hr style="border: 0; border-top: 1px solid #eee;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Subject:</strong> ${subject}</p>
        <h3 style="color: #D2042D; margin-top: 20px;">Message:</h3>
        <div style="background-color: #f9f9f9; border-left: 3px solid #D2042D; padding: 15px; margin-top: 10px;">
          <p style="margin: 0;">${message.replace(/\n/g, "<br>")}</p>
        </div>
        <hr style="border: 0; border-top: 1px solid #eee; margin-top: 20px;">
        <p style="font-size: 0.9em; color: #777;">This email was sent from the contact form on ${SITE_NAME}.</p>
      </div>
    `,
  };

  const mailToClientOptions = {
    from: `"${SITE_NAME}" <${GMAIL_USER}>`, // Use SITE_NAME for branding
    to: email,
    subject: `Thank You for Contacting ${SITE_NAME}!`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #D2042D; color: #fff; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">${SITE_NAME}</h1>
        </div>
        <div style="padding: 25px;">
          <h2 style="color: #D2042D;">Thank You for Reaching Out, ${name}!</h2>
          <p>I've successfully received your message regarding: <strong>"${subject}"</strong>.</p>
          <p>I appreciate you taking the time to contact me. I'll review your message and get back to you as soon as possible.</p>
          <p>In the meantime, feel free to explore more of my work on my <a href="[YOUR_PORTFOLIO_URL_HERE_IF_APPLICABLE]" style="color: #D2042D; text-decoration: none;">portfolio</a>.</p>
          <p>Best regards,</p>
          <p><strong>Zainab Hamid</strong><br/>${SITE_NAME}</p>
        </div>
        <div style="background-color: #f9f9f9; color: #777; padding: 15px; text-align: center; font-size: 0.9em;">
          <p style="margin:0;">This is an automated email. Please do not reply directly to this message.</p>
          <p style="margin:0;">&copy; ${new Date().getFullYear()} ${SITE_NAME}</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailToOwnerOptions);
    await transporter.sendMail(mailToClientOptions);
    return {
      message: "Your message has been sent successfully! I'll get back to you soon.",
      success: true,
    };
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      message: "An unexpected error occurred while sending your message. Please try again later.",
      success: false,
    };
  }
}
