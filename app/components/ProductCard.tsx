"use client";

import * as React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from './ui/carousel';
import { useLanguage } from '../contexts/LanguageContext';

interface ProductCardProps {
  name: string;
  image: string;
  images?: string[];
  description: string;
  index: number;
}

export function ProductCard({ name, image, images, description, index }: ProductCardProps) {
  const { tString } = useLanguage();
  const [open, setOpen] = React.useState(false);
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi | null>(null);

  React.useEffect(() => {
    if (!open || !carouselApi || !(images && images.length > 1)) return;

    const intervalId = window.setInterval(() => {
      carouselApi.scrollNext();
    }, 3000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [open, carouselApi, images]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
        <div className="relative aspect-square overflow-hidden bg-linear-to-br from-gray-50 to-gray-100">
          <ImageWithFallback
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 right-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
              style={{ backgroundColor: '#10B7AF' }}
            >
              <span className="text-white text-xs">NEW</span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-lg mb-2" style={{ color: '#5948D2' }}>
            {name}
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            {description}
          </p>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<button
						className="w-full py-3 rounded-full transition-all duration-300 hover:shadow-lg"
						style={{ backgroundColor: '#5948D2', color: 'white' }}
					>
						{tString('products.more')}
					</button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-2xl">
					<DialogHeader>
						<DialogTitle>{name}</DialogTitle>
						<DialogDescription>
							{tString('products.detailedInfo')}
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4">
						{images && images.length > 0 ? (
							<div className="relative">
								<Carousel className="w-full" setApi={setCarouselApi} opts={{ loop: true }}>
									<CarouselContent>
										{images.map((imgSrc, idx) => (
											<CarouselItem key={idx}>
												<div className="w-full h-72 rounded-lg overflow-hidden">
													<ImageWithFallback
														src={imgSrc}
														alt={`${name} image ${idx + 1}`}
														className="w-full h-full object-cover"
													/>
												</div>
											</CarouselItem>
										))}
									</CarouselContent>
								</Carousel>
							</div>
						) : (
							<div className="w-full rounded-lg overflow-hidden">
								<ImageWithFallback
									src={image}
									alt={name}
									className="w-full h-64 object-cover"
								/>
							</div>
						)}
						<p className="text-gray-700 leading-relaxed">
							{description}
						</p>
					</div>
				</DialogContent>
			</Dialog>
        </div>
      </div>
    </motion.div>
  );
}
