import { useEffect } from "react";
import { useI18n } from "~/contexts/I18nContext";
import { CalendarView } from "~/components/dashboard/calendar/CalendarView";

export default function DashboardCalendarRoute() {
  const { t } = useI18n();
  
  // Set page title
  useEffect(() => {
    document.title = `${t("dashboard.calendar")} - SocialSync`;
  }, [t]);

  return <CalendarView />;
}
