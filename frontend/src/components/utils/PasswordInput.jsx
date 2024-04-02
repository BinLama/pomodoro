import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { Line } from "../utils";

const PasswordInput = ({
  classes,
  handleChange,
  values,
  isLoading,
  name,
  confirm,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`${classes} password`}>
      <label htmlFor={name}>{confirm ? "confirm password" : "PASSWORD"}</label>
      {/* <div className="password"> */}
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        id={name}
        value={values[name]}
        onChange={handleChange(name)}
        placeholder="Password"
        disabled={isLoading}
      />
      <span
        className="password__span"
        onClick={() => {
          setShowPassword(!showPassword);
        }}
      >
        {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
      </span>
      <Line />
    </div>
  );
};

export default PasswordInput;
