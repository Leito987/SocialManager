import { useEffect } from "react";
import { useI18n } from "~/contexts/I18nContext";
import { ContentLibrary } from "~/components/dashboard/content/ContentLibrary";

export default function DashboardContentRoute() {
  const { t } = useI18n();
  
  // Set page title
  useEffect(() => {
    document.title = `${t("dashboard.content")} - SocialSync`;
  }, [t]);

  return <ContentLibrary />;
}
