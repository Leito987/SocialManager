import { useI18n } from "~/contexts/I18nContext";
import { useDashboard } from "~/contexts/DashboardContext";
import { Button } from "~/components/ui/Button";

interface DayViewProps {
  selectedDate: Date;
}

export function DayView({ selectedDate }: DayViewProps) {
  const { t } = useI18n();
  const { posts, isLoading, openCreatePostModal } = useDashboard();
  
  // Get start and end of selected date
  const startOfDay = new Date(selectedDate);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(selectedDate);
  endOfDay.setHours(23, 59, 59, 999);
  
  // Get posts for the selected date
  const dayPosts = posts.filter(post => {
    const postDate = new Date(post.scheduledFor);
    return postDate >= startOfDay && postDate <= endOfDay;
  }).sort((a, b) => new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime());
  
  // Group posts by hour
  const hourlyPosts: Record<number, typeof posts> = {};
  
  for (let i = 0; i < 24; i++) {
    hourlyPosts[i] = [];
  }
  
  dayPosts.forEach(post => {
    const postDate = new Date(post.scheduledFor);
    const hour = postDate.getHours();
    hourlyPosts[hour].push(post);
  });
  
  // Format time (HH:MM)
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Get platform badge color
  const getPlatformColor = (platform: string) => {
    const colors: Record<string, string> = {
      facebook: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      instagram: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
      twitter: 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300',
      linkedin: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
      tiktok: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
      pinterest: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    };
    
    return colors[platform] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
      {isLoading ? (
        // Loading skeleton
        Array(8).fill(0).map((_, index) => (
          <div key={index} className="p-4 animate-pulse">
            <div className="flex items-center">
              <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded mr-4"></div>
              <div className="flex-1 h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        ))
      ) : dayPosts.length > 0 ? (
        // Hours with posts
        Object.entries(hourlyPosts).map(([hour, hourPosts]) => {
          if (hourPosts.length === 0) return null;
          
          return (
            <div key={hour} className="p-4">
              <div className="flex items-start">
                <div className="w-16 text-right text-sm font-medium text-gray-500 dark:text-gray-400 pt-2">
                  {hour}:00
                </div>
                <div className="ml-4 flex-1 space-y-4">
                  {hourPosts.map((post) => (
                    <div 
                      key={post.id} 
                      className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {formatTime(post.scheduledFor)}
                          </span>
                          <div className="ml-3 flex space-x-1">
                            {post.platforms.map((platform) => (
                              <span 
                                key={platform} 
                                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getPlatformColor(platform)}`}
                              >
                                {platform}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                            title={t("dashboard.edit")}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button 
                            className="text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                            title={t("dashboard.delete")}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                        {post.content}
                      </p>
                      {post.media && post.media.length > 0 && (
                        <div className="mt-2">
                          <img 
                            src={post.media[0]} 
                            alt="" 
                            className="h-32 w-auto rounded-md object-cover"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        // No posts for this day
        <div className="p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
            {t("dashboard.noPostsScheduled")}
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t("dashboard.getStartedByCreatingPost")}
          </p>
          <div className="mt-6">
            <Button variant="primary" size="sm" onClick={openCreatePostModal}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              {t("dashboard.createPost")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
