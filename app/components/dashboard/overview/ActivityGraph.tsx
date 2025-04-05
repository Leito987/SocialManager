import { useEffect, useRef } from "react";
import { useI18n } from "~/contexts/I18nContext";
import { useDashboard } from "~/contexts/DashboardContext";

interface ActivityGraphProps {
  timeRange: '7days' | '30days';
}

export function ActivityGraph({ timeRange }: ActivityGraphProps) {
  const { t } = useI18n();
  const { analytics, isLoading } = useDashboard();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (isLoading || !canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    // Get data for the selected time range
    const data = analytics.timeline.slice(
      timeRange === '7days' ? -7 : -30
    );
    
    // Find max value for scaling
    const maxEngagement = Math.max(...data.map(d => d.engagement), 10);
    
    // Canvas dimensions
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;
    const padding = 40;
    const graphWidth = width - padding * 2;
    const graphHeight = height - padding * 2;
    
    // Draw axes
    ctx.beginPath();
    ctx.strokeStyle = '#CBD5E0';
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
    
    // Draw grid lines
    ctx.beginPath();
    ctx.strokeStyle = '#EDF2F7';
    for (let i = 1; i <= 5; i++) {
      const y = padding + (graphHeight / 5) * i;
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
    }
    ctx.stroke();
    
    // Draw data points and line
    if (data.length > 0) {
      ctx.beginPath();
      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 2;
      
      data.forEach((point, index) => {
        const x = padding + (graphWidth / (data.length - 1)) * index;
        const y = height - padding - (point.engagement / maxEngagement) * graphHeight;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        
        // Draw point
        ctx.fillStyle = '#3B82F6';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      });
      
      ctx.stroke();
      
      // Draw area under the line
      ctx.beginPath();
      ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
      
      data.forEach((point, index) => {
        const x = padding + (graphWidth / (data.length - 1)) * index;
        const y = height - padding - (point.engagement / maxEngagement) * graphHeight;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.lineTo(padding + graphWidth, height - padding);
      ctx.lineTo(padding, height - padding);
      ctx.closePath();
      ctx.fill();
      
      // Draw x-axis labels (dates)
      ctx.fillStyle = '#718096';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      
      const labelStep = Math.max(1, Math.floor(data.length / 7)); // Show max 7 labels
      
      data.forEach((point, index) => {
        if (index % labelStep === 0 || index === data.length - 1) {
          const x = padding + (graphWidth / (data.length - 1)) * index;
          const date = new Date(point.date);
          const label = `${date.getDate()}/${date.getMonth() + 1}`;
          ctx.fillText(label, x, height - padding + 15);
        }
      });
      
      // Draw y-axis labels (engagement values)
      ctx.textAlign = 'right';
      for (let i = 0; i <= 5; i++) {
        const y = height - padding - (graphHeight / 5) * i;
        const value = Math.round((maxEngagement / 5) * i);
        ctx.fillText(value.toString(), padding - 5, y + 3);
      }
    }
  }, [analytics, timeRange, isLoading]);
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          {t("dashboard.activityOverview")}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
          {t("dashboard.engagementOverTime")}
        </p>
      </div>
      
      <div className="p-4">
        {isLoading ? (
          <div className="animate-pulse flex flex-col">
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        ) : (
          <div className="h-64 relative">
            <canvas 
              ref={canvasRef} 
              width={800} 
              height={300} 
              className="w-full h-full"
            ></canvas>
          </div>
        )}
      </div>
    </div>
  );
}
