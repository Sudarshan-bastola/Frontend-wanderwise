import { Button } from "../components/ui/button"
import Navbar from "../components/common/Navbar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


const Contact = () => {
  return (
    <div>
      <Navbar />
      <Button> Click me</Button>
      <Button variant="destructive"> CLick me</Button>
      <HoverCard>
        <HoverCardTrigger>Hover</HoverCardTrigger>
        <HoverCardContent side="top" align="start">
          Content
          <img src="/AnimeImage.jpg" alt="hhikhki" />
        </HoverCardContent>
      </HoverCard>

      <div className="flex items-center justify-center">
        <Card className="w-80 m-10 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa"
            alt="Mustang, Nepal"
            className="w-full h-58 object-cover"
          />

          <CardHeader>
            <CardTitle>Mustang, Nepal</CardTitle>
            <CardDescription>
              Explore the beautiful landscapes, mountains, and traditional
              villages of Mustang.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-gray-600">
              🏔️ 5 Days &nbsp; • &nbsp; 📍 Nepal
            </p>
          </CardContent>

          <CardFooter>
            <button className="w-full rounded-md bg-violet-600 px-4 py-2 text-white hover:bg-violet-700 transition">
              Book Now
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Contact