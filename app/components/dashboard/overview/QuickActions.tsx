import { useI18n } from "~/contexts/I18nContext";
import { useDashboard } from "~/contexts/DashboardContext";
import { Link } from "@remix-run/react";

export function QuickActions() {
  const { t } = useI18n();
  const { openCreatePostModal } = useDashboard();
  
  const actions = [
    {
      name: t("dashboard.createPost"),
      description: t("dashboard.createPostDescription"),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      action: openCreatePostModal,
    },
    {
      name: t("dashboard.viewCalendar"),
      description: t("dashboard.viewCalendarDescription"),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      href: "/dashboard/calendar",
    },
    {
      name: t("dashboard.viewAnalytics"),
      description: t("dashboard.viewAnalyticsDescription"),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      href: "/dashboard/analytics",
    },
  ];
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          {t("dashboard.quickActions")}
        </h3>
      </div>
      
      <div className="bg-white dark:bg-gray-800">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {actions.map((action, index) => (
            <li key={index}>
              {action.href ? (
                <Link
                  to={action.href}
                  className="block hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 text-blue-500 dark:text-blue-400">
                        {action.icon}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {action.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <button
                  onClick={action.action}
                  className="w-full text-left hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 text-blue-500 dark:text-blue-400">
                        {action.icon}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {action.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
