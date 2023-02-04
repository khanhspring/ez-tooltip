import React, { FC, ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { Placement, Trigger } from '../models/tooltip';
import { calculatePosition } from '../utils/tooltip-util';

type Props = {
  content: string;
  placement?: Placement;
  trigger?: Trigger;
  children: ReactElement;
}

const SPACING = 3;

const Tooltip: FC<Props> = ({ content, placement = 'bottom', trigger = 'hover', children }) => {
  const componentRef = useRef<any>(null);
  const tooltipRef = useRef<any>(null);

  const timerRef = useRef<any>(null);
  const [visible, setVisible] = useState(false);
  const [hiding, setHiding] = useState(false);

  const handleClick = useCallback(() => {
    if (trigger !== 'click') {
      return;
    }
    if (visible) {
      hide();
    } else {
      show();
    }
  }, [visible, trigger]);

  const handleClickOutside = useCallback(() => {
    hide();
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (trigger !== 'hover') {
      return;
    }
    show();
  }, [trigger]);

  const handleMouseLeave = useCallback(() => {
    if (trigger !== 'hover') {
      return;
    }
    hide();
  }, [trigger]);

  const handleResize = useCallback(() => {
    calculatePosition(placement, SPACING, componentRef?.current, tooltipRef?.current);
  }, [placement]);

  useEffect(() => {
    const refCurrent = componentRef?.current;

    if (refCurrent) {
      refCurrent.addEventListener("click", handleClick);
      refCurrent.addEventListener("mouseenter", handleMouseEnter);
      refCurrent.addEventListener("mouseleave", handleMouseLeave);

      return function cleanup() {
        refCurrent.removeEventListener("click", handleClick);
        refCurrent.removeEventListener("mouseenter", handleMouseEnter);
        refCurrent.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [componentRef, handleClick, handleMouseEnter, handleMouseLeave]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return function cleanup() {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useOutsideClick(componentRef, handleClickOutside);
  setTimeout(() => {
    calculatePosition(placement, SPACING, componentRef?.current, tooltipRef?.current);
  }, 0);

  const hide = () => {
    setHiding(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      setVisible(false);
      setHiding(false);
    }, 200)
  }

  const show = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    setVisible(true);
    setHiding(false);
  }

  return (
    <>
      {React.cloneElement(children, { ref: componentRef })}
      <div
        ref={tooltipRef}
        className={`
          ez-tooltip absolute bg-slate-900/95 text-white px-2 py-1 rounded shadow text-sm
          ${visible ? 'visible' : 'hidden'}
          ${hiding ? ' animate-fade-out' : ''}
        `}
      >
        {content}
      </div>
    </>
  );
}

export default Tooltip;
