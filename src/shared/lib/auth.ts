import { getServerSession } from "next-auth";
import { AUTH_CONFIG } from "../config/authConfig";

export const getSession = () => getServerSession(AUTH_CONFIG);
