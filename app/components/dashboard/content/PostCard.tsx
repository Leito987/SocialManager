import { useI18n } from "~/contexts/I18nContext";
import { useDashboard, Post } from "~/contexts/DashboardContext";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { t } = useI18n();
  const { deletePost } = useDashboard();
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Get status badge color
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      draft: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      scheduled: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      published: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      failed: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    };
    
    return colors[status] || colors.draft;
  };
  
  // Get platform badge color
  const getPlatformColor = (platform: string) => {
    const colors: Record<string, string> = {
      facebook: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      instagram: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
      twitter: 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300',
      linkedin: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
    };
    
    return colors[platform] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };
  
  const handleDelete = async () => {
    if (window.confirm(t("dashboard.confirmDeletePost"))) {
      try {
        await deletePost(post.id);
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                {t(`dashboard.${post.status}`)}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(post.scheduledFor)}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-2">
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button 
              className="text-gray-400 hover:text-red-500 dark:hover:text-red-400"
              title={t("dashboard.delete")}
              onClick={handleDelete}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="mt-2">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {post.content}
          </p>
        </div>
        
        {post.media && post.media.length > 0 && (
          <div className="mt-3">
            <img 
              src={post.media[0]} 
              alt="" 
              className="h-40 w-full rounded-md object-cover"
            />
          </div>
        )}
        
        {post.status === 'published' && post.engagement && (
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-4 text-sm">
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {post.engagement.likes}
              </div>
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                {post.engagement.comments}
              </div>
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                {post.engagement.shares}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
