import { usePomodoroContext } from "../../../../hooks/usePomodoroContext";

const SingleAudio = ({ name, music }) => {
  const { changeMusic, study_start_sound, mute } = usePomodoroContext();

  return (
    <div
      className={
        study_start_sound === music && !mute
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
