import { BiChevronRight } from "react-icons/bi";

const SingleNavigationCusotmization = ({ icon, note, type, openOptions }) => {
  return (
    <div
      className="options"
      onClick={() => {
        openOptions({ type: `show ${type}` });
      }}
    >
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
