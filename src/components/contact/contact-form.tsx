"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { sendEmail, type ContactFormState } from "@/actions/send-email";
import { ArrowUpRight } from "lucide-react";

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
    <button
      type="submit"
      disabled={pending}
      className="btn-magnetic inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 text-sm uppercase tracking-widest font-medium hover:gap-4 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Sending..." : "Send Message"}
      <ArrowUpRight className="w-4 h-4" />
    </button>
  );
}

export function ContactForm() {
  const { toast } = useToast();
  
  const initialState: ContactFormState = { message: "", success: false };
  const [state, formAction] = useActionState(sendEmail, initialState);

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
  
  const { errors: clientErrors } = form.formState;
  const serverErrors = state.errors;

  return (
    <div className="w-full">
      <form action={formAction} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm uppercase tracking-widest text-muted-foreground">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              {...form.register("name")}
              placeholder="Your name"
              className="bg-transparent border-0 border-b border-border rounded-none px-0 py-3 text-base focus-visible:ring-0 focus-visible:border-foreground transition-colors placeholder:text-muted-foreground/50"
            />
            {(clientErrors.name || serverErrors?.name) && (
              <p className="text-sm text-destructive mt-1">
                {clientErrors.name?.message || serverErrors?.name?.[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm uppercase tracking-widest text-muted-foreground">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              {...form.register("email")}
              placeholder="your@email.com"
              className="bg-transparent border-0 border-b border-border rounded-none px-0 py-3 text-base focus-visible:ring-0 focus-visible:border-foreground transition-colors placeholder:text-muted-foreground/50"
            />
            {(clientErrors.email || serverErrors?.email) && (
              <p className="text-sm text-destructive mt-1">
                {clientErrors.email?.message || serverErrors?.email?.[0]}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject" className="text-sm uppercase tracking-widest text-muted-foreground">
            Subject
          </Label>
          <Input
            id="subject"
            type="text"
            {...form.register("subject")}
            placeholder="What's this about?"
            className="bg-transparent border-0 border-b border-border rounded-none px-0 py-3 text-base focus-visible:ring-0 focus-visible:border-foreground transition-colors placeholder:text-muted-foreground/50"
          />
          {(clientErrors.subject || serverErrors?.subject) && (
            <p className="text-sm text-destructive mt-1">
              {clientErrors.subject?.message || serverErrors?.subject?.[0]}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-sm uppercase tracking-widest text-muted-foreground">
            Message
          </Label>
          <Textarea
            id="message"
            {...form.register("message")}
            placeholder="Tell me about your project..."
            rows={5}
            className="bg-transparent border-0 border-b border-border rounded-none px-0 py-3 text-base focus-visible:ring-0 focus-visible:border-foreground transition-colors placeholder:text-muted-foreground/50 resize-none"
          />
          {(clientErrors.message || serverErrors?.message) && (
            <p className="text-sm text-destructive mt-1">
              {clientErrors.message?.message || serverErrors?.message?.[0]}
            </p>
          )}
        </div>

        <div className="pt-4">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
