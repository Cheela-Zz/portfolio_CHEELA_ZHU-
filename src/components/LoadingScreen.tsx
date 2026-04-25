import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onLoaded: () => void;
}

export const LoadingScreen = ({ onLoaded }: LoadingScreenProps) => {
  const { active, progress, loaded } = useProgress();
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [done, setDone] = useState(false);

  // Enforce a minimum display time so the screen doesn't flash away instantly
  useEffect(() => {
    const timer = setTimeout(() => setMinTimeElapsed(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  // Mark done when both the min time has passed and Three.js has finished loading
  useEffect(() => {
    if (minTimeElapsed && !active && (progress >= 100 || loaded > 0)) {
      setDone(true);
    }
  }, [minTimeElapsed, active, progress, loaded]);

  // Notify parent after the exit animation finishes (duration: 900ms)
  useEffect(() => {
    if (done) {
      const timer = setTimeout(onLoaded, 900);
      return () => clearTimeout(timer);
    }
  }, [done, onLoaded]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-[#f8f8f8] flex flex-col items-center justify-center"
        >
          {/* Name */}
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400 mb-10"
          >
            Cheela Zhu
          </motion.span>

          {/* Progress bar track */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-28 h-px bg-gray-200 overflow-hidden"
          >
            <motion.div
              className="h-full bg-gray-400"
              initial={{ width: "0%" }}
              animate={{ width: `${Math.max(progress, 2)}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </motion.div>

          {/* Loading label */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-[9px] uppercase tracking-[0.3em] font-medium text-gray-300 mt-4"
          >
            Loading gallery
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
