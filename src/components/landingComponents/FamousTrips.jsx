import { useNavigate } from "react-router-dom";

const popularTripsData = [
  {
    title: "Paris",
    description: "Explore the Eiffel Tower, museums, and beautiful streets.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    link: "/Paris",
  },
  {
    title: "Bali",
    description: "Relax on tropical beaches and enjoy breathtaking scenery.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
    link: "/Bali",
  },
  {
    title: "Dubai",
    description:
      "Experience luxury, modern architecture, and desert adventures.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
    link: "/Dubai",
  },
  {
    title: "Santorini",
    description:
      "Enjoy whitewashed buildings, blue domes, and stunning sunsets.",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff",
    link: "/Santorini",
  },
  {
    title: "Switzerland",
    description:
      "Experience breathtaking mountains, lakes, and scenic train rides.",
    image: "https://images.unsplash.com/photo-1527668752968-14dc70a27c95",
    link: "/Switzerland",
  },
  {
    title: "Maldives",
    description:
      "Relax in luxurious overwater villas surrounded by crystal-clear water.",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8",
    link: "/Maldives",
  },
];

const FamousTrips = () => {
  const navigate = useNavigate();

  return (
    <div className="cursor-pointer bg-linear-to-b from-slate-950 to-slate-900 px-4 py-12 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-20">
      <div className="mb-8 sm:mb-10">
        <h2 className="text-3xl font-bold text-green-400 sm:text-4xl">
          Famous Trips
        </h2>

        <p className="mt-2 text-sm text-slate-200 sm:text-base">
          Explore the world's most popular travel destinations.
        </p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-6 sm:gap-6 sm:pb-8 hide-scrollbar">
        {popularTripsData.map((trip, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(trip.link);
            }}
            className="w-64 shrink-0 overflow-hidden rounded-2xl border border-slate-900 bg-slate-900 shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-800 sm:w-72"
          >
            <img
              src={trip.image}
              alt={trip.title}
              className="h-48 w-full object-cover sm:h-56"
            />

            <div className="p-4 text-center sm:p-5">
              <h3 className="text-xl font-bold text-amber-400 sm:text-2xl">
                {trip.title}
              </h3>

              <p className="mt-3 text-sm text-slate-300 sm:text-base">
                {trip.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FamousTrips;
