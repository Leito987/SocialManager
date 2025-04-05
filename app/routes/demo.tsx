import type { MetaFunction } from "@remix-run/node";
import { Header } from "~/components/layout/Header";
import { Footer } from "~/components/layout/Footer";
import { Button } from "~/components/ui/Button";
import { useI18n } from "~/contexts/I18nContext";
import { DemoProvider, useDemo } from "~/contexts/DemoContext";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "SocialSync - Mode Démo" },
    { name: "description", content: "Essayez SocialSync sans créer de compte. Découvrez comment notre plateforme peut simplifier votre gestion des médias sociaux." },
  ];
};

function DemoContent() {
  const { t } = useI18n();
  const { toggleDemoMode, isDemoMode, setSelectedPlan } = useDemo();
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  
  const platforms = [
    { id: "instagram", name: "Instagram", icon: "instagram" },
    { id: "facebook", name: "Facebook", icon: "facebook" },
    { id: "twitter", name: "Twitter", icon: "twitter" },
    { id: "linkedin", name: "LinkedIn", icon: "linkedin" },
    { id: "tiktok", name: "TikTok", icon: "tiktok" },
    { id: "pinterest", name: "Pinterest", icon: "pinterest" },
  ];
  
  const plans = [
    { id: "starter", name: t("pricing.starter.title"), price: t("pricing.starter.price") },
    { id: "pro", name: t("pricing.pro.title"), price: t("pricing.pro.price") },
    { id: "team", name: t("pricing.team.title"), price: t("pricing.team.price") },
  ];
  
  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };
  
  const startDemo = () => {
    if (selectedPlatforms.length === 0) {
      alert("Veuillez sélectionner au moins une plateforme");
      return;
    }
    
    toggleDemoMode();
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
          {t("demo.title")}
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          {t("demo.description")}
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Sélectionnez vos plateformes
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {platforms.map(platform => (
            <div 
              key={platform.id}
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                selectedPlatforms.includes(platform.id)
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
              }`}
              onClick={() => togglePlatform(platform.id)}
            >
              <div className="flex items-center">
                <div className="w-6 h-6 mr-3">
                  {/* Placeholder for platform icon */}
                  <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>
                <span className="text-gray-900 dark:text-white">{platform.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Sélectionnez un plan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {plans.map(plan => (
            <div 
              key={plan.id}
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                plan.id === 'pro' 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              <h3 className="font-medium text-gray-900 dark:text-white">{plan.name}</h3>
              <div className="mt-2 flex items-baseline">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">/mois</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center">
        <Button variant="primary" size="lg" onClick={startDemo}>
          {t("demo.start")}
        </Button>
      </div>
    </div>
  );
}

export default function Demo() {
  return (
    <DemoProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-16">
          <DemoContent />
        </main>
        <Footer />
      </div>
    </DemoProvider>
  );
}
