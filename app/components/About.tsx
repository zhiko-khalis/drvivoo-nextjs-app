"use client";

import React from 'react';
import { motion } from 'motion/react';
import { Heart, ShieldCheck, Sparkles, Target } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function About() {
  const { tString } = useLanguage();

  const renderTextWithBreaks = (text: string) => {
    return text.split('<br />').map((line, index, array) => (
      <React.Fragment key={index}>
        {line}
        {index < array.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <section id="about" className="py-24 to-white">
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
              {tString('about.badge')}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4" style={{ color: '#5948D2' }}>
            {tString('about.title')}
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: '#10B7AF' }}></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl mb-6" style={{ color: '#5948D2' }}>
              {tString('about.subtitle')}
            </h3>
            <h3 className="text-xl mb-6" style={{ color: '#5948D2' }}>
              {tString('about.storyTitle')}
            </h3>
            <p className="text-gray-700 text-[17px] mb-4 leading-relaxed">
              {renderTextWithBreaks(tString('about.story'))}
            </p>
            <h3 className="text-xl mb-6" style={{ color: '#5948D2' }}>
              {tString('about.missionTitle')}
            </h3>
            <p className="text-gray-700 text-[17px] mb-4 leading-relaxed">
              {tString('about.mission')}
            </p>
            <h3 className="text-xl mb-6" style={{ color: '#5948D2' }}>
              {tString('about.visionTitle')}
            </h3>
            <p className="text-gray-700 text-[17px] leading-relaxed">
              {tString('about.vision')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1587132164684-cfd0b8214d8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBiYXIlMjB2aXRhbWluc3xlbnwxfHx8fDE3NjEyMjgzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Dr.VIVO Products"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-br from-[#5948D2]/20 via-transparent to-[#10B7AF]/20"></div>
            </div>
          </motion.div>
        </div>

        {/* Values/Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: '#5948D2' }}
            >
              <Heart className="text-white" size={28} />
            </div>
            <h3 className="text-xl mb-2 text-center" style={{ color: '#5948D2' }}>
              {tString('about.healthFirst')}
            </h3>
            <p className="text-gray-600 text-sm text-center">
              {tString('about.healthFirstDesc')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: '#10B7AF' }}
            >
              <Sparkles className="text-white" size={28} />
            </div>
            <h3 className="text-xl mb-2 text-center" style={{ color: '#5948D2' }}>
              {tString('about.premiumQuality')}
            </h3>
            <p className="text-gray-600 text-sm text-center">
              {tString('about.premiumQualityDesc')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: '#5948D2' }}
            >
              <Target className="text-white" size={28} />
            </div>
            <h3 className="text-xl mb-2 text-center" style={{ color: '#5948D2' }}>
              {tString('about.scienceDriven')}
            </h3>
            <p className="text-gray-600 text-sm text-center">
              {tString('about.scienceDrivenDesc')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: '#10B7AF' }}
            >
              <ShieldCheck className="text-white" size={28} />
            </div>
            <h3 className="text-xl mb-2 text-center" style={{ color: '#5948D2' }}>
              {tString('about.trustedBrand')}
            </h3>
            <p className="text-gray-600 text-sm text-center">
              {tString('about.trustedBrandDesc')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

