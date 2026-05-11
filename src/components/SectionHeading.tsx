import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
};

export function SectionHeading({ eyebrow, title, subtitle, className }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
      <h2 className="font-display text-balance text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-cream-50 md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 max-w-2xl text-pretty text-base leading-[1.7] text-cream-200 md:text-[17px]">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
