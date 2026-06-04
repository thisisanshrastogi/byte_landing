export const CLAY = {
  shadow: {
    inset:
      "shadow-[inset_3px_3px_6px_rgba(204,190,178,0.35),inset_-3px_-3px_6px_rgba(255,255,255,0.7)]",
    sm: "shadow-[4px_4px_8px_rgba(214,198,186,0.35),-3px_-3px_6px_rgba(255,255,255,0.8)]",
    md: "shadow-[8px_8px_16px_rgba(214,198,186,0.4),-4px_-4px_12px_rgba(255,255,255,0.8)]",
    lg: "shadow-[12px_12px_24px_rgba(214,198,186,0.45),-6px_-6px_16px_rgba(255,255,255,0.85)]",
    brand:
      "shadow-[5px_5px_10px_rgba(255,158,117,0.35),-2px_-2px_5px_rgba(255,255,255,0.4)]",
  },

  shadowDark: {
    inset:
      "dark:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.6),inset_-1px_-1px_3px_rgba(255,255,255,0.03)]",
    sm: "dark:shadow-[3px_3px_8px_rgba(0,0,0,0.4),-1px_-1px_4px_rgba(255,255,255,0.03)]",
    md: "dark:shadow-[6px_6px_12px_rgba(0,0,0,0.5),-3px_-3px_8px_rgba(255,255,255,0.02)]",
    lg: "dark:shadow-[8px_8px_16px_rgba(0,0,0,0.5),-4px_-4px_10px_rgba(255,255,255,0.02)]",
    brand:
      "dark:shadow-[4px_4px_8px_rgba(255,124,80,0.2),-2px_-2px_4px_rgba(255,255,255,0.02)]",
  },

  radius: {
    sm: "rounded-[1rem]",
    md: "rounded-[1.5rem]",
    lg: "rounded-[2rem]",
    xl: "rounded-[2.5rem]",
    full: "rounded-full",
  },

  color: {
    bg: "bg-[#FFFBF7] dark:bg-[#050505]",
    card: "bg-[#FFFBF7] dark:bg-[#121212]",
    cardBorder: "border border-[#F5EFE8] dark:border-white/10",
    inset: "bg-[#F5EFE8] dark:bg-[#0a0a0a]",
    accent: "bg-[#FF9E75] dark:bg-[#ff7c50]",
    accentLight: "bg-[#FFF0E6] dark:bg-[#1a1512]",
    textPrimary: "text-[#5C4D45] dark:text-[#EDEDED]",
    textSecondary: "text-[#9C8C84] dark:text-[#A1A1AA]",
    textAccent: "text-[#FF9E75] dark:text-[#ff7c50]",
  },

  spacing: {
    sectionGap: "mb-24 lg:mb-36",
    headingGap: "mb-14 lg:mb-16",
    gridGap: "gap-6",
    cardSmall: "p-6 md:p-8",
    cardLarge: "p-8 md:p-12",
    cardCta: "p-10 md:p-16",
  },
} as const;

export const THEME = {
  bg: `${CLAY.color.bg} transition-colors duration-500`,
  card: `${CLAY.color.card} ${CLAY.shadow.md} ${CLAY.shadowDark.md} ${CLAY.color.cardBorder} ${CLAY.radius.md}`,
  cardHover:
    "hover:-translate-y-1 hover:shadow-[12px_12px_24px_rgba(214,198,186,0.5),-6px_-6px_16px_rgba(255,255,255,0.85)] dark:hover:shadow-[8px_8px_16px_rgba(0,0,0,0.6)] transition-all duration-300 ease-out",
  cardElevated: `${CLAY.color.card} ${CLAY.shadow.lg} ${CLAY.shadowDark.lg} ${CLAY.color.cardBorder} ${CLAY.radius.xl}`,
  cardInset: `${CLAY.color.inset} ${CLAY.shadow.inset} ${CLAY.shadowDark.inset} ${CLAY.radius.sm}`,
  btnPrimary: `${CLAY.color.accent} text-white ${CLAY.shadow.brand} ${CLAY.shadowDark.brand} hover:opacity-90 active:scale-95 transition-all ${CLAY.radius.full}`,
  btnSecondary: `bg-[#FFFEFD] dark:bg-[#1a1a1a] ${CLAY.color.textPrimary} ${CLAY.shadow.sm} ${CLAY.shadowDark.sm} border border-[#fffefd] dark:border-white/10 hover:border-[#E5DCD5] hover:bg-[#E5DCD5] active:scale-95 transition-all ${CLAY.radius.full}`,
  textPrimary: CLAY.color.textPrimary,
  textSecondary: CLAY.color.textSecondary,
  textAccent: CLAY.color.textAccent,
  textDark: CLAY.color.textPrimary,
  textSoft: CLAY.color.textSecondary,
  brand: CLAY.color.textAccent,
} as const;
