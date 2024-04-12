import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { BiSolidPencil } from "react-icons/bi";
import EditProfile from "./EditProfile";
import ProfileCard from "./ProfileCard";

const MyProfile = () => {
  const [editProfile, setEditProfile] = useState(false);

  const showEdit = () => {
    setEditProfile(true);
  };

  const hideEdit = () => {
    setEditProfile(false);
  };

  return (
    <section className="profileCard">
      <div className="profileCard__div--container">
        <div className="profileCard__div">
          <div className="profileCard__div--img relative">
            <FaUserCircle />
            <div className="profileCard__div--edit absolute">
              <BiSolidPencil />
            </div>
          </div>
          <div className="profileCard__div--info">
            {!editProfile ? (
              <ProfileCard showEdit={showEdit} />
            ) : (
              <EditProfile hideEdit={hideEdit} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProfile;
