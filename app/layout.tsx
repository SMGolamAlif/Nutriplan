import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Navigation from "@/components/navigation";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NutriPlan - AI-Powered Meal Planning",
  description: "Personalized meal plans with a focus on local ingredients",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <Navigation />
          <main className="container mx-auto px-4 py-8">{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
