import { motion } from "framer-motion";

export default function ProgressCircle({ position, totalUsers = 500 }) {
  const size = 180;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Convert position to progress %
  const progress = ((totalUsers - position) / totalUsers) * 100;

  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size}>
        {/* Background Circle */}
        <circle
          stroke="#1f2937"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />

        {/* Animated Progress Circle */}
        <motion.circle
          stroke="#00AEEF"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1 }}
          style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
        />
      </svg>

      {/* Center Content */}
      <div className="absolute text-center">
        <p className="text-4xl font-bold text-white">{position}</p>
        <p className="text-sm text-zinc-400">In Line</p>
      </div>
    </div>
  );
}