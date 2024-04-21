import bcrypt from "bcryptjs";

const users = [
  {
    firstname: "john",
    lastname: "user",
    email: "john@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    role: "user",
  },

  {
    firstname: "normal",
    lastname: "user",
    email: "user@gmail.com",
    ssn: "12345678",
    password: bcrypt.hashSync("123456", 10),
    role: "user",
  },
];

export default users;
