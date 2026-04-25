import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { Photo } from "../data";

interface PhotoOverlayProps {
  selectedPhoto: Photo | null;
  onClose: () => void;
}

function extractYear(url: string): string {
  // Matches 202X or 203X embedded in filename (WeChat photos have dates like 20240506)
  const match = url.match(/(202\d|203\d)/);
  return match ? match[1] : "2024";
}

export const PhotoOverlay = ({ selectedPhoto, onClose }: PhotoOverlayProps) => {
  return (
    <AnimatePresence>
      {selectedPhoto && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Centered Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none"
          >
            <div
              className="relative flex flex-col items-center pointer-events-auto"
              style={{ maxHeight: "92vh", maxWidth: "92vw" }}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute -top-10 right-0 p-1 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Photo */}
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="object-contain rounded-sm"
                style={{
                  maxHeight: "80vh",
                  maxWidth: "90vw",
                  width: "auto",
                  height: "auto",
                }}
                referrerPolicy="no-referrer"
              />

              {/* Caption */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-5 flex items-center space-x-3 text-white/70"
              >
                <span className="text-[11px] uppercase tracking-[0.25em] font-semibold">
                  {selectedPhoto.location}
                </span>
                <span className="text-white/30">·</span>
                <span className="text-[11px] uppercase tracking-[0.25em] font-semibold">
                  {extractYear(selectedPhoto.url)}
                </span>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
