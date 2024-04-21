import asyncHandler from "../middlewares/asyncHandler.js";
import Staff from "../models/staffModel.js";
import jwt from "jsonwebtoken";
const loginStaff = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const staff = await Staff.findOne({ email });

  if (staff && (await staff.checkPassword(password))) {
    const token = jwt.sign(
      { userID: staff._id, role: staff.role },
      process.env.SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
      sameSite: "strict", // Prevent CSRF attacks
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.json({
      _id: staff._id,
      firstname: staff.firstname,
      lastname: staff.lastname,
      email: staff.email,
      role: staff.role,
      ssn: staff.ssn,
      token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or password!");
  }
});

const logoutStaff = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "logout staff" });
});

const registerStaff = asyncHandler(async (req, res) => {
  // const { firstname, lastname, email, password } = req.body;

  // const userExists = await Staff.findOne({ email });

  // if (userExists) {
  //   res.status(400);
  //   throw new Error("Staff already exists");
  // } else {

  // }

  const staff = await Staff.create({
    firstname: "first name",
    lastname: "last name",
    email: "staff12343@gmail.com",
    password: "123456",
    role: "delivery",
    ssn: "123456",
  });
  res.status(201).json({
    _id: staff._id,
    firstname: staff.firstname,
    lastname: staff.lastname,
    email: staff.email,
    role: "delivery",
  });
});

const getStaff = asyncHandler(async (req, res) => {
  const staff = await Staff.find({});
  res.status(200).json(staff);
});

const getStaffById = asyncHandler(async (req, res) => {
  const staff = await Staff.findById(req.params.id).select("-password");
  res.status(200).json(staff);
});

const deleteStaff = asyncHandler(async (req, res) => {
  const staff = await Staff.findById(req.params.id);
  if (staff) {
    if (staff.role === "admin") {
      res.status(400);
      throw new Error("Cannot deleteStaff");
    }
    await Staff.deleteOne({ _id: staff._id });
    res.status(200).json({ message: "Staff deleted " });
  } else {
    res.status(404);
    throw new Error("Cannot find Staff");
  }
});

const updateStaff = asyncHandler(async (req, res) => {
  const staff = await Staff.findById(req.params.id);

  if (staff) {
    staff.firstname = req.body.firstname || staff.firstname;
    staff.lastname = req.body.lastname || staff.lastname;
    staff.email = req.body.email || staff.email;

    const updateStaff = await staff.save();
    res.status(200).json({
      _id: updateStaff._id,
      firstname: updateStaff.firstname,
      lastname: updateStaff.lastname,
      email: updateStaff.email,
    });
  } else {
    res.status(404);
    throw new Error("Cannot find Staff");
  }
});

const updateStaffProfile = asyncHandler(async (req, res) => {
  const user = await Staff.findById(req.params.id);

  if (user) {
    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.email = req.body.email || user.email;
    user.ssn = req.body.ssn || user.ssn;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
      email: updatedUser.email,
      role: updatedUser.role,
      ssn: updatedUser.ssn,
      token: req.body.token,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  loginStaff,
  logoutStaff,
  getStaff,
  getStaffById,
  updateStaffProfile,
  updateStaff,
  registerStaff,
  deleteStaff,
};
