import Seo from "../components/Seo";
import PremiumButton from "../components/PremiumButton";
import SmokeOverlay from "../components/SmokeOverlay";

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found"
        description="That page poured out. Head back to Simple Man Distillery."
      />
      <section className="relative flex min-h-[80vh] grain items-center justify-center overflow-hidden px-5 text-center">
        <SmokeOverlay intensity={0.4} />
        <div className="relative">
          <p className="font-display text-7xl font-bold text-gradient-gold sm:text-9xl">
            404
          </p>
          <h1 className="mt-4 font-display text-3xl font-semibold">
            This pour ran dry
          </h1>
          <p className="mx-auto mt-3 max-w-md text-cream-dim">
            The page you're after isn't here. Let's get you back to something
            worth tasting.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PremiumButton to="/">Back Home</PremiumButton>
            <PremiumButton to="/spirits" variant="outline">
              Explore Spirits
            </PremiumButton>
          </div>
        </div>
      </section>
    </>
  );
}
