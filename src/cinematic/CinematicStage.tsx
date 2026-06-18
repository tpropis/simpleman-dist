import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, AdaptiveDpr, Preload } from "@react-three/drei";
import HeroScene from "./scenes/HeroScene";
import SpiritsScene from "./scenes/SpiritsScene";
import ProcessScene from "./scenes/ProcessScene";
import { useStore } from "./store";
import { CAMERA_KEYS, SECTION_ANCHOR, CANVAS_FADE_START } from "./layout";
import { sampleKeys, lerp } from "./range";

// Camera Rig — the scroll-driven dolly down the world column. Reduced motion
// snaps to the active section's anchor instead of scrubbing.
function Rig() {
  const { camera } = useThree();
  const smooth = useRef({ x: 0, y: 0 });

  useFrame((_, delta) => {
    const s = useStore.getState();
    const targetY = s.reducedMotion
      ? SECTION_ANCHOR[s.active] ?? 0
      : sampleKeys(CAMERA_KEYS, s.scroll);

    smooth.current.x += (s.pointer.x - smooth.current.x) * Math.min(1, delta * 2.5);
    smooth.current.y += (s.pointer.y - smooth.current.y) * Math.min(1, delta * 2.5);

    const k = Math.min(1, delta * (s.reducedMotion ? 6 : 3));
    camera.position.y = lerp(camera.position.y, targetY + smooth.current.y * 0.5, k);
    camera.position.x = lerp(camera.position.x, smooth.current.x * 0.8, k);
    camera.position.z = lerp(camera.position.z, 6.4, k);
    camera.lookAt(smooth.current.x * 0.3, camera.position.y - smooth.current.y * 0.2, 0);
  });
  return null;
}

// Warm copper/whiskey studio environment, generated in-scene (offline-safe).
function StageEnvironment() {
  return (
    <Environment resolution={128} frames={1}>
      <Lightformer intensity={0.8} position={[0, 3, 4]} scale={[6, 5, 1]} color="#fff0d8" />
      <Lightformer intensity={0.5} position={[-5, 1, 2]} scale={[3, 6, 1]} color="#e0a85f" />
      <Lightformer intensity={0.4} position={[5, -1, 1]} scale={[3, 6, 1]} color="#c17a3f" />
      <Lightformer intensity={0.25} position={[0, -4, -3]} scale={[6, 3, 1]} color="#6e2230" />
    </Environment>
  );
}

// Mount a scene only when scroll enters a buffered range (lazy WebGL init).
function useNearScroll(min: number, max: number) {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const check = (scroll: number) => {
      if (scroll >= min && scroll <= max) setNear(true);
    };
    check(useStore.getState().scroll);
    return useStore.subscribe((s) => check(s.scroll));
  }, [min, max]);
  return near;
}

export default function CinematicStage() {
  const tier = useStore.getState().tier;
  const setReady = useStore((s) => s.setReady);

  const mountSpirits = useNearScroll(0.08, 0.52);
  const mountProcess = useNearScroll(0.4, 0.8);

  // Fade the canvas out for the DOM break (bar / events / visit).
  const fadeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    return useStore.subscribe((s) => {
      if (!fadeRef.current) return;
      const o =
        s.scroll > CANVAS_FADE_START
          ? Math.max(0, 1 - (s.scroll - CANVAS_FADE_START) / 0.06)
          : 1;
      fadeRef.current.style.opacity = String(o);
    });
  }, []);

  return (
    <div ref={fadeRef} className="stage-canvas" style={{ transition: "opacity 0.2s" }}>
      <Canvas
        gl={{
          antialias: tier.antialias,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
        }}
        dpr={[1, tier.dpr]}
        camera={{ position: [0, 0, 6.4], fov: 42, near: 0.1, far: 200 }}
        onCreated={() => setReady(true)}
      >
        <fog attach="fog" args={["#0d0a07", 7, 19]} />
        <ambientLight intensity={0.3} />
        <spotLight position={[5, 8, 5]} angle={0.5} penumbra={1} intensity={40} color="#ffd9a0" />
        <pointLight position={[-5, 0, -3]} intensity={14} color="#6e2230" />

        <Suspense fallback={null}>
          <StageEnvironment />
          <Rig />
          <HeroScene />
          {mountSpirits && <SpiritsScene />}
          {mountProcess && <ProcessScene />}
          <Preload all />
        </Suspense>

        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  );
}
