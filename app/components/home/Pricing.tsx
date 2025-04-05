import { useState } from "react";
import { useI18n } from "~/contexts/I18nContext";
import { Button } from "~/components/ui/Button";
import { Link } from "@remix-run/react";

const plans = [
  {
    name: "pricing.starter.title",
    price: "pricing.starter.price",
    features: [
      "1 utilisateur",
      "5 publications par jour",
      "3 plateformes sociales",
      "Planification de base",
      "Analytics de base"
    ],
    cta: "cta.getStarted",
    highlighted: false
  },
  {
    name: "pricing.pro.title",
    price: "pricing.pro.price",
    features: [
      "1 utilisateur",
      "Publications illimitées",
      "Toutes les plateformes sociales",
      "Planification avancée",
      "Analytics complets",
      "Personnalisation par plateforme",
      "Modèles de contenu"
    ],
    cta: "cta.getStarted",
    highlighted: true
  },
  {
    name: "pricing.team.title",
    price: "pricing.team.price",
    features: [
      "5 utilisateurs",
      "Publications illimitées",
      "Toutes les plateformes sociales",
      "Planification avancée",
      "Analytics complets",
      "Personnalisation par plateforme",
      "Modèles de contenu",
      "Workflows d'approbation",
      "Génération de vidéos"
    ],
    cta: "cta.getStarted",
    highlighted: false
  }
];

export function Pricing() {
  const { t } = useI18n();
  const [annual, setAnnual] = useState(true);
  
  return (
    <div id="pricing" className="py-16 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-blue-600 dark:text-blue-400 tracking-wide uppercase">
            {t("pricing.title")}
          </h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight">
            {t("pricing.subtitle")}
          </p>
        </div>
        
        <div className="mt-12 flex justify-center">
          <div className="relative bg-gray-100 dark:bg-gray-800 p-0.5 rounded-lg flex">
            <button
              type="button"
              className={`relative py-2 px-6 border-transparent rounded-md text-sm font-medium whitespace-nowrap focus:outline-none focus:z-10 ${
                !annual 
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                  : 'bg-transparent text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setAnnual(false)}
            >
              {t("pricing.monthly")}
            </button>
            <button
              type="button"
              className={`relative py-2 px-6 border-transparent rounded-md text-sm font-medium whitespace-nowrap focus:outline-none focus:z-10 ${
                annual 
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                  : 'bg-transparent text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setAnnual(true)}
            >
              {t("pricing.yearly")}
            </button>
          </div>
        </div>
        
        <div className="mt-12 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm flex flex-col ${
                plan.highlighted ? 'ring-2 ring-blue-600 dark:ring-blue-400' : ''
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-6 -mt-3 bg-blue-600 dark:bg-blue-400 rounded-full px-4 py-1 text-xs font-semibold text-white uppercase tracking-wide transform">
                  Populaire
                </div>
              )}
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t(plan.name)}
                </h3>
                
                <div className="mt-4 flex items-baseline">
                  <span className="text-5xl font-extrabold text-gray-900 dark:text-white">
                    {t(plan.price)}
                  </span>
                  <span className="ml-1 text-xl font-semibold text-gray-500 dark:text-gray-400">
                    {t("pricing.perMonth")}
                  </span>
                </div>
                
                {annual && (
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {t("pricing.billedAnnually")}
                  </p>
                )}
                
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-green-500 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="ml-3 text-base text-gray-700 dark:text-gray-300">
                        {feature}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-8">
                <Button 
                  variant={plan.highlighted ? "primary" : "outline"} 
                  className="w-full" 
                  asChild
                >
                  <Link to="/signup">
                    {t(plan.cta)}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
