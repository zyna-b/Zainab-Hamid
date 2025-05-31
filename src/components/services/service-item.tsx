import type { Service } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ServiceItemProps {
  service: Service;
}

export function ServiceItem({ service }: ServiceItemProps) {
  const Icon = service.icon;
  return (
    <Card className="h-full text-center hover:shadow-xl hover:shadow-primary/20 transition-shadow duration-300 bg-card/90">
      <CardHeader className="items-center pb-4">
        <div className="p-4 bg-primary/10 rounded-full mb-4 inline-block">
          <Icon className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base leading-relaxed text-muted-foreground">
          {service.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
