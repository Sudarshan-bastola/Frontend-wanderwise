import { Button } from "../components/ui/button";
import Navbar from "../components/common/Navbar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="flex flex-col items-center gap-6 px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <Button className="w-full sm:w-auto">Click me</Button>
          <Button variant="destructive" className="w-full sm:w-auto">
            Click me
          </Button>
        </div>

        <HoverCard>
          <HoverCardTrigger className="cursor-pointer">Hover</HoverCardTrigger>
          <HoverCardContent
            side="top"
            align="start"
            className="w-[calc(100vw-2rem)] max-w-sm"
          >
            Content
            <img
              src="/AnimeImage.jpg"
              alt="hhikhki"
              className="mt-2 h-48 w-full rounded-md object-cover"
            />
          </HoverCardContent>
        </HoverCard>

        <div className="flex w-full items-center justify-center">
          <Card className="m-4 w-full max-w-sm overflow-hidden sm:m-6">
            <img
              src="https://images.unsplash.com/photo-1544735716-392fe2489ffa"
              alt="Mustang, Nepal"
              className="h-56 w-full object-cover sm:h-64"
            />

            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="text-xl sm:text-2xl">
                Mustang, Nepal
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Explore the beautiful landscapes, mountains, and traditional
                villages of Mustang.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-4 sm:px-6">
              <p className="text-sm text-gray-600">
                🏔️ 5 Days &nbsp; • &nbsp; 📍 Nepal
              </p>
            </CardContent>

            <CardFooter className="px-4 pb-4 sm:px-6">
              <button className="w-full rounded-md bg-violet-600 px-4 py-2 text-white transition hover:bg-violet-700">
                Book Now
              </button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
