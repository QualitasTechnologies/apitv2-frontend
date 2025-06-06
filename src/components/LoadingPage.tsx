import { useEffect, useState } from "react";

interface LoadingPageProps {
  onLoadingComplete: () => void;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onLoadingComplete();
          }, 200);
          return 100;
        }
        return prev + 2;
      });
    }, 40); // 40ms * 50 steps = 2000ms (2 seconds)

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col items-center justify-center">
      {/* Company Logo */}
      <div className="mb-8 animate-pulse">
        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl p-4">
          <img 
            src="/company-logo.png" 
            alt="APIT Company Logo" 
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Company Name */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">APIT</h1>
        <p className="text-xl text-rice-secondary font-semibold">Rice Doctor</p>
        <p className="text-gray-200 mt-2">Advanced Rice Quality Analysis System</p>
      </div>

      {/* Loading Progress */}
      <div className="w-80 mb-4">
        <div className="bg-white/30 rounded-full h-3 overflow-hidden shadow-inner">
          <div 
            className="bg-rice-secondary h-full transition-all duration-100 ease-out rounded-full shadow-sm"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Loading Text */}
      <p className="text-gray-100 text-sm font-medium">
        {progress < 30 && "Initializing system..."}
        {progress >= 30 && progress < 60 && "Loading components..."}
        {progress >= 60 && progress < 90 && "Preparing interface..."}
        {progress >= 90 && "Ready!"}
      </p>

      {/* Version Info */}
      <div className="absolute bottom-8 text-center">
        <p className="text-gray-300 text-xs">Version 2.0.1</p>
        <p className="text-gray-300 text-xs">© 2024 APIT Technologies</p>
      </div>
    </div>
  );
};

export default LoadingPage; 