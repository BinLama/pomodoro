import { getAllUsers } from "../api/api-user";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

const Report = () => {
  const { id } = useAuthContext();
  const [values, setValues] = useState({
    users: [],
  });

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const listAllUsers = async () => {
      const data = await getAllUsers(signal);
      if (data) {
        setValues({ ...values, users: data });
      }
    };

    listAllUsers();

    return () => {
      abortController.abort();
    };
  }, []);

  // Why is this not being parsed.
  return (
    <div>
      {values.users.map((user, i) => {
        console.log(user, id);
        return (
          <div key={i}>
            <p>
              Username: {user.username}
              {user.id === id && <>You are the logged in user</>}
            </p>
            <Link to={`/user/${user.id}`}>View Profile</Link>
          </div>
        );
      })}
    </div>
  );
};
export default Report;
