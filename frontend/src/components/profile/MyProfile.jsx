import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { BiSolidPencil } from "react-icons/bi";
import EditProfile from "./EditProfile";
import ProfileCard from "./ProfileCard";
import { useParams } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth-helper";
import { useAuthContext } from "../../hooks/useAuthContext";
import { getSingleUser } from "../../api/api-user";

const MyProfile = () => {
  const { userId } = useParams();
  const { id } = useAuthContext();

  const [values, setValues] = useState({
    allowed: false,
    editProfile: false,
    user: {
      fName: "",
      lName: "",
      email: "",
      username: "",
    },
  });

  const showEdit = () => {
    setValues({ ...values, editProfile: true });
  };

  const hideEdit = () => {
    setValues({ ...values, editProfile: false });
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const getCurrentUser = async () => {
      try {
        const data = await getSingleUser({ userId: userId }, signal);

        setValues({
          ...values,
          user: data.user,
          allowed: isAuthenticated(id, userId),
        });
      } catch (error) {
        console.log(error);
      }
    };

    getCurrentUser();

    return () => {
      abortController.abort();
    };
  }, [userId, id, values.editProfile]);

  return (
    <section className="profileCard">
      <div className="profileCard__div--container">
        <div className="profileCard__div">
          <div className="profileCard__div--img relative">
            <FaUserCircle />
            {values.allowed && (
              <div className="profileCard__div--edit absolute">
                <BiSolidPencil />
              </div>
            )}
          </div>
          <div className="profileCard__div--info">
            {!values.editProfile ? (
              <ProfileCard showEdit={showEdit} {...values} />
            ) : (
              <EditProfile
                hideEdit={hideEdit}
                setValues={setValues}
                {...values}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProfile;
