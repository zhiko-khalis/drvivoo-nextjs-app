"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDownIcon, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Ingredients() {
  const { t, tString } = useLanguage();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Close modal on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setExpandedCategory(null);
      }
    };
    if (expandedCategory) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [expandedCategory]);

  const categoryKeys = ['multivitamins', 'immunity', 'sleep', 'focus'] as const;
  const emojis = ['⭐', '🛡', '😴', '🧠'];
  const accentColors = ['#5948D2', '#10B7AF', '#5948D2', '#10B7AF'];

  const getCategoryData = (key: typeof categoryKeys[number], index: number) => {
    const categoryData = t(`ingredients.categories.${key}`);
    if (typeof categoryData === 'string' || Array.isArray(categoryData)) {
      return null;
    }
    const data = categoryData as Record<string, unknown>;
    return {
      key,
      emoji: emojis[index],
      title: (typeof data.title === 'string' ? data.title : '') as string,
      description: (typeof data.description === 'string' ? data.description : '') as string,
      ingredients: Array.isArray(data.ingredients) ? data.ingredients as string[] : [],
      accentColor: accentColors[index],
    };
  };

  const categories = categoryKeys
    .map((key, index) => getCategoryData(key, index))
    .filter(Boolean) as Array<{
      key: string;
      emoji: string;
      title: string;
      description: string;
      ingredients: string[];
      accentColor: string;
    }>;

  return (
    <section id="ingredients" className="py-24 bg-linear-to-b from-white to-gray-50">
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
              style={{ backgroundColor: '#5948D2' }}
            >
              {tString('ingredients.badge')}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-6" style={{ color: '#5948D2' }}>
            {tString('ingredients.title')}
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full mb-6" style={{ backgroundColor: '#10B7AF' }}></div>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
            {tString('ingredients.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-opacity-50 cursor-pointer"
                onClick={() => setExpandedCategory(category.key)}
                whileHover={{ y: -5 }}
              >
                <div className="p-8">
                  <div className="flex flex-col items-center text-center">
                    <div
                      className="w-24 h-24 rounded-full flex items-center justify-center text-4xl mb-4 transition-all duration-300"
                      style={{ 
                        backgroundColor: `${category.accentColor}15`,
                      }}
                    >
                      <span>{category.emoji}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3" style={{ color: '#5948D2' }}>
                      {category.title}
                    </h3>
                    <div 
                      className="h-1 rounded-full mb-4 transition-all duration-300"
                      style={{ 
                        backgroundColor: category.accentColor,
                        width: '60px',
                      }}
                    ></div>
                    <p className="text-sm text-gray-600 mb-4 h-16 overflow-hidden">
                      {category.description.substring(0, 100)}...
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm" style={{ color: category.accentColor }}>
                      <span className="font-medium">{tString('ingredients.viewDetails')}</span>
                      <ChevronDownIcon className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
          ))}
        </div>

        {/* Modal Overlay with Blurred Background */}
        <AnimatePresence>
          {expandedCategory && (() => {
            const category = categories.find(c => c.key === expandedCategory || c.title === expandedCategory);
            if (!category) return null;
            
            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={() => setExpandedCategory(null)}
              >
                {/* Blurred Backdrop */}
                <motion.div
                  initial={{ backdropFilter: 'blur(0px)' }}
                  animate={{ backdropFilter: 'blur(8px)' }}
                  exit={{ backdropFilter: 'blur(0px)' }}
                  className="absolute inset-0 bg-black/30"
                />

                {/* Modal Content */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.4, type: 'spring', damping: 25 }}
                  className="relative bg-white rounded-2xl p-8 md:p-10 shadow-2xl border-2 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                  style={{ borderColor: category.accentColor }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setExpandedCategory(null)}
                    className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>

                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center text-4xl shrink-0"
                      style={{ backgroundColor: `${category.accentColor}15` }}
                    >
                      <span>{category.emoji}</span>
                    </div>
                    <div>
                      <h3 className="text-3xl mb-2" style={{ color: '#5948D2' }}>
                        {category.title}
                      </h3>
                      <div className="w-24 h-1 rounded-full" style={{ backgroundColor: category.accentColor }}></div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                    {category.description}
                  </p>

                  <div>
                    <h4 className="text-xl font-semibold mb-6" style={{ color: '#5948D2' }}>
                      {tString('ingredients.keyIngredients')}
                    </h4>
                    <ul className="space-y-4">
                      {category.ingredients.map((ingredient, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-start gap-4 text-gray-700"
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full mt-2 shrink-0"
                            style={{ backgroundColor: category.accentColor }}
                          ></span>
                          <span className="text-[17px] leading-relaxed">{ingredient}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>
    </section>
  );
}
