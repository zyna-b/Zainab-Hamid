"use server";

import { z } from "zod";

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

  // In a real application, you would use an email service (e.g., SendGrid, Resend)
  // For now, we'll simulate success.
  console.log("Sending email:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Subject:", subject);
  console.log("Message:", message);

  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate potential server-side error (uncomment to test)
  // if (Math.random() > 0.5) {
  //   return {
  //     message: "An unexpected error occurred on the server. Please try again.",
  //     success: false,
  //   };
  // }

  return {
    message: "Your message has been sent successfully! I'll get back to you soon.",
    success: true,
  };
}
