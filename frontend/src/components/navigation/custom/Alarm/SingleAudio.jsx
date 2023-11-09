import { AiFillClockCircle, AiFillRest } from "react-icons/ai";
import { usePomodoroContext } from "../../../../hooks/usePomodoroContext";

const SingleAudio = ({ name, music }) => {
  const { play, setMute, mute } = usePomodoroContext();
  return (
    <div
      className="audio__selection-div"
      onClick={() => {
        if (mute) setMute(false);
        play(music);
      }}
    >
      <div className="audio__selection-name">{name}</div>
    </div>
  );
};
export default SingleAudio;
