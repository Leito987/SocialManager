import { Link } from "@remix-run/react";
import { useAuth } from "~/contexts/AuthContext";
import { useDemo } from "~/contexts/DemoContext";
import { Button } from "~/components/ui/Button";

export function DashboardHeader() {
  const { user, logout } = useAuth();
  const { isDemoMode } = useDemo();
  
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
                SocialSync
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {isDemoMode && (
              <span className="mr-4 px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">
                Mode Démo
              </span>
            )}
            <div className="ml-3 relative">
              <div className="flex items-center space-x-3">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {user?.name || "Utilisateur"}
                </div>
                <Button variant="outline" size="sm" onClick={logout}>
                  Déconnexion
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
