"use client";

import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Ingredients } from './components/Ingredients';
import { ProductSection } from './components/ProductSection';
import { Footer } from './components/Footer';
import { useLanguage } from './contexts/LanguageContext';

export default function App() {
  const { tString } = useLanguage();

  // Chocolate Line Products
  const chocolateProducts = [
    {
      name: tString('productNames.chocobars'),
      image: '/images/IMG_3551.JPG',
      images: ['/images/IMG_3551.JPG', '/images/IMG_3552.PNG', '/images/IMG_3553.PNG'],
      description: tString('productDescriptions.chocobars'),
    },
    {
      name: tString('productNames.miniChocobars'),
      image: '/images/IMG_3552.PNG',
      images: ['/images/IMG_3552.PNG', '/images/IMG_3551.JPG', '/images/IMG_3553.PNG'],
      description: tString('productDescriptions.miniChocobars'),
    },
    {
      name: tString('productNames.chocoballsBlister'),
      image: '/images/IMG_3553.PNG',
      images: ['/images/IMG_3553.PNG', '/images/IMG_3551.JPG', '/images/IMG_3552.PNG'],
      description: tString('productDescriptions.chocoballsBlister'),
    },
    {
      name: tString('productNames.chocoballs'),
      image: '/images/IMG_3551.JPG',
      images: ['/images/IMG_3551.JPG', '/images/IMG_3552.PNG', '/images/IMG_3553.PNG'],
      description: tString('productDescriptions.chocoballs'),
    },
    {
      name: tString('productNames.chocoCream'),
      image: '/images/IMG_3552.PNG',
      images: ['/images/IMG_3552.PNG', '/images/IMG_3551.JPG', '/images/IMG_3553.PNG'],
      description: tString('productDescriptions.chocoCream'),
    },
  ];

  // Hard Candy Line Products
  const hardCandyProducts = [
    {
      name: tString('productNames.lollipopsBig'),
      image: '/images/IMG_3553.PNG',
      images: ['/images/IMG_3553.PNG', '/images/IMG_3552.PNG', '/images/IMG_3551.JPG'],
      description: tString('productDescriptions.lollipopsBig'),
    },
    {
      name: tString('productNames.lollipopsMini'),
      image: '/images/IMG_3551.JPG',
      images: ['/images/IMG_3551.JPG', '/images/IMG_3553.PNG', '/images/IMG_3552.PNG'],
      description: tString('productDescriptions.lollipopsMini'),
    },
  ];

  // Soft Candy Line Products
  const softCandyProducts = [
    {
      name: tString('productNames.softchewBag'),
      image: '/images/IMG_3552.PNG',
      images: ['/images/IMG_3552.PNG', '/images/IMG_3553.PNG', '/images/IMG_3551.JPG'],
      description: tString('productDescriptions.softchewBag'),
    },
    {
      name: tString('productNames.softchewCube'),
      image: '/images/IMG_3553.PNG',
      images: ['/images/IMG_3553.PNG', '/images/IMG_3552.PNG', '/images/IMG_3551.JPG'],
      description: tString('productDescriptions.softchewCube'),
    },
  ];

  // Jelly Line Products
  const jellyProducts = [
    {
      name: tString('productNames.jellyBag'),
      image: '/images/IMG_3551.JPG',
      images: ['/images/IMG_3551.JPG', '/images/IMG_3552.PNG', '/images/IMG_3553.PNG'],
      description: tString('productDescriptions.jellyBag'),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <About />
      <Ingredients />

      <ProductSection
        id="chocolate"
        title={tString('products.chocolate.title')}
        subtitle={tString('products.chocolate.subtitle')}
        products={chocolateProducts}
        accentColor="#5948D2"
      />

      <ProductSection
        id="hard-candy"
        title={tString('products.lollipops.title')}
        subtitle={tString('products.lollipops.subtitle')}
        products={hardCandyProducts}
        accentColor="#10B7AF"
      />

      <ProductSection
        id="soft-candy"
        title={tString('products.softchew.title')}
        subtitle={tString('products.softchew.subtitle')}
        products={softCandyProducts}
        accentColor="#5948D2"
      />

      <ProductSection
        id="jelly"
        title={tString('products.jelly.title')}
          subtitle={tString('products.jelly.subtitle')}
        products={jellyProducts}
        accentColor="#10B7AF"
      />

      <Footer />
    </div>
  );
}
