// Configuração de imagens dos produtos
// Substitua os placeholders pelas suas fotos reais

export interface ProductImageConfig {
  id: string;
  name: string;
  size: string;
  price: number;
  description: string;
  features: string[];
  images: {
    id: string;
    src: string; // Caminho para a imagem real ou deixar vazio para usar placeholder
    alt: string;
    caption?: string;
  }[];
  badge?: string;
  badgeColor?: string;
  popular?: boolean;
}

export const productConfigs: ProductImageConfig[] = [
  {
    id: 'tapete-60x60',
    name: 'Tapete Higiênico Premium',
    size: '60x60cm',
    price: 95,
    description: 'Ideal para cães pequenos e médios. Perfeito para apartamentos e espaços reduzidos.',
    features: [
      '60 unidades por pacote',
      'Super absorvente (95% capacidade)',
      'Com antibacteriano e antifúngico',
      'Neutralizador de odores avançado'
    ],
    images: [
      {
        id: 'main-60x60',
        src: '/images/tapete-60x60-principal.jpg', // Substitua pelo caminho da sua imagem real
        alt: 'Tapete Higiênico 60x60cm - Vista principal',
        caption: 'Tapete Higiênico Premium 60x60cm'
      },
      {
        id: 'detail-60x60-1',
        src: '/images/tapete-60x60-detalhe.jpg', // Substitua pelo caminho da sua imagem real
        alt: 'Detalhe do Tapete Higiênico 60x60cm',
        caption: 'Textura super absorvente'
      },
      {
        id: 'detail-60x60-2',
        src: '/images/tapete-60x60-pacote.jpg', // Substitua pelo caminho da sua imagem real
        alt: 'Pacote do Tapete Higiênico 60x60cm',
        caption: 'Embalagem com 60 unidades'
      },
      {
        id: 'usage-60x60',
        src: '/images/tapete-60x60-uso.jpg', // Substitua pelo caminho da sua imagem real
        alt: 'Tapete Higiênico 60x60cm em uso',
        caption: 'Perfeito para seu pet'
      }
    ],
    badge: 'Mais Vendido',
    badgeColor: 'emerald',
    popular: true
  },
  {
    id: 'tapete-80x60',
    name: 'Tapete Higiênico Premium',
    size: '80x60cm',
    price: 115,
    description: 'Perfeito para cães de grande porte. Maior cobertura e proteção máxima.',
    features: [
      '60 unidades por pacote',
      'Extra absorvente (98% capacidade)',
      'Dupla camada de proteção antivazamento',
      'Reforçado para raças grandes'
    ],
    images: [
      {
        id: 'main-80x60',
        src: '/images/tapete-80x60-principal.jpg', // Substitua pelo caminho da sua imagem real
        alt: 'Tapete Higiênico 80x60cm - Vista principal',
        caption: 'Tapete Higiênico Premium 80x60cm'
      },
      {
        id: 'detail-80x60-1',
        src: '/images/tapete-80x60-detalhe.jpg', // Substitua pelo caminho da sua imagem real
        alt: 'Detalhe do Tapete Higiênico 80x60cm',
        caption: 'Dupla camada de proteção'
      },
      {
        id: 'detail-80x60-2',
        src: '/images/tapete-80x60-pacote.jpg', // Substitua pelo caminho da sua imagem real
        alt: 'Pacote do Tapete Higiênico 80x60cm',
        caption: 'Embalagem com 60 unidades'
      },
      {
        id: 'usage-80x60',
        src: '/images/tapete-80x60-uso.jpg', // Substitua pelo caminho da sua imagem real
        alt: 'Tapete Higiênico 80x60cm em uso',
        caption: 'Ideal para cães de grande porte'
      }
    ],
    badge: 'Tamanho Extra',
    badgeColor: 'blue',
    popular: false
  }
];

// Configuração do Kit Combo
export const kitComboConfig = {
  name: 'Kit Premium Combo',
  description: 'Leve os 2 tamanhos e economize!',
  products: ['tapete-60x60', 'tapete-80x60'],
  originalPrice: 210,
  discountedPrice: 195,
  discount: 7,
  badge: 'Kit Premium',
  badgeColor: 'purple'
};

// Função para obter configuração do produto por ID
export function getProductConfig(id: string): ProductImageConfig | undefined {
  return productConfigs.find(config => config.id === id);
}

// Função para verificar se uma imagem existe
export function imageExists(src: string): boolean {
  // Em um ambiente real, você verificaria se o arquivo existe
  // Por enquanto, retornamos false para src vazios ou placeholders
  return src && src !== '' && !src.includes('placeholder');
}

// Configurações de otimização de imagens
export const imageOptimizationConfig = {
  quality: 85,
  formats: ['webp', 'jpeg'],
  sizes: {
    thumbnail: { width: 300, height: 300 },
    medium: { width: 600, height: 600 },
    large: { width: 1200, height: 1200 }
  },
  lazyLoad: true,
  placeholder: 'blur'
};

// Instruções para adicionar imagens reais
export const imageInstructions = `
Como adicionar suas fotos reais:

1. Crie a pasta: public/images/
2. Salve suas imagens com os nomes sugeridos:
   - tapete-60x60-principal.jpg (imagem principal do produto 60x60)
   - tapete-60x60-detalhe.jpg (detalhe do produto 60x60)
   - tapete-60x60-pacote.jpg (pacote do produto 60x60)
   - tapete-60x60-uso.jpg (produto em uso 60x60)
   - tapete-80x60-principal.jpg (imagem principal do produto 80x60)
   - tapete-80x60-detalhe.jpg (detalhe do produto 80x60)
   - tapete-80x60-pacote.jpg (pacote do produto 80x60)
   - tapete-80x60-uso.jpg (produto em uso 80x60)

3. Formatos recomendados:
   - Formato: JPG ou WebP
   - Tamanho: 1200x1200px para imagens principais
   - Compressão: 80-90% de qualidade
   - Fundo: Branco ou transparente

4. Dicas para melhores fotos:
   - Use boa iluminação
   - Mostre o produto em diferentes ângulos
   - Inclua fotos do produto em uso
   - Mostre a embalagem e detalhes
   - Use fundo neutro para destacar o produto
`;