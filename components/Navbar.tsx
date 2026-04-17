"use client";

import { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("Home");
    const { scrollY } = useScroll();

  // 2. Transformations: Scroll barar sathe sathe ki change hobe
  // Scroll 0 thakle height 80px, 100px scroll korle height 64px hobe
  const height = useTransform(scrollY, [0, 100], [64, 64]);
  
  // Scroll 0 thakle background transparent, 100px scroll korle white hobe
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"]
  );

  // Scroll korle shadow asbe
  const boxShadow = useTransform(
    scrollY,
    [0, 100],
    ["none", "0px 4px 20px rgba(0, 0, 0, 0.05)"]
  );
  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Products", href: "#" },
    { name: "Services", href: "#" },
    { name: "About", href: "#" },
  ];

  return (
    <motion.nav 
    style={{ 
        height, 
        backgroundColor, 
        boxShadow,
      }}
    className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md ">
      <div className="container mx-auto px-4 lg:px-0 h-16 flex items-center justify-between">
        {/* 1. Left: Logo */}
          <a href="#" className="mb-4 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-2xl font-extrabold text-white shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </span>
            <span className="text-xl font-semibold tracking-tight">
              SOLANA
            </span>
          </a>

        {/* 2. Center: Desktop Nav Menu */}
        <div className="hidden md:flex items-center bg-gray-50/50 rounded-full px-2 py-1.5 border border-gray-100">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => setActiveTab(link.name)}
              className="relative px-6 py-2 text-sm font-medium transition-colors group"
            >
              {/* Active Background Animation */}
              {activeTab === link.name && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-white shadow-sm rounded-full"
                  transition={{ type: "spring", duration: 0.6 }}
                />
              )}
              
              {/* Text Animation: group-hover and origin-center strategy */}
              <span className={`relative z-10 transition-all duration-300 flex items-center gap-1 ${
                activeTab === link.name ? 'text-black font-bold' : 'text-gray-500 group-hover:text-black'
              }`}>
                <span className="transform transition-transform duration-300 group-hover:translate-x-1 origin-center">
                  {link.name}
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* 3. Right: Action Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button className="hidden md:block px-6 py-2 cursor-pointer bg-black text-white rounded-full text-sm font-bold shadow-lg hover:shadow-black/20 hover:-translate-y-0.5 transition-all active:scale-95">
            Get Started
          </button>

          {/* Mobile Menu Icon */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden h-10 w-10 flex flex-col items-center justify-center gap-1.5"
          >
            <motion.div 
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-black rounded-full origin-center" 
            />
            <motion.div 
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-black rounded-full" 
            />
            <motion.div 
              animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-black rounded-full origin-center" 
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, direction: 0.5 }}
            animate={{ opacity: 1, height: 'auto', direction: 0.5 }}
            exit={{ opacity: 0, height: 0, direction: 0.5 }}
            className="md:hidden bg-white/99 border-b border-gray-200 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                prefetch={false}
                onClick={() => setIsOpen(false)}
                  key={link.name} 
                  href={link.href}
                  className="font-bold text-gray-400 hover:text-black transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <button className="w-full py-2 bg-black text-white rounded-2xl font-bold">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;