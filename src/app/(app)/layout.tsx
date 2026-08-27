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
  title: "DOSLED — Светодиодные экраны | Казахстан",
  description:
    "Наружные, внутренние, арендные, COB, напольные, спортивные и прозрачные LED-экраны в Казахстане, в Астане. Продажа, монтаж, рассрочка и trade-in в Казахстане, в Астане.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-mist text-navy">
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
