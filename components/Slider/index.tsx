import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-orange-200">
      <SliderPrimitive.Range className="absolute h-full bg-orange-600" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className="cursor-pointer block h-5 w-5 rounded-full bg-orange-600 transition-colors focus-visible:outline-none hover:bg-orange-700 disabled:pointer-events-none disabled:opacity-50"
    />
    <SliderPrimitive.Thumb
      className="cursor-pointer block h-5 w-5 rounded-full bg-orange-600 transition-colors focus-visible:outline-none hover:bg-orange-700 disabled:pointer-events-none disabled:opacity-50"
    />
    
  </SliderPrimitive.Root>
));

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };