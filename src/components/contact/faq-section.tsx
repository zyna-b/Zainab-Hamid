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
    <div className="max-w-4xl">
      {faqs.length === 0 ? (
        <p className="text-muted-foreground">
          FAQs will appear here once added.
        </p>
      ) : (
        <Accordion type="single" collapsible className="space-y-0">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b border-border slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <AccordionTrigger className="text-left font-headline text-lg md:text-xl font-medium py-6 hover:no-underline hover:translate-x-1 transition-transform [&[data-state=open]>svg]:rotate-45">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
