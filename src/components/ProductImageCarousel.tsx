'use client';

import { useState } from 'react';
import OptimizedProductImage from './OptimizedProductImage';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

interface ProductImageCarouselProps {
  images: ProductImage[];
  productName: string;
  productSize: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

export default function ProductImageCarousel({
  images,
  productName,
  productSize,
  autoPlay = true,
  autoPlayInterval = 4000,
  className = ""
}: ProductImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useState(() => {
    if (!autoPlay || images.length <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  });

  // Se não houver imagens, mostrar placeholder
  if (!images || images.length === 0) {
    return (
      <div className={className}>
        <OptimizedProductImage
          src=""
          alt={`${productName} ${productSize}`}
          width={800}
          height={800}
          productName={productName}
          productSize={productSize}
          showPlaceholder={true}
        />
      </div>
    );
  }

  return (
    <div className={`relative group ${className}`}>
      {/* Imagem atual */}
      <div className="relative overflow-hidden rounded-xl">
        <OptimizedProductImage
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          width={800}
          height={800}
          productName={productName}
          productSize={productSize}
          showPlaceholder={false}
          priority={currentIndex === 0}
        />
        
        {/* Caption */}
        {images[currentIndex].caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm text-white p-3">
            <p className="text-sm text-center">{images[currentIndex].caption}</p>
          </div>
        )}
      </div>

      {/* Navigation arrows - apenas se houver mais de uma imagem */}
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
            onClick={nextSlide}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </>
      )}

      {/* Indicators - apenas se houver mais de uma imagem */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Ir para imagem ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Image counter */}
      {images.length > 1 && (
        <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded-full text-xs">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}