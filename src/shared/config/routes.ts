export const ROUTES = {
  ROOT: "/",
  PROFILE: (uuid?: string) => `/profile/${uuid}` as const,
  SETTINGS: "/settings", // TODO Remove this route
  BOARD: "/board",
  DASHBOARD: "/dashboard",
  LOGIN: "/login",
  SINGUP: "/signup",
  NOT_FOUND: "/404",
} as const;
