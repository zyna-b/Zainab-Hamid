import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fetchFaqs } from "@/lib/content-service";

export async function FaqSection() {
  const faqs = await fetchFaqs();

  return (
    <div className="w-full max-w-3xl mx-auto mt-16 md:mt-24">
      <h2 className="font-headline text-3xl font-semibold text-center text-accent mb-10">
        Frequently Asked Questions
      </h2>
      {faqs.length === 0 ? (
        <p className="text-center text-muted-foreground">
          Add FAQ entries from the admin dashboard to populate this section.
        </p>
      ) : (
        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-card/50 border border-border rounded-lg px-2 hover:border-primary/30 transition-colors">
              <AccordionTrigger className="text-left font-medium text-base hover:no-underline text-foreground/90 px-4 py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground px-4 pb-4 text-sm leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
