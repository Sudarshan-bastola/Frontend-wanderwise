import { CreditCard, GlobeCheck, MapPinSearch, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const featuresData = [
  {
    title: "24*7 Availability",
    content:
      "Our website workd 24*7 without any interruption. we guarentee 100% uptime.",
    icon: GlobeCheck,
    link: "/about",
  },

  {
    title: "Travel Collaboration",
    content:
      "Invite friends and family, share itineraries, and plan unforgettable trips together.",
    icon: Users,
    link: "/features",
  },

  {
    title: "Easy Trip Planning",
    content:
      "Organize your itinerary, manage schedules, and plan every part of your journey in one place.",
    icon: MapPinSearch,
    link: "/contact",
  },

  {
    title: "Secure Online Booking",
    content:
      "Book flights, hotels, and activities quickly with a safe and reliable booking system.",
    icon: CreditCard,
    link: "/",
  },
];

const Features = () => {
  const navigate = useNavigate();

  return (
    <div className="cursor-pointer bg-linear-to-b from-slate-950 to-slate-900 px-4 py-12 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-20">
      <div>
        <h2
          onDoubleClick={() => {
            navigate("/features");
          }}
          className="text-3xl font-bold text-start text-purple-500 sm:text-4xl"
        >
          Features
        </h2>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {featuresData.map((feature, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                navigate(feature.link);
              }}
              className="rounded-lg border border-green-600 bg-linear-to-r from-cyan-200 to-blue-300 p-5 text-center shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-xl sm:p-6"
            >
              <feature.icon className="mx-auto mb-4 h-8 w-8 text-cyan-600" />

              <h3 className="mb-2 text-lg font-bold sm:text-xl">
                {feature.title}
              </h3>

              <p className="text-sm text-gray-600 sm:text-base">
                {feature.content}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Features;
