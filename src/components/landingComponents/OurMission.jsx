import { Star } from "lucide-react";

const OurMission = () => {
  return (
    <section className="bg-linear-to-b from-slate-950 to-slate-900 px-4 py-16 text-white sm:px-6 sm:py-20 md:px-12 lg:px-20 lg:py-24">
      <h2 className="mb-8 text-center text-3xl font-bold sm:mb-10 sm:text-4xl">
        Our mission
      </h2>

      <p className="mx-auto mb-12 max-w-4xl text-center text-base font-semibold italic leading-7 sm:mb-16 sm:text-lg md:text-xl">
        Our mission is to make sure users can plan{" "}
        <br className="hidden sm:block" />
        trips with their friends and family. Plan their itinerary, manage their
        baggage,
        <br className="hidden sm:block" /> and discover new experiences
        together.
      </p>

      <div className="mx-auto grid max-w-5xl grid-cols-1 sm:grid-cols-3">
        <div className="border-b border-white p-4 text-center sm:border-b-0 sm:border-r">
          <p className="text-3xl font-black md:text-4xl">300+</p>
          <p className="mt-2 text-base font-semibold italic sm:text-lg md:text-xl">
            Clients Served
          </p>
        </div>

        <div className="border-b border-white p-4 text-center sm:border-b-0">
          <p className="flex items-center justify-center gap-1 text-3xl font-black md:text-4xl">
            4.8 <Star className="h-7 w-7 sm:h-8 sm:w-8" />
          </p>
          <p className="mt-2 text-base font-semibold italic sm:text-lg md:text-xl">
            Overall Ratings
          </p>
        </div>

        <div className="p-4 text-center sm:border-l sm:border-white">
          <p className="text-3xl font-black md:text-4xl">20+</p>
          <p className="mt-2 text-base font-semibold italic sm:text-lg md:text-xl">
            Countries Linked
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurMission;
