"use client";
import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer";

interface AnimatedNumberProps {
  number: number;
  preSymbol: string;
  postSymbol: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  number,
  preSymbol,
  postSymbol,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const [targetNumber, setTargetNumber] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (inView && isMounted) {
      timeoutId = setTimeout(() => {
        setTargetNumber(number);
      }, 400);
    } else {
      setTargetNumber(0);
    }

    return () => clearTimeout(timeoutId);
  }, [inView, number, isMounted]);

  const props = useSpring({
    from: { val: 0 },
    to: { val: targetNumber },
    config: { tension: 200, friction: 30 },
  });

  if (!isMounted) {
    return null;
  }

  return (
    <animated.div ref={ref}>
      {props.val.interpolate((val) => preSymbol + Math.floor(val) + postSymbol)}
    </animated.div>
  );
};

export default AnimatedNumber;
