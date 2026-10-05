import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import CustomButton from "./CustomButton";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between border border-green-500 bg-purple-400 px-4 py-4 md:px-8 lg:px-20">
      <div>
        <h1 className="text-2xl font-bold text-fuchsia-900 md:text-3xl lg:text-4xl">
          Wanderwise
        </h1>
      </div>

      <div className="flex items-center gap-3 sm:gap-5 md:gap-8 lg:gap-10">
        <nav className="hidden space-x-6 font-semibold text-base transition [&>a]:hover:text-purple-500 md:flex lg:space-x-10 lg:text-lg">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>

        <div className="hidden sm:block">
          <CustomButton text="log in" link="/login" />
        </div>

        <Drawer swipeDirection="right">
          <DrawerTrigger
            className="md:hidden"
            render={<Button variant="outline" size="icon" />}
          >
            <Menu />
          </DrawerTrigger>

          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="text-3xl font-bold">
                WanderWise
              </DrawerTitle>
              <DrawerDescription>
                CLick on any of the links to navigate.
              </DrawerDescription>
            </DrawerHeader>

            <div className="flex flex-col gap-3 p-4">
              <a className="w-full" href="/">
                <Button variant="secondary" className="h-12 w-full text-lg">
                  Home
                </Button>
              </a>

              <a className="w-full" href="/about">
                <Button variant="secondary" className="h-12 w-full text-lg">
                  About
                </Button>
              </a>

              <a className="w-full" href="/contact">
                <Button variant="secondary" className="h-12 w-full text-lg">
                  Contact
                </Button>
              </a>
            </div>

            <DrawerFooter>
              <CustomButton text="log in" link="/login" />

              <DrawerClose render={<Button variant="outline" />}>
                Cancel
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  );
};

export default Navbar;
