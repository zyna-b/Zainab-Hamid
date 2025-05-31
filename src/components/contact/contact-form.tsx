"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { sendEmail, type ContactFormState } from "@/actions/send-email";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Send } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters."}),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto transition-transform hover:scale-105">
      {pending ? "Sending..." : <>Send Message <Send className="ml-2 h-4 w-4" /></>}
    </Button>
  );
}

export function ContactForm() {
  const { toast } = useToast();
  
  const initialState: ContactFormState = { message: "", success: false };
  const [state, formAction] = useFormState(sendEmail, initialState);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? "Success!" : "Error",
        description: state.message,
        variant: state.success ? "default" : "destructive",
      });
      if (state.success) {
        form.reset();
      }
    }
  }, [state, toast, form]);
  
  // For client-side errors display under fields. Server errors are shown via toast.
  const { errors: clientErrors } = form.formState;
  const serverErrors = state.errors;


  return (
    <Card className="w-full max-w-2xl mx-auto border-primary/20">
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-3xl text-primary">Get In Touch</CardTitle>
        <CardDescription>
          Have a project in mind, a question, or just want to say hi? Fill out the form below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" type="text" {...form.register("name")} placeholder="Your Name" />
            {(clientErrors.name || serverErrors?.name) && (
              <p className="text-sm text-destructive mt-1">{clientErrors.name?.message || serverErrors?.name?.[0]}</p>
            )}
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" {...form.register("email")} placeholder="your.email@example.com" />
             {(clientErrors.email || serverErrors?.email) && (
              <p className="text-sm text-destructive mt-1">{clientErrors.email?.message || serverErrors?.email?.[0]}</p>
            )}
          </div>
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" type="text" {...form.register("subject")} placeholder="Regarding..." />
            {(clientErrors.subject || serverErrors?.subject) && (
              <p className="text-sm text-destructive mt-1">{clientErrors.subject?.message || serverErrors?.subject?.[0]}</p>
            )}
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" {...form.register("message")} placeholder="Your message here..." rows={5} />
            {(clientErrors.message || serverErrors?.message) && (
              <p className="text-sm text-destructive mt-1">{clientErrors.message?.message || serverErrors?.message?.[0]}</p>
            )}
          </div>
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
