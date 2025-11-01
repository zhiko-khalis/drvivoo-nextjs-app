"use client";

import { useState, useEffect } from 'react';
import { Sparkles, Heart, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Hero() {
  const { tString } = useLanguage();
  const backgroundImages = [
    'url(https://images.unsplash.com/photo-1660819882138-a286c97c7669?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwdml0YW1pbnMlMjB3ZWxsbmVzc3xlbnwxfHx8fDE3NjEyMjgzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)',
    'url(/images/IMG_3551.JPG)',
    'url(/images/IMG_3552.PNG)',
    // 'url(/images/IMG_3553.PNG)',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const scrollToProducts = () => {
    const element = document.getElementById('chocolate');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        {backgroundImages.map((imageUrl, index) => (
          <div
            key={index}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: imageUrl,
              opacity: index === currentImageIndex ? 1 : 0,
              zIndex: 0,
            }}
          />
          
        ))}
        <div className="absolute inset-0 bg-linear-to-br from-[#5948D2]/90 via-[#5948D2]/80 to-[#10B7AF]/80"></div>
      </div>

      {/* Fixed Overlay - stays on top of carousel */}
      {/* <div className="absolute inset-0 bg-linear-to-br from-[#5948D2]/90 via-[#5948D2]/80 to-[#10B7AF]/80 z-[1]"></div> */}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="inline-flex   items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
          <Sparkles size={20} className="text-white" />
          <span className="text-white">{tString('hero.badge')}</span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl text-white mb-6 max-w-4xl mx-auto">
          {tString('hero.title')}
          <br />
          {/* <span style={{ color: '#10B7AF' }}>Delicious Wellness</span> */}
        </h1>

        <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
          {tString('hero.description')}
        </p>

        {/* <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            onClick={scrollToProducts}
            size="lg"
            className="rounded-full text-lg px-8"
            style={{ backgroundColor: '#10B7AF' }}
          >
            Explore Products
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full text-lg px-8 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
          >
            Learn More
          </Button>
        </div> */}

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: '#10B7AF' }}
            >
              <Heart className="text-white" size={28} />
            </div>
            <h3 className="text-xl text-white mb-2">{tString('hero.vitaminEnriched')}</h3>
            <p className="text-white/80">
              {tString('hero.vitaminEnrichedDesc')}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: '#10B7AF' }}
            >
              <ShieldCheck className="text-white" size={28} />
            </div>
            <h3 className="text-xl text-white mb-2">{tString('hero.qualityAssured')}</h3>
            <p className="text-white/80">
              {tString('hero.qualityAssuredDesc')}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: '#10B7AF' }}
            >
              <Sparkles className="text-white" size={28} />
            </div>
            <h3 className="text-xl text-white mb-2">{tString('hero.deliciousTaste')}</h3>
            <p className="text-white/80">
              {tString('hero.deliciousTasteDesc')}
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
