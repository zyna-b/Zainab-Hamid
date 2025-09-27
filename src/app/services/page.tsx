import { PageHeader } from '@/components/shared/page-header';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { ServiceItem } from '@/components/services/service-item';
import { fetchServices } from '@/lib/content-service';

export default async function ServicesPage() {
  const services = await fetchServices();

  return (
    <SectionWrapper>
      <PageHeader
        title="Services I Offer"
        subtitle="Providing innovative and tailored solutions to meet your technological needs across AI, web, and mobile development."
      />
      {services.length === 0 ? (
        <p className="text-center text-muted-foreground">
          Add service entries from the admin dashboard to show them here.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
          <div key={service.id} className="animate-slide-in-up" style={{animationDelay: `${index * 100}ms`}}>
            <ServiceItem service={service} />
          </div>
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}
