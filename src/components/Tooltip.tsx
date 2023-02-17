import { arrow, offset } from '@floating-ui/core';
import { autoUpdate } from '@floating-ui/dom';
import { Placement, useFloating } from '@floating-ui/react';
import React, { FC, ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { Trigger } from '../models/tooltip';
import Arrow from './Arrow';

type Props = {
  content: string | ReactElement;
  placement?: Placement;
  trigger?: Trigger;
  children: ReactElement;
  className?: string;
  arrowClassName?: string;
  spacing?: number;
  hideArrow?: boolean;
  openDelay?: boolean | number;
  closeDelay?: boolean;
  clickToClose?: boolean; // only for trigger is hover
}

const OFFSET = 5;

const Tooltip: FC<Props> = ({
  content,
  placement = 'bottom',
  trigger = 'hover',
  className = '',
  arrowClassName = '',
  spacing = 0,
  hideArrow = false,
  openDelay = false,
  closeDelay = true,
  clickToClose = false,
  children
}) => {
  const [visible, setVisible] = useState(false);
  const [hiding, setHiding] = useState(false);
  const closeTimerRef = useRef<any>(null);
  const openTimerRef = useRef<any>(null);
  const arrowRef = useRef(null);

  const { x, y, strategy, refs, middlewareData } = useFloating({
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(OFFSET + spacing),
      arrow({
        element: arrowRef?.current
      })
    ]
  });

  const handleClick = useCallback(() => {
    if (trigger === 'hover') {
      hide();
    }

    if (trigger === 'click') {
      if (visible) {
        hide();
      } else {
        show();
      }
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
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
    }

    let delay = 0;
    if (typeof openDelay === 'boolean') {
      delay = 300;
    } else if (typeof openDelay === 'number') {
      delay = openDelay;
    }

    setHiding(false);
    openTimerRef.current = setTimeout(() => {
      setVisible(true);
    }, delay);
  }

  const hide = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
    }
    setHiding(true);
    closeTimerRef.current = setTimeout(() => {
      setVisible(false);
      setHiding(false);
    }, closeDelay ? 200 : 0);
  }

  const tooltip = (
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
      {
        !hideArrow &&
        <Arrow
          className={arrowClassName}
          placement={placement}
          ref={arrowRef}
          x={middlewareData?.arrow?.x}
          y={middlewareData?.arrow?.y}
        />
      }
      {content}
    </div>
  );

  return (
    <>
      {React.cloneElement(children, { ref: refs.setReference })}
      {createPortal(tooltip, document.body)}
    </>
  );
}

export default Tooltip;
