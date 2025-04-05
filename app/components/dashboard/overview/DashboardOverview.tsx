import { useState } from "react";
import { useI18n } from "~/contexts/I18nContext";
import { useDashboard } from "~/contexts/DashboardContext";
import { StatCard } from "./StatCard";
import { UpcomingPosts } from "./UpcomingPosts";
import { ActivityGraph } from "./ActivityGraph";
import { ConnectedAccounts } from "./ConnectedAccounts";
import { QuickActions } from "./QuickActions";

export function DashboardOverview() {
  const { t } = useI18n();
  const { analytics, isLoading } = useDashboard();
  const [timeRange, setTimeRange] = useState<'7days' | '30days'>('7days');
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("dashboard.overview")}
        </h1>
        
        <div className="inline-flex items-center rounded-md shadow-sm">
          <button
            type="button"
            className={`relative inline-flex items-center px-3 py-2 rounded-l-md border text-sm font-medium ${
              timeRange === '7days'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
            onClick={() => setTimeRange('7days')}
          >
            7 {t("dashboard.days")}
          </button>
          <button
            type="button"
            className={`relative inline-flex items-center px-3 py-2 rounded-r-md border text-sm font-medium ${
              timeRange === '30days'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
            onClick={() => setTimeRange('30days')}
          >
            30 {t("dashboard.days")}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title={t("dashboard.scheduledPosts")}
          value={analytics.overview.totalPosts}
          change={+5}
          isLoading={isLoading}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        />
        
        <StatCard
          title={t("dashboard.totalEngagement")}
          value={analytics.overview.totalEngagement}
          change={+12.5}
          isLoading={isLoading}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
          }
        />
        
        <StatCard
          title={t("dashboard.reachGrowth")}
          value={`${analytics.overview.reachGrowth}%`}
          change={+3.2}
          isLoading={isLoading}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          }
        />
        
        <StatCard
          title={t("dashboard.followersGrowth")}
          value={`${analytics.overview.followersGrowth}%`}
          change={+1.8}
          isLoading={isLoading}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
        />
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivityGraph timeRange={timeRange} />
        </div>
        
        <div>
          <UpcomingPosts />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ConnectedAccounts />
        </div>
        
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
