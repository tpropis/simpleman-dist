import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";

/** Spirits-bottle silhouette as a lathe profile (radius, height). */
export function useBottleProfile() {
  return useMemo(
    () =>
      [
        [0.0, -1.5],
        [0.62, -1.5],
        [0.64, -1.42],
        [0.64, 0.25],
        [0.6, 0.55],
        [0.26, 1.05],
        [0.22, 1.85],
        [0.2, 2.0],
        [0.27, 2.06],
        [0.27, 2.18],
        [0.2, 2.22],
      ].map(([x, y]) => new THREE.Vector2(x, y)),
    []
  );
}

const LIQUID_PROFILE = [
  [0.0, -1.42],
  [0.58, -1.42],
  [0.58, 0.2],
  [0.55, 0.45],
  [0.3, 0.9],
  [0.0, 0.9],
].map(([x, y]) => new THREE.Vector2(x, y));

export interface BottleProps {
  liquid?: string;
  reduced?: boolean;
  /** Internal idle rotation + float. Disable when a parent drives motion. */
  autoRotate?: boolean;
  /** Wrap in drei <Float> for a gentle bob. */
  float?: boolean;
  /** Product type printed on the label, e.g. "Vodka". */
  label?: string;
}

/** Generate a branded label as a CanvasTexture — no external font/asset. */
function makeLabelTexture(category: string): THREE.CanvasTexture | null {
  try {
    const w = 1024;
    const h = 512;
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d");
    if (!ctx) return null;
    ctx.fillStyle = "#14100c";
    ctx.fillRect(0, 0, w, h);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.strokeStyle = "rgba(224,168,95,0.35)";
    ctx.lineWidth = 3;
    ctx.strokeRect(w / 2 - 220, 60, 440, 392);

    ctx.fillStyle = "#e0a85f";
    ctx.font = '600 46px Inter, system-ui, sans-serif';
    ctx.fillText("SIMPLE MAN", w / 2, 150);

    ctx.strokeStyle = "#c17a3f";
    ctx.beginPath();
    ctx.moveTo(w / 2 - 150, 188);
    ctx.lineTo(w / 2 + 150, 188);
    ctx.stroke();

    ctx.fillStyle = "#f3e8d6";
    ctx.font = '700 92px "Playfair Display", Georgia, serif';
    ctx.fillText(category.toUpperCase(), w / 2, 268);

    ctx.fillStyle = "#cdbfa9";
    ctx.font = "400 30px Inter, system-ui, sans-serif";
    ctx.fillText("SMALL BATCH", w / 2, 340);
    ctx.fillStyle = "#e0a85f";
    ctx.font = "400 26px Inter, system-ui, sans-serif";
    ctx.fillText("GEORGIA · EST. 2023", w / 2, 392);

    const tex = new THREE.CanvasTexture(c);
    tex.anisotropy = 4;
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    return tex;
  } catch {
    return null;
  }
}

/**
 * Procedural glass spirits bottle: refracting glass shell, tinted liquid,
 * copper cap, and a dark label band with copper edges. No external assets.
 */
export default function Bottle({
  liquid = "#d8a24a",
  reduced = false,
  autoRotate = true,
  float = true,
  label,
}: BottleProps) {
  const group = useRef<THREE.Group>(null);
  const profile = useBottleProfile();
  const labelMap = useMemo(
    () => (label ? makeLabelTexture(label) : null),
    [label]
  );

  useFrame((state) => {
    if (reduced || !autoRotate || !group.current) return;
    const t = state.clock.elapsedTime;
    const targetY = state.pointer.x * 0.5 + t * 0.12;
    const targetX = -state.pointer.y * 0.18;
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.04;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.04;
  });

  const body = (
    <group ref={group} position={[0, -0.1, 0]}>
      {/* Glass shell with real refraction */}
      <mesh castShadow>
        <latheGeometry args={[profile, 64]} />
        <MeshTransmissionMaterial
          transmission={1}
          thickness={0.9}
          roughness={0.06}
          ior={1.45}
          chromaticAberration={0.04}
          anisotropicBlur={0.2}
          distortion={0.1}
          distortionScale={0.2}
          temporalDistortion={0}
          color="#f1e7d4"
          attenuationColor={liquid}
          attenuationDistance={2.2}
          samples={6}
          resolution={512}
        />
      </mesh>

      {/* Liquid */}
      <mesh>
        <latheGeometry args={[LIQUID_PROFILE, 48]} />
        <meshPhysicalMaterial
          color={liquid}
          roughness={0.18}
          metalness={0}
          transmission={0.6}
          ior={1.34}
          transparent
          opacity={0.96}
        />
      </mesh>

      {/* Copper cap */}
      <mesh position={[0, 2.32, 0]}>
        <cylinderGeometry args={[0.22, 0.24, 0.28, 48]} />
        <meshStandardMaterial
          color="#c17a3f"
          metalness={1}
          roughness={0.28}
          envMapIntensity={1.2}
        />
      </mesh>
      <mesh position={[0, 2.12, 0]}>
        <cylinderGeometry args={[0.205, 0.205, 0.12, 48]} />
        <meshStandardMaterial color="#8c5126" metalness={1} roughness={0.4} />
      </mesh>

      {/* Label band */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.655, 0.655, 0.95, 64, 1, true]} />
        <meshStandardMaterial
          map={labelMap ?? undefined}
          color={labelMap ? "#ffffff" : "#14100c"}
          roughness={0.65}
          metalness={0.1}
          side={THREE.DoubleSide}
          emissive={labelMap ? "#1a140d" : "#3a2412"}
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh position={[0, -0.02, 0]}>
        <torusGeometry args={[0.66, 0.012, 12, 64]} />
        <meshStandardMaterial color="#e0a85f" metalness={1} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.97, 0]}>
        <torusGeometry args={[0.66, 0.012, 12, 64]} />
        <meshStandardMaterial color="#e0a85f" metalness={1} roughness={0.3} />
      </mesh>
    </group>
  );

  if (!float) return body;
  return (
    <Float
      speed={reduced ? 0 : 1.2}
      rotationIntensity={0}
      floatIntensity={reduced ? 0 : 0.6}
      floatingRange={[-0.08, 0.08]}
    >
      {body}
    </Float>
  );
}
