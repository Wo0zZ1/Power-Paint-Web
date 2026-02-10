import { cn } from "@/utils";

interface HeaderProps {
  className?: string;
}

export async function Header(props: HeaderProps) {
  return <div className={cn(props.className, "")}></div>;
}
