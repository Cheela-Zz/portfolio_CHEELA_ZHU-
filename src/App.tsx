/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { GalleryScene } from "./components/GalleryScene";
import { PhotoOverlay } from "./components/PhotoOverlay";
import { AboutPage } from "./components/AboutPage";
import { LoadingScreen } from "./components/LoadingScreen";
import { Photo } from "./data";
import { motion } from "motion/react";

export default function App() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [showAbout, setShowAbout] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#f8f8f8] select-none">
      {/* 3D Gallery Layer */}
      <GalleryScene onSelectPhoto={setSelectedPhoto} />

      {/* Floating UI Elements */}
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-between p-12">
        {/* Top Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center space-y-2"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400">
            Cheela Zhu
          </span>
        </motion.div>

        {/* Bottom Nav */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center space-y-6"
        >
          <div className="flex space-x-12 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
            <button
              onClick={() => setShowAbout(true)}
              className="hover:text-gray-900 transition-colors cursor-pointer pointer-events-auto"
            >
              About
            </button>
          </div>

          <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gray-300">
            Click and drag to explore the horizon
          </p>
        </motion.div>
      </div>

      {/* About Overlay */}
      <AboutPage isOpen={showAbout} onClose={() => setShowAbout(false)} />

      {/* Selected Photo Detail Overlay */}
      <PhotoOverlay
        selectedPhoto={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />

      {/* Aesthetic Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Loading Screen — sits on top until all textures are ready */}
      {!isLoaded && <LoadingScreen onLoaded={() => setIsLoaded(true)} />}
    </div>
  );
}
