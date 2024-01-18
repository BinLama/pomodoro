// // this is a duplicate of /controller/user.js
// // might need to remove but I think fractoring it is better.

// const signup = async (fName, lName, email, password, username) => {
//   try {
//     // create the user
//     const user = await User.create(
//       {
//         username: username,
//         fName: fName,
//         lName: lName,
//         email: email,
//         password: password,
//         setting: {},
//         color: {},
//       },
//       {
//         include: [User.setting, User.color],
//       }
//     );

//     const newUser = Object.fromEntries(
//       Object.entries(user.dataValues).filter(([key, val]) => {
//         if (key != "password") {
//           return [key, val];
//         }
//       })
//     );

//     return newUser;
//   } catch (error) {
//     throw new Error(`Error during signup: ${error.message}`);
//   }
// };

// const login = async (usernameOrEmail, password) => {
//   try {
//     // create the user
//     const user = await User.findOne({
//       where: {
//         [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
//       },
//       attributes: ["email", "username", "id", "hashPw"],
//     });

//     if (!user) {
//       await bcrypt.compare(password, "");
//       console.log("user not found");
//       throw new Error("Please enter correct credentials");
//     }

//     // compare password with the hashed password
//     const passwordMatch = await bcrypt.compare(password, user.hashPw);

//     if (!passwordMatch) {
//       console.log("incorrect password");
//       throw new Error("Please enter correct credentials");
//     }

//     return user;
//   } catch (error) {
//     throw new Error(`Login failed: ${error.message}`);
//   }
// };
