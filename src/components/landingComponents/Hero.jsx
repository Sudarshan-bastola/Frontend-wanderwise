import CustomButton from "../common/CustomButton";


const Hero = () => {
  return (
    <div className="relative">
      {/* image */}
      <div className="w-full h-[89vh] overflow-hidden flex items-end">
        <img
          src="/AnimeImage.jpg"
          alt="Wanderwise hero section"
          className="w-full"
        />
      </div>

      {/* overlay */}
      <div className="w-full h-[89vh] bg-black absolute top-0 opacity-35"></div>

      {/* content */}
      <div className="absolute top-0 w-full h-[89vh] flex items-center justify-center">
        <div className="w-1/2 mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-600">
            Plan your trips with wanderwise
          </h1>
          <p className="text-white mt-4 text-lg leading-6 tracking-normal">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Temporibus, nisi dignissimos! Ullam repudiandae laudantium assumenda
            modi accusantium obcaecati ut fuga consequuntur, neque autem
            necessitatibus nostrum.
          </p>
          <div className="space-x-4">
            <CustomButton className="mt-6" text="Get Started" />
            <CustomButton className="mt-6" text="Learn more" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
