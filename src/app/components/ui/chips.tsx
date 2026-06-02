import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const chipsVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full border text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        neutral: "border-[#ccd0db] bg-[#f7f8fb] text-[#666b7b] hover:bg-[#eeeff3]",
      },
      size: {
        xs: "h-6 gap-1 px-2 text-[11px] leading-[14px] font-semibold",
        sm: "h-8 gap-1.5 px-3 text-xs leading-4 font-semibold",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "sm",
    },
  },
);

function Chips({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof chipsVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="chips"
      className={cn(chipsVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Chips, chipsVariants };
