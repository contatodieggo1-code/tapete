'use client';

import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const heroTexts = [
    'Qualidade Premium para seu Pet',
    'Super Absorvente e Antivazamento',
    'Entrega Rápida em Curitiba'
  ];

  const heroRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const howToBuyRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Smooth scroll para navegação
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setMobileMenuOpen(false);
    }
  };

  // Efeito de scroll para header fixo
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Detectar seção ativa com Intersection Observer
      const sections = [
        { id: 'inicio', ref: heroRef },
        { id: 'produtos', ref: productsRef },
        { id: 'beneficios', ref: benefitsRef },
        { id: 'como-comprar', ref: howToBuyRef },
        { id: 'contato', ref: contactRef }
      ];

      for (const section of sections) {
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Efeito de texto digitado
  useEffect(() => {
    const currentText = heroTexts[currentIndex];
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex <= currentText.length) {
        setTypedText(currentText.substring(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % heroTexts.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [currentIndex]);

  // Contador animado
  const Counter = ({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      const increment = end / (duration / 16);
      let current = 0;

      const counterInterval = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(counterInterval);
        } else {
          setCount(Math.floor(current));
        }
      }, 16);

      return () => clearInterval(counterInterval);
    }, [end, duration]);

    return (
      <span className="text-3xl md:text-4xl font-bold text-primary">
        {count}{suffix}
      </span>
    );
  };

  // Componente de imagem otimizada
  const OptimizedImage = ({ 
    src, 
    alt, 
    width, 
    height, 
    className = "",
    priority = false 
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
    priority?: boolean;
  }) => {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`transition-all duration-500 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          onLoad={() => setImageLoaded(true)}
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="text-gray-400">📦</div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      {/* Header Fixo com Design Aprimorado */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
          : 'bg-transparent'
      }`}>
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <span className="text-white font-bold text-lg md:text-xl">TH</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent leading-tight">
                  Tapetes<br className="md:hidden" />
                  <span className="hidden md:inline"> </span>Higiênicos
                </span>
                <div className="text-xs text-gray-500 hidden sm:block">Premium</div>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {[
                { id: 'inicio', label: 'Início', icon: '🏠' },
                { id: 'produtos', label: 'Produtos', icon: '📦' },
                { id: 'beneficios', label: 'Benefícios', icon: '✨' },
                { id: 'como-comprar', label: 'Como Comprar', icon: '🛒' },
                { id: 'contato', label: 'Contato', icon: '📞' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative group px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    activeSection === item.id 
                      ? 'text-blue-600' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <span className="flex items-center space-x-1">
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </span>
                  {activeSection === item.id && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full animate-pulse" />
                  )}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full transition-all duration-300 group-hover:w-full"></div>
                </button>
              ))}
            </div>

            {/* WhatsApp Button Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button 
                onClick={() => window.open('https://wa.me/554198416124', '_blank')}
                className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold px-6 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>WhatsApp</span>
                <Badge className="ml-2 bg-red-500 text-white text-xs">Online</Badge>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className={`w-4 h-0.5 bg-gray-600 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                <div className={`w-4 h-0.5 bg-gray-600 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-4 h-0.5 bg-gray-600 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
            mobileMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
          }`}>
            <div className="space-y-2 pt-4">
              {[
                { id: 'inicio', label: 'Início', icon: '🏠' },
                { id: 'produtos', label: 'Produtos', icon: '📦' },
                { id: 'beneficios', label: 'Benefícios', icon: '✨' },
                { id: 'como-comprar', label: 'Como Comprar', icon: '🛒' },
                { id: 'contato', label: 'Contato', icon: '📞' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center space-x-3 ${
                    activeSection === item.id 
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                      : 'hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
              <div className="px-4 pt-4">
                <Button 
                  onClick={() => window.open('https://wa.me/554198416124', '_blank')}
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold py-3 rounded-full shadow-lg flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>Falar no WhatsApp</span>
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section com Design Aprimorado */}
      <section id="inicio" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background com animações avançadas */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-emerald-50">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-32 right-10 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-10 left-1/2 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>
          
          {/* Grid pattern sutil */}
          <div className="absolute inset-0 opacity-5">
            <div className="h-full w-full" style={{
              backgroundImage: `radial-gradient(circle, #3b82f6 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen py-20">
            {/* Conteúdo */}
            <div className="space-y-6 lg:space-y-8">
              {/* Badges */}
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="px-4 py-2 text-sm bg-blue-100 text-blue-700 border-blue-200">
                  🐾 Especialistas em Higiene Pet
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm bg-emerald-100 text-emerald-700 border-emerald-200">
                  ✅ Entrega Rápida
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm bg-purple-100 text-purple-700 border-purple-200">
                  ⭐ Qualidade Premium
                </Badge>
              </div>

              {/* Título Principal */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  <span className="text-gray-900">Tapetes Higiênicos</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-shift">
                    {typedText}
                  </span>
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                  Proporcionando o melhor em <span className="font-semibold text-blue-600">higiene e conforto</span> para seu pet. 
                  Tapetes <span className="font-semibold text-emerald-600">super absorventes</span>, antivazamento e com 
                  <span className="font-semibold text-purple-600"> neutralizador de odores</span>.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
                <Button 
                  size="lg"
                  onClick={() => window.open('https://wa.me/554198416124', '_blank')}
                  className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold px-8 lg:px-10 py-4 lg:py-5 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 text-lg"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>Pedir Agora</span>
                  <Badge className="ml-2 bg-red-500 text-white text-xs animate-pulse">24h</Badge>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => scrollToSection('produtos')}
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-8 lg:px-10 py-4 lg:py-5 rounded-full transition-all duration-300 text-lg"
                >
                  Ver Produtos
                </Button>
              </div>

              {/* Estatísticas */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8">
                <div className="text-center group">
                  <div className="text-3xl lg:text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                    <Counter end={1500} suffix="+" />
                  </div>
                  <p className="text-sm lg:text-base text-gray-600">Clientes Satisfeitos</p>
                </div>
                <div className="text-center group">
                  <div className="text-3xl lg:text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                    <Counter end={4.9} suffix="★" />
                  </div>
                  <p className="text-sm lg:text-base text-gray-600">Avaliação Média</p>
                </div>
                <div className="text-center group">
                  <div className="text-3xl lg:text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                    <Counter end={1} suffix="h" />
                  </div>
                  <p className="text-sm lg:text-base text-gray-600">Entrega Rápida</p>
                </div>
              </div>

              {/* Benefícios Rápidos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl">💧</div>
                  <div>
                    <div className="font-semibold text-blue-900">95% Absorção</div>
                    <div className="text-sm text-blue-700">Super absorvente</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg">
                  <div className="text-2xl">🛡️</div>
                  <div>
                    <div className="font-semibold text-emerald-900">Antivazamento</div>
                    <div className="text-sm text-emerald-700">Proteção total</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Imagem Hero com Placeholder para Foto Real */}
            <div className="relative lg:pl-8">
              <div className="relative">
                {/* Card Principal */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 transform hover:scale-105 transition-transform duration-500">
                  <div className="aspect-square bg-gradient-to-br from-blue-100 via-purple-50 to-emerald-100 rounded-2xl overflow-hidden relative">
                    {/* Placeholder para imagem real do produto */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="text-8xl animate-float">📦</div>
                        <div className="space-y-2">
                          <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                            Tapete Premium
                          </div>
                          <div className="text-lg text-gray-600">
                            Super Absorvente
                          </div>
                          <div className="text-sm text-gray-500">
                            (Coloque sua foto real aqui)
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Elementos decorativos */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-yellow-400 rounded-full opacity-60 blur-xl"></div>
                    <div className="absolute bottom-4 left-4 w-12 h-12 bg-blue-400 rounded-full opacity-60 blur-xl"></div>
                  </div>
                </div>

                {/* Cards Flutuantes */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl shadow-xl transform rotate-12 hover:rotate-6 transition-transform duration-500 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-3xl font-bold">60x60</div>
                    <div className="text-xs">cm</div>
                  </div>
                </div>
                
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl shadow-xl transform -rotate-12 hover:-rotate-6 transition-transform duration-500 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-3xl font-bold">80x60</div>
                    <div className="text-xs">cm</div>
                  </div>
                </div>

                {/* Badge de Destaque */}
                <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-lg animate-pulse">
                    <span className="text-sm font-bold">🔥 Mais Vendido</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Indicador de scroll animado */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-2 animate-bounce">
            <div className="text-gray-400 text-sm">Role para baixo</div>
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Produtos com Cards Aprimorados */}
      <section id="produtos" ref={productsRef} className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm bg-blue-100 text-blue-700 border-blue-200">
              📦 Nossos Produtos
            </Badge>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
              Escolha o Tamanho
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                Ideal para seu Pet
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Tapetes higiênicos de <span className="font-semibold text-blue-600">alta qualidade</span> com tecnologia 
              avançada de absorção e neutralização de odores. 
              <span className="font-semibold text-emerald-600"> Entrega rápida</span> em toda Curitiba.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Produto 1 - 60x60cm */}
            <Card className="group hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 border-0 overflow-hidden bg-gradient-to-br from-blue-50 to-white">
              <div className="relative">
                {/* Imagem do Produto */}
                <div className="relative h-64 lg:h-80 bg-gradient-to-br from-blue-100 to-blue-200 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="text-8xl lg:text-9xl animate-float">📦</div>
                      <div className="space-y-1">
                        <div className="text-3xl lg:text-4xl font-bold text-blue-800">60x60cm</div>
                        <div className="text-lg text-blue-600">Ideal para pequenos e médios</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Badge de Popularidade */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-emerald-500 text-white px-3 py-1 text-sm font-semibold shadow-lg">
                      ⭐ Mais Vendido
                    </Badge>
                  </div>

                  {/* Badge de Economia */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-500 text-white px-3 py-1 text-sm font-semibold shadow-lg">
                      🔥 Oferta
                    </Badge>
                  </div>
                </div>
                
                {/* Degrade no fundo */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-50 to-transparent"></div>
              </div>
              
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Tapete Higiênico 60x60cm
                </CardTitle>
                <CardDescription className="text-lg text-gray-600 leading-relaxed">
                  Perfeito para cães pequenos e médios, filhotes e gatos. 
                  Ideal para apartamentos e espaços reduzidos.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Características */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-700">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-medium">60 unidades por pacote</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-medium">Super absorvente (95% capacidade)</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-medium">Com antibacteriano e antifúngico</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-medium">Neutralizador de odores avançado</span>
                  </div>
                </div>
                
                <Separator />
                
                {/* Preço e CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="text-center sm:text-left">
                    <div className="text-4xl lg:text-5xl font-bold text-primary">
                      R$ 95,00
                    </div>
                    <div className="text-sm lg:text-base text-gray-500">
                      À vista no PIX ou R$ 99,90 no cartão
                    </div>
                    <div className="text-xs text-emerald-600 font-medium mt-1">
                      ✅ Frete grátis acima de R$ 200
                    </div>
                  </div>
                  <Button 
                    onClick={() => window.open('https://wa.me/554198416124?text=Olá! Gostaria de comprar o Tapete Higiênico 60x60cm (60 unidades) por R$ 95,00. Pode me enviar mais informações?', '_blank')}
                    className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
                  >
                    Comprar Agora
                  </Button>
                </div>

                {/* Info adicional */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 text-blue-800">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">
                      Entrega em até 1 hora em Curitiba (Uber Moto)
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Produto 2 - 80x60cm */}
            <Card className="group hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 border-0 overflow-hidden bg-gradient-to-br from-emerald-50 to-white">
              <div className="relative">
                {/* Imagem do Produto */}
                <div className="relative h-64 lg:h-80 bg-gradient-to-br from-emerald-100 to-emerald-200 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="text-8xl lg:text-9xl animate-float">📦</div>
                      <div className="space-y-1">
                        <div className="text-3xl lg:text-4xl font-bold text-emerald-800">80x60cm</div>
                        <div className="text-lg text-emerald-600">Ideal para grandes porte</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Badge de Tamanho */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-blue-500 text-white px-3 py-1 text-sm font-semibold shadow-lg">
                      📏 Tamanho Extra
                    </Badge>
                  </div>

                  {/* Badge de Premium */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-purple-500 text-white px-3 py-1 text-sm font-semibold shadow-lg">
                      💎 Premium
                    </Badge>
                  </div>
                </div>
                
                {/* Degrade no fundo */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-emerald-50 to-transparent"></div>
              </div>
              
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Tapete Higiênico 80x60cm
                </CardTitle>
                <CardDescription className="text-lg text-gray-600 leading-relaxed">
                  Perfeito para cães de grande porte. Maior cobertura e 
                  proteção máxima com dupla camada de segurança.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Características */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-700">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-medium">60 unidades por pacote</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-medium">Extra absorvente (98% capacidade)</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-medium">Dupla camada de proteção antivazamento</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-medium">Reforçado para raças grandes</span>
                  </div>
                </div>
                
                <Separator />
                
                {/* Preço e CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="text-center sm:text-left">
                    <div className="text-4xl lg:text-5xl font-bold text-primary">
                      R$ 115,00
                    </div>
                    <div className="text-sm lg:text-base text-gray-500">
                      À vista no PIX ou R$ 119,90 no cartão
                    </div>
                    <div className="text-xs text-emerald-600 font-medium mt-1">
                      ✅ Frete grátis acima de R$ 200
                    </div>
                  </div>
                  <Button 
                    onClick={() => window.open('https://wa.me/554198416124?text=Olá! Gostaria de comprar o Tapete Higiênico 80x60cm (60 unidades) por R$ 115,00. Pode me enviar mais informações?', '_blank')}
                    className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
                  >
                    Comprar Agora
                  </Button>
                </div>

                {/* Info adicional */}
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 text-emerald-800">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">
                      Entrega em até 1 hora em Curitiba (Uber Moto)
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Kit Combo */}
          <div className="mt-16 text-center">
            <Card className="max-w-2xl mx-auto bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-8">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Badge className="bg-purple-500 text-white">💎 Kit Premium</Badge>
                  <Badge className="bg-pink-500 text-white">🔥 Promoção</Badge>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  Leve os 2 Tamanhos e Economize!
                </h3>
                <p className="text-gray-600 mb-6">
                  1 pacote 60x60cm + 1 pacote 80x60cm
                </p>
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="text-2xl text-gray-400 line-through">R$ 210,00</div>
                  <div className="text-4xl font-bold text-purple-600">R$ 195,00</div>
                  <Badge className="bg-red-500 text-white">7% OFF</Badge>
                </div>
                <Button 
                  onClick={() => window.open('https://wa.me/554198416124?text=Olá! Gostaria de comprar o Kit Premium com 1 pacote 60x60cm + 1 pacote 80x60cm por R$ 195,00. Pode me enviar mais informações?', '_blank')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  Comprar Kit Combo
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Seção de Benefícios com Design Aprimorado */}
      <section id="beneficios" ref={benefitsRef} className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-emerald-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm bg-blue-100 text-blue-700 border-blue-200">
              ✨ Benefícios Exclusivos
            </Badge>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
              Por que Escolher Nossos
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                Tapetes Higiênicos?
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Tecnologia de ponta e materiais <span className="font-semibold text-blue-600">premium</span> para garantir o 
              bem-estar do seu pet com <span className="font-semibold text-emerald-600">máxima qualidade</span>.
            </p>
          </div>

          {/* Grid de Benefícios */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                icon: '💧',
                title: 'Super Absorvente',
                description: 'Capacidade de absorção 95% superior, mantendo o ambiente sempre seco e limpo',
                color: 'from-blue-500 to-blue-600',
                bgColor: 'bg-blue-50',
                stats: '95%'
              },
              {
                icon: '🛡️',
                title: 'Antivazamento',
                description: 'Camada plástica impermeável de alta qualidade que protege 100% seu piso',
                color: 'from-emerald-500 to-emerald-600',
                bgColor: 'bg-emerald-50',
                stats: '100%'
              },
              {
                icon: '🌿',
                title: 'Neutralizador de Odores',
                description: 'Tecnologia avançada que elimina 99% dos odores desagradáveis instantaneamente',
                color: 'from-purple-500 to-purple-600',
                bgColor: 'bg-purple-50',
                stats: '99%'
              },
              {
                icon: '🦠',
                title: 'Antibacteriano',
                description: 'Proteção completa contra bactérias, germes e fungos para um ambiente saudável',
                color: 'from-pink-500 to-pink-600',
                bgColor: 'bg-pink-50',
                stats: '24h'
              }
            ].map((benefit, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${benefit.color}`}></div>
                <CardHeader className="text-center pb-4">
                  <div className={`w-20 h-20 ${benefit.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-4xl">{benefit.icon}</div>
                  </div>
                  <CardTitle className="text-xl lg:text-2xl font-bold text-gray-900">
                    {benefit.title}
                  </CardTitle>
                  <div className={`text-3xl font-bold bg-gradient-to-r ${benefit.color} bg-clip-text text-transparent`}>
                    {benefit.stats}
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base lg:text-lg leading-relaxed text-gray-600">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Estatísticas em Destaque */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center border-0 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-8 pb-6">
                <div className="text-5xl lg:text-6xl font-bold text-primary mb-3">
                  <Counter end={95} suffix="%" />
                </div>
                <p className="text-lg lg:text-xl text-gray-600 font-medium">Taxa de Absorção</p>
                <p className="text-sm text-gray-500 mt-2">Mantém seco por até 24h</p>
              </CardContent>
            </Card>
            <Card className="text-center border-0 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-8 pb-6">
                <div className="text-5xl lg:text-6xl font-bold text-primary mb-3">
                  <Counter end={24} suffix="h" />
                </div>
                <p className="text-lg lg:text-xl text-gray-600 font-medium">Proteção Duradoura</p>
                <p className="text-sm text-gray-500 mt-2">Eficácia contínua garantida</p>
              </CardContent>
            </Card>
            <Card className="text-center border-0 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-8 pb-6">
                <div className="text-5xl lg:text-6xl font-bold text-primary mb-3">
                  <Counter end={100} suffix="%" />
                </div>
                <p className="text-lg lg:text-xl text-gray-600 font-medium">Satisfação Garantida</p>
                <p className="text-sm text-gray-500 mt-2">Clientes felizes e aprovados</p>
              </CardContent>
            </Card>
          </div>

          {/* Seção de Depoimentos */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                O que nossos clientes dizem
              </h3>
              <p className="text-lg text-gray-600">
                Experiências reais de quem já utiliza nossos produtos
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Maria Silva",
                  pet: "Lua (Golden Retriever)",
                  rating: 5,
                  comment: "Os melhores tapetes que já usei! Realmente super absorventes e não vazam. Minha cachorra adora e eu fico tranquila.",
                  avatar: "👩"
                },
                {
                  name: "João Santos",
                  pet: "Thor (Bulldog Francês)",
                  rating: 5,
                  comment: "Entrega super rápida e produto de excelente qualidade. Vale muito cada centavo pago!",
                  avatar: "👨"
                },
                {
                  name: "Ana Costa",
                  pet: "Mimi (Gato Persa)",
                  rating: 5,
                  comment: "Perfeito para meu gato! O neutralizador de odores funciona muito bem. Recomendo muito!",
                  avatar: "👩"
                }
              ].map((review, index) => (
                <Card key={index} className="border-0 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="text-3xl">{review.avatar}</div>
                      <div>
                        <div className="font-semibold text-gray-900">{review.name}</div>
                        <div className="text-sm text-gray-500">{review.pet}</div>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-lg">⭐</span>
                      ))}
                    </div>
                    <p className="text-gray-600 italic">"{review.comment}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Seção Como Comprar com Timeline Aprimorada */}
      <section id="como-comprar" ref={howToBuyRef} className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm bg-blue-100 text-blue-700 border-blue-200">
              🛒 Como Comprar
            </Badge>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
              Processo Simples e
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                Rápido
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Compre em poucos passos e receba no <span className="font-semibold text-blue-600">conforto da sua casa</span> 
              com <span className="font-semibold text-emerald-600">entrega expressa</span>.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Timeline */}
            <div className="relative">
              {/* Linha principal do timeline */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-emerald-400 rounded-full"></div>
              
              <div className="space-y-12">
                {[
                  {
                    step: '1',
                    title: 'Escolha seu Produto',
                    description: 'Selecione o tamanho ideal para seu pet entre nossas opções premium: 60x60cm para pequenos/médios ou 80x60cm para grandes porte. Temos também o kit combo com economia especial!',
                    icon: '🛒',
                    color: 'from-blue-500 to-blue-600',
                    time: '2 minutos'
                  },
                  {
                    step: '2',
                    title: 'Fale Conosco no WhatsApp',
                    description: 'Clique no botão verde e envie sua mensagem. Nossa equipe especializada responde em menos de 5 minutos! Tire todas as dúvidas e receba orientação personalizada.',
                    icon: '💬',
                    color: 'from-purple-500 to-purple-600',
                    time: '5 minutos'
                  },
                  {
                    step: '3',
                    title: 'Confirme seu Pedido',
                    description: 'Informe seus dados completos, endereço de entrega e confirme o pedido. Aceitamos PIX (com 5% de desconto), dinheiro e cartão de crédito/débito.',
                    icon: '✅',
                    color: 'from-emerald-500 to-emerald-600',
                    time: '10 minutos'
                  },
                  {
                    step: '4',
                    title: 'Receba seu Produto',
                    description: 'Retire no Boqueirão ou receba com entrega rápida por Uber Moto em até 1 hora em Curitiba! Entregamos em toda região metropolitana.',
                    icon: '🚚',
                    color: 'from-pink-500 to-pink-600',
                    time: '1-24 horas'
                  }
                ].map((item, index) => (
                  <div key={index} className="relative flex items-start space-x-8 group">
                    {/* Círculo do passo */}
                    <div className="flex-shrink-0 relative">
                      <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-2xl transform group-hover:scale-110 transition-transform duration-300 z-10`}>
                        {item.icon}
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-white rounded-full px-2 py-1 text-xs font-bold text-gray-600 shadow-md">
                        {item.step}
                      </div>
                    </div>
                    
                    {/* Conteúdo do passo */}
                    <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-0">
                          {item.title}
                        </h3>
                        <Badge variant="outline" className="text-sm border-gray-200 text-gray-600">
                          ⏱️ {item.time}
                        </Badge>
                      </div>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Opções de Entrega */}
            <div className="grid md:grid-cols-2 gap-8 mt-16">
              <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <span className="text-3xl">🏠</span>
                    <span>Retirada no Local</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Localização:</strong> Curitiba - Bairro Boqueirão</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Horário:</strong> Segunda a Domingo: 09:00 às 20:00</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Vantagem:</strong> Retirada imediata após pagamento</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Economia:</strong> Sem taxa de entrega</span>
                    </li>
                  </ul>
                  <div className="mt-6 p-4 bg-blue-100 rounded-lg">
                    <div className="flex items-center space-x-2 text-blue-800">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium">
                        Endereço exato enviado via WhatsApp após confirmação
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-emerald-50 to-emerald-100 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <span className="text-3xl">🛵</span>
                    <span>Entrega por Uber Moto</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Cobertura:</strong> Entrega em toda Curitiba e região</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Tempo:</strong> Entrega no mesmo dia (até 1 hora)</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Conveniência:</strong> Receba no conforto da sua casa</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Valor:</strong> Taxa de entrega combinada (média R$15)</span>
                    </li>
                  </ul>
                  <div className="mt-6 p-4 bg-emerald-100 rounded-lg">
                    <div className="flex items-center space-x-2 text-emerald-800">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium">
                        Frete grátis para compras acima de R$ 200
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Contato com Design Aprimorado */}
      <section id="contato" ref={contactRef} className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-emerald-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm bg-blue-100 text-blue-700 border-blue-200">
              📞 Entre em Contato
            </Badge>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
              Estamos Prontos para
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                Atender Você
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Nossa equipe especializada está <span className="font-semibold text-blue-600">disponível 24h</span> 
              para tirar dúvidas e ajudar você a escolher o melhor produto para seu pet.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
            {/* WhatsApp Card */}
            <Card className="border-0 bg-white shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-emerald-500 to-green-600"></div>
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center space-x-3 text-3xl">
                  <span className="text-4xl">📱</span>
                  <span>WhatsApp</span>
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  A forma mais rápida e eficiente de entrar em contato conosco. 
                  Respostas imediatas e atendimento personalizado!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-600 mb-1">⚡</div>
                    <div className="font-semibold text-emerald-900">Resposta Rápida</div>
                    <div className="text-sm text-emerald-700">Em menos de 5 minutos</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">🕒</div>
                    <div className="font-semibold text-blue-900">24 Horas</div>
                    <div className="text-sm text-blue-700">Atendimento contínuo</div>
                  </div>
                </div>
                
                <Button 
                  onClick={() => window.open('https://wa.me/554198416124', '_blank')}
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-lg flex items-center justify-center space-x-3"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>Falar no WhatsApp Agora</span>
                  <Badge className="bg-red-500 text-white text-sm animate-pulse">Online</Badge>
                </Button>
                
                <div className="text-center space-y-2">
                  <p className="text-2xl font-bold text-gray-900">+55 41 9841-6124</p>
                  <p className="text-sm text-gray-500">Clique no botão acima ou copie o número</p>
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-lg border border-emerald-200">
                  <div className="flex items-center space-x-2 text-emerald-800">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">
                      Dica: Envie "Olá, quero comprar tapetes" para atendimento rápido!
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Localização Card */}
            <Card className="border-0 bg-white shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center space-x-3 text-3xl">
                  <span className="text-4xl">📍</span>
                  <span>Localização</span>
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Visite-nos para retirada ou conheça nossos produtos pessoalmente. 
                  Estamos localizados em uma área de fácil acesso!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">🏠</div>
                    <div className="font-semibold text-blue-900">Bairro Boqueirão</div>
                    <div className="text-sm text-blue-700">Curitiba - PR</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-1">🅿️</div>
                    <div className="font-semibold text-purple-900">Estacionamento</div>
                    <div className="text-sm text-purple-700">Fácil e gratuito</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <div className="font-semibold text-gray-900">Endereço Completo</div>
                      <div className="text-sm text-gray-600">Curitiba - PR, Bairro Boqueirão</div>
                      <div className="text-xs text-gray-500">Endereço exato enviado via WhatsApp</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <div className="font-semibold text-gray-900">Horário de Funcionamento</div>
                      <div className="text-sm text-gray-600">Segunda a Domingo: 09:00 às 20:00</div>
                      <div className="text-xs text-gray-500">Atendimento sem fechar</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.346 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.345-1.253V5z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <div className="font-semibold text-gray-900">Formas de Pagamento</div>
                      <div className="text-sm text-gray-600">PIX, Dinheiro, Cartão de Crédito, Débito</div>
                      <div className="text-xs text-gray-500">5% de desconto no PIX</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 text-blue-800">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">
                      Agende sua visita pelo WhatsApp para melhor atendimento!
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer Aprimorado */}
      <footer className="bg-gray-900 text-white py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Sobre */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">TH</span>
                </div>
                <div>
                  <span className="text-xl font-bold">Tapetes Higiênicos</span>
                  <div className="text-sm text-gray-400">Premium</div>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Especialistas em tapetes higiênicos premium para pets. 
                Qualidade, confiança e entrega rápida em toda Curitiba.
              </p>
              <div className="flex space-x-4">
                <a href="https://wa.me/554198416124" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Produtos */}
            <div className="space-y-6">
              <h3 className="font-semibold text-lg text-white">Nossos Produtos</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#produtos" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                    <span>📦</span>
                    <span>Tapete 60x60cm</span>
                  </a>
                </li>
                <li>
                  <a href="#produtos" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                    <span>📦</span>
                    <span>Tapete 80x60cm</span>
                  </a>
                </li>
                <li>
                  <a href="#produtos" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                    <span>💎</span>
                    <span>Kit Combo (Economia)</span>
                  </a>
                </li>
                <li>
                  <a href="#beneficios" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                    <span>✨</span>
                    <span>Benefícios</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Atendimento */}
            <div className="space-y-6">
              <h3 className="font-semibold text-lg text-white">Atendimento</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#como-comprar" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                    <span>🛒</span>
                    <span>Como Comprar</span>
                  </a>
                </li>
                <li>
                  <a href="#contato" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                    <span>📞</span>
                    <span>Contato</span>
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/554198416124" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                    <span>💬</span>
                    <span>WhatsApp</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                    <span>🚚</span>
                    <span>Entrega</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Informações */}
            <div className="space-y-6">
              <h3 className="font-semibold text-lg text-white">Informações</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start space-x-2">
                  <span>📍</span>
                  <span>Curitiba - PR<br />Bairro Boqueirão</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span>📱</span>
                  <span>+55 41 9841-6124<br />WhatsApp 24h</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span>🕒</span>
                  <span>Seg-Sex: 09:00-20:00<br />Sáb-Dom: 09:00-20:00</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span>💳</span>
                  <span>PIX, Dinheiro, Cartão<br />5% desconto PIX</span>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="bg-gray-700 mb-8" />

          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-center lg:text-left">
              <p className="text-gray-400 text-sm">
                © 2024 Tapetes Higiênicos Premium para Pets. Todos os direitos reservados.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                CNPJ: 00.000.000/0001-00 | Curitiba - PR
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl mb-1">⭐</div>
                <div className="text-xs text-gray-400">4.9/5 Avaliações</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">🚀</div>
                <div className="text-xs text-gray-400">Entrega Rápida</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">🛡️</div>
                <div className="text-xs text-gray-400">Qualidade Garantida</div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Botão WhatsApp Flutuante Aprimorado */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => window.open('https://wa.me/554198416124', '_blank')}
          className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 animate-pulse group relative overflow-hidden"
          size="lg"
        >
          <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          {/* Efeito de onda */}
          <div className="absolute inset-0 rounded-full bg-emerald-400 opacity-30 animate-ping"></div>
          {/* Badge de notificação */}
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            1
          </div>
        </Button>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Fale conosco no WhatsApp
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;