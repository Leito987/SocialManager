import type { MetaFunction } from "@remix-run/node";
import { Header } from "~/components/layout/Header";
import { Footer } from "~/components/layout/Footer";
import { Hero } from "~/components/home/Hero";
import { Features } from "~/components/home/Features";
import { Pricing } from "~/components/home/Pricing";
import { Testimonials } from "~/components/home/Testimonials";
import { FAQ } from "~/components/home/FAQ";
import { CTASection } from "~/components/home/CTASection";
import { DemoProvider } from "~/contexts/DemoContext";
import { useI18n } from "~/contexts/I18nContext";

export const meta: MetaFunction = () => {
  return [
    { title: "SocialSync - Planifiez votre contenu partout en quelques secondes" },
    { name: "description", content: "La solution la plus simple pour publier et développer votre entreprise sur toutes les plateformes. Conçue pour les créateurs et les petites équipes, sans les coûts exorbitants." },
  ];
};

export default function Index() {
  const { t } = useI18n();

  return (
    <DemoProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-16">
          <Hero />
          <Features />
          <Testimonials />
          <Pricing />
          <FAQ />
          <CTASection />
        </main>
        <Footer />
      </div>
    </DemoProvider>
  );
}
