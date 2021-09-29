import { useState, useEffect } from 'react';
import { timeFormat } from 'd3-time-format';

const oneMinute = 1000 * 60;

const formatTime = timeFormat('%H:%M %p');

export const LocationTime = () => {
  const [now, setNow] = useState(new Date());

  // Update now each minute.
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, oneMinute);
    return () => clearInterval(interval);
  }, []);

  return formatTime(now);
};
