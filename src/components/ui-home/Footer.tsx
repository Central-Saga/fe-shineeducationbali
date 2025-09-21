import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  MapPin, Phone, Mail, Twitter, Facebook, Instagram, 
  Home, BookOpen, FileText, MessageCircle 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#FFF7F3] text-black">
      <div className="container mx-auto px-2 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Image
              src="/pichome/logo.png"
              alt="Shine Education Logo"
              width={150}
              height={40}
              className="mb-4"
            />
            <p className="text-sm mb-4">
              Shine Education adalah lembaga pendidikan di Tabanan yang fokus
              pada pengembangan potensi siswa melalui berbagai program
              pembelajaran yang efektif.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="hover:text-[#C40503]">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-[#C40503]">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-[#C40503]">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-black font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-[#C40503] flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/program" className="hover:text-[#C40503] flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Program
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#C40503] flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-[#C40503] flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-black font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 mt-1" />
                <span>Jl. Kesiman No.123, Tabanan, Bali</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>info@shineeducation.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-black mt-12 pt-8 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Shine Education. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
