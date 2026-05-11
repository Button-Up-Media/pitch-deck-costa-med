import { useMemo } from "react";
import { config } from "../config/client";
import { SERVICES, SERVICE_ORDER } from "../config/services";

export function useDeckOrder() {
  return useMemo(() => {
    const enabled = SERVICE_ORDER.filter(
      (k) => config.services[k].enabled && SERVICES[k].standalone !== false
    );
    const order = ["/", "/opportunities", "/ecosystem"];
    enabled.forEach((k) => order.push(SERVICES[k].route));
    order.push("/value");
    if (config.bundle.enabled) order.push("/lets-go");
    return order;
  }, []);
}

export const SLIDE_LABELS: Record<string, string> = {
  "/": "Cover",
  "/opportunities": "Opportunities",
  "/ecosystem": "The Ecosystem",
  "/value": "The Value",
  "/lets-go": "Let's Go",
};
