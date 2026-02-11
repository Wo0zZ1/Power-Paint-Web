import { NextIntlClientProvider } from "next-intl";

interface ServerProviderProps {
  children: React.ReactNode;
}

export async function ServerProviders({ children }: ServerProviderProps) {
  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}
