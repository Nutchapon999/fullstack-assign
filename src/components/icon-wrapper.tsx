import { cn } from "@/lib/utils";

interface IconWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const IconWrapper = ({ children, className }: IconWrapperProps) => {
  return (
    <div className={cn("flex items-center justify-center flex-shrink-0 flex-grow-0 relative", className)}>
      <div className="grid ">
        { children }
      </div>
    </div>
  );
}