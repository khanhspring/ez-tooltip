import { Placement } from '@floating-ui/react';
import React from 'react';

type Props = {
  placement?: Placement;
  className?: string;
  x?: number;
  y?: number;
}

const OFFSET = 5;

const Arrow = React.forwardRef<HTMLDivElement, Props>(({ placement = 'bottom', className = '', x, y }, ref) => {

  return (
    <>
      {
        ['top', 'top-end', 'top-start'].includes(placement) &&
        <div
          ref={ref}
          className={`absolute h-0 w-0 border-x-[5px] !border-x-transparent border-t-[6px] border-slate-900 ${className}`}
          style={{
            bottom: y ?? 0 - OFFSET,
            left: x ?? 0,
          }}
        ></div>
      }
      {
        ['bottom', 'bottom-end', 'bottom-start'].includes(placement) &&
        <div
          ref={ref}
          className={`absolute h-0 w-0 border-x-[5px] !border-x-transparent border-b-[6px] border-slate-900 ${className}`}
          style={{
            top: y ?? 0 - OFFSET,
            left: x ?? 0,
          }}
        ></div>
      }
      {
        ['left', 'left-end', 'left-start'].includes(placement) &&
        <div
          ref={ref}
          className={`absolute h-0 w-0 border-y-[5px] !border-y-transparent border-l-[6px] border-slate-900 ${className}`}
          style={{
            top: y ?? 0,
            right: x ?? 0 - OFFSET,
          }}
        ></div>
      }
      {
        ['right', 'right-end', 'right-start'].includes(placement) &&
        <div
          ref={ref}
          className={`absolute h-0 w-0 border-y-[5px] !border-y-transparent border-r-[6px] border-slate-900 ${className}`}
          style={{
            top: y ?? 0,
            left: x ?? 0 - OFFSET,
          }}
        ></div>
      }
    </>
  );
});

export default Arrow;
