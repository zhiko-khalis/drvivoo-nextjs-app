"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
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
        {/* <div className="inline-flex   items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
          <Sparkles size={20} className="text-white" />
          <span className="text-white">{tString('hero.badge')}</span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl text-white mb-6 max-w-4xl mx-auto">
          {tString('hero.title')}
          <br />
          <span style={{ color: '#10B7AF' }}>Delicious Wellness</span>
        </h1>

        <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
          {tString('hero.description')}
        </p> */}

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
        {/* <div className="grid grid-cols-1 md:grid-cols-3 translate-y-48 gap-8 max-w-4xl mx-auto">
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
        </div> */}
      </div>

      {/* Decorative Wave - Dr.VIVO Logo with Vitamin Images */}
      <div className="absolute bottom-0 top-0 md:top-32 left-0 right-0 flex items-center justify-center">
        <div className="relative">
          {/* Main Wave Image */}
          <div className="wave-animation relative z-10">
            <Image
              src="/Wave_Dr.VIVO.svg"
              alt="Dr.VIVO Wave"
              width={500}
              height={500}
              className="w-80 sm:w-80 md:w-96 lg:w-[500px] h-auto drop-shadow-2xl"
              style={{
                filter: 'drop-shadow(0 10px 30px rgba(255, 255, 255, 0.3))',
              }}
              priority
            />
          </div>

          {/* Vitamin Images Floating Around */}
          <Image
            src="/Vitamin_A.png"
            alt="Vitamin A"
            width={80}
            height={80}
            className="vitamin-image vitamin-float-1 w-12 sm:w-16 md:w-20 h-auto"
            style={{
              top: '-10%',
              left: '15%',
            }}
          />
          <Image
            src="/Vitamin_B6.png"
            alt="Vitamin B6"
            width={80}
            height={80}
            className="vitamin-image vitamin-float-2 w-12 sm:w-16 md:w-20 h-auto"
            style={{
              top: '20%',
              right: '10%',
            }}
          />
          <Image
            src="/Vitamin_B9.png"
            alt="Vitamin B9"
            width={80}
            height={80}
            className="vitamin-image vitamin-float-3 w-12 sm:w-16 md:w-20 h-auto"
            style={{
              bottom: '15%',
              left: '5%',
            }}
          />
          <Image
            src="/Vitamin_B12.png"
            alt="Vitamin B12"
            width={80}
            height={80}
            className="vitamin-image vitamin-float-4 w-12 sm:w-16 md:w-20 h-auto"
            style={{
              top: '5%',
              right: '20%',
            }}
          />
          <Image
            src="/Vitamin_C.png"
            alt="Vitamin C"
            width={80}
            height={80}
            className="vitamin-image vitamin-float-5 w-12 sm:w-16 md:w-20 h-auto"
            style={{
              bottom: '25%',
              right: '5%',
            }}
          />
          <Image
            src="/Vitamin_D.png"
            alt="Vitamin D"
            width={80}
            height={80}
            className="vitamin-image vitamin-float-6 w-12 sm:w-16 md:w-20 h-auto"
            style={{
              top: '30%',
              left: '-5%',
            }}
          />
          <Image
            src="/Vitamin_E.png"
            alt="Vitamin E"
            width={80}
            height={80}
            className="vitamin-image vitamin-float-7 w-12 sm:w-16 md:w-20 h-auto"
            style={{
              bottom: '5%',
              right: '25%',
            }}
          />
          
         
        </div>

         {/* Swiss Flag */}
         <div
            className="absolute vitamin-image vitamin-float-8 w-28 sm:w-32 md:w-40 h-auto"
            style={{
              // top: '5%',
              // right: '5%',
              bottom: '5%',
              right: '7%',
            }}
          >
            <Image
              src="/swissQuality.png"
              alt="Swiss Flag"
              width={150}
              height={150}
              className="drop-shadow-lg"
              style={{
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
              }}
            />
          </div>
      </div>
    </section>
  );
}
