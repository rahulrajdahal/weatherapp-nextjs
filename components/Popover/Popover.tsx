'use client';

import * as RadixPopover from '@radix-ui/react-popover';
import React from 'react';

/**
 * Re-export encapsulated Radix Popover primitives to adhere to the
 * project-level Radix Wrapper Policy while minimizing wrapper boilerplate.
 */
export const PopoverRoot = RadixPopover.Root;
export const PopoverTrigger = RadixPopover.Trigger;
export const PopoverAnchor = RadixPopover.Anchor;
export const PopoverPortal = RadixPopover.Portal;
export const PopoverClose = RadixPopover.Close;

export interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof RadixPopover.Content> {
  className?: string;
}

export const PopoverContent = React.forwardRef<
  React.ComponentRef<typeof RadixPopover.Content>,
  PopoverContentProps
>(({ className = '', children, ...props }, ref) => (
  <RadixPopover.Content
    ref={ref}
    className={className}
    {...props}
  >
    {children}
  </RadixPopover.Content>
));

PopoverContent.displayName = 'PopoverContent';

const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Anchor: PopoverAnchor,
  Portal: PopoverPortal,
  Content: PopoverContent,
  Close: PopoverClose,
};

export default Popover;
