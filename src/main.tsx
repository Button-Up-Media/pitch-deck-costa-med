import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { Layout } from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import { CoverPage } from "./pages/CoverPage";
import { OpportunitiesPage } from "./pages/OpportunitiesPage";
import { EcosystemPage } from "./pages/EcosystemPage";
import { ServicePage } from "./pages/ServicePage";
import { ValuePage } from "./pages/ValuePage";
import { LetsGoPage } from "./pages/LetsGoPage";
import { config } from "./config/client";
import { SERVICES, SERVICE_ORDER } from "./config/services";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<CoverPage />} />
          <Route path="/opportunities" element={<OpportunitiesPage />} />
          <Route path="/ecosystem" element={<EcosystemPage />} />
          {SERVICE_ORDER.filter(
            (k) => config.services[k].enabled && SERVICES[k].standalone !== false
          ).map((k) => (
            <Route
              key={k}
              path={SERVICES[k].route}
              element={<ServicePage serviceKey={k} />}
            />
          ))}
          <Route path="/value" element={<ValuePage />} />
          {config.bundle.enabled && (
            <Route path="/lets-go" element={<LetsGoPage />} />
          )}
          <Route path="*" element={<CoverPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
