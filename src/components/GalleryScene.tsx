import { Suspense } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Photo, photos } from "../data";
import { PhotoItem } from "./PhotoItem";

interface GallerySceneProps {
  onSelectPhoto: (photo: Photo) => void;
}

// Invisible placeholder while each texture loads
const PhotoFallback = ({ position }: { position: THREE.Vector3 }) => {
  const lookAtCenter = new THREE.Vector3(0, 0, 0);
  return (
    <mesh position={position} onUpdate={(self) => self.lookAt(lookAtCenter)}>
      <planeGeometry args={[3.2, 2.4]} />
      <meshBasicMaterial color="#e0e0e0" transparent opacity={0.15} />
    </mesh>
  );
};

export const GalleryScene = ({ onSelectPhoto }: GallerySceneProps) => {
  const radius = 10;
  const numPhotos = photos.length;

  // Fibonacci sphere distribution
  const points = Array.from({ length: numPhotos }, (_, i) => {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / numPhotos);
    const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
    return new THREE.Vector3(
      radius * Math.cos(theta) * Math.sin(phi),
      radius * Math.sin(theta) * Math.sin(phi),
      radius * Math.cos(phi)
    );
  });

  return (
    <div className="w-full h-full bg-[#f8f8f8]">
      <Canvas dpr={[1, 1.5]}>
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 0.01]}
          fov={100}
          near={0.1}
          far={100}
        />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          rotateSpeed={0.5}
          autoRotate={false}
          enableDamping={true}
          dampingFactor={0.05}
          makeDefault
        />

        <ambientLight intensity={0.6} />
        <pointLight position={[0, 0, 0]} intensity={0.8} />

        <group>
          {photos.map((photo, i) => (
            <Suspense
              key={photo.id}
              fallback={<PhotoFallback position={points[i]} />}
            >
              <PhotoItem
                photo={photo}
                position={points[i]}
                onClick={onSelectPhoto}
              />
            </Suspense>
          ))}
        </group>
      </Canvas>
    </div>
  );
};
