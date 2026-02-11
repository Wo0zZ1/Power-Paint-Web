import { useState } from "react";

import { isTheme, Theme } from "./config";

export const useTheme = () => {
  const _theme = localStorage.getItem("theme");

  const [theme, setTheme] = useState<Theme>(
    isTheme(_theme) ? _theme : "system",
  );

  return { theme, setTheme };
};
