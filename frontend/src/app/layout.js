import "@/styles/globals.css";
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { AuthProvider } from '@/core/context/AuthContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata = {
  title: "Elevate Your English Campus",
  description: "Campus de aprendizaje de inglés",
  icons: {
    icon: "/brand/elevate-symbol.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
