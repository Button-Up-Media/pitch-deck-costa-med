export function AmbientBg() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(226,168,77,0.06),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(226,168,77,0.04),transparent_55%)]" />
      <div className="ambient-1 absolute -top-40 -left-40 size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(226,168,77,0.08),transparent_70%)] blur-3xl" />
      <div className="ambient-2 absolute top-1/3 -right-40 size-[40rem] rounded-full bg-[radial-gradient(circle,rgba(226,168,77,0.06),transparent_70%)] blur-3xl" />
      <div className="ambient-3 absolute -bottom-40 left-1/4 size-[32rem] rounded-full bg-[radial-gradient(circle,rgba(208,106,80,0.05),transparent_70%)] blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_70%,rgba(10,10,10,0.9))]" />
    </div>
  );
}
