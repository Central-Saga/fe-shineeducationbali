"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, ChevronDown, Home, BookOpen, Info, FileText, 
  Menu, X, Briefcase, UserPlus, LogIn
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    { name: "Beranda", href: "/", icon: Home },
    { name: "Program", href: "/programs", icon: BookOpen },
    { name: "About Us", href: "/about", icon: Info },
    { name: "Blog", href: "/blog", icon: FileText },
    { 
      name: "Lainnya", 
      href: "#", 
      icon: Briefcase,
      isDropdown: true, 
      subItems: [
        { name: "Job Vacancies", href: "/job-vacancies", icon: Briefcase },
        { name: "Job Applications", href: "/job-applications", icon: UserPlus },
      ]
    },
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
                  className={`rounded-full transition-all duration-300 pl-10 pr-4 outline-none focus:outline-none
                    ${isScrolled ? "bg-white/80" : "bg-white/90"}
                    ${
                      isSearchFocused
                        ? "border-2 border-[#C40503]"
                        : "border border-gray-200 hover:border-gray-300"
                    }
                    focus:ring-0 focus:ring-offset-0`}
                />
                <Search
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                    isSearchFocused ? "text-[#C40503]" : "text-gray-400"
                  }`}
                />
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                    className="relative"
                  >
                    {item.isDropdown ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="flex items-center gap-2 text-gray-600 hover:text-[#C40503] transition-colors duration-300"
                          >
                            <Icon className="h-4 w-4" />
                            {item.name}
                            <ChevronDown className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-48">
                          {item.subItems?.map((subItem) => {
                            const SubIcon = subItem.icon;
                            return (
                              <DropdownMenuItem key={subItem.name} asChild>
                                <Link
                                  href={subItem.href}
                                  className="flex items-center gap-2 w-full"
                                >
                                  <SubIcon className="h-4 w-4" />
                                  {subItem.name}
                                </Link>
                              </DropdownMenuItem>
                            );
                          })}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <Link
                        href={item.href}
                        className="flex items-center gap-2 text-gray-600 hover:text-[#C40503] transition-colors duration-300"
                      >
                        <Icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/auth/login">
                  <Button variant="ghost" className="text-[#C40503] flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Masuk
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/auth/register">
                  <Button className="bg-[#C40001] text-white hover:shadow-lg transition-shadow duration-300 hover:shadow-[#C40001]/20 flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Daftar
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="md:hidden"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </motion.div>
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
                  <Input
                    type="text"
                    placeholder="Cari program..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className={`rounded-full transition-all duration-300 pl-10 pr-4 outline-none focus:outline-none
                      ${
                        isSearchFocused
                          ? "border-2 border-[#C40503]"
                          : "border border-gray-200 hover:border-gray-300"
                      }
                      focus:ring-0 focus:ring-offset-0`}
                  />
                  <Search
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                      isSearchFocused ? "text-[#C40503]" : "text-gray-400"
                    }`}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item.isDropdown ? (
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2 text-gray-600 font-medium py-2">
                            <Icon className="h-4 w-4" />
                            {item.name}
                          </div>
                          <div className="ml-6 flex flex-col gap-2">
                            {item.subItems?.map((subItem) => {
                              const SubIcon = subItem.icon;
                              return (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className="flex items-center gap-2 text-gray-600 hover:text-[#C40503] transition-colors duration-300 py-1"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  <SubIcon className="h-4 w-4" />
                                  {subItem.name}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className="flex items-center gap-2 text-gray-600 hover:text-[#C40503] transition-colors duration-300 py-2"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Icon className="h-4 w-4" />
                          {item.name}
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
                <div className="flex flex-col gap-2 pt-4 border-t">
                  <Link href="/auth/login">
                    <Button
                      variant="ghost"
                      className="w-full text-[#DAA521] flex items-center gap-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <LogIn className="h-4 w-4" />
                      Masuk
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button
                      className="w-full bg-[#C40001] text-white hover:shadow-lg transition-shadow duration-300 hover:shadow-[#C40001]/20 flex items-center gap-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <UserPlus className="h-4 w-4" />
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
