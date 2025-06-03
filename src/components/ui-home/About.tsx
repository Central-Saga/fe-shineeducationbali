import Image from "next/image";

const About = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-[#C40503] font-bold mb-4">Tentang Kami</h2>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <Image
              src="/pichome/logo.jpg"
              alt="Students Learning"
              width={500}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>

          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold mb-4 text-gray-600">Shine Education</h3>
            <p className="text-gray-600 mb-6">
              Shine Education adalah lembaga pendidikan di Tabanan yang
              mengutamakan kursus dan bimbingan belajar dalam semua jenjang
              pendidikan. Dengan pengajar yang berkualitas dan metode
              pembelajaran yang efektif, kami membantu siswa untuk:
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center ">
                <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                <span>Meningkatkan prestasi akademik</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-600 rounded-full mr-2 "></span>
                <span>Mengembangkan potensi diri</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                <span>Mempersiapkan untuk ujian</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                <span>Meningkatkan kemampuan bahasa</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
