/**
 * Side-by-side device mockup. Used as the hero background for the Website page.
 * Devices live on the right half; the hero text sits on the left half (handled by ServicePage).
 *
 * @param mobileCrop - CSS object-position value for the phone screenshot.
 *   Defaults to "top" which anchors to the top of the image (works for tall mobile screenshots
 *   where the hero / above-the-fold should be visible). Override per-use if a screenshot
 *   needs different positioning.
 */
export function DeviceMockupSplit({ mobileCrop = "top" }: { mobileCrop?: string } = {}) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0a0a0a]">
      {/* ambient color washes */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold-500/8 via-transparent to-coral/5" />
      <div className="absolute -bottom-40 -right-32 size-[700px] rounded-full bg-gold-500/6 blur-3xl" />
      <div className="absolute -top-32 right-1/3 size-[500px] rounded-full bg-coral/6 blur-3xl" />

      {/* devices anchored to the right half — lg+ only; tablet is too narrow to fit
          a 420px laptop without crowding the hero text on the left */}
      <div className="absolute inset-y-0 right-0 hidden w-[55%] items-center justify-center lg:flex lg:w-[52%]">
        <div className="relative flex items-end gap-0">
          {/* laptop */}
          <div className="relative">
            <div className="relative w-[420px] overflow-hidden rounded-t-lg border border-cream-50/10 bg-[#111] shadow-2xl lg:w-[540px] xl:w-[620px]">
              <div className="flex items-center gap-1.5 border-b border-cream-50/8 bg-[#1a1a1a] px-3 py-2">
                <div className="size-2.5 rounded-full bg-red-500/60" />
                <div className="size-2.5 rounded-full bg-yellow-500/60" />
                <div className="size-2.5 rounded-full bg-green-500/60" />
                <div className="mx-2 flex h-4 flex-1 items-center rounded bg-[#111] px-2">
                  <span className="truncate font-mono text-[8px] text-cream-300/40">
                    rustypelican.com
                  </span>
                </div>
              </div>
              <img
                src="/images/rp-menu-computer.jpg"
                alt="Restaurant website"
                className="h-[240px] w-full object-cover object-top lg:h-[310px] xl:h-[360px]"
              />
            </div>
            <div className="h-2 w-full rounded-sm bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] shadow-md" />
            <div className="mx-auto h-3 w-[110%] rounded-b-xl bg-gradient-to-b from-[#222] to-[#161616] shadow-xl" />
          </div>

          {/* phone — overlaps laptop edge */}
          <div className="relative -mb-2 ml-[-100px] lg:ml-[-130px] xl:ml-[-150px]">
            <div className="relative w-[140px] overflow-hidden rounded-[22px] border-[3px] border-cream-50/10 bg-[#111] shadow-2xl lg:w-[170px] xl:w-[195px]">
              <div className="flex justify-center bg-[#0d0d0d] py-1.5">
                <div className="h-2 w-14 rounded-full bg-[#1a1a1a]" />
              </div>
              <img
                src="/images/rp-menu-mobile.jpg"
                alt="Restaurant website mobile"
                className="h-[290px] w-full object-cover lg:h-[350px] xl:h-[400px]"
                style={{ objectPosition: mobileCrop }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* fade text-side to bg, devices fade slightly into bg too */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent lg:via-[#0a0a0a]/65" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </div>
  );
}
