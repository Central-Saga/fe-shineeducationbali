import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/pichome/logo.jpg"
              alt="Shine Education Logo"
              width={150}
              height={40}
              priority
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-red-600">
              Tentang Kami
            </Link>
            <Link href="/program" className="text-gray-700 hover:text-red-600">
              Program
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-red-600">
              Blog
            </Link>
            <Link href="/kontak" className="text-gray-700 hover:text-red-600">
              Kontak
            </Link>
          </div>

          {/* CTA Button */}
          <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors">
            Daftar
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
