import { useState, useEffect } from 'react';

const useClock = (timezone) => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const options = {
        timeZone: timezone && timezone !== 'default' ? timezone : 'UTC',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
      const timeString = date.toLocaleTimeString([], options);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timezone]);

  return currentTime;
};

export default useClock;
