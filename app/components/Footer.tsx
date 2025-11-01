"use client";

import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Footer() {
  const { tString } = useLanguage();
  return (
    <footer id="contact" className="bg-linear-to-br from-[#5948D2] to-[#10B7AF] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-white">Dr</span>
              </div>
              <span className="text-2xl">Dr.VIVO</span>
            </div>
            <p className="text-white/80 mb-4">
              {tString('footer.description')}
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg mb-4">{tString('footer.productLines')}</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <a href="#chocolate" className="hover:text-white transition-colors">
                  {tString('products.chocolate.title')}
                </a>
              </li>
              <li>
                <a href="#hard-candy" className="hover:text-white transition-colors">
                  {tString('products.lollipops.title')}
                </a>
              </li>
              <li>
                <a href="#soft-candy" className="hover:text-white transition-colors">
                  {tString('products.softchew.title')}
                </a>
              </li>
              <li>
                <a href="#jelly" className="hover:text-white transition-colors">
                  {tString('products.jelly.title')}
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg mb-4">{tString('footer.company')}</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {tString('footer.aboutUs')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {tString('footer.ourStory')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {tString('footer.qualityStandards')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {tString('footer.careers')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg mb-4">{tString('footer.contactUs')}</h3>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-center gap-2">
                <Mail size={18} />
                <a href="mailto:info@drvivo.com" className="hover:text-white transition-colors">
                  info@drvivo.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} />
                <a href="tel:+1234567890" className="hover:text-white transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={18} className="mt-1" />
                <span>123 Wellness Avenue, Health City, HC 12345</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/80 text-sm">
            <p>{tString('footer.copyright')}</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                {tString('footer.privacyPolicy')}
              </a>
              <a href="#" className="hover:text-white transition-colors">
                {tString('footer.termsOfService')}
              </a>
              <a href="#" className="hover:text-white transition-colors">
                {tString('footer.cookiePolicy')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
