import * as React from 'react';

/**
 * @description AddStroke icon component.
 *
 * @component
 * @example
 * ```jsx
 * import { AddStroke } from '@plex-inc/icons'
 *
 * <AddStroke />
 * ```
 */
export const AddStroke = React.forwardRef<SVGSVGElement, React.HTMLAttributes<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M7.5 1V14M1 7.5H14" stroke="currentColor"/>
  </svg>
));