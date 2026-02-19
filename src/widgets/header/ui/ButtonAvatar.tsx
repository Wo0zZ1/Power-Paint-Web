import { cn } from "@/utils";

import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/shared/ui";

type ButtonAvatarProps = {
  className?: string;
  src?: string | null;
  fallback: string;
};

export function ButtonAvatar({ className, fallback, src }: ButtonAvatarProps) {
  return (
    <Avatar className={cn("cursor-pointer", className)} size="lg">
      {src && (
        <AvatarImage
          src={src}
          loading="eager"
          width={40}
          height={40}
          alt="User avatar"
        />
      )}
      <AvatarFallback>{fallback.slice(0, 2)}</AvatarFallback>
      <AvatarBadge className="bg-green-500" />
    </Avatar>
  );
}
