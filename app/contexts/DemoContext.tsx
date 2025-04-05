import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "@remix-run/react";

interface DemoContextType {
  isDemoMode: boolean;
  toggleDemoMode: () => void;
  selectedPlan: string | null;
  setSelectedPlan: (plan: string | null) => void;
  demoData: any;
  startDemoAndRedirect: () => void;
}

const DemoContext = createContext<DemoContextType | null>(null);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>("pro");
  const navigate = useNavigate();
  const [demoData, setDemoData] = useState({
    posts: [
      {
        id: "post1",
        content: "Découvrez notre nouvelle collection printemps-été ! #mode #nouveauté",
        platforms: ["instagram", "facebook"],
        scheduledFor: new Date(Date.now() + 86400000).toISOString(), // tomorrow
        status: "scheduled",
        media: ["https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"]
      },
      {
        id: "post2",
        content: "Webinaire gratuit : Comment optimiser votre présence sur les réseaux sociaux. Inscrivez-vous maintenant !",
        platforms: ["linkedin", "twitter"],
        scheduledFor: new Date(Date.now() + 172800000).toISOString(), // day after tomorrow
        status: "scheduled"
      },
      {
        id: "post3",
        content: "Merci à tous nos clients pour leur fidélité ! Pour célébrer, utilisez le code MERCI15 pour 15% de réduction sur votre prochaine commande.",
        platforms: ["facebook", "instagram", "twitter"],
        scheduledFor: new Date(Date.now() - 86400000).toISOString(), // yesterday
        status: "published",
        engagement: {
          likes: 124,
          comments: 32,
          shares: 18
        }
      }
    ],
    analytics: {
      overview: {
        totalPosts: 12,
        totalEngagement: 1458,
        reachGrowth: 8.5,
        followersGrowth: 4.2
      },
      timeline: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 86400000).toISOString(),
        engagement: Math.floor(Math.random() * 100) + 50
      }))
    },
    socialAccounts: [
      { id: "facebook", name: "Facebook", username: "votreentreprise", connected: true },
      { id: "instagram", name: "Instagram", username: "votreentreprise", connected: true },
      { id: "twitter", name: "Twitter", username: "votreentreprise", connected: true },
      { id: "linkedin", name: "LinkedIn", username: "Votre Entreprise", connected: true },
      { id: "tiktok", name: "TikTok", username: "", connected: false },
      { id: "pinterest", name: "Pinterest", username: "", connected: false }
    ]
  });

  const toggleDemoMode = () => {
    setIsDemoMode(prev => !prev);
  };

  const startDemoAndRedirect = () => {
    setIsDemoMode(true);
    navigate("/dashboard");
  };

  // Check if demo mode is active from localStorage on mount
  useEffect(() => {
    const storedDemoMode = localStorage.getItem("demoMode");
    if (storedDemoMode === "true") {
      setIsDemoMode(true);
    }
  }, []);

  // Save demo mode state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("demoMode", isDemoMode.toString());
  }, [isDemoMode]);

  return (
    <DemoContext.Provider value={{ 
      isDemoMode, 
      toggleDemoMode, 
      selectedPlan, 
      setSelectedPlan,
      demoData,
      startDemoAndRedirect
    }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  
  if (!context) {
    throw new Error("useDemo must be used within a DemoProvider");
  }
  
  return context;
}
