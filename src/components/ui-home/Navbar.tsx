"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Beranda", href: "/" },
    { name: "Program", href: "/programs" },
    { name: "Tentang Kami", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Lowongan Kerja", href: "/job-vacancies" },
    { name: "Lamaran Kerja", href: "/job-applications" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-lg border-b border-[#C40503]/10"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Link href="/">
                <Image
                  src="/pichome/logo.png"
                  alt="Shine Education"
                  width={120}
                  height={40}
                  className="h-12 w-auto"
                />
              </Link>
            </motion.div>

            {/* Search Bar - Moved to left */}
            <motion.div
              className="hidden md:flex items-center relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="relative w-64">
                <Input
                  type="text"
                  placeholder="Cari program..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className={`rounded-full transition-all duration-300 pl-4 pr-10 outline-none focus:outline-none
                    ${isScrolled ? "bg-white/80" : "bg-white/90"}
                    ${
                      isSearchFocused
                        ? "border-2 border-[#C40503]"
                        : "border border-gray-200 hover:border-gray-300"
                    }
                    focus:ring-0 focus:ring-offset-0`}
                />
                <svg
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                    isSearchFocused ? "text-[#C40503]" : "text-gray-400"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-[#C40503] transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/auth/login">
                  <Button variant="ghost" className="text-[#C40503]">
                    Masuk
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/auth/register">
                  <Button className="bg-gradient-to-r from-[#C40503] to-[#DAA625] text-white hover:shadow-lg transition-shadow duration-300 hover:shadow-[#C40503]/20">
                    Daftar
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-20 left-0 right-0 z-40 bg-white/90 backdrop-blur-md shadow-lg"
          >
            <div className="container mx-auto px-4 py-4">
              {/* Mobile Search */}
              <div className="mb-4">
                <div className="relative">
                  {" "}
                  <Input
                    type="text"
                    placeholder="Cari program..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className={`rounded-full transition-all duration-300 pl-4 pr-10 outline-none focus:outline-none
                      ${
                        isSearchFocused
                          ? "border-2 border-[#C40503]"
                          : "border border-gray-200 hover:border-gray-300"
                      }
                      focus:ring-0 focus:ring-offset-0`}
                  />
                  <svg
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                      isSearchFocused ? "text-[#C40503]" : "text-gray-400"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="text-gray-600 hover:text-[#C40503] transition-colors duration-300 block py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <div className="flex flex-col gap-2 pt-4 border-t">
                  <Link href="/auth/login">
                    <Button
                      variant="ghost"
                      className="w-full text-[#C40503]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Masuk
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button
                      className="w-full bg-gradient-to-r from-[#C40503] to-[#DAA625] text-white hover:shadow-lg transition-shadow duration-300 hover:shadow-[#C40503]/20"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Daftar
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
