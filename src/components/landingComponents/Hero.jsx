import CustomButton from "../common/CustomButton";

const Hero = () => {
  return (
    <div className="relative">
      <div className="flex h-[70vh] w-full items-end overflow-hidden sm:h-[80vh] md:h-[89vh]">
        <img
          src="/AnimeImage.jpg"
          alt="Wanderwise hero section"
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="absolute top-0 h-[70vh] w-full bg-black opacity-35 sm:h-[80vh] md:h-[89vh]"></div>

      <div className="absolute top-0 flex h-[70vh] w-full items-center justify-center px-4 sm:h-[80vh] sm:px-6 md:h-[89vh] md:px-8">
        <div className="mx-auto w-full max-w-3xl text-center">
          <h1 className="text-3xl font-bold text-gray-200 sm:text-4xl md:text-5xl lg:text-6xl">
            Plan your trips with wanderwise
          </h1>

          <p className="mt-4 text-sm leading-6 tracking-normal text-white sm:text-base md:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Temporibus, nisi dignissimos! Ullam repudiandae laudantium assumenda
            modi accusantium obcaecati ut fuga consequuntur, neque autem
            necessitatibus nostrum.
          </p>

          <div className="mt-2 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <CustomButton
              className="mt-4 w-full sm:mt-6 sm:w-auto"
              text="Get Started"
            />
            <CustomButton
              className="mt-2 w-full sm:mt-6 sm:w-auto"
              text="Learn more"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
