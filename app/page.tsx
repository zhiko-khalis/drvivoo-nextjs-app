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
      images: ['/images/IMG_3551.JPG', '/images/Chocobar_v3.jpg', '/images/chocobar RG.jpg'],
      description: tString('productDescriptions.chocobars'),
    },
    {
      name: tString('productNames.miniChocobars'),
      image: '/images/minichocbar.PNG',
      images: ['/images/minichocbar.PNG','/images/IMG_3552.PNG','/images/minichocobar3.png'],
      description: tString('productDescriptions.miniChocobars'),
    },
    {
      name: tString('productNames.chocoballsBlister'),
      image: '/images/chocoballs blister.png',
      images: ['/images/chocoballs blister.png','/images/chocoballs blister2.jpg'],
      description: tString('productDescriptions.chocoballsBlister'),
    },
    {
      name: tString('productNames.chocoballs'),
      image: '/images/chocoballs.png',
      images: ['/images/chocoballs.png','/images/chocoballs2.jpg', '/images/Chocoball5.png', '/images/chocoballs3.jpg',],
      description: tString('productDescriptions.chocoballs'),
    },
    {
      name: tString('productNames.chocoCream'),
      image: '/images/chococreamss.png',
      images: ['/images/chococreamss.png',],
      description: tString('productDescriptions.chocoCream'),
    },
  ];

  // Hard Candy Line Products
  const hardCandyProducts = [
    {
      name: tString('productNames.lollipopsBig'),
      image: '/images/lollipops bigbox.png',
      images: ['/images/lollipops bigbox.png',],
      description: tString('productDescriptions.lollipopsBig'),
    },
    {
      name: tString('productNames.lollipopsMini'),
      image: '/images/Vitamin_Lollipop_.png',
      images: ['/images/Vitamin_Lollipop_.png',],
      description: tString('productDescriptions.lollipopsMini'),
    },
  ];

  // Soft Candy Line Products
  const softCandyProducts = [
    {
      name: tString('productNames.softchewBag'),
      image: '/images/softchew bag.png',
      images: ['/images/softchew bag.png',],
      description: tString('productDescriptions.softchewBag'),
    },
    {
      name: tString('productNames.softchewCube'),
      image: '/images/softchew cube.png',
      images: ['/images/softchew cube.png','/images/softchew cube2.png'],
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

      <Ingredients />
      <About />
      <Footer />
    </div>
  );
}
