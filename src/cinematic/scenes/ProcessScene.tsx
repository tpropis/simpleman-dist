import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { ANCHOR } from "../layout";
import { useStore } from "../store";
import { bump } from "../range";

const COPPER = "#c17a3f";

/** Field → Still → Glass, revealed in sequence as the section is scrubbed. */
export default function ProcessScene() {
  const tier = useStore.getState().tier;
  const reduced = useStore.getState().reducedMotion;

  const still = useRef<THREE.Group>(null);
  const grain = useRef<THREE.InstancedMesh>(null);
  const glass = useRef<THREE.Group>(null);

  const neck = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 1.18, 0),
        new THREE.Vector3(0.05, 1.46, 0),
        new THREE.Vector3(0.34, 1.4, 0),
        new THREE.Vector3(0.64, 1.05, 0),
        new THREE.Vector3(0.68, 0.4, 0),
        new THREE.Vector3(0.68, -0.05, 0),
      ]),
    []
  );

  const glassProfile = useMemo(
    () =>
      [
        [0, 0],
        [0.32, 0],
        [0.33, 0.62],
        [0.3, 0.62],
        [0.29, 0.07],
        [0, 0.07],
      ].map(([x, y]) => new THREE.Vector2(x, y)),
    []
  );

  const grainCount = Math.min(160, Math.max(40, Math.round(tier.particles * 0.2)));
  const blades = useMemo(
    () =>
      Array.from({ length: grainCount }, () => ({
        x: (Math.random() - 0.5) * 9,
        z: -1 - Math.random() * 3.5,
        h: 0.35 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
      })),
    [grainCount]
  );
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    const p = reduced ? 0.5 : useStore.getState().processProgress;
    const t = state.clock.elapsedTime;

    const stillReveal = bump(p, 0.5, 0.4);
    if (still.current) {
      const s = THREE.MathUtils.lerp(still.current.scale.x, 0.4 + stillReveal * 0.6, 0.1);
      still.current.scale.setScalar(s);
      still.current.rotation.y += 0.0015;
    }

    const glassReveal = bump(p, 0.85, 0.18);
    if (glass.current) {
      const s = THREE.MathUtils.lerp(glass.current.scale.x, glassReveal, 0.1);
      glass.current.scale.setScalar(s);
      glass.current.visible = s > 0.02;
    }

    const grainReveal = bump(p, 0.12, 0.18);
    if (grain.current) {
      grain.current.visible = grainReveal > 0.02;
      if (grain.current.visible) {
        for (let i = 0; i < grainCount; i++) {
          const b = blades[i];
          dummy.position.set(b.x, ANCHOR.process - 1.6, b.z);
          dummy.rotation.set(Math.sin(t * 1.3 + b.phase) * 0.13, b.phase, 0);
          dummy.scale.set(1, Math.max(0.001, b.h * grainReveal), 1);
          dummy.updateMatrix();
          grain.current.setMatrixAt(i, dummy.matrix);
        }
        grain.current.instanceMatrix.needsUpdate = true;
      }
    }
  });

  const copperMat = (
    <meshStandardMaterial color={COPPER} metalness={1} roughness={0.3} envMapIntensity={1.2} />
  );

  return (
    <group position={[0, 0, 0]}>
      {/* Copper still */}
      <group ref={still} position={[-0.4, ANCHOR.process - 0.4, 0]} scale={0.001}>
        <mesh position={[0, -0.02, 0]}>
          <cylinderGeometry args={[0.54, 0.58, 0.1, 40]} />
          {copperMat}
        </mesh>
        <mesh position={[0, 0.45, 0]} scale={[1, 0.85, 1]}>
          <sphereGeometry args={[0.48, 40, 32]} />
          {copperMat}
        </mesh>
        <mesh position={[0, 1, 0]} scale={[1, 1.15, 1]}>
          <sphereGeometry args={[0.28, 36, 28]} />
          {copperMat}
        </mesh>
        <mesh>
          <tubeGeometry args={[neck, 64, 0.07, 14]} />
          {copperMat}
        </mesh>
        <mesh position={[0.68, 0.45, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 1, 28]} />
          {copperMat}
        </mesh>
      </group>

      {/* Grain field (instanced) */}
      <instancedMesh
        ref={grain}
        args={[undefined as unknown as THREE.BufferGeometry, undefined as unknown as THREE.Material, grainCount]}
      >
        <cylinderGeometry args={[0.004, 0.022, 1, 4]} />
        <meshStandardMaterial color="#b89a4a" roughness={0.85} />
      </instancedMesh>

      {/* Cocktail glass */}
      <group ref={glass} position={[2, ANCHOR.process - 1.1, 0.4]} scale={0.001}>
        <mesh>
          <latheGeometry args={[glassProfile, 40]} />
          <meshStandardMaterial color="#e9e0cf" transparent opacity={0.4} metalness={0.4} roughness={0.12} />
        </mesh>
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.28, 0.28, 0.32, 36]} />
          <meshPhysicalMaterial color="#b9652c" roughness={0.2} transparent opacity={0.95} />
        </mesh>
      </group>
    </group>
  );
}
