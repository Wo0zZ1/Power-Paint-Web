import { ButtonAvatar } from "./ButtonAvatar";

interface LoadingMenuProps {
  className?: string;
}

export async function LoadingMenu({ className }: LoadingMenuProps) {
  return <ButtonAvatar className={className} loading />;
}
