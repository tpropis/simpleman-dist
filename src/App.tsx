import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AgeGate from "./components/AgeGate";
import Home from "./pages/Home";
import Spirits from "./pages/Spirits";
import Bar from "./pages/Bar";
import FarmToGlass from "./pages/FarmToGlass";
import Events from "./pages/Events";
import Visit from "./pages/Visit";
import WhereToBuy from "./pages/WhereToBuy";
import Story from "./pages/Story";
import ResponsibleEnjoyment from "./pages/ResponsibleEnjoyment";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      <AgeGate />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/spirits" element={<Spirits />} />
          <Route path="/bar" element={<Bar />} />
          <Route path="/farm-to-glass" element={<FarmToGlass />} />
          <Route path="/events" element={<Events />} />
          <Route path="/visit" element={<Visit />} />
          <Route path="/where-to-buy" element={<WhereToBuy />} />
          <Route path="/story" element={<Story />} />
          <Route
            path="/responsible-enjoyment"
            element={<ResponsibleEnjoyment />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
