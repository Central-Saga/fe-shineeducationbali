import React from "react";

interface WaveBackgroundProps {
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

export function WaveBackground({
  className = "",
  primaryColor = "#C40503",
  secondaryColor = "#DAA625",
}: WaveBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute inset-0 z-0">
        <svg
          className="absolute top-0 w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ height: "100%" }}
        >
          <defs>
            <linearGradient id="headerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: primaryColor, stopOpacity: 0.1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: primaryColor, stopOpacity: 0.1 }}
              />
            </linearGradient>
          </defs>
          <path
            fill="url(#headerGradient)"
            fillOpacity="1"
            d="M0,96L40,117.3C80,139,160,181,240,181.3C320,181,400,139,480,133.3C560,128,640,160,720,160C800,160,880,128,960,133.3C1040,139,1120,181,1200,186.7C1280,192,1360,160,1400,144L1440,128L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
