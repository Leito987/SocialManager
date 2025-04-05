import { useI18n } from "~/contexts/I18nContext";
import { useDashboard } from "~/contexts/DashboardContext";
import { Link } from "@remix-run/react";

export function UpcomingPosts() {
  const { t } = useI18n();
  const { posts, isLoading } = useDashboard();
  
  // Get upcoming posts (scheduled for the future)
  const now = new Date();
  const upcomingPosts = posts
    .filter(post => new Date(post.scheduledFor) > now && post.status === 'scheduled')
    .sort((a, b) => new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime())
    .slice(0, 5);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          {t("dashboard.upcomingPosts")}
        </h3>
      </div>
      
      <div className="bg-white dark:bg-gray-800 overflow-hidden">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {isLoading ? (
            Array(3).fill(0).map((_, index) => (
              <li key={index} className="px-4 py-4">
                <div className="animate-pulse flex space-x-4">
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>
              </li>
            ))
          ) : upcomingPosts.length > 0 ? (
            upcomingPosts.map((post) => (
              <li key={post.id} className="px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {post.content.length > 60 ? post.content.substring(0, 60) + '...' : post.content}
                    </p>
                    <div className="flex mt-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(post.scheduledFor)}
                      </p>
                      <span className="mx-2 text-gray-500 dark:text-gray-400">•</span>
                      <div className="flex space-x-1">
                        {post.platforms.map((platform) => (
                          <span 
                            key={platform} 
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          >
                            {platform}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {post.media && post.media.length > 0 && (
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-md object-cover" src={post.media[0]} alt="" />
                    </div>
                  )}
                </div>
              </li>
            ))
          ) : (
            <li className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
              {t("dashboard.noUpcomingPosts")}
            </li>
          )}
        </ul>
        
        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-4 sm:px-6">
          <div className="flex items-center justify-center">
            <Link
              to="/dashboard/calendar"
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
            >
              {t("dashboard.viewAllScheduled")} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
