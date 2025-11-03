"use client";

import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, tString } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <img
              src="/DrVIVO Logo.svg"
              alt="Dr.VIVO Logo"
              className="w-12 h-12 rounded-full object-cover"
            />
            {/* <span className="text-2xl" style={{ color: isScrolled ? '#5948D2' : '#fff' }}>
              Dr.VIVO
            </span> */}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('home')}
              className="hover:opacity-70 transition-opacity cursor-pointer"
              style={{ color: isScrolled ? '#5948D2' : '#fff' }}
            >
              {tString('nav.home')}
            </button>
           
          
            <button
              onClick={() => scrollToSection('chocolate')}
              className="hover:opacity-70 transition-opacity cursor-pointer"
              style={{ color: isScrolled ? '#5948D2' : '#fff' }}
            >
              {tString('nav.chocolate')}
            </button>
            <button
              onClick={() => scrollToSection('hard-candy')}
              className="hover:opacity-70 transition-opacity cursor-pointer"
              style={{ color: isScrolled ? '#5948D2' : '#fff' }}
            >
              {tString('nav.lollipops')}
            </button>
            <button
              onClick={() => scrollToSection('soft-candy')}
              className="hover:opacity-70 transition-opacity cursor-pointer"
              style={{ color: isScrolled ? '#5948D2' : '#fff' }}
            >
              {tString('nav.softchew')}
            </button>
            <button
              onClick={() => scrollToSection('jelly')}
              className="hover:opacity-70 transition-opacity cursor-pointer"
              style={{ color: isScrolled ? '#5948D2' : '#fff' }}
            >
              {tString('nav.jelly')}
            </button>
            <button
              onClick={() => scrollToSection('ingredients')}
              className="hover:opacity-70 transition-opacity cursor-pointer"
              style={{ color: isScrolled ? '#5948D2' : '#fff' }}
            >
              {tString('nav.ingredients')}
            </button>

            <button
              onClick={() => scrollToSection('about')}
              className="hover:opacity-70 transition-opacity cursor-pointer"
              style={{ color: isScrolled ? '#5948D2' : '#fff' }}
            >
              {tString('nav.about')}
            </button>
            <Button
              className="rounded-full cursor-pointer"
              style={{ backgroundColor: '#10B7AF' }}
              onClick={() => scrollToSection('contact')}
            >
              {tString('nav.contact')}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="hover:opacity-70 transition-opacity cursor-pointer flex items-center gap-1"
                  style={{ color: isScrolled ? '#5948D2' : '#fff' }}
                >
                  <Globe size={18} />
                  <span>{language === 'en' ? 'EN' : language === 'ar' ? 'AR' : 'TR'}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('ar')}>
                  العربية
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('tr')}>
                  Türkçe
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ color: isScrolled ? '#5948D2' : '#fff' }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 py-4 flex flex-col justify-center items-center space-y-3">
            <button
              onClick={() => scrollToSection('home')}
              className="block w-full text-center py-2 hover:opacity-70 transition-opacity cursor-pointer"
              style={{ color: '#5948D2' }}
            >
              {tString('nav.home')}
            </button>
           
            <button
              onClick={() => scrollToSection('chocolate')}
              className="block w-full text-center py-2 hover:opacity-70 transition-opacity cursor-pointer"
              style={{ color: '#5948D2' }}
            >
              {tString('nav.chocolate')}
            </button>
            <button
              onClick={() => scrollToSection('hard-candy')}
              className="block w-full text-center py-2 hover:opacity-70 transition-opacity cursor-pointer"
              style={{ color: '#5948D2' }}
            >
              {tString('nav.lollipops')}
            </button>
            <button
              onClick={() => scrollToSection('soft-candy')}
              className="block w-full text-center py-2 hover:opacity-70 transition-opacity cursor-pointer"
              style={{ color: '#5948D2' }}
            >
              {tString('nav.softchew')}
            </button>
            <button
              onClick={() => scrollToSection('jelly')}
              className="block w-full text-center py-2 hover:opacity-70 transition-opacity cursor-pointer"
              style={{ color: '#5948D2' }}
            >
              {tString('nav.jelly')}
            </button>
            
            <button
              onClick={() => scrollToSection('ingredients')}
              className="block w-full text-center py-2 hover:opacity-70 transition-opacity cursor-pointer"
              style={{ color: '#5948D2' }}
            >
              {tString('nav.ingredients')}
            </button>

            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-center py-2 hover:opacity-70 transition-opacity cursor-pointer"
              style={{ color: '#5948D2' }}
            >
              {tString('nav.about')}
            </button>
            <Button
              className="w-full rounded-full"
              style={{ backgroundColor: '#10B7AF' }}
              onClick={() => scrollToSection('contact')}
            >
              {tString('nav.contact')}
            </Button>

            <div className="w-full flex items-center justify-center gap-2 py-2">
              <Globe size={18} style={{ color: '#5948D2' }} />
              <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-1 rounded transition-opacity cursor-pointer ${
                  language === 'en' ? 'bg-[#5948D2] text-white' : 'text-[#5948D2]'
                }`}
              >
                English
              </button>
              <span className="text-[#5948D2]">|</span>
              <button
                onClick={() => setLanguage('ar')}
                className={`px-4 py-1 rounded transition-opacity cursor-pointer ${
                  language === 'ar' ? 'bg-[#5948D2] text-white' : 'text-[#5948D2]'
                }`}
              >
                العربية
              </button>
              <span className="text-[#5948D2]">|</span>
              <button
                onClick={() => setLanguage('tr')}
                className={`px-4 py-1 rounded transition-opacity cursor-pointer ${
                  language === 'tr' ? 'bg-[#5948D2] text-white' : 'text-[#5948D2]'
                }`}
              >
                Türkçe
              </button>
            </div>

          </div>
        </div>
      )}
    </nav>
  );
}
