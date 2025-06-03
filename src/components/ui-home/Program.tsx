import Image from "next/image";

const programs = [
  {
    title: "Bahasa Inggris",
    description: "SD - SMP - SMA/K - UMUM",
    image: "/english.jpg",
  },
  {
    title: "Komputer/Coding",
    description: "SD - SMP - SMA/K - UMUM",
    image: "/coding.jpg",
  },
  {
    title: "Calistung",
    description: "Baca Tulis Hitung",
    image: "/calistung.jpg",
  },
  {
    title: "Matematika",
    description: "SD - SMP - SMA/K",
    image: "/math.jpg",
  },
];

const Program = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Program</h2>
          <div className="w-24 h-1 bg-red-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, index) => (
            <div key={index} className="group">
              <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <Image
                  src={program.image}
                  alt={program.title}
                  width={300}
                  height={200}
                  className="w-full object-cover h-[200px] transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="absolute bottom-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                    <p className="text-sm text-gray-200">
                      {program.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Program;
