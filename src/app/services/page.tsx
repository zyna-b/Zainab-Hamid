import { PageHeader } from '@/components/shared/page-header';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { ServiceItem } from '@/components/services/service-item';
import { SERVICES_DATA } from '@/lib/constants';

export default function ServicesPage() {
  return (
    <SectionWrapper>
      <PageHeader
        title="Services I Offer"
        subtitle="Providing innovative and tailored solutions to meet your technological needs across AI, web, and mobile development."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES_DATA.map((service, index) => (
          <div key={service.id} className="animate-slide-in-up" style={{animationDelay: `${index * 100}ms`}}>
            <ServiceItem service={service} />
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
