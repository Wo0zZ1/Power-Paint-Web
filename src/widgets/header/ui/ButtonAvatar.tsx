import { cn } from "@/utils";

import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/shared/ui";

interface ButtonAvatarProps {
  className?: string;
  src?: string;
  fallback?: string;
  loading?: boolean;
}

export function ButtonAvatar({
  className,
  src,
  fallback,
  loading,
}: ButtonAvatarProps) {
  if (loading) {
    return (
      <Avatar
        className={cn("cursor-pointer animate-pulse", className)}
        size="lg"
        asChild
      >
        <div className="w-10 h-10 rounded-full bg-muted" />
      </Avatar>
    );
  }

  return (
    <Avatar className={cn("cursor-pointer", className)} size="lg">
      {src && <AvatarImage src={src} alt={fallback} />}
      {fallback && <AvatarFallback>{fallback[0]}</AvatarFallback>}
      <AvatarBadge className="bg-green-500" />
    </Avatar>
  );
}
