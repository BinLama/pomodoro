import { useEffect, useRef, useState } from "react";

const useCountdown = (onDone, initialTimeInSecond) => {
  const [timeLeft, setTimeLeft] = useState();
  const timeLeftRef = useRef(initialTimeInSecond);

  useEffect(() => {
    const interval = setInterval(() => {
      const newPrevTime = timeLeftRef.current - 1;

      if (newPrevTime <= 0) {
        onDone();
        clearInterval(interval);
        setTimeLeft(0);
      } else {
        timeLeftRef.current -= 1;
        setTimeLeft(newPrevTime);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return { secondsLeft: timeLeft };
};

function App() {
  const { secondsLeft } = useCountdown(() => {
    console.log("Done");
  }, 5);

  // useCountdown takes in funciton and time in seconds
  return <div>{secondsLeft}</div>;
}
