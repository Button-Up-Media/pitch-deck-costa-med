/**
 * THE ONLY FILE YOU NEED TO EDIT TO CREATE A NEW PITCH DECK.
 *
 * Workflow per client:
 *   1. Update `client` with the client's details + the problems you uncovered
 *      in the discovery call
 *   2. Add/remove brands in `brands` (supports 1, 2, 3+)
 *   3. Toggle services on/off based on what's being pitched
 *   4. Set per-service prices on the Value slide (null = blank/TBD in template)
 *   5. Set bundle pricing (or leave null to render blank lines)
 */

export type Brand = {
  name: string;
  city: string;
  cuisine: string;
  imageUrl: string;
};

export type ServiceKey =
  | "organicSocial"
  | "paidSocial"
  | "googleAds"
  | "websiteCreation"
  | "websiteManagement"
  | "seo";

export type ServiceConfig = {
  enabled: boolean;
  /** null = blank template field; 0 = custom quote; >0 = fixed price */
  monthlyPrice: number | null;
  /** Estimated hours per month for this service. null = blank template field */
  hoursPerMonth?: number | null;
  /** Shows "Our Recommendation" badge on the Value slide */
  recommended?: boolean;
  /** Small note shown beneath the price (e.g. "management fee · budget billed separately") */
  priceNote?: string;
};

/** Two common starting points for the kind of clients we work with. */
export type ClientPath = "wordOfMouth" | "burnedByPriorAgency" | "custom";

/** What the client actually wants their marketing to do. */
export type GrowthGoal = "acquisition" | "brandValidity" | "retention";

export type Config = {
  client: {
    name: string;
    shortName: string;
    industry: string;
    preparedFor: string;
    decisionDate: string;
    path: ClientPath;
    primaryGoal: GrowthGoal;
  };
  agency: {
    name: string;
    tagline: string;
    contactEmail: string;
    contactPhone: string;
    stats: { value: string; label: string }[];
  };
  brands: Brand[];
  services: Record<ServiceKey, ServiceConfig>;
  bundle: {
    enabled: boolean;
    monthlyPrice: number | null;
    setupFee: number | null;
    contractMonths: number | null;
  };
  /** Phone number shown on cover page CTA. Use "[__]" to render as a blank placeholder. */
  phoneNumber: string;
};

export const config: Config = {
  client: {
    name: "Client Restaurant Group",
    shortName: "Client",
    industry: "Hospitality",
    preparedFor: "Client Leadership Team",
    decisionDate: "Q3 2026",
    path: "wordOfMouth",
    primaryGoal: "acquisition",
  },

  agency: {
    name: "Button Up Media",
    tagline: "Marketing built for hospitality",
    contactEmail: "hello@buttonupmedia.com",
    contactPhone: "(555) 123-4567",
    stats: [
      { value: "50+", label: "Restaurants Served" },
      { value: "80M+", label: "Social Media Views" },
      { value: "12X", label: "Avg Return on Ad Spend" },
      { value: "90%", label: "Client Retention" },
    ],
  },

  brands: [
    {
      name: "Brand One",
      city: "Primary Market",
      cuisine: "Modern American",
      imageUrl:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
    },
    {
      name: "Brand Two",
      city: "Secondary Market",
      cuisine: "Coastal Kitchen",
      imageUrl:
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1600&q=80",
    },
  ],

  services: {
    organicSocial: {
      enabled: true,
      monthlyPrice: null,
      hoursPerMonth: null,
      recommended: true,
    },
    googleAds: {
      enabled: true,
      monthlyPrice: 500,
      hoursPerMonth: null,
      priceNote: "management fee · budget billed separately",
    },
    paidSocial: { enabled: true, monthlyPrice: null, hoursPerMonth: null },
    websiteCreation: { enabled: true, monthlyPrice: null, hoursPerMonth: null },
    websiteManagement: { enabled: true, monthlyPrice: null, hoursPerMonth: null },
    seo: { enabled: false, monthlyPrice: null, hoursPerMonth: null },
  },

  bundle: {
    enabled: true,
    monthlyPrice: null,
    setupFee: null,
    contractMonths: 6,
  },

  phoneNumber: "[__]",
};
