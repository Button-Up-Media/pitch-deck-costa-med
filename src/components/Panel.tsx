import { motion } from "framer-motion";
import type { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  padding?: "default" | "compact" | "tight";
  motion?: boolean;
};

export function Panel({
  children,
  className,
  delay = 0,
  padding = "default",
  motion: animate = true,
}: Props) {
  const padCls =
    padding === "default"
      ? "p-5 md:p-8 lg:p-10"
      : padding === "compact"
        ? "p-4 md:p-6 lg:p-8"
        : "p-4 md:p-5";
  const inner = (
    <div className={clsx("panel", padCls, className)}>{children}</div>
  );
  if (!animate) return inner;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {inner}
    </motion.div>
  );
}

export function HrSoft({ className }: { className?: string }) {
  return <div className={clsx("hr-soft", className)} />;
}
