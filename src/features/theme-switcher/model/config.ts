export const THEMES = {
  light: "light",
  dark: "dark",
  system: "system",
} as const;

export type Theme = (typeof THEMES)[keyof typeof THEMES];

export const isTheme = (value?: string | null): value is Theme => {
  return !!value && value in THEMES;
};
