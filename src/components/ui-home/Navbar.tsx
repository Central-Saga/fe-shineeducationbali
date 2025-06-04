import Image from "next/image";
import Link from "next/link";
import { FiSearch } from "react-icons/fi"; // Pastikan sudah menginstall react-icons

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-[120px] h-[40px]">
              <Image
                src="/pichome/logo.png"
                alt="Shine Education Logo"
                fill
                sizes="120px"
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Cari kursus..."
                className="w-full px-4 py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:border-red-500"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-900 hover:text-red-600 font-medium"
            >
              Tentang Kami
            </Link>
            <Link
              href="/program"
              className="text-gray-900 hover:text-red-600 font-medium"
            >
              Program
            </Link>
            <Link
              href="/blog"
              className="text-gray-900 hover:text-red-600 font-medium"
            >
              Blog
            </Link>
            <Link
              href="/kontak"
              className="text-gray-900 hover:text-red-600 font-medium"
            >
              Kontak
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link
              href="/auth/login"
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Masuk
            </Link>
            <Link
              href="/auth/register"
              className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors font-medium"
            >
              Daftar
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
