import { Star } from "lucide-react"


const OurMission = () => {
  return (
    <section className="px-80 py-24 bg-linear-to-b from-slate-950 to-slate-900 text-white">
      <h2 className="text-4xl font-bold text-center mb-10"> Our mission</h2>
      <p className="text-xl italic font-semibold text-center mb-18">
        Our mission is to make sure users can plan <br />
        trips with their friends and family. Plan their itinerary,manage their
        baggage,
        <br /> and discover new experiences together.
      </p>

      <div className="grid grid-cols-3 gap-20 ">
        <div className="border-r border-white p-6  text-center">
          <p className="text-4xl font-black">300+</p>
          <p className="text-xl mt-2 italic font-semibold">Clients Served</p>
        </div>
        <div className=" p-6 text-center">
          <p className="flex gap-1 items-center justify-center text-4xl font-black">
            4.8 <Star size={30} />
          </p>
          <p className="text-xl mt-2 italic font-semibold"> Overall Ratings</p>
        </div>
        <div className=" border-l border-white p-6 text-center">
          <p className="text-4xl font-black">20+</p>
          <p className="text-xl mt-2 italic font-semibold">Countries Linked</p>
        </div>
      </div>
    </section>
  );
}

export default OurMission