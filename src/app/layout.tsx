import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionIndicator } from "@/components/layout/SectionIndicator";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { LenisProvider } from "@/components/animations/LenisProvider";
import { GSAPScrollProvider } from "@/components/animations/GSAPScrollProvider";
import { CursorFollower } from "@/components/ui/CursorFollower";
import ProgressBar from "@/components/ui/ProgressBar";
import { LoadingScreenWrapper } from "@/components/layout/LoadingScreenWrapper";
import { BackgroundCrossfade } from "@/components/ui/BackgroundCrossfade";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    default: "Autha Engenharia — Mapeamento e Regularização Fundiária | Chapecó SC",
    template: "%s | Autha Engenharia",
  },
  description:
    "Engenharia de precisão com tecnologia LiDAR, drones e software AuthaGrid. Regularização fundiária, mapeamento aéreo, assistência técnica e inteligência ambiental em todo o Brasil.",
  keywords: [
    "topógrafo Chapecó",
    "regularização fundiária SC",
    "regularização fundiária Brasil",
    "mapeamento aéreo Chapecó",
    "mapeamento aéreo Brasil",
    "LiDAR Santa Catarina",
    "LiDAR Brasil",
    "georreferenciamento rural",
    "georreferenciamento Brasil",
    "assistência técnica engenharia",
    "BIM infraestrutura SC",
    "perícia ambiental Brasil",
    "Autha Engenharia",
  ],
  authors: [{ name: "Autha Engenharia e Mapeamento" }],
  creator: "Autha Engenharia e Mapeamento",
  publisher: "Autha Engenharia e Mapeamento",
  metadataBase: new URL("https://autha.com.br"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://autha.com.br",
    title: "Autha Engenharia — Mapeamento e Regularização Fundiária",
    description:
      "Tecnologia LiDAR, drones e software AuthaGrid para proteger, regularizar e valorizar seu patrimônio em qualquer território do Brasil.",
    siteName: "Autha Engenharia",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Autha Engenharia — Vista aérea capturada por drone",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Autha Engenharia — Mapeamento de Precisão",
    description:
      "Engenharia de precisão com LiDAR, drones e AuthaGrid. Chapecó/SC.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://autha.com.br/#business",
      name: COMPANY.name,
      alternateName: "Autha Engenharia",
      description:
        "Engenharia de precisão com tecnologia LiDAR, drones e software AuthaGrid para mapeamento, regularização fundiária e inteligência ambiental.",
      url: "https://autha.com.br",
      telephone: "+554999719388",
      email: COMPANY.email,
      foundingDate: COMPANY.founding,
      address: {
        "@type": "PostalAddress",
        streetAddress: COMPANY.address,
        addressLocality: "Chapecó",
        addressRegion: "SC",
        postalCode: COMPANY.cep,
        addressCountry: "BR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -27.1003,
        longitude: -52.6172,
      },
      areaServed: {
        "@type": "State",
        name: "Santa Catarina",
      },
      sameAs: [COMPANY.instagramLink],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "18:00",
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Frentes de Atuação",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Regularização Fundiária" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mapeamento Aéreo e Cartografia" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Assistência Técnica e Perícias" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Infraestrutura e BIM" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Inteligência Ambiental" } },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://autha.com.br/#website",
      url: "https://autha.com.br",
      name: "Autha Engenharia",
      description: "Site institucional da Autha Engenharia e Mapeamento",
      publisher: { "@id": "https://autha.com.br/#business" },
      inLanguage: "pt-BR",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        {/* Critical font preloads */}
        <link
          rel="preload"
          href="/fonts/AtypDisplay-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/AtypText-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Hero background preload — replaces Next.js Image priority since crossfadeManaged=true */}
        <link
          rel="preload"
          href="/images/sections/hero-drone-cidade.jpg"
          as="image"
          fetchPriority="high"
        />
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className="antialiased">
        {/* Skip to content */}
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-green-400 focus:text-gray-900 focus:font-semibold"
        >
          Ir para o conteúdo
        </a>

        <LenisProvider>
          <GSAPScrollProvider>
            <BackgroundCrossfade />
            {/* Global grain texture — one fixed layer replaces 9 per-section pseudos */}
            <div aria-hidden="true" className="grain-fixed" />
            <LoadingScreenWrapper />
            <CursorFollower />
            <ProgressBar />
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
            <SectionIndicator />
            <WhatsAppButton />
          </GSAPScrollProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
