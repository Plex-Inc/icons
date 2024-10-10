import * as React from 'react';

/**
 * @description AddFill icon component.
 *
 * @component
 * @example
 * ```jsx
 * import { AddFill } from '@plex-inc/icons'
 *
 * <AddFill />
 * ```
 */
export const AddFill = React.forwardRef<SVGSVGElement, React.HTMLAttributes<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M7 7V1H8V7H14V8H8V14H7V8H1V7H7Z" fill="currentColor"/>
  </svg>
));