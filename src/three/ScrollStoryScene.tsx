import { useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  Sparkles,
  ContactShadows,
  MeshTransmissionMaterial,
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

/** Stylised copper pot still that reveals during the "Still" act (p ≈ 0.5). */
function CopperStill({ progress }: { progress: MutableRefObject<number> }) {
  const g = useRef<THREE.Group>(null);
  const neck = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 1.18, 0),
        new THREE.Vector3(0.05, 1.46, 0),
        new THREE.Vector3(0.32, 1.4, 0),
        new THREE.Vector3(0.62, 1.05, 0),
        new THREE.Vector3(0.66, 0.4, 0),
        new THREE.Vector3(0.66, -0.05, 0),
      ]),
    []
  );

  useFrame(() => {
    if (!g.current) return;
    const p = progress.current;
    // Triangular reveal centred on the Still act.
    const reveal = Math.max(0, 1 - Math.abs(p - 0.5) / 0.2);
    const s = THREE.MathUtils.lerp(g.current.scale.x, reveal, 0.12);
    g.current.scale.setScalar(s);
    g.current.visible = s > 0.02;
    g.current.rotation.y += 0.002;
  });

  const copper = (
    <meshStandardMaterial color="#c17a3f" metalness={1} roughness={0.32} envMapIntensity={1.1} />
  );

  return (
    <group ref={g} position={[-1.85, -0.3, -0.4]} scale={0.001}>
      {/* base */}
      <mesh position={[0, -0.02, 0]}>
        <cylinderGeometry args={[0.52, 0.56, 0.1, 40]} />
        {copper}
      </mesh>
      {/* pot body */}
      <mesh position={[0, 0.45, 0]} scale={[1, 0.85, 1]}>
        <sphereGeometry args={[0.46, 40, 32]} />
        {copper}
      </mesh>
      {/* onion head */}
      <mesh position={[0, 0.98, 0]} scale={[1, 1.15, 1]}>
        <sphereGeometry args={[0.27, 36, 28]} />
        {copper}
      </mesh>
      {/* swan-neck lyne arm */}
      <mesh>
        <tubeGeometry args={[neck, 64, 0.07, 14]} />
        {copper}
      </mesh>
      {/* condenser */}
      <mesh position={[0.66, 0.45, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 1.0, 28]} />
        {copper}
      </mesh>
      {/* rising steam */}
      <Sparkles
        position={[0.05, 1.7, 0]}
        count={18}
        scale={[0.5, 1.1, 0.5]}
        size={3}
        speed={0.6}
        opacity={0.45}
        color="#f3e8d6"
      />
    </group>
  );
}

/** Swaying grain field that reveals during the "Field" act (p ≈ 0.12). */
function GrainField({ progress }: { progress: MutableRefObject<number> }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const count = 150;
  const blades = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 8,
        z: -1.2 - Math.random() * 3.5,
        h: 0.35 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
        lean: (Math.random() - 0.5) * 0.25,
      })),
    []
  );
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    const grp = ref.current;
    if (!grp) return;
    const reveal = Math.max(0, 1 - Math.abs(progress.current - 0.12) / 0.16);
    grp.visible = reveal > 0.02;
    if (!grp.visible) return;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const b = blades[i];
      dummy.position.set(b.x, -1.7, b.z);
      const sway = Math.sin(t * 1.3 + b.phase) * 0.13;
      dummy.rotation.set(sway + b.lean, b.phase, Math.cos(t + b.phase) * 0.08);
      dummy.scale.set(1, Math.max(0.001, b.h * reveal), 1);
      dummy.updateMatrix();
      grp.setMatrixAt(i, dummy.matrix);
    }
    grp.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={ref}
      args={[undefined as unknown as THREE.BufferGeometry, undefined as unknown as THREE.Material, count]}
    >
      <cylinderGeometry args={[0.004, 0.022, 1, 4]} />
      <meshStandardMaterial color="#b89a4a" roughness={0.85} metalness={0} />
    </instancedMesh>
  );
}

/** A rocks glass with amber pour + ice, revealing during the "Glass" act. */
function CocktailGlass({ progress }: { progress: MutableRefObject<number> }) {
  const g = useRef<THREE.Group>(null);
  const profile = useMemo(
    () =>
      [
        [0.0, 0.0],
        [0.32, 0.0],
        [0.33, 0.62],
        [0.3, 0.62],
        [0.29, 0.07],
        [0.0, 0.07],
      ].map(([x, y]) => new THREE.Vector2(x, y)),
    []
  );

  useFrame(() => {
    if (!g.current) return;
    const reveal = Math.max(0, 1 - Math.abs(progress.current - 0.86) / 0.16);
    const s = THREE.MathUtils.lerp(g.current.scale.x, reveal, 0.12);
    g.current.scale.setScalar(s);
    g.current.visible = s > 0.02;
  });

  return (
    <group ref={g} position={[1.75, -1.2, 0.4]} scale={0.001}>
      <mesh>
        <latheGeometry args={[profile, 48]} />
        <MeshTransmissionMaterial
          transmission={1}
          thickness={0.25}
          roughness={0.05}
          ior={1.46}
          chromaticAberration={0.03}
          color="#f4eee2"
          samples={4}
          resolution={256}
        />
      </mesh>
      {/* amber pour */}
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.32, 40]} />
        <meshPhysicalMaterial color="#b9652c" roughness={0.2} transmission={0.5} ior={1.34} transparent opacity={0.95} />
      </mesh>
      {/* ice */}
      <mesh position={[0.04, 0.34, 0]} rotation={[0.5, 0.4, 0.2]}>
        <boxGeometry args={[0.16, 0.16, 0.16]} />
        <meshPhysicalMaterial color="#eaf2f4" roughness={0.1} transmission={0.85} ior={1.31} thickness={0.3} transparent opacity={0.85} />
      </mesh>
    </group>
  );
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
          <Bottle reduced={reduced} autoRotate={false} float={!reduced} liquid="#d8a24a" label="Georgia" />
        </group>
      </group>

      <CopperStill progress={progress} />
      {!reduced && <GrainField progress={progress} />}
      <CocktailGlass progress={progress} />

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
