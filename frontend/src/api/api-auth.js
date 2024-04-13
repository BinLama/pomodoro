// import axios from "axios";

// export const authAxios = axios.create({
//   baseURL: "http://localhost:5000/api/v1/auth",
// });

// export const checkAuthentication = async () => {
//   try {
//     const response = await authAxios.get("/", {
//       withCredentials: true,
//       credentials: "include",
//     });

//     if (response.status === 200) {
//       const data = await response.data;
//       return data;
//     }
//   } catch (err) {
//     if (err.response) {
//       return err.response;
//     } else if (err.request) {
//       // request was made but no response
//       console.error(err.request);
//       return err.response;
//     } else {
//       console.error(err.message);
//       return err.message;
//     }
//   }
// };
