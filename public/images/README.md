# 📸 Instruções para Adicionar Imagens Reais dos Produtos

Esta pasta é destinada às imagens reais dos seus tapetes higiênicos. Substitua os placeholders atuais pelas suas fotos profissionais.

## 🎯 Imagens Necessárias

### Para Tapete 60x60cm:
1. **tapete-60x60-principal.jpg** - Imagem principal do produto
2. **tapete-60x60-detalhe.jpg** - Detalhe da textura e qualidade
3. **tapete-60x60-pacote.jpg** - Foto da embalagem
4. **tapete-60x60-uso.jpg** - Produto em uso com pet

### Para Tapete 80x60cm:
1. **tapete-80x60-principal.jpg** - Imagem principal do produto
2. **tapete-80x60-detalhe.jpg** - Detalhe da textura e qualidade
3. **tapete-80x60-pacote.jpg** - Foto da embalagem
4. **tapete-80x60-uso.jpg** - Produto em uso com pet

## 📋 Especificações Técnicas Recomendadas

### Formato e Qualidade:
- **Formato:** JPG (para fotos) ou WebP (melhor compressão)
- **Qualidade:** 80-90% (equilíbrio entre qualidade e tamanho)
- **Cor:** RGB (para web)
- **Perfil:** sRGB

### Tamanhos:
- **Imagens principais:** 1200x1200px (quadradas)
- **Imagens de detalhe:** 800x800px
- **Imagens de uso:** 1200x800px (retangulares)

### Peso Máximo:
- **Imagens principais:** até 500KB
- **Imagens de detalhe:** até 300KB
- **Imagens de uso:** até 400KB

## 📸 Dicas para Fotografia Profissional

### Iluminação:
- Use luz natural indireta (próximo a uma janela)
- Evite sombras duras e reflexos
- Use um softbox ou difusor se necessário
- Fotografe em um ambiente bem iluminado

### Composição:
- **Ângulo principal:** 45° acima do produto
- **Detalhes:** Close-ups mostrando textura
- **Embalagem:** Mostre o produto fechado e aberto
- **Uso:** Cenas reais com pets (com autorização)

### Fundo:
- **Fundo branco:** Para imagens de produto (padrão e-commerce)
- **Fundo neutro:** Cinza claro ou bege para cenas de uso
- **Contexto:** Ambiente limpo e organizado

### Edição:
- Ajuste brilho e contraste
- Corrija a temperatura de cor
- Remova imperfeições menores
- Mantenha a aparência natural do produto

## 🛠️ Otimização para Web

### Compressão:
Use ferramentas como:
- **TinyPNG** (tinypng.com)
- **Squoosh** (squoosh.app)
- **ImageOptim** (para Mac)

### Formatos Modernos:
- **WebP:** Melhor compressão com qualidade mantida
- **AVIF:** Formato mais recente, menor tamanho
- **JPEG:** Compatibilidade máxima

### Nomenclatura:
- Use minúsculas
- Separe palavras com hífen (-)
- Seja descritivo
- Exemplo: `tapete-60x60-principal.webp`

## 🔧 Como Atualizar o Site

1. **Adicione suas imagens** nesta pasta
2. **Atualize o arquivo** `/src/config/productImages.ts` com os caminhos corretos
3. **Teste o site** para garantir que as imagens carreguem corretamente
4. **Otimização adicional:** Use o Next.js Image para melhor performance

## 📱 Responsividade

As imagens serão automaticamente:
- Otimizadas para diferentes tamanhos de tela
- Carregadas de forma lazy (preguiçosa)
- Servidas no formato ideal para cada dispositivo
- Com cache adequado para melhor performance

## 🚀 Performance

O site está configurado para:
- Carregar imagens de forma progressiva
- Usar placeholders durante o carregamento
- Otimizar automaticamente o formato e tamanho
- Priorizar imagens acima da dobra (fold)

## 📝 Exemplo de Configuração

```typescript
// Em /src/config/productImages.ts
images: [
  {
    id: 'main-60x60',
    src: '/images/tapete-60x60-principal.webp', // Sua imagem real
    alt: 'Tapete Higiênico 60x60cm - Vista principal',
    caption: 'Tapete Higiênico Premium 60x60cm'
  }
  // ... outras imagens
]
```

## 🎨 Design Tips

### Cores:
- Use fundos que destaquem o produto
- Mantenha consistência de estilo
- Evite cores muito vibrantes que desviem atenção

### Estilo:
- Fotos limpas e profissionais
- Produto bem iluminado e em foco
- Mostre benefícios (absorção, textura, etc.)
- Inclua elementos de escala (moeda, régua, etc.)

---

**Importante:** Imagens de alta qualidade aumentam a conversão e a confiança dos clientes. Invista tempo em criar fotos profissionais que mostrem realmente a qualidade do seu produto!