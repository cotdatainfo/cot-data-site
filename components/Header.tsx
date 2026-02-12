'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HamburgerMenu from './HamburgerMenu';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Image 
              src="/logo.png" 
              alt="COT Data" 
              width={240} 
              height={70}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Dashboard
            </Link>
            <Link 
              href="/blog" 
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Blog
            </Link>
            <Link 
              href="/disclaimers" 
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Disclaimers
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Open menu"
            >
              <svg
                className="w-6 h-6 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <HamburgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}
