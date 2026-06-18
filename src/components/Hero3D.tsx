import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useInView, useReducedMotion } from "framer-motion";
import { GLBoundary, webglAvailable } from "../three/glSupport";

const HeroScene = lazy(() => import("../three/HeroScene"));

/**
 * Cinematic WebGL hero background. Renders a refracting 3D bottle scene; falls
 * back silently (showing whatever sits behind it) when WebGL is unavailable.
 * The heavy three.js bundle is code-split so it never blocks first paint, and
 * the render loop pauses once the hero scrolls out of view to save GPU.
 */
export default function Hero3D() {
  const reduced = useReducedMotion() ?? false;
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "200px 0px" });

  useEffect(() => {
    setReady(webglAvailable());
  }, []);

  if (!ready) return null;

  return (
    <div ref={ref} className="absolute inset-0">
      <GLBoundary>
        <Suspense fallback={null}>
          <Canvas
            className="!absolute inset-0"
            shadows
            dpr={[1, 1.6]}
            frameloop={inView ? "always" : "never"}
            gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
            camera={{ position: [0, 0.6, 6.2], fov: 34 }}
          >
            <HeroScene reduced={reduced} />
          </Canvas>
        </Suspense>
      </GLBoundary>
    </div>
  );
}
