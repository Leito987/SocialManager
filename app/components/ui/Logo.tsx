export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <svg 
        width="32" 
        height="32" 
        viewBox="0 0 32 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="text-blue-600 dark:text-blue-400"
      >
        <path 
          d="M16 2C8.268 2 2 8.268 2 16C2 23.732 8.268 30 16 30C23.732 30 30 23.732 30 16C30 8.268 23.732 2 16 2ZM10 22V10L22 16L10 22Z" 
          fill="currentColor"
        />
      </svg>
      <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">SocialSync</span>
    </div>
  );
}
