import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Aarav Mehta",
    role: "Solo Traveler",
    location: "Goa, India",
    avatar: "AM",
    rating: 5,
    text: "WanderWise planned my entire Goa trip in minutes. The itinerary was spot on and I discovered places I'd never have found on my own.",
  },
  {
    id: 2,
    name: "Sara Khan",
    role: "Family Traveler",
    location: "Dubai, UAE",
    avatar: "SK",
    rating: 5,
    text: "Traveling with kids is stressful, but WanderWise handled every detail from routes to rest stops. Best family vacation we've had.",
  },
  {
    id: 3,
    name: "Liam O'Brien",
    role: "Adventure Seeker",
    location: "Queenstown, NZ",
    avatar: "LO",
    rating: 4,
    text: "The smart suggestions helped me pack 14 activities into a week without burning out. Genuinely useful planning tool.",
  },
];

function TestimonialCard({ testimonial }) {
  return (
    <article className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <Quote className="h-8 w-8 text-accent-foreground/40" />
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={
                i < testimonial.rating
                  ? "h-4 w-4 fill-chart-4 text-chart-4"
                  : "h-4 w-4 text-muted-foreground/30"
              }
            />
          ))}
        </div>
      </div>

      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
        "{testimonial.text}"
      </p>

      <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground">
          {testimonial.avatar}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">
            {testimonial.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {testimonial.role} · {testimonial.location}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-background px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">
            Testimonials
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Loved by travelers worldwide
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">
            Join thousands of explorers who plan smarter and travel further with
            WanderWise.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
