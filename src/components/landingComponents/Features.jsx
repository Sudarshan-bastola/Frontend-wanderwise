import { CreditCard, GlobeCheck, MapPinSearch, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const featuresData = [
  {
    title: "24*7 Availability",
    content:
      "Our website workd 24*7 without any interruption. we guarentee 100% uptime.",
    icon: GlobeCheck,
    link: "/about"
  },

  {
    title: "Travel Collaboration",
    content:
      "Invite friends and family, share itineraries, and plan unforgettable trips together.",
    icon: Users,
    link: "/features"
  },

  {
    title: "Easy Trip Planning",
    content:
      "Organize your itinerary, manage schedules, and plan every part of your journey in one place.",
    icon: MapPinSearch,
    link: "/contact"
  },

  {
    title: "Secure Online Booking",
    content:
      "Book flights, hotels, and activities quickly with a safe and reliable booking system.",
    icon: CreditCard,
    link: "/"
  },
];

const Features = () => {
  const navigate = useNavigate();
  return (
    <div className="px-20 py-20 bg-linear-to-b from-slate-950 to-slate-900 cursor-pointer">
      {/* heading */}

      <div>
        <h2
          onDoubleClick={() => {
            navigate("/features");
          }}
          className=" text-4xl font-bold text-start text-purple-500"
        >
          Features
        </h2>
      </div>

      {/* content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {featuresData.map((feature, index) => {
          return (
            <div
             key={index} onClick={() => {
                navigate(feature.link);
              }}
              className="rounded-lg border border-green-600 p-6 text-center shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-xl bg-linear-to-r from-cyan-200 to-blue-300"
            >
              <feature.icon className="mx-auto mb-4 h-8 w-8 text-cyan-600" />

              <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>

              <p className="text-gray-600">{feature.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Features;
