const SingleTaskSetting = ({ task }) => {
  const { icon, text, priority } = task;
  return (
    <div className="tasks__title__setting-div">
      {priority && <div className="priority"></div>}
      <div>
        {icon} <p>{text}</p>
      </div>
    </div>
  );
};
export default SingleTaskSetting;
