import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface Props {
  count: number;
  area?: [number, number, number];
  color?: string;
  size?: number;
  y?: number;
}

/** Drifting dust / copper-spark motes. Cheap GPU points, no textures. */
export default function ParticleField({
  count,
  area = [16, 22, 8],
  color = "#e8c074",
  size = 0.035,
  y = 0,
}: Props) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * area[0];
      a[i * 3 + 1] = (Math.random() - 0.5) * area[1] + y;
      a[i * 3 + 2] = (Math.random() - 0.5) * area[2];
    }
    return a;
  }, [count, area, y]);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.015;
  });

  if (count <= 0) return null;
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
