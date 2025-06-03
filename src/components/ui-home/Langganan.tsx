const plans = [
  {
    name: "Paket Bulanan",
    price: "55.000",
    duration: "1 Bulan",
    features: ["Start From IDR 55.000", "Durasi 1 Bulan", "4 kali pertemuan"],
  },
  {
    name: "Paket Cerdas",
    price: "150.000",
    duration: "3 Bulan",
    features: ["Start From IDR 150.000", "Durasi 3 Bulan", "3 mata pelajaran"],
  },
  {
    name: "Paket Triwulanan",
    price: "165.000",
    duration: "3 Bulan",
    features: ["Start From IDR 165.000", "Durasi 3 Bulan", "12 kali pertemuan"],
  },
];

const Langganan = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Biaya Langganan & Fasilitas
          </h2>
          <p className="text-gray-600">
            Temukan paket bimbingan yang tepat untuk kebutuhan belajar Anda!
          </p>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold text-center mb-4">
                  {plan.name}
                </h3>
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold">Rp {plan.price}</span>
                  <span className="text-gray-600">/{plan.duration}</span>
                </div>
                <ul className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full mt-8 bg-red-600 text-white py-2 rounded-full hover:bg-red-700 transition-colors">
                  Pilih Paket
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
            </div>
            <h4 className="font-semibold mb-2">Akses Program Lengkap</h4>
            <p className="text-sm text-gray-600">
              Optimasi semua program dengan berbagai program
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                ></path>
              </svg>
            </div>
            <h4 className="font-semibold mb-2">Modul Up to Date</h4>
            <p className="text-sm text-gray-600">
              Materi yang selalu diperbarui
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            <h4 className="font-semibold mb-2">Konsultasi Gratis</h4>
            <p className="text-sm text-gray-600">
              Konsultasi dengan pengajar kapan saja
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <h4 className="font-semibold mb-2">Wifi</h4>
            <p className="text-sm text-gray-600">
              Internet cepat untuk belajar online
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Langganan;
