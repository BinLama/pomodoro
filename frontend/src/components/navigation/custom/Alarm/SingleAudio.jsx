import { usePomodoroContext } from "../../../../hooks/usePomodoroContext";

const SingleAudio = ({ name, music }) => {
  const { changeMusic } = usePomodoroContext();
  return (
    <div
      className="audio__selection-div"
      onClick={() => {
        changeMusic(music);
      }}
    >
      <div className="audio__selection-name">{name}</div>
    </div>
  );
};
export default SingleAudio;
