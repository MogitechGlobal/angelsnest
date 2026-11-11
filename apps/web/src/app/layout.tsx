// apps/web/src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://angelesnest.co.ke";
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "123456789012345";
const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || "0170ed9b504528fd0b7b5589ec9ec111";

export const viewport: Viewport = {
  themeColor: "#62c6e6",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Angeles Nest Collections | Kids & Baby Clothes Nairobi Kenya",
    template: "%s | Angeles Nest Collections",
  },
  description:
    "Shop high-quality, comfortable children's clothing in Nairobi, Kenya. Baby clothes, girls dresses, boys sets, and party outfits (6m - 13yrs). Same-day CBD pickup at Biashara Street and countrywide delivery.",
  applicationName: "Angeles Nest Collections",
  keywords: [
    // Core brand & intent keywords
    "Angeles Nest Collections",
    "Kids clothes Nairobi",
    "Baby clothes Kenya",
    "Children boutique Nairobi",
    "Buy kids clothes online Kenya",
    // Geo-specific long-tail
    "Biashara street kids clothes shop",
    "Children clothing Nairobi CBD",
    "Baby dresses Nairobi Kenya",
    "Boys 3 piece suits and sets Kenya",
    "Kids party dresses Nairobi",
    "Affordable kids clothing Kenya",
    // Commercial transactional terms
    "Kids clothing WhatsApp order Kenya",
    "Countrywide delivery kids clothes Kenya",
    "Baby shower gifts Nairobi",
  ],
  authors: [{ name: "Angeles Nest Collections", url: SITE_URL }],
  creator: "Angeles Nest Collections",
  publisher: "Angeles Nest Collections",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-KE": SITE_URL,
      "en": SITE_URL,
    },
  },
  openGraph: {
    title: "Angeles Nest Collections | Quality Kids & Baby Outfits in Kenya",
    description:
      "Curated outfits for little ones aged 6 months to 13 years. Visit our Biashara Street shop or enjoy countrywide delivery in Kenya.",
    url: SITE_URL,
    siteName: "Angeles Nest Collections",
    locale: "en_KE",
    type: "website",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Angeles Nest Collections Nairobi Kenya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Angeles Nest Collections | Kids Wear Nairobi",
    description: "Children's fashion for play, parties & everyday comfort. Fast dispatch across Kenya.",
    images: ["/android-chrome-512x512.png"],
  },
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
  other: {
    // GEO-Targeting tags for Google local indexing
    "geo.region": "KE-30", // Nairobi County
    "geo.placename": "Nairobi, Biashara Street",
    "geo.position": "-1.2833;36.8167",
    "ICBM": "-1.2833, 36.8167",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Schema.org Structured Data for LocalBusiness & ClothingStore
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    "@id": `${SITE_URL}/#store`,
    name: "Angeles Nest Collections",
    image: `${SITE_URL}/android-chrome-512x512.png`,
    url: SITE_URL,
    telephone: "+254742871599",
    priceRange: "KES 1000 - KES 4500",
    currenciesAccepted: "KES",
    paymentAccepted: "M-Pesa, Cash on Delivery, Credit Card",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Biashara Street, Zanna Exhibition, 1st Floor, Shop M7",
      addressLocality: "Nairobi",
      addressRegion: "Nairobi County",
      postalCode: "00100",
      addressCountry: "KE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -1.2841,
      longitude: 36.8155,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "19:00",
      },
    ],
    areaServed: [
      { "@type": "City", name: "Nairobi" },
      { "@type": "Country", name: "Kenya" },
      { "@type": "Country", name: "Uganda" },
      { "@type": "Country", name: "Tanzania" },
    ],
  };

  return (
    <html
      lang="en-KE"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Google Structured Data (JSON-LD) for Local SEO & Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />

        {/* Meta Pixel (Facebook / Instagram Ads) */}
        {META_PIXEL_ID && (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${META_PIXEL_ID}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}

        {/* Mixpanel Analytics */}
        {MIXPANEL_TOKEN && (
          <Script id="mixpanel-init" strategy="afterInteractive">
            {`
              (function(f,b){if(!b.__SV){var e,g,i,h;window.mixpanel=b;b._i=[];b.init=function(e,f,c){function d(a,b){var c=b.split(".");2==c.length&&(a=a[c[0]],b=c[1]);a[b]=function(){a.push([b].concat(Array.prototype.slice.call(arguments,0)))}}var a=b;"undefined"!==typeof c?a=b[c]=[]:c="mixpanel";a.people=a.people||[];a.toString=function(a){var d="mixpanel";"mixpanel"!==c&&(d+="."+c);a||(d+=" (stub)");return d};a.people.toString=function(){return a.toString(1)+".people (stub)"};i="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");for(h=0;h<i.length;h++)d(a,i[h]);b._i.push([e,f,c])};b.__SV=1.2;e=f.createElement("script");e.type="text/javascript";e.async=!0;e.src="https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";g=f.getElementsByTagName("script")[0];g.parentNode.insertBefore(e,g)}})(document,window.mixpanel||[]);
              mixpanel.init('${MIXPANEL_TOKEN}', { track_pageview: true, persistence: 'localStorage' });
            `}
          </Script>
        )}
      </head>

      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}