import Image from "next/image";
import Link from "next/link";

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

          {/* CTA Button */}
          <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors font-medium">
            Daftar
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
