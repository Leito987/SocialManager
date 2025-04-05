import { useState } from "react";
import { useI18n } from "~/contexts/I18nContext";
import { useDashboard } from "~/contexts/DashboardContext";
import { MonthCalendar } from "./MonthCalendar";
import { DayView } from "./DayView";
import { Button } from "~/components/ui/Button";

export function CalendarView() {
  const { t } = useI18n();
  const { openCreatePostModal } = useDashboard();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [view, setView] = useState<'month' | 'day'>('month');
  
  const handlePrevMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };
  
  const handleNextMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };
  
  const handleToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(null);
  };
  
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setView('day');
  };
  
  const handleBackToMonth = () => {
    setView('month');
  };
  
  const formatMonthYear = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      month: 'long',
      year: 'numeric'
    }).format(date);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t("dashboard.calendar")}
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {view === 'month' 
              ? formatMonthYear(currentDate) 
              : selectedDate 
                ? new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full' }).format(selectedDate)
                : ''}
          </p>
        </div>
        
        <div className="flex space-x-3">
          {view === 'day' && (
            <Button variant="outline" size="sm" onClick={handleBackToMonth}>
              {t("dashboard.backToMonth")}
            </Button>
          )}
          
          <div className="inline-flex shadow-sm rounded-md">
            <button
              type="button"
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              onClick={handlePrevMonth}
            >
              <span className="sr-only">{t("dashboard.previous")}</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              type="button"
              className="relative inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              onClick={handleToday}
            >
              {t("dashboard.today")}
            </button>
            <button
              type="button"
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              onClick={handleNextMonth}
            >
              <span className="sr-only">{t("dashboard.next")}</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <Button variant="primary" size="sm" onClick={openCreatePostModal}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            {t("dashboard.createPost")}
          </Button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        {view === 'month' ? (
          <MonthCalendar 
            currentDate={currentDate} 
            onDateSelect={handleDateSelect} 
          />
        ) : (
          <DayView 
            selectedDate={selectedDate || new Date()} 
          />
        )}
      </div>
    </div>
  );
}
