import useAuth from "../../hooks/useAuth";
import CustomButton from "./CustomButton";

const AppNavbar = () => {
  const { onLogout } = useAuth();

  return (
    <header className="flex flex-col gap-4 border-b border-purple-200 bg-white px-4 py-4 shadow-sm md:flex-row md:items-center md:justify-between md:px-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-purple-700 sm:text-3xl">
          Wanderwise
        </h1>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-8">
        <nav className="flex flex-wrap items-center justify-center gap-1 font-medium text-gray-600 sm:gap-2">
          <a
            href="/dashboard"
            className="rounded-lg px-3 py-2 text-sm transition hover:bg-purple-50 hover:text-purple-700 sm:px-4 sm:text-base"
          >
            Dashboard
          </a>

          <a
            href="/trips"
            className="rounded-lg px-3 py-2 text-sm transition hover:bg-purple-50 hover:text-purple-700 sm:px-4 sm:text-base"
          >
            Trips
          </a>

          <a
            href="/itineraries"
            className="rounded-lg px-3 py-2 text-sm transition hover:bg-purple-50 hover:text-purple-700 sm:px-4 sm:text-base"
          >
            Itineraries
          </a>

          <a
            href="/baggage"
            className="rounded-lg px-3 py-2 text-sm transition hover:bg-purple-50 hover:text-purple-700 sm:px-4 sm:text-base"
          >
            Baggage
          </a>
        </nav>

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
