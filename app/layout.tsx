import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Montserrat, Inter } from 'next/font/google';
import './globals.css';

// FUENTES
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

// METADATA
export const metadata: Metadata = {
  title: 'Cali Enamora - Turismo Sostenible en el Valle del Cauca',
  description:
    'Descubre rutas turísticas sostenibles en Cali y el Valle del Cauca. Cultura, naturaleza, gastronomía y bienestar en un solo lugar.',
  keywords: [
    'Cali',
    'turismo',
    'Valle del Cauca',
    'rutas turísticas',
    'cultura',
    'naturaleza',
    'gastronomía',
    'bienestar',
    'sostenible',
  ],
  authors: [
    {
      name: 'Cali Enamora',
      url: 'https://calienamora.com',
    },
  ],
  creator: 'Cali Enamora',
  publisher: 'Cali Enamora',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Cali Enamora',
  },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://calienamora.com',
    siteName: 'Cali Enamora',
    title: 'Cali Enamora - Turismo Sostenible',
    description:
      'Descubre rutas turísticas sostenibles en Cali y el Valle del Cauca',
    images: [
      {
        url: 'https://calienamora.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cali Enamora',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cali Enamora - Turismo Sostenible',
    description:
      'Descubre rutas turísticas sostenibles en Cali y el Valle del Cauca',
    images: ['https://calienamora.com/og-image.jpg'],
    creator: '@calienamora',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  alternates: {
    canonical: 'https://calienamora.com',
    languages: {
      'es-CO': 'https://calienamora.com/es',
      'en-US': 'https://calienamora.com/en',
    },
  },
  category: 'travel',
  classification: 'Tourism',
};

// VIEWPORT
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0A1636' },
    { media: '(prefers-color-scheme: dark)', color: '#0A1636' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${montserrat.variable} ${inter.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Meta básicos */}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* Google Analytics (opcional, descomenta cuando tengas ID) */}
        {/* <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        ></script> */}

        {/* Preconnect a recursos externos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Prefetch para recursos potenciales */}
        <link rel="prefetch" href="/api/data" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://calienamora.com" />

        {/* Alternate links para idiomas */}
        <link
          rel="alternate"
          hrefLang="es-CO"
          href="https://calienamora.com/es"
        />
        <link
          rel="alternate"
          hrefLang="en-US"
          href="https://calienamora.com/en"
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://calienamora.com"
        />

        {/* Sitemap */}
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

        {/* RSS Feed */}
        <link
          rel="alternate"
          type="application/rss+xml"
          href="/feed.xml"
          title="Cali Enamora - RSS Feed"
        />

        {/* Favicons */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Web App Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Theme Color para navegador */}
        <meta name="theme-color" content="#0A1636" />
        <meta name="msapplication-TileColor" content="#0A1636" />

        {/* Open Search */}
        <link
          rel="search"
          type="application/opensearchdescription+xml"
          href="/opensearch.xml"
          title="Buscar en Cali Enamora"
        />

        {/* Structured Data - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Cali Enamora',
              description:
                'Corporación ciudadana para turismo sostenible en Cali y el Valle del Cauca',
              url: 'https://calienamora.com',
              logo: 'https://calienamora.com/logo.png',
              sameAs: [
                'https://facebook.com/calienamora',
                'https://instagram.com/calienamora',
                'https://twitter.com/calienamora',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Service',
                telephone: '+57-2-XXXXXXX',
                email: 'info@calienamora.com',
              },
              areaServed: 'CO',
              mainEntity: {
                '@type': 'LocalBusiness',
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: 'Carrera 5 # 12-28',
                  addressLocality: 'Santiago de Cali',
                  addressRegion: 'Valle del Cauca',
                  postalCode: '760001',
                  addressCountry: 'CO',
                },
              },
            }),
          }}
        />

        {/* Schema para LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Cali Enamora',
              image: 'https://calienamora.com/og-image.jpg',
              description:
                'Plataforma de turismo sostenible en Cali y el Valle del Cauca',
              url: 'https://calienamora.com',
              telephone: '+57-2-XXXXXXX',
              email: 'info@calienamora.com',
              priceRange: '$',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Carrera 5 # 12-28',
                addressLocality: 'Santiago de Cali',
                addressRegion: 'Valle del Cauca',
                postalCode: '760001',
                addressCountry: 'CO',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '3.4372',
                longitude: '-76.5186',
              },
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '08:00',
                closes: '18:00',
              },
            }),
          }}
        />

        {/* No-follow para desarrollo */}
        {process.env.NODE_ENV === 'development' && (
          <meta name="robots" content="noindex, nofollow" />
        )}
      </head>

      <body
        className="min-h-screen bg-[#0A1636] text-gray-100 transition-colors duration-300"
        suppressHydrationWarning
      >
        {/* Skip to main content */}
        <a
          href="#main-content"
          className="absolute -top-full left-0 z-50 bg-red-600 text-white px-4 py-2 rounded focus:top-0 focus:rounded-b"
        >
          Ir al contenido principal
        </a>

        {/* Main content */}
        <main id="main-content" className="relative z-0">
          {children}
        </main>

        {/* Scripts no críticos */}
        {process.env.NODE_ENV === 'production' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Detectar conexión lenta
                if (!navigator.onLine) {
                  console.warn('Conexión sin internet detectada');
                }

                // Cargar Web Vitals
                new PerformanceObserver((entryList) => {
                  for (const entry of entryList.getEntries()) {
                    console.log('Web Vital:', entry.name, entry.value);
                  }
                }).observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'cumulative-layout-shift'] });
              `,
            }}
          />
        )}
      </body>
    </html>
  );
}
