import { useState } from "react";
import { useI18n } from "~/contexts/I18nContext";
import { useDashboard } from "~/contexts/DashboardContext";
import { Button } from "~/components/ui/Button";
import { PostCard } from "./PostCard";

export function ContentLibrary() {
  const { t } = useI18n();
  const { posts, isLoading, openCreatePostModal } = useDashboard();
  const [filter, setFilter] = useState<'all' | 'scheduled' | 'published' | 'draft'>('all');
  const [platformFilter, setPlatformFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter posts based on status, platform, and search query
  const filteredPosts = posts.filter(post => {
    // Filter by status
    if (filter !== 'all' && post.status !== filter) {
      return false;
    }
    
    // Filter by platform
    if (platformFilter && !post.platforms.includes(platformFilter)) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !post.content.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  }).sort((a, b) => new Date(b.scheduledFor).getTime() - new Date(a.scheduledFor).getTime());
  
  // Get unique platforms from all posts
  const platforms = Array.from(
    new Set(posts.flatMap(post => post.platforms))
  );
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("dashboard.content")}
        </h1>
        
        <Button variant="primary" onClick={openCreatePostModal}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          {t("dashboard.createPost")}
        </Button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <label htmlFor="search" className="sr-only">
                {t("dashboard.search")}
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-white"
                  placeholder={t("dashboard.searchPosts")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex space-x-2">
              <select
                id="status-filter"
                name="status-filter"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
              >
                <option value="all">{t("dashboard.allPosts")}</option>
                <option value="scheduled">{t("dashboard.scheduled")}</option>
                <option value="published">{t("dashboard.published")}</option>
                <option value="draft">{t("dashboard.drafts")}</option>
              </select>
              
              <select
                id="platform-filter"
                name="platform-filter"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                value={platformFilter || ""}
                onChange={(e) => setPlatformFilter(e.target.value || null)}
              >
                <option value="">{t("dashboard.allPlatforms")}</option>
                {platforms.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800">
          {isLoading ? (
            <div className="p-8 animate-pulse space-y-6">
              {Array(3).fill(0).map((_, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mb-4"></div>
                      <div className="h-16 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
                    </div>
                    <div className="h-20 w-20 bg-gray-200 dark:bg-gray-600 rounded ml-4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="p-4 grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                {t("dashboard.noPostsFound")}
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {t("dashboard.tryDifferentFilters")}
              </p>
              <div className="mt-6">
                <Button variant="primary" onClick={openCreatePostModal}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  {t("dashboard.createPost")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
