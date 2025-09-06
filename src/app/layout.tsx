import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tapetes Higiênicos para Pets Curitiba | Compre Online com Entrega Rápida | Boqueirão",
  description: "✅ Tapetes higiênicos descartáveis premium para cães e gatos. Super absorventes, antivazamento e com neutralizador de odores. Entrega rápida em Curitiba e região. Retirada no Boqueirão. Preços especiais: 60x60cm R$95,00 e 80x60cm R$115,00. Frete grátis para compras acima de R$200!",
  keywords: [
    "tapete higiênico pet curitiba", "tapete descartável cachorro curitiba", "tapete xixi cachorro curitiba", 
    "tapete higiênico barato curitiba", "fralda pet curitiba", "tapete absorvente pet curitiba", 
    "tapete higiênico 60x60 curitiba", "tapete higiênico 80x60 curitiba", "pet shop boqueirão curitiba",
    "onde comprar tapete higiênico pet curitiba", "tapete higiênico descartável entrega curitiba",
    "melhor tapete higiênico cachorro", "tapete higiênico para filhotes", "tapete higiênico grande porte",
    "tapete higiênico pequeno porte", "tapete antibacteriano para pets", "tapete com neutralizador de odores",
    "tapete higiênico super absorvente", "tapete higiênico antivazamento", "comprar tapete pet online",
    "entrega tapete higiênico curitiba", "tapete higiênico preço bom", "tapete higiênico qualidade",
    "tapete higiênico para gatos", "tapete higiênico para cães idosos", "tapete higiênico para treinamento",
    "tapete higiênico pet shop curitiba", "tapete higiênico delivery curitiba", "tapete higiênico whatsapp",
    "tapete higiênico retirada boqueirão", "tapete higiênico uber moto curitiba"
  ],
  authors: [{ name: "Tapetes Higiênicos Premium para Pets" }],
  creator: "Tapetes Higiênicos para Pets",
  publisher: "Tapetes Higiênicos para Pets",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Tapetes Higiênicos para Pets Curitiba | Entrega Rápida | Qualidade Premium",
    description: "✅ Tapetes higiênicos super absorventes com entrega rápida em Curitiba. Produtos premium para cães e gatos. Retirada no Boqueirão ou entrega por Uber Moto. Compre agora!",
    url: "https://tapeteshigienicos.com.br",
    siteName: "Tapetes Higiênicos Premium para Pets",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "/og-tapete-higienico.jpg",
        width: 1200,
        height: 630,
        alt: "Tapetes Higiênicos Premium para Pets - Curitiba",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tapetes Higiênicos para Pets Curitiba | Entrega Rápida",
    description: "✅ Tapetes higiênicos super absorventes com entrega rápida em Curitiba. Produtos premium para cães e gatos.",
    images: ["/og-tapete-higienico.jpg"],
    creator: "@tapeteshigienicos",
    site: "@tapeteshigienicos",
  },
  alternates: {
    canonical: "https://tapeteshigienicos.com.br",
  },
  category: "ecommerce",
  classification: "Pet Supplies, Hygiene Products",
  other: {
    "twitter:label1": "Preço a partir de",
    "twitter:data1": "R$ 95,00",
    "twitter:label2": "Entrega",
    "twitter:data2": "Curitiba e região",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Tapetes Higiênicos Premium para Pets",
              description: "Especialistas em tapetes higiênicos descartáveis premium para cães e gatos em Curitiba. Produtos super absorventes, antivazamento e com neutralizador de odores.",
              url: "https://tapeteshigienicos.com.br",
              telephone: "+554198416124",
              email: "contato@tapeteshigienicos.com.br",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Boqueirão",
                addressLocality: "Curitiba",
                addressRegion: "PR",
                postalCode: "81870-000",
                addressCountry: "BR"
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "-25.5178",
                longitude: "-49.2887"
              },
              priceRange: "R$",
              currenciesAccepted: "BRL",
              paymentAccepted: "PIX, Dinheiro, Cartão de Crédito, Cartão de Débito",
              openingHours: "Mo-Su 09:00-20:00",
              areaServed: ["Curitiba", "São José dos Pinhais", "Colombo", "Araucária", "Pinhais", "Fazenda Rio Grande", "Campo Largo"],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Tapetes Higiênicos Premium",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Product",
                      name: "Tapete Higiênico Premium 60x60cm",
                      description: "Pacote com 60 unidades de tapetes higiênicos descartáveis super absorventes. Ideal para cães pequenos e médios. Com tecnologia antivazamento e neutralizador de odores.",
                      brand: {
                        "@type": "Brand",
                        name: "Tapetes Higiênicos Premium"
                      },
                      category: "Pet Supplies",
                      material: "Material absorvente premium com camada plástica impermeável",
                      weight: {
                        "@type": "QuantitativeValue",
                        value: "2.5",
                        unitCode: "KGM"
                      },
                      dimensions: {
                        "@type": "QuantitativeValue",
                        value: "60x60",
                        unitText: "cm"
                      },
                      review: {
                        "@type": "Review",
                        reviewRating: {
                          "@type": "Rating",
                          ratingValue: "5",
                          bestRating: "5"
                        },
                        author: {
                          "@type": "Person",
                          name: "Cliente Satisfeito"
                        }
                      },
                      aggregateRating: {
                        "@type": "AggregateRating",
                        ratingValue: "4.9",
                        reviewCount: "247"
                      }
                    },
                    price: "95.00",
                    priceCurrency: "BRL",
                    availability: "https://schema.org/InStock",
                    validFrom: "2024-01-01",
                    priceValidUntil: "2024-12-31",
                    seller: {
                      "@type": "LocalBusiness",
                      name: "Tapetes Higiênicos Premium para Pets"
                    },
                    deliveryLeadTime: {
                      "@type": "QuantitativeValue",
                      value: "1",
                      unitCode: "DAY"
                    },
                    shippingDetails: {
                      "@type": "OfferShippingDetails",
                      shippingRate: {
                        "@type": "MonetaryAmount",
                        value: "15",
                        currency: "BRL"
                      },
                      shippingDestination: {
                        "@type": "DefinedRegion",
                        addressCountry: "BR",
                        addressRegion: "PR"
                      }
                    }
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Product",
                      name: "Tapete Higiênico Premium 80x60cm",
                      description: "Pacote com 60 unidades de tapetes higiênicos descartáveis extra grandes. Perfeito para cães de grande porte. Com dupla camada de proteção e máxima absorção.",
                      brand: {
                        "@type": "Brand",
                        name: "Tapetes Higiênicos Premium"
                      },
                      category: "Pet Supplies",
                      material: "Material absorvente premium com dupla camada de proteção",
                      weight: {
                        "@type": "QuantitativeValue",
                        value: "3.2",
                        unitCode: "KGM"
                      },
                      dimensions: {
                        "@type": "QuantitativeValue",
                        value: "80x60",
                        unitText: "cm"
                      },
                      review: {
                        "@type": "Review",
                        reviewRating: {
                          "@type": "Rating",
                          ratingValue: "5",
                          bestRating: "5"
                        },
                        author: {
                          "@type": "Person",
                          name: "Cliente Satisfeito"
                        }
                      },
                      aggregateRating: {
                        "@type": "AggregateRating",
                        ratingValue: "4.8",
                        reviewCount: "189"
                      }
                    },
                    price: "115.00",
                    priceCurrency: "BRL",
                    availability: "https://schema.org/InStock",
                    validFrom: "2024-01-01",
                    priceValidUntil: "2024-12-31",
                    seller: {
                      "@type": "LocalBusiness",
                      name: "Tapetes Higiênicos Premium para Pets"
                    },
                    deliveryLeadTime: {
                      "@type": "QuantitativeValue",
                      value: "1",
                      unitCode: "DAY"
                    },
                    shippingDetails: {
                      "@type": "OfferShippingDetails",
                      shippingRate: {
                        "@type": "MonetaryAmount",
                        value: "15",
                        currency: "BRL"
                      },
                      shippingDestination: {
                        "@type": "DefinedRegion",
                        addressCountry: "BR",
                        addressRegion: "PR"
                      }
                    }
                  }
                ]
              },
              serviceArea: {
                "@type": "GeoCircle",
                geoMidpoint: {
                  "@type": "GeoCoordinates",
                  latitude: "-25.5178",
                  longitude: "-49.2887"
                },
                geoRadius: "50"
              },
              potentialAction: {
                "@type": "OrderAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://wa.me/554198416124",
                  inLanguage: "pt-BR",
                  actionPlatform: [
                    "https://schema.org/DesktopWebPlatform",
                    "https://schema.org/MobileWebPlatform"
                  ]
                },
                deliveryMethod: "https://schema.org.Online",
                priceSpecification: {
                  "@type": "PriceSpecification",
                  priceCurrency: "BRL",
                  minPrice: "95.00",
                  maxPrice: "115.00"
                }
              },
              sameAs: [
                "https://wa.me/554198416124",
                "https://instagram.com/tapeteshigienicos"
              ],
              foundingDate: "2020",
              founder: {
                "@type": "Person",
                name: "Tapetes Higiênicos Premium para Pets"
              },
              numberOfEmployees: {
                "@type": "QuantitativeValue",
                value: "5"
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "436"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
