import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import Bottle from "../../three/Bottle";
import ParticleField from "../ParticleField";
import { ANCHOR } from "../layout";
import { useStore } from "../store";
import { SPIRITS } from "../../data/spirits";

/**
 * The four spirits as a row of bottles. As the visitor scrubs the section, the
 * bottle that the synced DOM label is describing lifts and brightens.
 */
export default function SpiritsScene() {
  const tier = useStore.getState().tier;
  const reduced = useStore.getState().reducedMotion;
  const groups = useRef<(THREE.Group | null)[]>([]);
  const n = SPIRITS.length;

  useFrame(() => {
    const p = useStore.getState().spiritsProgress;
    const activeF = reduced ? -1 : p * n - 0.5; // which bottle is "current"
    groups.current.forEach((g, i) => {
      if (!g) return;
      const focus = Math.max(0, 1 - Math.abs(activeF - i) * 1.4);
      const targetY = ANCHOR.spirits + focus * 0.6;
      const targetS = 1 + focus * 0.12;
      g.position.y += (targetY - g.position.y) * 0.08;
      const s = g.scale.x + (targetS - g.scale.x) * 0.08;
      g.scale.setScalar(s);
    });
  });

  return (
    <group position={[0, 0, 0]}>
      {SPIRITS.map((sp, i) => (
        <group
          key={sp.slug}
          ref={(el) => (groups.current[i] = el)}
          position={[(i - (n - 1) / 2) * 2.7, ANCHOR.spirits, 0]}
        >
          <Bottle
            liquid={sp.liquid}
            label={sp.category}
            cheap
            reduced={reduced}
            float={false}
          />
        </group>
      ))}
      <ParticleField
        count={Math.round(tier.particles * 0.4)}
        y={ANCHOR.spirits}
        area={[16, 10, 8]}
        color="#d8995a"
      />
    </group>
  );
}
