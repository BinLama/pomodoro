import { usePomodoroContext } from "../../../../hooks/usePomodoroContext";

const SingleAudio = ({ name, music }) => {
  const { changeMusic, chosenMusic, mute } = usePomodoroContext();

  return (
    <div
      className={
        chosenMusic === music && !mute
          ? "audio__selection-div selected bounce"
          : "audio__selection-div"
      }
      onClick={() => {
        changeMusic(music);
      }}
    >
      <div className="audio__selection-name">{name}</div>
    </div>
  );
};
export default SingleAudio;
