import { createContext, useContext, useState, ReactNode } from "react";
import { CreatePostModal } from "~/components/dashboard/content/CreatePostModal";

export interface Post {
  id: string;
  content: string;
  platforms: string[];
  scheduledFor: string;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  media?: string[];
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
  };
}

interface SocialAccount {
  id: string;
  name: string;
  username: string;
  connected: boolean;
}

interface Analytics {
  overview: {
    totalPosts: number;
    totalEngagement: number;
    reachGrowth: number;
    followersGrowth: number;
  };
  timeline: {
    date: string;
    engagement: number;
  }[];
}

interface DashboardData {
  posts: Post[];
  analytics: Analytics;
  socialAccounts: SocialAccount[];
}

interface DashboardContextType {
  posts: Post[];
  analytics: Analytics;
  socialAccounts: SocialAccount[];
  isLoading: boolean;
  createPost: (post: Omit<Post, 'id'>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  openCreatePostModal: () => void;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export function DashboardProvider({ 
  children, 
  initialData 
}: { 
  children: ReactNode;
  initialData: DashboardData;
}) {
  const [data, setData] = useState<DashboardData>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  const createPost = async (postData: Omit<Post, 'id'>) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newPost: Post = {
        id: `post-${Date.now()}`,
        ...postData
      };
      
      setData(prev => ({
        ...prev,
        posts: [...prev.posts, newPost],
        analytics: {
          ...prev.analytics,
          overview: {
            ...prev.analytics.overview,
            totalPosts: prev.analytics.overview.totalPosts + 1
          }
        }
      }));
    } finally {
      setIsLoading(false);
    }
  };
  
  const deletePost = async (id: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setData(prev => ({
        ...prev,
        posts: prev.posts.filter(post => post.id !== id),
        analytics: {
          ...prev.analytics,
          overview: {
            ...prev.analytics.overview,
            totalPosts: prev.analytics.overview.totalPosts - 1
          }
        }
      }));
    } finally {
      setIsLoading(false);
    }
  };
  
  const openCreatePostModal = () => {
    setIsCreateModalOpen(true);
  };
  
  const closeCreatePostModal = () => {
    setIsCreateModalOpen(false);
  };
  
  return (
    <DashboardContext.Provider value={{
      posts: data.posts,
      analytics: data.analytics,
      socialAccounts: data.socialAccounts,
      isLoading,
      createPost,
      deletePost,
      openCreatePostModal
    }}>
      {children}
      {isCreateModalOpen && <CreatePostModal onClose={closeCreatePostModal} />}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  
  return context;
}
