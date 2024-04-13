import { useState } from "react";
import { Line } from "../utils";
import { updateSingleUser } from "../../api/api-user";
import { useAuthContext } from "../../hooks/useAuthContext";
import { auth } from "../../utils/constants";

const EditProfile = ({ hideEdit, user: people, setValues }) => {
  const { id, dispatch } = useAuthContext();

  const [user, setUser] = useState({
    fName: people.fName,
    lName: people.lName,
    username: people.username,
    email: people.email,
  });

  const handleEditSubmit = async (e) => {
    // need to send the request to the backend and then use that data to update the global context.
    e.preventDefault();
    console.log("going to update");
    // need to call user api
    const data = await updateSingleUser({ userId: id }, { ...user });
    if (data.user) {
      dispatch({ type: auth.LOGIN, payload: data.user });
      return hideEdit();
    }
  };

  const handleChange = (name) => (event) => {
    setUser({ ...user, [name]: event.target.value });
  };

  return (
    <div className="profileEdit">
      <form className="profileEdit__form" onSubmit={handleEditSubmit}>
        <div className="profileEdit__form--div">
          <label htmlFor="fName">First Name</label>
          <input
            type="text"
            name="fName"
            id="fName"
            value={user.fName}
            onChange={handleChange("fName")}
            placeholder="First Name"
          />
          <Line />
        </div>

        <div className="profileEdit__form--div">
          <label htmlFor="lName">Last Name</label>
          <input
            type="text"
            name="lName"
            id="lName"
            value={user.lName}
            onChange={handleChange("lName")}
            placeholder="Last Name"
          />
          <Line />
        </div>
        <div className="profileEdit__form--div">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={user.username}
            onChange={handleChange("username")}
            placeholder="username"
          />
          <Line />
        </div>

        <div className="profileEdit__form--div">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            value={user.email}
            onChange={handleChange("email")}
            placeholder="name@example.com"
          />
          <Line />
        </div>
        <div className="editProfile__div--buttons">
          <button type="submit" className="btn profileEdit__form--update">
            Update
          </button>
          <button className="btn profileEdit__form--cancel" onClick={hideEdit}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
