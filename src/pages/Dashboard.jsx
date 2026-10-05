import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  CircleCheck,
  Clock3,
  Compass,
  LoaderCircle,
  MapPin,
  WalletCards,
} from "lucide-react";
import { toast } from "sonner";
import api from "../api/axios";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { formatDate } from "../lib/utils";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const getTripStatus = (trip, today = new Date()) => {
  const startDate = new Date(trip.startDate);
  const endDate = new Date(trip.endDate);

  if (endDate < today) return "completed";
  if (startDate > today) return "upcoming";
  return "ongoing";
};

const statusStyles = {
  completed: {
    label: "Completed",
    className: "bg-emerald-100 text-emerald-700",
  },
  upcoming: {
    label: "Upcoming",
    className: "bg-amber-100 text-amber-700",
  },
  ongoing: {
    label: "Ongoing",
    className: "bg-sky-100 text-sky-700",
  },
};

const Dashboard = () => {
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await api.get("/trips");
        setTrips(response.data);
      } catch (error) {
        toast.error("Some error occurred while fetching trips");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const tripSummary = useMemo(() => {
    const summary = {
      total: trips.length,
      completed: 0,
      upcoming: 0,
      ongoing: 0,
    };

    trips.forEach((trip) => {
      summary[getTripStatus(trip)] += 1;
    });

    return summary;
  }, [trips]);

  const budgetSummary = useMemo(
    () =>
      trips.reduce(
        (summary, trip) => {
          summary.total += Number(trip.budget?.total) || 0;
          summary.spent += Number(trip.budget?.spent) || 0;
          return summary;
        },
        { total: 0, spent: 0 },
      ),
    [trips],
  );

  const destinations = useMemo(
    () => [...new Set(trips.flatMap((trip) => trip.destinations || []))],
    [trips],
  );

  const budgetProgress = budgetSummary.total
    ? Math.min((budgetSummary.spent / budgetSummary.total) * 100, 100)
    : 0;

  const statCards = [
    {
      label: "Total trips",
      value: tripSummary.total,
      icon: Compass,
      color: "text-violet-600 bg-violet-100",
    },
    {
      label: "Completed",
      value: tripSummary.completed,
      icon: CircleCheck,
      color: "text-emerald-600 bg-emerald-100",
    },
    {
      label: "Upcoming",
      value: tripSummary.upcoming,
      icon: CalendarDays,
      color: "text-amber-600 bg-amber-100",
    },
    {
      label: "Ongoing",
      value: tripSummary.ongoing,
      icon: Clock3,
      color: "text-sky-600 bg-sky-100",
    },
  ];

  return (
    <main className="min-h-screen bg-purple-50/60 px-4 py-8 sm:px-6 sm:py-10 md:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-purple-600 sm:text-sm">
            Your travel overview
          </p>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            Welcome to your dashboard
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Keep an eye on every journey, budget, and destination.
          </p>
        </div>

        <section
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
          aria-label="Trip summary"
        >
          {statCards.map(({ label, value, icon: Icon, color }) => (
            <Card key={label} className="border-0 shadow-sm">
              <CardContent className="flex items-center justify-between gap-4 p-4 sm:p-5">
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <p className="mt-2 text-2xl font-semibold sm:text-3xl">
                    {value}
                  </p>
                </div>
                <div className={`shrink-0 rounded-xl p-3 ${color}`}>
                  <Icon className="size-5" />
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {isLoading ? (
          <div className="flex min-h-64 items-center justify-center rounded-xl border bg-white">
            <LoaderCircle
              className="size-7 animate-spin text-purple-600"
              aria-label="Loading trips"
            />
          </div>
        ) : trips.length === 0 ? (
          <Card className="border-0 text-center shadow-sm">
            <CardContent className="px-4 py-16 sm:py-20">
              <Compass className="mx-auto mb-4 size-10 text-purple-500" />
              <h2 className="text-xl font-semibold">No trips yet</h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Create your first trip to see your travel overview.
              </p>
              <a
                className="mt-6 inline-flex items-center gap-2 font-medium text-purple-700 hover:underline"
                href="/trips/add"
              >
                Add a trip <ArrowRight className="size-4" />
              </a>
            </CardContent>
          </Card>
        ) : (
          <>
            <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card className="border-0 shadow-sm">
                <CardHeader className="border-b px-4 sm:px-6">
                  <CardTitle>Trip timeline</CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Your journeys, ordered by departure date
                  </CardDescription>
                </CardHeader>

                <CardContent className="max-h-124 overflow-y-auto px-4 py-5 sm:p-6">
                  <div className="relative space-y-5 before:absolute before:bottom-2 before:left-1.75 before:top-2 before:w-px before:bg-purple-200 sm:space-y-6">
                    {[...trips]
                      .sort(
                        (a, b) => new Date(a.startDate) - new Date(b.startDate),
                      )
                      .map((trip) => {
                        const status = statusStyles[getTripStatus(trip)];

                        return (
                          <a
                            href={`/trips/${trip._id}`}
                            key={trip._id}
                            className="group relative flex gap-3 pl-1 sm:gap-4"
                          >
                            <span className="z-10 mt-1.5 size-3 shrink-0 rounded-full border-2 border-white bg-purple-600 ring-1 ring-purple-300" />

                            <div className="min-w-0 flex-1 rounded-lg border p-3 transition-colors group-hover:border-purple-300 group-hover:bg-purple-50/50 sm:p-4">
                              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
                                <h3 className="min-w-0 wrap-break-word font-semibold">
                                  {trip.title}
                                </h3>

                                <Badge className={`w-fit ${status.className}`}>
                                  {status.label}
                                </Badge>
                              </div>

                              <p className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground sm:text-sm">
                                <CalendarDays className="size-4 shrink-0" />
                                {formatDate(trip.startDate)} -{" "}
                                {formatDate(trip.endDate)}
                              </p>

                              <p className="mt-2 flex items-start gap-1.5 text-xs text-muted-foreground sm:text-sm">
                                <MapPin className="mt-0.5 size-4 shrink-0" />
                                <span className="wrap-break-word">
                                  {(trip.destinations || []).join(", ") ||
                                    "No destination added"}
                                </span>
                              </p>
                            </div>
                          </a>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader className="border-b px-4 sm:px-6">
                  <CardTitle className="flex items-center gap-2">
                    <WalletCards className="size-5 shrink-0 text-purple-600" />
                    Total budget
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Combined budget across all your trips
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6 px-4 py-5 sm:space-y-7 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Spent</p>
                      <p className="mt-1 text-2xl font-semibold sm:text-3xl">
                        {currencyFormatter.format(budgetSummary.spent)}
                      </p>
                    </div>

                    <div className="sm:text-right">
                      <p className="text-sm text-muted-foreground">
                        Total budget
                      </p>
                      <p className="mt-1 text-lg font-medium sm:text-xl">
                        {currencyFormatter.format(budgetSummary.total)}
                      </p>
                    </div>
                  </div>

                  <Progress value={budgetProgress} className="gap-2" />

                  <div className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-muted-foreground">
                      {budgetProgress.toFixed(0)}% used
                    </span>

                    <span className="font-medium text-emerald-600">
                      {currencyFormatter.format(
                        Math.max(budgetSummary.total - budgetSummary.spent, 0),
                      )}{" "}
                      remaining
                    </span>
                  </div>

                  <div className="rounded-lg bg-purple-50 p-3 text-sm text-muted-foreground sm:p-4">
                    Your spending is based on the expense totals recorded for
                    every trip.
                  </div>
                </CardContent>
              </Card>
            </section>

            <Card className="border-0 shadow-sm">
              <CardHeader className="border-b px-4 sm:px-6">
                <CardTitle>Destinations</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Every place included in your trips
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-wrap gap-2 px-4 py-5 sm:p-6">
                {destinations.length ? (
                  destinations.map((destination) => (
                    <Badge
                      key={destination}
                      variant="outline"
                      className="h-8 max-w-full rounded-full px-3 text-sm"
                    >
                      <MapPin className="size-3.5 shrink-0" />
                      <span className="wrap-break-word">{destination}</span>
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No destinations added yet.
                  </p>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
