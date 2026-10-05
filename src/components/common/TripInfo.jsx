import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  Calendar,
  Clock,
  DollarSign,
  Edit,
  MapPin,
  Trash2,
  User,
  Users,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import api from "@/api/axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../lib/utils";

const TripInfo = ({ trip }) => {
  const navigate = useNavigate();

  const deleteTrip = async () => {
    try {
      const response = await api.delete(`/trips/${trip._id}`);
      toast.success("Trip deleted successfully!");
      navigate("/trips");
    } catch (err) {
      console.error(err);
      toast.error("Some error occured");
    }
  };

  const calculateDaysUntilTrip = () => {
    if (!trip) return 0;
    const today = new Date();
    const startDate = new Date(trip.startDate);
    const diffTime = startDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateTripDuration = () => {
    if (!trip) return 0;
    const startDate = new Date(trip.startDate);
    const endDate = new Date(trip.endDate);
    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getBudgetProgress = () => {
    if (!trip) return 0;
    return (trip.budget.spent / trip.budget.total) * 100;
  };

  const getRemainingBudget = () => {
    if (!trip) return 0;
    return trip.budget.total - trip.budget.spent;
  };

  const daysUntilTrip = calculateDaysUntilTrip();
  const tripDuration = calculateTripDuration();
  const budgetProgress = getBudgetProgress();
  const remainingBudget = getRemainingBudget();

  return (
    <Card className="mb-6 w-full">
      <CardHeader className="px-4 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <CardTitle className="mb-2 wrap-break-word text-2xl font-bold text-gray-900 sm:text-3xl">
              {trip.title}
            </CardTitle>

            <CardDescription className="wrap-break-word text-base sm:text-lg">
              {trip.description}
            </CardDescription>
          </div>

          <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto md:shrink-0">
            <a
              href={`/trips/${trip._id}/itinerary`}
              className="w-full sm:w-auto"
            >
              <Button variant="outline" size="sm" className="w-full">
                <Edit className="mr-2 h-4 w-4" />
                Edit Trip
              </Button>
            </a>

            <Button
              variant="outline"
              size="sm"
              onClick={deleteTrip}
              className="w-full text-red-600 hover:bg-red-50 hover:text-red-600 sm:w-auto"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 px-4 sm:px-6">
        <div className="flex flex-col gap-3 rounded-lg bg-blue-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-3">
            <Clock className="h-6 w-6 shrink-0 text-blue-600" />

            <div>
              <p className="font-semibold text-blue-900">
                {daysUntilTrip > 0
                  ? `${daysUntilTrip} days until departure`
                  : daysUntilTrip === 0
                    ? "Departing today!"
                    : "Trip in progress"}
              </p>

              <p className="text-sm text-blue-700">{tripDuration} day trip</p>
            </div>
          </div>

          <Badge
            variant={daysUntilTrip > 0 ? "secondary" : "default"}
            className="w-fit"
          >
            {daysUntilTrip > 0
              ? "Upcoming"
              : daysUntilTrip === 0
                ? "Today"
                : "Active"}
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-center space-x-3 rounded-lg border p-4">
            <Calendar className="h-6 w-6 shrink-0 text-green-600" />

            <div className="min-w-0">
              <p className="font-semibold">Start Date</p>
              <p className="text-gray-600">{formatDate(trip.startDate)}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 rounded-lg border p-4">
            <Calendar className="h-6 w-6 shrink-0 text-red-600" />

            <div className="min-w-0">
              <p className="font-semibold">End Date</p>
              <p className="text-gray-600">{formatDate(trip.endDate)}</p>
            </div>
          </div>
        </div>

        <div className="border-b-2 pb-8">
          <div className="mb-3 flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Destinations</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {trip.destinations.map((destination, index) => (
              <Badge
                key={index}
                variant="outline"
                className="max-w-full px-3 py-1 wrap-break-word"
              >
                {destination}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-semibold">Budget Overview</h3>
          </div>

          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-gray-50 p-4 text-center">
              <p className="text-sm text-gray-600">Total Budget</p>
              <p className="text-2xl font-bold text-gray-900">
                ${trip.budget.total}
              </p>
            </div>

            <div className="rounded-lg bg-red-50 p-4 text-center">
              <p className="text-sm text-gray-600">Spent</p>
              <p className="text-2xl font-bold text-red-600">
                ${trip.budget.spent}
              </p>
            </div>

            <div className="rounded-lg bg-green-50 p-4 text-center">
              <p className="text-sm text-gray-600">Remaining</p>
              <p className="text-2xl font-bold text-green-600">
                ${remainingBudget}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Budget Progress</span>
              <span>{budgetProgress.toFixed(1)}%</span>
            </div>

            <Progress value={budgetProgress} className="h-2" />
          </div>
        </div>

        {trip.budget.expenses.length > 0 && (
          <div>
            <h4 className="mb-3 font-semibold">Recent Expenses</h4>

            <div className="space-y-2">
              {trip.budget.expenses.map((expense, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 rounded-lg bg-gray-50 p-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="wrap-break-word font-medium">
                      {expense.name}
                    </p>

                    <p className="text-sm text-gray-600">
                      {new Date(expense.date).toLocaleString()}
                    </p>
                  </div>

                  <p className="font-semibold sm:shrink-0">${expense.amount}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {trip.collaborators.length > 0 && (
          <div>
            <div className="mb-3 flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-semibold">Collaborators</h3>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {trip.collaborators.map((member, index) => (
                <div
                  key={index}
                  className="flex min-w-0 items-center space-x-4 rounded-lg bg-gray-50 p-2"
                >
                  <div className="shrink-0 rounded-full bg-amber-400 p-2">
                    <User className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm wrap-break-word">{member.name}</p>

                    <span className="block truncate text-xs text-gray-400">
                      {member.email}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TripInfo;
