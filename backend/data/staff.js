import bcrypt from "bcryptjs";

const staff = [
  {
    firstname: "admin",
    lastname: "user",
    email: "admin@gmail.com",
    ssn: "12345678",
    role: "admin",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    firstname: "staff",
    lastname: "user",
    email: "staff@gmail.com",
    ssn: "12345679",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default staff;
