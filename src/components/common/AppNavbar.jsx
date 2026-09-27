import useAuth from "../../hooks/useAuth";
import CustomButton from "./CustomButton";

const AppNavbar = () => {
  const { onLogout } = useAuth();
  return (
    <header className="flex items-center justify-between border-b border-purple-200 bg-white px-10 py-4 shadow-sm">
      {/* Logo */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-purple-700">
          Wanderwise
        </h1>
      </div>

      {/* Navigation + Logout */}
      <div className="flex items-center gap-8">
        <nav className="flex items-center gap-2 font-medium text-gray-600">
          <a
            href="/dashboard"
            className="rounded-lg px-4 py-2 transition hover:bg-purple-50 hover:text-purple-700"
          >
            Dashboard
          </a>

          <a
            href="/trips"
            className="rounded-lg px-4 py-2 transition hover:bg-purple-50 hover:text-purple-700"
          >
            Trips
          </a>

          <a
            href="/itineraries"
            className="rounded-lg px-4 py-2 transition hover:bg-purple-50 hover:text-purple-700"
          >
            Itineraries
          </a>

          <a
            href="/baggage"
            className="rounded-lg px-4 py-2 transition hover:bg-purple-50 hover:text-purple-700"
          >
            Baggage
          </a>
        </nav>

        {/* Logout Button */}
        <div
          onClick={() => {
            onLogout();
          }}
        >
          <CustomButton text="Logout" link="/logout" />
        </div>
      </div>
    </header>
  );
};

export default AppNavbar;
