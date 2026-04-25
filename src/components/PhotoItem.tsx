import { useCursor, Image as DreiImage } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import { Photo } from "../data";

interface PhotoItemProps {
  photo: Photo;
  position: THREE.Vector3;
  onClick: (photo: Photo) => void;
}

export const PhotoItem = ({ photo, position, onClick }: PhotoItemProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const lookAtCenter = new THREE.Vector3(0, 0, 0);

  useFrame(() => {
    if (!meshRef.current) return;
    // Smooth hover scaling only — no float animation
    const targetScale = hovered ? 1.15 : 1;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, 1),
      0.08
    );
  });

  const [hasError, setHasError] = useState(false);

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => onClick(photo)}
    >
      {!hasError ? (
        <DreiImage
          url={photo.url}
          transparent
          side={THREE.DoubleSide}
          onError={() => setHasError(true)}
          onUpdate={(self) => self.lookAt(lookAtCenter)}
        >
          <planeGeometry args={[3.2, 2.4]} />
        </DreiImage>
      ) : (
        <mesh onUpdate={(self) => self.lookAt(lookAtCenter)}>
          <planeGeometry args={[3.2, 2.4]} />
          <meshBasicMaterial color="#333333" transparent opacity={0.4} />
        </mesh>
      )}

      {/* Subtle white frame */}
      <mesh onUpdate={(self) => self.lookAt(lookAtCenter)}>
        <planeGeometry args={[3.22, 2.42]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.08} />
      </mesh>
    </group>
  );
};
