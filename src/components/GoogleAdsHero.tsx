import { Search, MapPin, Star } from "lucide-react";

/**
 * CSS-only Google search results mockup. Shows a branded ad + map listing
 * to visualize what "showing up at the moment of decision" actually looks like.
 */
export function GoogleAdsHero() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0a0a0a]">
      {/* ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold-500/8 via-transparent to-coral/5" />
      <div className="absolute -bottom-32 -right-20 size-[500px] rounded-full bg-gold-500/5 blur-3xl" />
      <div className="absolute -top-20 right-1/4 size-[400px] rounded-full bg-coral/5 blur-3xl" />

      {/* SERP mockup — anchored top-right, behind the hero text */}
      <div className="absolute inset-y-0 right-0 hidden w-[58%] items-center justify-end pr-6 md:flex lg:pr-12 xl:w-[55%]">
        <div className="w-full max-w-[460px] rounded-2xl border border-cream-50/10 bg-[#f8f7f3] p-3 shadow-2xl md:p-4 lg:max-w-[520px]">
          {/* search bar */}
          <div className="flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3.5 py-2 shadow-sm">
            <Search className="size-4 text-stone-500" strokeWidth={2.4} />
            <span className="truncate font-sans text-[12px] text-stone-700 md:text-[13px]">
              best italian restaurant near me
            </span>
          </div>

          {/* ad result */}
          <div className="mt-3 rounded-lg bg-white p-3 ring-1 ring-stone-200/60">
            <div className="flex items-center gap-1.5">
              <span className="rounded bg-stone-900 px-1 py-0 text-[8px] font-bold uppercase text-white">
                Ad
              </span>
              <span className="font-sans text-[10px] text-stone-500">
                ·  yourrestaurant.com
              </span>
            </div>
            <h3 className="mt-1 font-sans text-[13px] font-medium leading-snug text-blue-700 md:text-[14px]">
              Reserve a Table Tonight | Modern Italian | Open Now
            </h3>
            <p className="mt-1 font-sans text-[10.5px] leading-snug text-stone-700 md:text-[11.5px]">
              Hand-rolled pasta, wood-fired everything, and a wine list built for the
              occasion. Walk-ins welcome. Book online in seconds.
            </p>
          </div>

          {/* map result */}
          <div className="mt-2 rounded-lg bg-white p-3 ring-1 ring-stone-200/60">
            <div className="flex items-start gap-2.5">
              <div className="flex size-8 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-coral to-gold-500 text-white shadow">
                <MapPin className="size-4" strokeWidth={2.4} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-sans text-[12.5px] font-semibold text-stone-900 md:text-[13px]">
                  Your Restaurant
                </div>
                <div className="mt-0.5 flex items-center gap-1 font-sans text-[10.5px] text-stone-600">
                  <span className="font-semibold text-stone-900">4.8</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="size-2.5 fill-amber-400 text-amber-400"
                        strokeWidth={1}
                      />
                    ))}
                  </div>
                  <span>· 1,284 reviews</span>
                </div>
                <div className="mt-1 font-sans text-[10px] text-stone-500">
                  $$ · Italian · 0.4 mi · Open until 11 PM
                </div>
              </div>
            </div>
          </div>

          {/* rank badge */}
          <div className="mt-2.5 flex items-center justify-between font-sans text-[9.5px] text-stone-500">
            <span>Sponsored placement</span>
            <span className="rounded-full border border-gold-400/40 bg-gold-500/10 px-1.5 py-0.5 font-bold uppercase tracking-wider text-gold-700">
              Top of page
            </span>
          </div>
        </div>
      </div>

      {/* gradient overlays so hero text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/98 via-[#0a0a0a]/80 to-[#0a0a0a]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
    </div>
  );
}
