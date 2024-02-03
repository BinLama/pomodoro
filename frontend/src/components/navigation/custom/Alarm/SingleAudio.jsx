import { usePomodoroContext } from "../../../../hooks/usePomodoroContext";

const SingleAudio = ({ name, music }) => {
  const { changeMusic, studyStartSound, mute } = usePomodoroContext();

  return (
    <div
      className={
        studyStartSound === music && !mute
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
