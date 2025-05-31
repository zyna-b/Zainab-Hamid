
"use server";

import { z } from "zod";
import nodemailer from "nodemailer";

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
      <p>You have a new contact form submission:</p>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Subject:</strong> ${subject}</li>
        <li><strong>Message:</strong></li>
      </ul>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
  };

  const mailToClientOptions = {
    from: `"Zainab Hamid" <${GMAIL_USER}>`,
    to: email,
    subject: "Thank you for contacting me!",
    html: `
      <p>Hi ${name},</p>
      <p>Thank you for reaching out. I have received your message regarding "${subject}" and will get back to you as soon as possible.</p>
      <p>Best regards,<br/>Zainab Hamid</p>
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
