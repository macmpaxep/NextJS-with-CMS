import type { Metadata } from "next";
import "@fontsource/exo-2/500.css";
import "@fontsource/exo-2/600.css";
import "@fontsource/exo-2/700.css";
import "@fontsource/exo-2/800.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RequestModalProvider from "@/components/RequestModalProvider";

export const metadata: Metadata = {
  title: "DOSLED – Проектирование и интеграция премиальных LED-экранов в Казахстане",
  description:
    "Разработка и установка эксклюзивных светодиодных систем для бизнеса, архитектурных объектов и флагманских интерьеров. Интерьерные, гибкие и прозрачные LED-решения под ключ.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-mist text-ink">
        <RequestModalProvider>
          <div className="sticky top-0 z-50">
            <TopBar />
            <Navbar />
          </div>
          <main className="flex-1">{children}</main>
          <Footer />
        </RequestModalProvider>
      </body>
    </html>
  );
}
