import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

/** Resets scroll position on route change (but honors in-page #hash links). */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-charcoal-900">
      <ScrollManager />
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
