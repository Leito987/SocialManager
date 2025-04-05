import { useI18n } from "~/contexts/I18nContext";
import { Button } from "~/components/ui/Button";
import { Link } from "@remix-run/react";

export function CTASection() {
  const { t } = useI18n();
  
  return (
    <div className="bg-blue-600 dark:bg-blue-700">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          <span className="block">{t("app.tagline")}</span>
          <span className="block text-blue-200">{t("app.name")}</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <Button
              variant="secondary"
              size="lg"
              asChild
            >
              <Link to="/signup">
                {t("cta.getStarted")}
              </Link>
            </Button>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <Button
              variant="outline"
              size="lg"
              className="bg-white text-blue-600 border-transparent hover:bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
              asChild
            >
              <Link to="/demo">
                {t("cta.tryDemo")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
