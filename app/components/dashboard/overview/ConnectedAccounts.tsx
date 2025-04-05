import { useI18n } from "~/contexts/I18nContext";
import { useDashboard } from "~/contexts/DashboardContext";
import { Button } from "~/components/ui/Button";

export function ConnectedAccounts() {
  const { t } = useI18n();
  const { socialAccounts, isLoading } = useDashboard();
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          {t("dashboard.connectedAccounts")}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
          {t("dashboard.manageYourSocialAccounts")}
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 overflow-hidden">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {isLoading ? (
            Array(4).fill(0).map((_, index) => (
              <li key={index} className="px-4 py-4">
                <div className="animate-pulse flex justify-between items-center">
                  <div className="flex space-x-3">
                    <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-10 w-10"></div>
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-36"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                    </div>
                  </div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                </div>
              </li>
            ))
          ) : (
            socialAccounts.map((account) => (
              <li key={account.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400">
                        {account.name.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {account.name}
                      </div>
                      {account.connected && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          @{account.username}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    {account.connected ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        {t("dashboard.connected")}
                      </span>
                    ) : (
                      <Button variant="outline" size="sm">
                        {t("dashboard.connect")}
                      </Button>
                    )}
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
        
        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-4 sm:px-6">
          <Button variant="outline" size="sm" className="w-full">
            {t("dashboard.addAccount")}
          </Button>
        </div>
      </div>
    </div>
  );
}
