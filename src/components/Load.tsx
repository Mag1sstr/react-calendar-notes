import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

function Load() {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoad(true), 1900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!load && (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{
            duration: 0.85,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#fafaf8]"
        >
          {/* Background decoration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e8f0e5] blur-[100px]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.45, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.2 }}
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#dce8f8] blur-[90px]"
          />

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.65,
                y: 20,
                rotate: -8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                rotate: 0,
              }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative mb-7"
            >
              <motion.div
                animate={{
                  scale: [1, 1.06, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-[32px] bg-[#dce8d8] blur-2xl"
              />

              <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-[28px] border border-black/[0.06] bg-white shadow-[0_20px_60px_rgba(35,55,35,0.12)]">
                <motion.img
                  src="/cl.jpg"
                  alt="Day Plan"
                  className="h-full w-full object-cover"
                  initial={{ scale: 1.35 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 1,
                    ease: "easeOut",
                  }}
                />
              </div>
            </motion.div>

            {/* Brand name */}
            <div className="flex flex-col items-center overflow-hidden">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-[42px] font-semibold tracking-[-2px] text-[#20251f]"
              >
                Day Plan
                <span className="text-[#82a879]">.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.6 }}
                className="mt-1 text-[10px] font-medium uppercase tracking-[4px] text-[#999e95]"
              >
                Make every day count
              </motion.p>
            </div>

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 180 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-12"
            >
              <div className="h-[3px] w-full overflow-hidden rounded-full bg-[#e7e9e3]">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    delay: 0.65,
                    duration: 1.15,
                    ease: [0.65, 0, 0.35, 1],
                  }}
                  style={{ transformOrigin: "left" }}
                  className="h-full w-full rounded-full bg-[#82a879]"
                />
              </div>
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-4 flex items-center gap-2"
            >
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                }}
                className="h-1.5 w-1.5 rounded-full bg-[#82a879]"
              />
              <span className="text-[10px] font-medium tracking-[2px] text-[#9a9e96]">
                PREPARING YOUR DAY
              </span>
            </motion.div>
          </div>

          {/* Corner details */}
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="absolute bottom-8 left-8 text-[10px] tracking-[2px] text-[#b0b3ab]"
          >
            PLAN WITH PURPOSE
          </motion.span>

          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="absolute bottom-8 right-8 text-[10px] tracking-[2px] text-[#b0b3ab]"
          >
            EST. 2026
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Load;
