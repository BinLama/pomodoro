import { BiChevronRight } from "react-icons/bi";

const SingleNavigationCusotmization = ({ id, icon, note, openOptions }) => {
  return (
    <div className="options" onClick={openOptions}>
      <div className="options-title">
        {icon}
        <p>{note}</p>
      </div>
      <div className="button">
        <BiChevronRight />
      </div>
    </div>
  );
};
export default SingleNavigationCusotmization;
