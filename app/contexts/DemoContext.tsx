import { createContext, useContext, useState } from "react";

interface DemoContextType {
  isDemoMode: boolean;
  toggleDemoMode: () => void;
  selectedPlan: string | null;
  setSelectedPlan: (plan: string | null) => void;
  demoData: any;
}

const DemoContext = createContext<DemoContextType | null>(null);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [demoData, setDemoData] = useState({
    posts: [],
    analytics: {
      engagement: 78,
      reach: 1250,
      followers: 520,
      growth: 12.5
    }
  });

  const toggleDemoMode = () => {
    setIsDemoMode(prev => !prev);
  };

  return (
    <DemoContext.Provider value={{ 
      isDemoMode, 
      toggleDemoMode, 
      selectedPlan, 
      setSelectedPlan,
      demoData
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
