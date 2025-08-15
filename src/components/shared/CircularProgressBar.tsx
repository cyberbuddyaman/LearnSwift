'use client';

import * as React from 'react';

interface CircularProgressBarProps {
  progress?: number;
  size?: number;
  strokeWidth?: number;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ progress = 0, size = 100, strokeWidth = 10 }) => {
  const [displayProgress, setDisplayProgress] = React.useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayProgress / 100) * circumference;

  React.useEffect(() => {
    // Animate the progress value
    const animation = requestAnimationFrame(() => {
        setDisplayProgress(progress);
    });
    return () => cancelAnimationFrame(animation);
  }, [progress]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="text-primary/20"
          stroke="currentColor"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-primary"
          stroke="currentColor"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-foreground" style={{ fontSize: size/5 }}>
          {`${Math.round(progress)}%`}
        </span>
      </div>
    </div>
  );
};

export default CircularProgressBar;
