import { arrow, offset } from '@floating-ui/core';
import { autoUpdate } from '@floating-ui/dom';
import { Placement, useFloating } from '@floating-ui/react';
import React, { FC, ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { Trigger } from '../models/tooltip';
import Arrow from './Arrow';

type Props = {
  content: string;
  placement?: Placement;
  trigger?: Trigger;
  children: ReactElement;
  className?: string;
  arrowClassName?: string;
}

const OFFSET = 5;

const Tooltip: FC<Props> = ({ content, placement = 'bottom', trigger = 'hover', className = '', arrowClassName = '', children }) => {
  const [visible, setVisible] = useState(false);
  const [hiding, setHiding] = useState(false);
  const timerRef = useRef<any>(null);
  const arrowRef = useRef(null);

  const { x, y, strategy, refs, middlewareData } = useFloating({
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(OFFSET),
      arrow({
        element: arrowRef?.current
      })
    ]
  });

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

  const handleClickOutside = useCallback(() => {
    hide();
  }, []);

  useEffect(() => {
    const reference = refs?.domReference?.current;

    if (reference) {
      reference.addEventListener("click", handleClick);
      reference.addEventListener("mouseenter", handleMouseEnter);
      reference.addEventListener("mouseleave", handleMouseLeave);

      return function cleanup() {
        reference.removeEventListener("click", handleClick);
        reference.removeEventListener("mouseenter", handleMouseEnter);
        reference.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [refs, handleClick, handleMouseEnter, handleMouseLeave]);

  useOutsideClick(refs?.domReference, handleClickOutside);

  const show = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setHiding(false);
    setVisible(true);
  }

  const hide = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setHiding(true);
    timerRef.current = setTimeout(() => {
      setVisible(false);
      setHiding(false);
    }, 200);
  }

  return (
    <>
      {React.cloneElement(children, { ref: refs.setReference })}
      <div
        ref={refs.setFloating}
        style={{
          position: strategy,
          top: y ?? 0,
          left: x ?? 0,
          width: 'max-content',
        }}
        className={`
          ez-tooltip absolute bg-slate-900 text-white px-2 py-1 rounded shadow text-sm
          ${className}
          ${visible ? 'visible' : 'hidden'}
          ${hiding ? 'animate-fade-out' : ''}
        `}
      >
        <Arrow
          className={arrowClassName}
          placement={placement}
          ref={arrowRef}
          x={middlewareData?.arrow?.x}
          y={middlewareData?.arrow?.y}
        />
        {content}
      </div>
    </>
  );
}

export default Tooltip;
