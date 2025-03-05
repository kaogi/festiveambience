"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Animation for navigation links
const navLinkVariants = {
  hover: {
    scale: 1.1,
    textShadow: "0px 0px 8px rgb(255,255,255)",
    transition: {
      duration: 0.3,
      yoyo: Infinity
    }
  }
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
          >
            <span className="text-purple-900 font-bold text-xl">F</span>
          </motion.div>
          <span className="text-xl font-bold">Festive Window Projections</span>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex space-x-8">
          <motion.div whileHover="hover" variants={navLinkVariants}>
            <Link href="/" className="hover:text-purple-300 transition-colors">
              Home
            </Link>
          </motion.div>
          <motion.div whileHover="hover" variants={navLinkVariants}>
            <Link href="/videos" className="hover:text-purple-300 transition-colors">
              Videos
            </Link>
          </motion.div>
          <motion.div whileHover="hover" variants={navLinkVariants}>
            <Link href="/playlists" className="hover:text-purple-300 transition-colors">
              Playlists
            </Link>
          </motion.div>
          
          {/* Dropdown menu for interactive tools */}
          <div className="relative group">
            <motion.div whileHover="hover" variants={navLinkVariants} className="cursor-pointer">
              <span className="hover:text-purple-300 transition-colors">
                Interactive Tools
              </span>
            </motion.div>
            <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left z-50">
              <div className="py-1">
                <Link href="/interactive/window-visualizer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100">
                  3D Window Visualizer
                </Link>
                <Link href="/interactive/festive-catch" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100">
                  Festive Catch Game
                </Link>
                <Link href="/interactive/projection-creator" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100">
                  Projection Creator
                </Link>
              </div>
            </div>
          </div>
          
          <motion.div whileHover="hover" variants={navLinkVariants}>
            <Link href="/about" className="hover:text-purple-300 transition-colors">
              About
            </Link>
          </motion.div>
        </nav>

        {/* Menu Button - Mobile */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center p-2 rounded hover:bg-indigo-800 transition-colors"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-indigo-800"
        >
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-3 py-3">
              <Link 
                href="/" 
                className="px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/videos" 
                className="px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Videos
              </Link>
              <Link 
                href="/playlists" 
                className="px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Playlists
              </Link>
              
              {/* Interactive Tools Section */}
              <div className="px-4 py-2 font-medium">Interactive Tools:</div>
              <Link 
                href="/interactive/window-visualizer" 
                className="px-8 py-2 rounded hover:bg-indigo-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                3D Window Visualizer
              </Link>
              <Link 
                href="/interactive/festive-catch" 
                className="px-8 py-2 rounded hover:bg-indigo-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Festive Catch Game
              </Link>
              <Link 
                href="/interactive/projection-creator" 
                className="px-8 py-2 rounded hover:bg-indigo-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Projection Creator
              </Link>
              
              <Link 
                href="/about" 
                className="px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header; 