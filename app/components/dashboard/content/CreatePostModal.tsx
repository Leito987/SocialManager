import { useState } from "react";
import { useI18n } from "~/contexts/I18nContext";
import { useDashboard } from "~/contexts/DashboardContext";
import { Button } from "~/components/ui/Button";

export function CreatePostModal({ onClose }: { onClose: () => void }) {
  const { t } = useI18n();
  const { socialAccounts, createPost } = useDashboard();
  const [content, setContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [scheduledDate, setScheduledDate] = useState<string>("");
  const [scheduledTime, setScheduledTime] = useState<string>("12:00");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);

  const connectedAccounts = socialAccounts.filter(account => account.connected);

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content || selectedPlatforms.length === 0 || !scheduledDate) {
      return;
    }
    
    setIsSubmitting(true);
    
    const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`);
    
    try {
      await createPost({
        content,
        platforms: selectedPlatforms,
        scheduledFor: scheduledDateTime.toISOString(),
        status: 'scheduled',
        media: mediaPreview ? [mediaPreview] : undefined,
      });
      
      onClose();
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeMedia = () => {
    setMediaPreview(null);
  };

  // Set default date to tomorrow
  if (!scheduledDate) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setScheduledDate(tomorrow.toISOString().split('T')[0]);
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  {t("dashboard.createPost")}
                </h3>
                
                <form onSubmit={handleSubmit} className="mt-4 space-y-6">
                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t("dashboard.postContent")}
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="content"
                        name="content"
                        rows={4}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-white"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  {mediaPreview && (
                    <div className="relative">
                      <img 
                        src={mediaPreview} 
                        alt="Preview" 
                        className="mt-2 rounded-md max-h-40 mx-auto"
                      />
                      <button
                        type="button"
                        onClick={removeMedia}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t("dashboard.addMedia")}
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600 dark:text-gray-400">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                          >
                            <span>{t("dashboard.uploadFile")}</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleFileChange}
                            />
                          </label>
                          <p className="pl-1">{t("dashboard.dragAndDrop")}</p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t("dashboard.platforms")}
                    </label>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {connectedAccounts.map((account) => (
                        <div
                          key={account.id}
                          className={`flex items-center p-3 rounded-md cursor-pointer ${
                            selectedPlatforms.includes(account.id)
                              ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-500'
                              : 'bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600'
                          }`}
                          onClick={() => handlePlatformToggle(account.id)}
                        >
                          <div className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400">
                            {/* Platform icon placeholder */}
                            <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {account.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="scheduled-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t("dashboard.date")}
                      </label>
                      <input
                        type="date"
                        id="scheduled-date"
                        name="scheduled-date"
                        className="mt-1 block w-full border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="scheduled-time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t("dashboard.time")}
                      </label>
                      <input
                        type="time"
                        id="scheduled-time"
                        name="scheduled-time"
                        className="mt-1 block w-full border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={onClose}
                      disabled={isSubmitting}
                    >
                      {t("dashboard.cancel")}
                    </Button>
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isSubmitting || !content || selectedPlatforms.length === 0}
                    >
                      {isSubmitting ? t("dashboard.scheduling") : t("dashboard.schedule")}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
