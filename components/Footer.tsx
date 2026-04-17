'use client';
import { Mail } from 'lucide-react';
import { Phone } from 'lucide-react';
import { MapPin } from 'lucide-react';
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-8 w-full overflow-hidden pt-16 pb-8">
      <div className="pointer-events-none absolute top-0 left-1/2 z-0 h-full w-full -translate-x-1/2 select-none">
        <div className="absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-primary/20 blur-3xl"></div>
        <div className="absolute right-1/4 -bottom-24 h-80 w-80 rounded-full bg-primary/20 blur-3xl"></div>
      </div>
      <div className="glass relative flex container mx-auto flex-col gap-8 rounded-2xl px-4 lg:px-0 py-10 md:flex-row md:items-start md:justify-between md:gap-12">
        <div className="flex flex-col items-center md:items-start">
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
          <p className="text-foreground mb-6 max-w-xs text-center text-sm md:text-left">
            Mvpblocks provides a set of reusable components and utilities to
            help you create beautiful and responsive user interfaces quickly and
            efficiently.
          </p>
         <div className="flex space-x-12">
            <Link
              prefetch={false}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-600 bg-gray-800 hover:shadow-md hover:shadow-slate-500 hover:transition hover:duration-300 hover:ease-in-out"
              href="#"
            >
              <Phone className="size-4 text-white" />
            </Link>
            <Link
              prefetch={false}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-600 bg-gray-800 hover:shadow-md hover:shadow-slate-500 hover:transition hover:duration-300 hover:ease-in-out"
              href="#"
            >
              <Mail className="size-4 text-white" />
            </Link>
            <Link
              prefetch={false}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-gray-800 hover:shadow-md hover:shadow-slate-500 hover:transition hover:duration-300 hover:ease-in-out"
              href="#"
            >
              <MapPin className="size-4 text-white" />
            </Link>
          </div>
        </div>
        <nav className="flex w-full flex-wrap gap-16 md:w-auto md:flex-row ">
          <div>
            <div className="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
              Product
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-foreground/70">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70">
                  Integrations
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70">
                  Updates
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
              Company
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-foreground/70">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
              Resources
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-foreground/70">
                  Docs
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70">
                  Security
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="text-foreground relative z-10 mt-10 text-center text-xs">
        <span>&copy; 2025 Mvpblocks. All rights reserved.</span>
      </div>
    </footer>
  );
}
