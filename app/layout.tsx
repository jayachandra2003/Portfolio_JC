import type { Metadata } from "next";
import { fontDisplay, fontBody } from "@/lib/fonts";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Jaya Chandra — Portfolio",
    template: "%s | Jaya Chandra",
  },
  description:
    "Portfolio of Vennam Jaya Chandra — AI/ML engineer and full-stack developer building computer vision and web applications.",
  keywords: [
    "Vennam Jaya Chandra",
    "AI/ML Engineer",
    "Full Stack Developer",
    "Computer Vision",
    "VIT-AP",
  ],
  authors: [{ name: "Vennam Jaya Chandra" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Jaya Chandra — Portfolio",
    title: "Jaya Chandra — Portfolio",
    description:
      "AI/ML engineer and full-stack developer building computer vision and web applications.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jaya Chandra — Portfolio",
    description:
      "AI/ML engineer and full-stack developer building computer vision and web applications.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontBody.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const stored = window.localStorage.getItem('portfolio-theme');
                if (stored === 'light') {
                  document.documentElement.classList.add('light');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <Navbar />
          <main id="main-content" className="min-h-[calc(100vh-4rem)]">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
