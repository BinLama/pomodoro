import { useEffect, useState } from "react";
import { usePomodoroContext } from "../../../../hooks/usePomodoroContext";
import SingleSlider from "../../SingleSlider";

const CustomSession = () => {
  const { setSessionData, maxSession } = usePomodoroContext();

  const [session, setSession] = useState({
    maxSession: maxSession,
  });

  useEffect(() => {
    if (maxSession === session.maxSession) return;
    setSessionData(session.maxSession);
    console.log("changed session");
  }, [session]);

  return (
    <div className="custom__session-options">
      <div className="slider">
        <SingleSlider
          type="maxSession"
          min={1}
          max={10}
          sliderData={session.maxSession}
          setSliderData={setSession}
          level={true}
        />
      </div>
    </div>
  );
};
export default CustomSession;
