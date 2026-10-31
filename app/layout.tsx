import type {Metadata} from 'next';
import { Inter, Cormorant_Garamond, Playfair_Display, Alex_Brush, Dancing_Script, Caveat } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const alexBrush = Alex_Brush({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-cursive',
  display: 'swap',
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dancing',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-caveat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'REJUVALIFE | Longévité, Cure Détox & Régénération Naturelle',
  description: 'Retrouvez votre énergie naturelle, c’est possible ! Une expérience de 7 jours accompagnée par Sissi Gilton pour purifier votre corps et relancer votre vitalité.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="fr" className={`${inter.variable} ${cormorant.variable} ${playfair.variable} ${alexBrush.variable} ${dancingScript.variable} ${caveat.variable} scroll-smooth`}>
      <body suppressHydrationWarning className="antialiased">{children}</body>
    </html>
  );
}
