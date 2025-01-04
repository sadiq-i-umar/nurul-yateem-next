const HeroSection = () => {
  const green = "#006837";
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 py-10 md:py-20 P items-center bg-[#FDFDFD] relative">
      <div className="flex flex-col gap-6 ">
        <p className={`font-semibold text-[#006837]`}>
          EMPOWERING OPRHANS FOR A BRIGHT FUTURE
        </p>
        <p
          className="text-4xl md:text-6xl leading-snug"
          style={{ fontFamily: "Poppins Extra Bold" }}
        >
          Turning Compassion into Opportunities for Orphaned Children
        </p>
        <button className="w-fit text-white bg-[#006837] px-5 py-4 font-semibold rounded-md">
          Sponsor a child today
        </button>
      </div>
      <div className="hidden lg:flex justify-center">
        <div
          style={{ backgroundImage: "url('/hero_children.jpg')" }}
          className="rounded-full w-[455px] h-[455px] bg-cover bg-center relative top-10"
        >
          <img
            src="/circle.png"
            className="absolute top-[-50px] right-[-30px]"
          />
          <img
            src="/circle-distorted.png"
            className="absolute top-[-150px] right-[20px]"
          />
          <img
            src="/circle-filled.png"
            className="absolute top-[0px] right-[-20px]"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
