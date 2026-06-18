import { useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  Sparkles,
  ContactShadows,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import Bottle from "./Bottle";

/** Three narrative "acts" keyed to scroll progress 0 → 1. */
const ACTS = {
  camera: [
    new THREE.Vector3(0, 1.25, 6.6), // Field — high & wide
    new THREE.Vector3(2.3, 0.15, 4.3), // Still — close, angled
    new THREE.Vector3(0, 0.45, 5.3), // Glass — hero 3/4
  ],
  bg: ["#10150d", "#1b1107", "#170c11"].map((c) => new THREE.Color(c)),
  key: ["#cfe0a0", "#ffc79a", "#ffd2c2"].map((c) => new THREE.Color(c)),
};

function sample(colors: THREE.Color[], p: number, out: THREE.Color) {
  const seg = p * (colors.length - 1);
  const i = Math.min(colors.length - 2, Math.floor(seg));
  return out.copy(colors[i]).lerp(colors[i + 1], seg - i);
}
function sampleVec(vecs: THREE.Vector3[], p: number, out: THREE.Vector3) {
  const seg = p * (vecs.length - 1);
  const i = Math.min(vecs.length - 2, Math.floor(seg));
  return out.copy(vecs[i]).lerp(vecs[i + 1], seg - i);
}

interface Props {
  progress: MutableRefObject<number>;
  reduced?: boolean;
}

export default function ScrollStoryScene({ progress, reduced = false }: Props) {
  const bottleGroup = useRef<THREE.Group>(null);
  const keyLight = useRef<THREE.PointLight>(null);

  const lookAt = useMemo(() => new THREE.Vector3(0, 0.2, 0), []);
  const tmpC = useMemo(() => new THREE.Color(), []);
  const tmpC2 = useMemo(() => new THREE.Color(), []);
  const tmpV = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    const p = Math.min(1, Math.max(0, progress.current));

    // Camera dolly through the acts (smoothed).
    sampleVec(ACTS.camera, p, tmpV);
    state.camera.position.lerp(tmpV, reduced ? 1 : 0.08);
    state.camera.lookAt(lookAt);

    // Scene mood.
    sample(ACTS.bg, p, tmpC);
    if (!state.scene.background) state.scene.background = tmpC.clone();
    else (state.scene.background as THREE.Color).lerp(tmpC, 0.1);
    if (state.scene.fog) state.scene.fog.color.lerp(tmpC, 0.1);

    sample(ACTS.key, p, tmpC2);
    if (keyLight.current) keyLight.current.color.lerp(tmpC2, 0.1);

    // Bottle: rotate with scroll + tilt slightly.
    if (bottleGroup.current) {
      const targetRot = p * Math.PI * 2.4;
      bottleGroup.current.rotation.y +=
        (targetRot - bottleGroup.current.rotation.y) * (reduced ? 1 : 0.1);
    }
  });

  return (
    <>
      <fog attach="fog" args={["#10150d", 6, 18]} />
      <ambientLight intensity={0.3} />
      <pointLight ref={keyLight} position={[4, 5, 4]} intensity={40} color="#ffc79a" />
      <pointLight position={[-5, 1, -3]} intensity={16} color="#6e2230" />
      <pointLight position={[3, -2, 4]} intensity={10} color="#e0a85f" />

      <group position={[0, 0.1, 0]}>
        <group ref={bottleGroup}>
          {/* Rotation is driven by scroll; idle float still allowed. */}
          <Bottle reduced={reduced} autoRotate={false} float={!reduced} liquid="#d8a24a" />
        </group>
      </group>

      {!reduced && (
        <Sparkles
          count={80}
          scale={[10, 7, 5]}
          size={2.4}
          speed={0.22}
          opacity={0.5}
          color="#e8c074"
        />
      )}

      <ContactShadows
        position={[0, -1.7, 0]}
        opacity={0.5}
        scale={10}
        blur={2.8}
        far={4}
        color="#000000"
      />

      <Environment resolution={256} frames={1}>
        <Lightformer intensity={3} position={[0, 4, 2]} scale={[6, 3, 1]} color="#fff0d8" />
        <Lightformer intensity={2} position={[-4, 1, 2]} scale={[2, 6, 1]} color="#e0a85f" />
        <Lightformer intensity={1.4} position={[4, 0, 3]} scale={[3, 6, 1]} color="#c17a3f" />
        <Lightformer intensity={1} position={[0, -3, 2]} scale={[6, 2, 1]} color="#6e2230" />
      </Environment>

      {!reduced && (
        <EffectComposer>
          <Bloom mipmapBlur intensity={0.75} luminanceThreshold={0.6} luminanceSmoothing={0.3} />
          <Vignette eskil={false} offset={0.22} darkness={0.9} />
        </EffectComposer>
      )}
    </>
  );
}
