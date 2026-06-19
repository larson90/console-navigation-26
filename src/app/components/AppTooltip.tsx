import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

interface AppTooltipProps {
  label: string;
  children: React.ReactElement;
  side?: 'top' | 'bottom' | 'left' | 'right';
}

export function AppTooltip({ label, children, side = 'top' }: AppTooltipProps) {
  if (!label) {
    return children;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side}>{label}</TooltipContent>
    </Tooltip>
  );
}
