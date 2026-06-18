import { useThree } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  Sparkles,
  ContactShadows,
  MeshReflectorMaterial,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import Bottle from "./Bottle";

export default function HeroScene({ reduced = false }: { reduced?: boolean }) {
  // On wide screens push the bottle right so left-aligned hero text stays clear;
  // on portrait/mobile keep it centered.
  const aspect = useThree((s) => s.viewport.aspect);
  const offsetX = aspect > 1.05 ? Math.min(1.6, aspect * 0.7) : 0;

  return (
    <>
      <color attach="background" args={["#0d0a07"]} />
      <fog attach="fog" args={["#0d0a07", 8, 16]} />

      <ambientLight intensity={0.25} />
      <spotLight
        position={[5, 8, 4]}
        angle={0.5}
        penumbra={1}
        intensity={45}
        color="#ffd9a0"
        castShadow
      />
      <pointLight position={[-5, 2, -3]} intensity={20} color="#6e2230" />
      <pointLight position={[4, -2, 4]} intensity={12} color="#e0a85f" />

      <group position={[offsetX, 0.2, 0]}>
        <Bottle reduced={reduced} liquid="#d8a24a" label="Vodka" />
      </group>

      {!reduced && (
        <Sparkles
          count={70}
          scale={[8, 6, 4]}
          size={2.2}
          speed={0.25}
          opacity={0.5}
          color="#e8c074"
        />
      )}

      {/* reflective floor for a polished bottle reflection */}
      {!reduced && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[offsetX, -1.78, 0]}>
          <planeGeometry args={[24, 24]} />
          <MeshReflectorMaterial
            resolution={256}
            mixBlur={1}
            mixStrength={2.2}
            blur={[260, 90]}
            roughness={0.95}
            depthScale={1.1}
            minDepthThreshold={0.3}
            maxDepthThreshold={1.2}
            color="#0d0a07"
            metalness={0.55}
            mirror={0.4}
          />
        </mesh>
      )}

      <ContactShadows
        position={[offsetX, -1.75, 0]}
        opacity={0.5}
        scale={9}
        blur={2.6}
        far={4}
        color="#000000"
      />

      {/* Procedural studio lighting — no external HDRI needed */}
      <Environment resolution={256} frames={1}>
        <Lightformer
          intensity={3}
          position={[0, 4, 2]}
          scale={[6, 3, 1]}
          color="#fff0d8"
        />
        <Lightformer
          intensity={2}
          position={[-4, 1, 2]}
          scale={[2, 6, 1]}
          color="#e0a85f"
        />
        <Lightformer
          intensity={1.4}
          position={[4, 0, 3]}
          scale={[3, 6, 1]}
          color="#c17a3f"
        />
        <Lightformer
          intensity={1}
          position={[0, -3, 2]}
          scale={[6, 2, 1]}
          color="#6e2230"
        />
      </Environment>

      {!reduced && (
        <EffectComposer>
          <Bloom
            mipmapBlur
            intensity={0.7}
            luminanceThreshold={0.6}
            luminanceSmoothing={0.3}
          />
          <Vignette eskil={false} offset={0.25} darkness={0.85} />
        </EffectComposer>
      )}
    </>
  );
}
