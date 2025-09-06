'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface OptimizedProductImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  productName: string;
  productSize: string;
  showPlaceholder?: boolean;
}

export default function OptimizedProductImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  productName,
  productSize,
  showPlaceholder = true
}: OptimizedProductImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {showPlaceholder && (!src || imageError) ? (
        // Placeholder para quando não há imagem real
        <div className="relative w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          {/* Conteúdo do placeholder */}
          <div className="text-center space-y-4 p-6">
            <div className="text-6xl md:text-8xl animate-float">📦</div>
            <div className="space-y-2">
              <div className="text-xl md:text-2xl font-bold text-gray-700">
                {productName}
              </div>
              <div className="text-lg md:text-xl text-gray-600 font-semibold">
                {productSize}
              </div>
              <div className="text-sm text-gray-500 italic">
                (Adicione sua foto real aqui)
              </div>
              <div className="text-xs text-gray-400 mt-2">
                Formatos recomendados: JPG, PNG ou WebP<br />
                Tamanho ideal: 800x800px
              </div>
            </div>
          </div>
          
          {/* Elementos decorativos animados */}
          <div className="absolute top-4 right-4 w-8 h-8 bg-blue-300 rounded-full opacity-30 blur-xl animate-pulse"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 bg-emerald-300 rounded-full opacity-30 blur-xl animate-pulse animation-delay-2000"></div>
          
          {/* Badge de instrução */}
          <div className="absolute top-4 left-4 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
            📸 Foto Placeholder
          </div>
        </div>
      ) : (
        // Imagem real com otimizações
        <>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={cn(
              "transition-all duration-700 ease-in-out object-cover",
              imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95",
              "hover:scale-105"
            )}
            onLoad={handleImageLoad}
            onError={handleImageError}
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={85}
          />
          
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-gray-400 text-4xl">📦</div>
              </div>
            </div>
          )}
          
          {/* Overlay de informações da imagem */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
            <div className="text-sm font-medium">{productName}</div>
            <div className="text-xs opacity-90">{productSize}</div>
          </div>
        </>
      )}
      
      {/* Badge de qualidade */}
      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700 shadow-lg">
        📷 Alta Qualidade
      </div>
    </div>
  );
}