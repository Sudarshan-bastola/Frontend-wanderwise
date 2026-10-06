import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Login from "./pages/Login";
import useAuth from "./hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import Dashboard from "./pages/Dashboard";
import AppLayout from "./layouts/AppLayout";
import Trip from "./pages/trips/Trip";
import AddTrip from "./pages/trips/AddTrip";
import TripDetails from "./pages/trips/TripDetails";
import EditTrip from "./pages/trips/EditTrip";
import Baggage from "./pages/baggage/Baggage";
import BaggageDetails from "./pages/baggage/BaggageDetails";
import AcceptInvitation from "./pages/AcceptInvitation";
import Contact from "./pages/contact";
import AddItinerary from "./pages/itinerary/AddItinerary";
import ItineraryDetails from "./pages/itinerary/ItineraryDetails";
import Itineraries from "./pages/itinerary/itinerary";
import EditBaggage from "./pages/baggage/EditBaggage";
import Register from "./pages/Register";
import EditItinerary from "./pages/itinerary/EditItinerary";


const App = () => {
  const { token, onLogout } = useAuth();

  const ProtectedRoutes = () => {
    try {
      const decodedToken = token ? jwtDecode(token) : null;
      const userId = decodedToken?.userId;

      if (decodedToken && decodedToken.exp) {
        const currentTime = Date.now() / 1000;

        if (currentTime > decodedToken.exp) {
          onLogout();
          return <Navigate to="/login" replace />;
        }
      }

      if (!token || !userId) {
        onLogout();
        return <Navigate to="/login" replace />;
      }

      return <AppLayout />;
    } catch (err) {
      console.error(err);
      onLogout();
      return <Navigate to="/login" replace />;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/trips" element={<Trip />} />
          <Route path="/trips/add" element={<AddTrip />} />
          <Route path="/trips/:id" element={<TripDetails />} />
          <Route path="/trips/edit/:id" element={<EditTrip />} />

          <Route path="/baggage" element={<Baggage />} />
          <Route path="/baggage/:id" element={<BaggageDetails />} />
          <Route
            path="/baggage/edit/:tripId/:baggageId"
            element={<EditBaggage />}
          />

          <Route path="/trips/:tripId/itinerary" element={<Itineraries />} />

          <Route
            path="/trips/:tripId/itinerary/add"
            element={<AddItinerary />}
          />

          <Route
            path="/trips/:tripId/itinerary/:id"
            element={<ItineraryDetails />}
          />

          <Route
            path="/trips/:tripId/itinerary/:id/edit"
            element={<EditItinerary />}
          />

          <Route
            path="/trips/:id/invite/accept"
            element={<AcceptInvitation />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
