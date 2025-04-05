import { Outlet, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { DashboardLayout } from "~/components/dashboard/DashboardLayout";
import { useAuth } from "~/contexts/AuthContext";
import { useDemo } from "~/contexts/DemoContext";
import { DashboardProvider } from "~/contexts/DashboardContext";

// Mock data for the dashboard
const mockDashboardData = {
  posts: [
    {
      id: "post-1",
      content: "Check out our latest product launch!",
      platforms: ["twitter", "linkedin"],
      scheduledFor: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      status: "scheduled",
      engagement: {
        likes: 0,
        comments: 0,
        shares: 0
      }
    },
    {
      id: "post-2",
      content: "We're hiring! Join our team of passionate professionals.",
      platforms: ["linkedin", "facebook"],
      scheduledFor: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
      status: "draft",
      engagement: {
        likes: 0,
        comments: 0,
        shares: 0
      }
    },
    {
      id: "post-3",
      content: "Thanks to everyone who attended our webinar yesterday!",
      platforms: ["twitter", "facebook", "instagram"],
      scheduledFor: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      status: "published",
      engagement: {
        likes: 45,
        comments: 12,
        shares: 8
      }
    }
  ],
  analytics: {
    overview: {
      totalPosts: 24,
      totalEngagement: 1250,
      reachGrowth: 15.8,
      followersGrowth: 7.2
    },
    timeline: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
      engagement: Math.floor(Math.random() * 100) + 20
    })).reverse()
  },
  socialAccounts: [
    {
      id: "account-1",
      name: "Twitter",
      username: "@yourbrand",
      connected: true
    },
    {
      id: "account-2",
      name: "LinkedIn",
      username: "Your Brand",
      connected: true
    },
    {
      id: "account-3",
      name: "Facebook",
      username: "Your Brand Page",
      connected: true
    },
    {
      id: "account-4",
      name: "Instagram",
      username: "@yourbrand",
      connected: false
    }
  ]
};

export default function Dashboard() {
  const { isAuthenticated } = useAuth();
  const { isDemoMode } = useDemo();
  const navigate = useNavigate();
  
  // Redirect to login if not authenticated and not in demo mode
  useEffect(() => {
    if (!isAuthenticated && !isDemoMode) {
      navigate("/login");
    }
  }, [isAuthenticated, isDemoMode, navigate]);
  
  // If not authenticated and not in demo mode, don't render anything
  // This prevents a flash of the dashboard before redirect
  if (!isAuthenticated && !isDemoMode) {
    return null;
  }
  
  return (
    <DashboardProvider initialData={mockDashboardData}>
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </DashboardProvider>
  );
}
