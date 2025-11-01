"use client";

import { ProductCard } from './ProductCard';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

interface Product {
  name: string;
  image: string;
  images?: string[];
  description: string;
}

interface ProductSectionProps {
  id: string;
  title: string;
  subtitle: string;
  products: Product[];
  accentColor: string;
}

export function ProductSection({
  id,
  title,
  subtitle,
  products,
  accentColor,
}: ProductSectionProps) {
  const { tString } = useLanguage();
  return (
    <section id={id} className="py-24 bg-linear-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span
              className="px-4 py-2 rounded-full text-sm text-white"
              style={{ backgroundColor: accentColor }}
            >
              {typeof subtitle === 'string' ? subtitle : tString(subtitle)}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4" style={{ color: '#5948D2' }}>
            {typeof title === 'string' ? title : tString(title)}
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: accentColor }}></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={product.name}
              name={product.name}
              image={product.image}
              images={product.images}
              description={product.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
