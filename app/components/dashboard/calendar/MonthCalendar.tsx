import { useI18n } from "~/contexts/I18nContext";
import { useDashboard } from "~/contexts/DashboardContext";

interface MonthCalendarProps {
  currentDate: Date;
  onDateSelect: (date: Date) => void;
}

export function MonthCalendar({ currentDate, onDateSelect }: MonthCalendarProps) {
  const { t } = useI18n();
  const { posts, isLoading } = useDashboard();
  
  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Get day of week for first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  
  // Adjust for Monday as first day of week
  const firstDayAdjusted = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  
  // Get days from previous month to fill the first week
  const daysFromPrevMonth = firstDayAdjusted;
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevMonthYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);
  
  // Get days for next month to fill the last week
  const totalDaysDisplayed = Math.ceil((daysInMonth + firstDayAdjusted) / 7) * 7;
  const daysFromNextMonth = totalDaysDisplayed - daysInMonth - firstDayAdjusted;
  
  // Create calendar days array
  const calendarDays = [];
  
  // Add days from previous month
  for (let i = 0; i < daysFromPrevMonth; i++) {
    const day = daysInPrevMonth - daysFromPrevMonth + i + 1;
    calendarDays.push({
      date: new Date(prevMonthYear, prevMonth, day),
      isCurrentMonth: false,
      isToday: false,
    });
  }
  
  // Add days from current month
  const today = new Date();
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    calendarDays.push({
      date,
      isCurrentMonth: true,
      isToday: 
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear(),
    });
  }
  
  // Add days from next month
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextMonthYear = month === 11 ? year + 1 : year;
  for (let i = 1; i <= daysFromNextMonth; i++) {
    calendarDays.push({
      date: new Date(nextMonthYear, nextMonth, i),
      isCurrentMonth: false,
      isToday: false,
    });
  }
  
  // Group days into weeks
  const weeks = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }
  
  // Get posts for a specific date
  const getPostsForDate = (date: Date) => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    return posts.filter(post => {
      const postDate = new Date(post.scheduledFor);
      return postDate >= startOfDay && postDate <= endOfDay;
    });
  };
  
  // Format time (HH:MM)
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Weekday names
  const weekdays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  
  return (
    <div className="bg-white dark:bg-gray-800">
      <div className="grid grid-cols-7 gap-px border-b border-gray-200 dark:border-gray-700 bg-gray-200 dark:bg-gray-700 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
        {weekdays.map((day, index) => (
          <div key={index} className="py-2">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700">
        {isLoading ? (
          // Loading skeleton
          Array(35).fill(0).map((_, index) => (
            <div key={index} className="min-h-[120px] bg-white dark:bg-gray-800 p-2 animate-pulse">
              <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded-full mb-2"></div>
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
              <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))
        ) : (
          // Calendar content
          weeks.map((week, weekIndex) => (
            week.map((day, dayIndex) => {
              const dayPosts = getPostsForDate(day.date);
              
              return (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`min-h-[120px] ${
                    day.isCurrentMonth 
                      ? 'bg-white dark:bg-gray-800' 
                      : 'bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400'
                  } p-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700`}
                  onClick={() => onDateSelect(day.date)}
                >
                  <div className={`text-right ${
                    day.isToday 
                      ? 'bg-blue-600 dark:bg-blue-500 text-white rounded-full h-6 w-6 flex items-center justify-center ml-auto' 
                      : ''
                  }`}>
                    {day.date.getDate()}
                  </div>
                  
                  <div className="mt-2 space-y-1 max-h-[80px] overflow-y-auto">
                    {dayPosts.slice(0, 3).map((post, index) => (
                      <div 
                        key={index}
                        className="px-2 py-1 text-xs rounded bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 truncate"
                      >
                        <span className="font-medium">{formatTime(post.scheduledFor)}</span>
                        {' - '}
                        {post.content.substring(0, 20)}
                        {post.content.length > 20 ? '...' : ''}
                      </div>
                    ))}
                    
                    {dayPosts.length > 3 && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 pl-2">
                        +{dayPosts.length - 3} {t("dashboard.morePosts")}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ))
        )}
      </div>
    </div>
  );
}
