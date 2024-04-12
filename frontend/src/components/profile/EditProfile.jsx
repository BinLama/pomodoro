import React, { useState } from "react";
import { Line } from "../utils";
import { useAuthContext } from "../../hooks/useAuthContext";

const EditProfile = ({ hideEdit }) => {
  const { username, fName, lName, email } = useAuthContext();

  const [values, setValues] = useState({
    fName: fName,
    lName: lName,
    username: username,
    email: email,
  });

  const handleEdit = async (e) => {
    // need to send the request to the backend and then use that data to update the global context.
    e.preventDefault();
    console.log("going to update");
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div className="profileEdit">
      <form className="profileEdit__form" onSubmit={handleEdit}>
        <div className="profileEdit__form--div">
          <label htmlFor="fName">First Name</label>
          <input
            type="text"
            name="fName"
            id="fName"
            value={values.fName}
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
            value={values.lName}
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
            value={values.username}
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
            value={values.email}
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
