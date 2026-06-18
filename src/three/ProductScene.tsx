import {
  Environment,
  Lightformer,
  ContactShadows,
  OrbitControls,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import Bottle from "./Bottle";

/** A single, user-rotatable bottle for the product viewer. */
export default function ProductScene({
  liquid,
  reduced = false,
}: {
  liquid: string;
  reduced?: boolean;
}) {
  return (
    <>
      <color attach="background" args={["#0d0a07"]} />
      <ambientLight intensity={0.3} />
      <spotLight position={[4, 7, 4]} angle={0.5} penumbra={1} intensity={40} color="#ffd9a0" />
      <pointLight position={[-4, 1, -3]} intensity={14} color="#6e2230" />

      <group position={[0, -0.2, 0]}>
        <Bottle liquid={liquid} reduced={reduced} autoRotate={false} float={false} />
      </group>

      <ContactShadows
        position={[0, -1.85, 0]}
        opacity={0.5}
        scale={8}
        blur={2.6}
        far={4}
        color="#000000"
      />

      <Environment resolution={256} frames={1}>
        <Lightformer intensity={3} position={[0, 4, 2]} scale={[6, 3, 1]} color="#fff0d8" />
        <Lightformer intensity={2} position={[-4, 1, 2]} scale={[2, 6, 1]} color="#e0a85f" />
        <Lightformer intensity={1.4} position={[4, 0, 3]} scale={[3, 6, 1]} color="#c17a3f" />
      </Environment>

      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        autoRotate={!reduced}
        autoRotateSpeed={0.9}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.8}
      />

      {!reduced && (
        <EffectComposer>
          <Bloom mipmapBlur intensity={0.6} luminanceThreshold={0.65} luminanceSmoothing={0.3} />
        </EffectComposer>
      )}
    </>
  );
}
