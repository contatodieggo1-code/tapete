'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ProductImageCarousel from './ProductImageCarousel';
import { ProductImageConfig } from '@/config/productImages';
import { Counter } from '@/app/page';

interface ProductCardProps {
  product: ProductImageConfig;
  className?: string;
}

export default function ProductCard({ product, className = "" }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const getBadgeColor = (color?: string) => {
    switch (color) {
      case 'emerald': return 'bg-emerald-500 text-white';
      case 'blue': return 'bg-blue-500 text-white';
      case 'purple': return 'bg-purple-500 text-white';
      case 'red': return 'bg-red-500 text-white';
      case 'pink': return 'bg-pink-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const handleWhatsAppClick = () => {
    const message = `Olá! Gostaria de comprar o ${product.name} ${product.size} (60 unidades) por R$ ${product.price.toFixed(2).replace('.', ',')}. Pode me enviar mais informações?`;
    const whatsappUrl = `https://wa.me/554198416124?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card className={`group hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 border-0 overflow-hidden bg-gradient-to-br ${
      product.popular ? 'from-blue-50 to-white' : 'from-emerald-50 to-white'
    } ${className}`}>
      <div className="relative">
        {/* Carrossel de Imagens */}
        <div className="relative h-64 lg:h-80 overflow-hidden">
          <ProductImageCarousel
            images={product.images}
            productName={product.name}
            productSize={product.size}
            autoPlay={true}
            autoPlayInterval={5000}
            className="w-full h-full"
          />
          
          {/* Badges */}
          <div className="absolute top-4 right-4 z-10 space-y-2">
            {product.badge && (
              <Badge className={`${getBadgeColor(product.badgeColor)} px-3 py-1 text-sm font-semibold shadow-lg`}>
                {product.badge}
              </Badge>
            )}
            {product.popular && (
              <Badge className="bg-red-500 text-white px-3 py-1 text-sm font-semibold shadow-lg animate-pulse">
                🔥 Mais Vendido
              </Badge>
            )}
          </div>

          {/* Badge de Economia */}
          <div className="absolute top-4 left-4 z-10">
            <Badge className="bg-yellow-500 text-white px-3 py-1 text-sm font-semibold shadow-lg">
              💎 Premium
            </Badge>
          </div>
        </div>
        
        {/* Degrade no fundo */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </div>
      
      <CardHeader className="pb-6">
        <CardTitle className="text-2xl lg:text-3xl font-bold text-gray-900">
          {product.name} {product.size}
        </CardTitle>
        <CardDescription className="text-lg text-gray-600 leading-relaxed">
          {product.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Características */}
        <div className="space-y-3">
          {product.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3 text-gray-700">
              <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-medium">{feature}</span>
            </div>
          ))}
        </div>
        
        <Separator />
        
        {/* Preço e CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="text-center sm:text-left">
            <div className="text-4xl lg:text-5xl font-bold text-primary">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </div>
            <div className="text-sm lg:text-base text-gray-500">
              À vista no PIX ou R$ {(product.price * 1.05).toFixed(2).replace('.', ',')} no cartão
            </div>
            <div className="text-xs text-emerald-600 font-medium mt-1">
              ✅ Frete grátis acima de R$ 200
            </div>
          </div>
          <Button 
            onClick={handleWhatsAppClick}
            className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
          >
            Comprar Agora
          </Button>
        </div>

        {/* Info adicional */}
        <div className={`p-4 rounded-lg ${
          product.popular ? 'bg-blue-50' : 'bg-emerald-50'
        }`}>
          <div className="flex items-center space-x-2 text-blue-800">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">
              Entrega em até 1 hora em Curitiba (Uber Moto)
            </span>
          </div>
        </div>

        {/* Estatísticas do produto */}
        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              <Counter end={product.popular ? 98 : 95} suffix="%" />
            </div>
            <div className="text-xs text-gray-500">Absorção</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">60</div>
            <div className="text-xs text-gray-500">Unidades</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">⭐</div>
            <div className="text-xs text-gray-500">Qualidade</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}