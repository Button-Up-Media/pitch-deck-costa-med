export function DeviceMockupHero() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0a0a0a]">
      {/* ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold-500/8 via-transparent to-teal/5" />
      <div className="absolute -bottom-32 -right-32 size-[600px] rounded-full bg-gold-500/5 blur-3xl" />
      <div className="absolute -top-20 left-1/3 size-[400px] rounded-full bg-teal/5 blur-3xl" />

      {/* devices */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex items-end gap-4 md:gap-6">

          {/* laptop */}
          <div className="relative">
            {/* screen */}
            <div className="relative w-[320px] overflow-hidden rounded-t-lg border border-cream-50/10 bg-[#111] shadow-2xl md:w-[480px] lg:w-[580px]">
              {/* browser chrome */}
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
                className="h-[190px] w-full object-cover object-top md:h-[280px] lg:h-[340px]"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              {/* fallback gradient when no image */}
              <div className="absolute inset-[36px_0_0] -z-10 bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d]" />
            </div>
            {/* hinge */}
            <div className="h-2 w-full rounded-sm bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] shadow-md" />
            {/* base */}
            <div className="mx-auto h-3 w-[110%] rounded-b-xl bg-gradient-to-b from-[#222] to-[#161616] shadow-xl" />
          </div>

          {/* phone — sits in front, offset right */}
          <div className="relative -mb-4 ml-[-80px] md:ml-[-120px] lg:ml-[-140px]">
            <div className="relative w-[100px] overflow-hidden rounded-[16px] border-[3px] border-cream-50/10 bg-[#111] shadow-2xl md:w-[130px] md:rounded-[20px] lg:w-[155px]">
              {/* notch */}
              <div className="flex justify-center bg-[#0d0d0d] py-1">
                <div className="h-2 w-12 rounded-full bg-[#1a1a1a]" />
              </div>
              <img
                src="/images/rp-menu-mobile.jpg"
                alt="Restaurant website mobile"
                className="h-[200px] w-full object-cover object-top md:h-[260px] lg:h-[310px]"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="absolute inset-[28px_0_0] -z-10 bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d]" />
            </div>
          </div>
        </div>
      </div>

      {/* left-side gradient overlay so text is readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/55 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
    </div>
  );
}
