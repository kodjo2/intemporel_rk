import { AnimatedSection } from "@/components/shared/animated-section";
import type { StatItem } from "@/types/site";

type StatsGridProps = {
  items: StatItem[];
};

export function StatsGrid({ items }: StatsGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item, index) => (
        <AnimatedSection key={item.label} delay={index * 0.06}>
          <div className="glass-panel rounded-[1.75rem] p-6">
            <p className="text-4xl font-semibold tracking-tight sm:text-5xl">
              {item.value}
            </p>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.22em] text-accent">
              {item.label}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              {item.description}
            </p>
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
}
