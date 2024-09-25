import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-md h-8 text-[#35352f80] bg-[#F7F7F5] dark:bg-[#ffffff0e] border-[1.5px]",
          "border-[#E0E0DE] dark:border-[#ffffff13] hover:ring-0 placeholder:text-[#b0b0ae] dark:placeholder:text-[#707070]",
          "shadow-none px-3 dark:text-[#707070] text-[#37352f] focus-visible:outline-none",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
