const SingleTask = ({ task }) => {
  const { icon, text, priority } = task;
  return (
    <div className="tasks__title__setting-div">
      {priority && <div className="priority"></div>}
      {icon} <p>{text}</p>
    </div>
  );
};
export default SingleTask;
