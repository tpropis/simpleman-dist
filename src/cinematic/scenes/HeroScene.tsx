import Bottle from "../../three/Bottle";
import ParticleField from "../ParticleField";
import { ANCHOR } from "../layout";
import { useStore } from "../store";

/** Flagship bottle floating at the top of the world column. */
export default function HeroScene() {
  const tier = useStore.getState().tier;
  const reduced = useStore.getState().reducedMotion;
  return (
    <group position={[0, ANCHOR.hero, 0]}>
      <Bottle
        liquid="#d8a24a"
        label="Vodka"
        reduced={reduced}
        cheap={!tier.transmission}
        samples={tier.transmissionSamples}
      />
      <ParticleField count={Math.round(tier.particles * 0.6)} color="#e8c074" />
    </group>
  );
}
