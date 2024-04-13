import React from "react";

const ProfileCard = ({ showEdit, user, allowed }) => {
  return (
    <>
      <div className="profileCard__div--profile">
        <h2>{`${user.fName} ${user.lName}`}</h2>
        <p>{user.username}</p>
      </div>
      {allowed && (
        <button className="btn profileCard__btn--edit" onClick={showEdit}>
          Edit Profile
        </button>
      )}
    </>
  );
};

export default ProfileCard;
