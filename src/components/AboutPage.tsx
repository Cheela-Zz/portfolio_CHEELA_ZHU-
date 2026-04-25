import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

interface AboutPageProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutPage = ({ isOpen, onClose }: AboutPageProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 30, stiffness: 220 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-8 pointer-events-none"
          >
            <div
              className="bg-[#f8f8f8] max-w-xl w-full p-14 relative pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>

              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400">
                About
              </span>

              <h2 className="mt-4 text-4xl font-serif text-gray-900 italic leading-snug">
                Cheela Zhu
              </h2>

              <div className="mt-2 w-10 h-[1px] bg-gray-300" />

              <div className="mt-8 space-y-5 font-serif text-gray-600 leading-relaxed text-base">
                <p>
                  I'm a photographer and student based in Montreal, drawn to the
                  quiet details that most people walk past — the way light bends
                  through a window, the surface of water at the wrong hour, a
                  stranger's shadow on warm pavement.
                </p>
                <p>
                  These photographs were taken across China, Canada, the United
                  States, Japan, and the United Kingdom. Each one is a small
                  attempt at noticing.
                </p>
                <p>
                  I study at McGill University. When I'm not shooting, I'm
                  usually reading, making things, or looking out windows.
                </p>
              </div>

              <div className="mt-10 border-t border-gray-200 pt-8">
                <a
                  href="mailto:qile.zhu@mail.mcgill.ca"
                  className="text-[11px] uppercase tracking-[0.25em] font-bold text-gray-400 hover:text-gray-900 transition-colors"
                >
                  qile.zhu@mail.mcgill.ca
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
