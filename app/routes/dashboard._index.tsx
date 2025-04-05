import { useEffect } from "react";
import { useI18n } from "~/contexts/I18nContext";
import { useDashboard } from "~/contexts/DashboardContext";
import { DashboardOverview } from "~/components/dashboard/overview/DashboardOverview";

export default function DashboardIndexRoute() {
  const { t } = useI18n();
  
  // Set page title
  useEffect(() => {
    document.title = `${t("dashboard.overview")} - SocialSync`;
  }, [t]);

  return <DashboardOverview />;
}
