import Navbar from "../components/common/Navbar";
import Footer from "../components/landingComponents/Footer";

const metrics = [
  { value: "98%", label: "Traveler satisfaction" },
  { value: "5X", label: "Faster trip planning" },
  { value: "24/7", label: "Planning availability" },
  { value: "1M+", label: "Trips planned" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="bg-linear-to-b from-primary/5 to-background px-4 pb-12 pt-12 sm:px-6 sm:pb-16 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary sm:px-4 sm:text-sm">
            About us
          </span>

          <h1 className="mt-5 text-3xl font-bold italic tracking-tight text-foreground sm:mt-6 sm:text-5xl">
            Our journey to smarter travel
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Explore how our passion for discovery fuels effortless, personalized
            travel planning for explorers everywhere.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-xl border border-border shadow-sm sm:mt-12 sm:rounded-2xl">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1400&q=80"
            alt="Travelers planning a trip together with a map"
            className="h-56 w-full object-cover sm:h-80 md:h-96"
            loading="lazy"
          />
        </div>
      </section>

      <section className="border-y border-border bg-card px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-8">
          {metrics.map((m) => (
            <div key={m.label} className="text-center">
              <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {m.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
              What defines us
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Explore our beginnings, what we stand for, and where we're headed
              in the world of travel.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
