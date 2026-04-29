import { Routes, Route, Navigate } from "react-router-dom";

import Hero         from "../Component/Hero";
import About        from "../Component/About";
import Services     from "../Component/Service";
import Technologies from "../Component/Technologies";
import Portfolio    from "../Component/Portfolio";
import Contact      from "../Component/Contact";
import ServiceDetail from "../pages/ServiceDetail";

/* ── Full Home page (all sections together) ── */
function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Technologies />
      <Portfolio />
      <Contact />
    </>
  );
}

/* ── About standalone page ── */
function AboutPage() {
  return (
    <>
      <div className="pt-[64px]" />
      <About />
    </>
  );
}

/* ── Services standalone page ── */
function ServicesPage() {
  return (
    <>
      <div className="pt-[64px]" />
      <Services />
    </>
  );
}

/* ── Technologies standalone page ── */
function TechnologiesPage() {
  return (
    <>
      <div className="pt-[64px]" />
      <Technologies />
    </>
  );
}

/* ── Portfolio standalone page ── */
function PortfolioPage() {
  return (
    <>
      <div className="pt-[64px]" />
      <Portfolio />
    </>
  );
}

/* ── Contact standalone page ── */
function ContactPage() {
  return (
    <>
      <div className="pt-[64px]" />
      <Contact />
    </>
  );
}

export default function AllRoutes() {
  return (
    <Routes>
      {/* Home — all sections */}
      <Route path="/"             element={<Home />} />

      {/* Individual pages */}
      <Route path="/about"        element={<AboutPage />} />
      <Route path="/services"     element={<ServicesPage />} />
      <Route path="/technologies" element={<TechnologiesPage />} />
      <Route path="/portfolio"    element={<PortfolioPage />} />
      <Route path="/contact"      element={<ContactPage />} />
      <Route path="/services/:slug" element={<ServiceDetail />} />

      {/* Service detail — both URL patterns work */}
      <Route path="/service/:slug"  element={<ServiceDetail />} />
      <Route path="/services/:slug" element={<ServiceDetail />} />

      {/* 404 fallback — home pe redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}