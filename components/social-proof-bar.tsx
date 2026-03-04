import { Star } from "lucide-react";

export function SocialProofBar() {
  return (
    <section className="bg-offwhite py-5">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-3 px-6 text-center sm:flex-row sm:gap-6">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-gold text-gold" aria-hidden="true" />
          ))}
        </div>
        <span className="text-sm font-medium text-navy">
          Trusted by Jacksonville property owners
        </span>
        <span className="hidden text-muted-foreground sm:inline" aria-hidden="true">
          {"·"}
        </span>
        <span className="text-sm font-semibold text-gold">
          9 Written Guarantees
        </span>
        <span className="hidden text-muted-foreground sm:inline" aria-hidden="true">
          {"·"}
        </span>
        <span className="text-sm font-medium text-navy">
          Local since Day One
        </span>
      </div>
    </section>
  );
}
