import { cn } from "@/utils";

import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/shared/ui";

interface ButtonAvatarProps {
  className?: string;
  src?: string;
  nickname: string;
  loading?: boolean;
}

export function ButtonAvatar(props: ButtonAvatarProps) {
  if (props.loading) {
    return (
      <Avatar
        className={cn("cursor-pointer animate-pulse", props.className)}
        size="lg"
        asChild
      >
        <div className="w-10 h-10 rounded-full bg-muted" />
      </Avatar>
    );
  }

  return (
    <>
      <Avatar className={cn("cursor-pointer", props.className)} size="lg">
        {props.src && <AvatarImage src={props.src} alt={props.nickname} />}
        <AvatarFallback>{props.nickname[0]}</AvatarFallback>
        <AvatarBadge style={{ overflow: "" }} className="bg-green-500 z-10" />
      </Avatar>
    </>
  );
}
