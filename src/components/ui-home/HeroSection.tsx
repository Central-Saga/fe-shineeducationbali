import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="pt-24 pb-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left Content */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-black">Smart Learning</span>
              <br />
              <span className="text-yellow-500">Bright Future</span>
            </h1>
            <p className="text-gray-600 mb-8">
              Di Shine Education, kami menyediakan format dan bimbingan belajar
              di berbagai mata pelajaran untuk membantu siswa dalam mencapai
              tujuan akademik mereka.
            </p>
            <button className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition-colors">
              Mulai Belajar
            </button>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2">
            <Image
              src="/hero-student.png"
              alt="Student Learning"
              width={500}
              height={500}
              className="rounded-lg"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
