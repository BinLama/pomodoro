import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

const ProfileCard = ({ showEdit }) => {
  const { username, fName, lName } = useAuthContext();

  return (
    <>
      <div className="profileCard__div--profile">
        <h2>{`${fName} ${lName}`}</h2>
        <p>{username}</p>
      </div>

      <button className="btn profileCard__btn--edit" onClick={showEdit}>
        Edit Profile
      </button>
    </>
  );
};

export default ProfileCard;
