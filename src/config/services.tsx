import {
  Megaphone,
  Target,
  Search,
  Globe,
  Settings,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import type { ServiceKey } from "./client";

export type ServiceMeta = {
  key: ServiceKey;
  label: string;
  short: string;
  route: string;
  icon: LucideIcon;
  accent: string;
  headline: string;
  subhead: string;
  ecosystemRole: string;
  problem: string;
  solution: string;
  pillars: { title: string; body: string }[];
  /** Use [__] as a placeholder marker — rendered as a highlighted blank on the Value slide */
  deliverables: string[];
  imageUrl: string;
  /** "deviceMockup" renders a CSS laptop+phone hero instead of an image */
  heroVariant?: "deviceMockup" | "deviceSplit" | "googleAdsSerp";
  /** Visual treatment for the pillars section — defaults to numbered cards */
  pillarLayout?: "numbered" | "grid" | "stack" | "flow";
  /** If false, this service does not get its own page/nav entry but still shows on Value slide */
  standalone?: boolean;
  processVideo?: { title: string; description: string; url: string };
};

export const SERVICES: Record<ServiceKey, ServiceMeta> = {
  organicSocial: {
    key: "organicSocial",
    label: "Organic Social Media",
    short: "Organic Social",
    route: "/organic-social",
    icon: Megaphone,
    accent: "from-coral to-gold-500",
    headline: "You have to earn someone's care.",
    subhead:
      "Mostly trust-building content. A little selling. That's the ratio that turns followers into people who walk through your door.",
    ecosystemRole:
      "The first thing people see. Earns attention and builds an audience that trusts you, likes you, and is ready to book when they're hungry.",
    problem:
      "Most restaurants treat social like a billboard: posting events, pushing products, telling people how great they are. Nobody engages. That approach earns scrolls, not loyalty.",
    solution:
      "We flip the ratio. The vast majority of posts earn trust by entertaining, educating, and showing real people in real moments. The smaller share asks for a booking — and it works, because the audience already cares about you by then.",
    pillarLayout: "grid",
    pillars: [
      {
        title: "Earn Trust First",
        body: "The goal on social isn't to sell. It's to build an audience that trusts you, follows your taste or sense of humor, and genuinely likes you. Only then are they interested in the next thing you share.",
      },
      {
        title: "The Posts That Build the Audience",
        body: "Entertaining, likable, or educational posts with the restaurant sprinkled in — never the main topic. Reels, TikToks, and carousels that grow the following and keep it watching.",
      },
      {
        title: "Stories That Sell",
        body: "Stories run a different playbook. We mix direct asks ('book tonight,' 'tap to order') with proof that other people are already there having a great time. That fear-of-missing-out is what drives action on Stories.",
      },
      {
        title: "Other People Loving Your Restaurant",
        body: "Reposting real guests who dined with you, tagged you, and shared the experience. No buttons, no links — real people enjoying themselves says more than any ad ever could.",
      },
    ],
    deliverables: [
      "[__] posts per brand per month across IG, TikTok, and Facebook",
      "[__] Reels per brand per month",
      "[__] Stories per month with conversion and social proof mix",
      "On-location content shoots — [__] per month",
      "Daily community management",
      "Performance reporting with strategic recommendations",
    ],
    imageUrl: "/images/bts-shoot.jpeg",
    processVideo: {
      title: "What happens when you hire us",
      description:
        "A step-by-step look at how a Button Up Media content shoot runs, from planning through delivery.",
      url: "/videos/how-we-work.mp4",
    },
  },

  googleAds: {
    key: "googleAds",
    label: "Google Ads",
    short: "Google Ads",
    route: "/google-ads",
    icon: Search,
    accent: "from-gold-400 to-gold-600",
    headline: "Someone nearby is searching. Are you there?",
    subhead:
      "Restaurants get chosen faster than almost anything else people buy. Someone searching 'Italian restaurant near me' picks in minutes — not days. Google Ads puts you in front of that person at the exact moment they're choosing.",
    ecosystemRole:
      "The fastest channel in the program. Google Ads catches guests who have already decided to go out — they're just choosing between you and the restaurant down the street. This is the shortest path to a reservation.",
    problem:
      "Most restaurant campaigns fail for one of three reasons: targeting too wide, the wrong search terms, or no way to tell what actually drove a booking. Budget evaporates and there's nothing to show for it. Meanwhile, competitors are paying to show up when someone searches your restaurant by name — and stealing those guests.",
    solution:
      "Every campaign answers three questions: who is the customer, what do we want them to do, and what does success look like in dollars. The proof: in 2025, Button Up Media drove $3.5M+ in tracked revenue across 5 restaurants on under $46,000 of total ad spend — roughly $12 back for every $1 spent. A badly run $5,000 campaign loses money. A well-run $1,500 campaign makes real money. We run the second kind.",
    pillars: [
      {
        title: "Catching Guests Mid-Search",
        body: "These guests aren't scrolling — they're deciding where to eat in the next hour. We pay to show up for the searches that signal someone's about to book: 'Italian restaurant near me,' 'best brunch [city],' 'date night [neighborhood].' We also pay to show up when someone searches your name directly, so a competitor can't grab them first.",
      },
      {
        title: "How the Campaigns Are Built",
        body: "We bid on the dishes you serve and the moments people search for them — date night, private events, brunch. We focus the budget on the area around your restaurant. We push harder during peak booking hours. And we use Google's Performance Max to show up across Search, Maps, YouTube, and ad space across the web — all from one campaign.",
      },
      {
        title: "We Track Every Reservation Back to the Ad",
        body: "Every reservation form, event inquiry, phone call, and direction request gets traced back to the ad that produced it — and assigned a dollar value. We don't chase clicks. We chase covers. Every decision answers one question: did this campaign actually fill seats?",
      },
      {
        title: "Constant Tuning",
        body: "We watch the campaigns every day. We pause what's losing money. We test new ad images and ad text against the old ones. We move budget from the losers to the winners. The difference between a money-losing campaign and a $12-for-every-$1 campaign is rarely the strategy — it's the daily work. This is where that work happens.",
      },
    ],
    deliverables: [
      "Google Ads campaigns: defending your brand name, targeting high-intent searches, plus Google's Performance Max",
      "Ads on Google Maps and local searches",
      "Tracking for every reservation, phone call, and inquiry form",
      "Monthly results report showing every dollar spent and every dollar back",
    ],
    imageUrl: "",
    heroVariant: "googleAdsSerp",
    pillarLayout: "stack",
  },

  paidSocial: {
    key: "paidSocial",
    label: "Social Ads",
    short: "Social Ads",
    route: "/social-ads",
    icon: Target,
    accent: "from-teal to-gold-500",
    headline: "The smart add-on, once Google is running.",
    subhead:
      "Social ads work hardest when there's already an audience that knows your name. Layer them on top of Google so you can show ads to the people who searched, clicked, and almost booked — but didn't.",
    ecosystemRole:
      "The follow-up layer. Once Google Ads brings people to your site or your videos, social ads keep showing up in their feeds — Instagram, TikTok — until they book. This runs second, after Google. Not first.",
    problem:
      "Running Meta and TikTok ads to people who've never heard of your restaurant burns budget fast. Most restaurants try social ads first, set a generic local radius, and wonder why it doesn't produce bookings. The math doesn't work when the audience has no idea who you are.",
    solution:
      "We use social as the follow-up layer. Someone searched on Google, clicked your ad, browsed the menu, and left without booking. Now they see your best post on Instagram. They see a reservation reminder on TikTok. People who already know your name book at a fraction of the cost — because Google did the hard work of finding them in the first place.",
    pillars: [
      {
        title: "Getting Your Name In Front of the Right Local People",
        body: "We put the restaurant in front of the right people in the right neighborhood before they ever search Google. Targeting on Meta and TikTok by location, age, and interest. So when they do search, they already know your name.",
      },
      {
        title: "Following Up With Almost-Bookings",
        body: "Someone searches on Google, clicks your ad, browses the menu, and leaves without booking. Now your best post — or a simple reminder — shows up in their Instagram feed the next day. This is where Google and social ads work together. The same person, but cheaper to reach the second time.",
      },
      {
        title: "Holiday and Event Pushes",
        body: "Holiday promos, Mother's Day, private dining, seasonal menus — timed to peak demand with ads built to match. Our standout: Rusty Pelican Miami's Mother's Day campaign brought in 155 reservations at $3.06 each.",
      },
      {
        title: "Capturing Private Event Inquiries",
        body: "Meta ads with a built-in form: name, date, party size, contact info — submitted right inside Instagram or Facebook. The inquiry hits your inbox before they consider a competitor. The most valuable kind of booking a restaurant ad can produce.",
      },
    ],
    deliverables: [
      "Meta and TikTok campaigns built and managed",
      "Tracking for every reservation and inquiry",
      "Monthly results report showing every dollar spent and every dollar back",
    ],
    imageUrl: "/images/download-2.jpg",
    pillarLayout: "flow",
  },

  websiteCreation: {
    key: "websiteCreation",
    label: "Website",
    short: "Website",
    route: "/website",
    icon: Globe,
    accent: "from-gold-500 to-coral",
    headline: "Found first. Built to book.",
    subhead:
      "A site built phone-first and designed around the actions that matter — reservations, orders, inquiries. Backed by SEO (search engine optimization — how Google decides who to rank) and AI search optimization, so guests find you on Google and on ChatGPT.",
    ecosystemRole:
      "The destination, and the place new guests find you. Every other piece sends people here. Search engines and AI tools also send guests here directly. This is where the bookings happen.",
    problem:
      "A slow, dated site that buries the menu and makes booking a chore. Guests search 'best brunch in [city]' and find a competitor — because the site isn't built for Google to find, your local listings are out of date, and AI assistants like ChatGPT don't know your restaurant exists.",
    solution:
      "A fast, beautiful site that works on a phone first and is built around the things you want guests to do: reserve, order, ask about an event. Paired with local search work — your Google Business Profile, your map listings — so Google and AI tools like ChatGPT and Perplexity recommend you by name.",
    pillars: [
      {
        title: "Phone-First, Booking-First",
        body: "Every layout starts on a phone. Big-thumb menus, instant load times, a reservation process you can complete with one hand. OpenTable, Resy, and Toast built right in, so guests book without leaving the site.",
      },
      {
        title: "Local Search and Your Google Business Profile",
        body: "We optimize your Google Business Profile (the box that pops up when someone Googles your restaurant). We help you generate more reviews. We make sure every directory and map app shows the same info. 44% of clicks on a local search go to the top 3 map results — and we get you there.",
      },
      {
        title: "Showing Up in ChatGPT and AI Search",
        body: "We tag the site so AI tools — ChatGPT, Perplexity, Google's AI Overviews — understand exactly what you serve. When someone asks the AI 'where should I eat tonight in [city]?', your name comes up. This is the new way people find restaurants.",
      },
      {
        title: "Speed, Code Quality, and Page-Level SEO",
        body: "Behind the scenes: speed, mobile performance, and proper code so Google can read every menu page and every dish. The result: restaurants that invest in SEO see 15–20% average annual sales growth.",
      },
    ],
    deliverables: [
      "Custom website design and build, phone-first and booking-focused",
      "Built with search engine optimization (SEO) so you rank on Google, and AI tools like ChatGPT and Perplexity recommend you",
      "Google Business Profile fully set up and optimized for each location",
      "Each menu and location page set up so Google indexes it cleanly",
      "[__] batches of revisions included",
    ],
    imageUrl: "",
    heroVariant: "deviceSplit",
    pillarLayout: "grid",
  },

  websiteManagement: {
    key: "websiteManagement",
    label: "Website Management",
    short: "Web Management",
    route: "/website-management",
    icon: Settings,
    accent: "from-gold-500 to-coral",
    standalone: false,
    headline: "Your site, always current.",
    subhead:
      "Custom landing pages for every ad campaign. Updates done in batches. Ongoing monitoring so the site never falls behind.",
    ecosystemRole:
      "The ongoing layer that keeps the website working as hard as your ads. A landing page built for each specific ad makes that ad produce dramatically more bookings.",
    problem:
      "Ad campaigns sending traffic to a generic homepage that wasn't built for the offer. Site updates piling up with no process to get them done efficiently.",
    solution:
      "A dedicated landing page for every ad campaign — so the ad turns into bookings instead of dead clicks. Updates handled in batches: send a list, and we ship it on a predictable schedule. No per-change fees.",
    pillars: [
      {
        title: "Campaign Landing Pages",
        body: "Every Google or social ad campaign gets a dedicated landing page built around that specific offer. Generic homepages waste ad spend. Pages built for one job — date night, brunch, private events — turn clicks into bookings.",
      },
      {
        title: "Batch Change Cycles",
        body: "Send everything your team wants updated — text, photos, menus, hours — as one list. That's one batch. We deliver it on a predictable schedule, no surprise add-ons.",
      },
      {
        title: "Ongoing Performance Monitoring",
        body: "We monitor site speed, uptime, and how often visitors actually book — every month. If something breaks or slips, it gets caught and fixed before it costs you reservations.",
      },
      {
        title: "Integrated with Ads",
        body: "Website Management and Google Ads run as one unit. Every new campaign starts with a landing page built for it. Every landing page has reservation and inquiry tracking wired in from day one.",
      },
    ],
    deliverables: [
      "Landing pages built for every Google and social ad campaign",
      "[__] batch changes per month",
      "All updates delivered in one batch — send a list, get everything done together",
      "Ongoing site performance and uptime monitoring",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
  },

  seo: {
    key: "seo",
    label: "Search Engine Optimization",
    short: "SEO",
    route: "/seo",
    icon: TrendingUp,
    accent: "from-teal to-gold-400",
    headline: "Be the answer when guests search",
    subhead:
      "On-page, technical, local, and AI search optimization that puts the brand at the top of every search that matters.",
    ecosystemRole:
      "Compounding free traffic. Slow to start, undefeated long-term. The channel that keeps paying after spend stops.",
    problem:
      "Guests search 'best brunch in [city]' and find a competitor, even though the food is better here. Menus aren't indexed, local listings are stale, and AI assistants don't know this brand exists.",
    solution:
      "A multi-layered program: technical fixes, on-page optimization for every menu and dish, local SEO across Google Business Profile, and content that earns rankings on the searches that drive covers.",
    pillars: [
      {
        title: "Technical SEO",
        body: "Site speed, crawlability, schema markup, and Core Web Vitals fixed once and monitored monthly.",
      },
      {
        title: "Local SEO + GBP",
        body: "Google Business Profile optimization, review generation, and local citations to dominate the map pack in every market.",
      },
      {
        title: "On-Page & Content",
        body: "Menu pages, location pages, occasion pages, and city guides that own the long tail.",
      },
      {
        title: "AEO: Answer Engine Optimization",
        body: "Structured content so ChatGPT, Perplexity, and Google AI Overviews can recommend the brand by name when guests ask.",
      },
    ],
    deliverables: [
      "Full technical audit and remediation",
      "GBP optimization for every location",
      "10+ optimized location and occasion pages per brand",
      "Monthly content production aligned to keyword strategy",
      "Review generation and reputation management",
      "Monthly rank tracking and revenue attribution report",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
  },
};

export const SERVICE_ORDER: ServiceKey[] = [
  "organicSocial",
  "googleAds",
  "paidSocial",
  "websiteCreation",
  "websiteManagement",
  "seo",
];
