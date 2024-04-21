import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import users from "./data/users.js";
import books from "./data/books.js";
import staff from "./data/staff.js";
import genres from "./data/genres.js";
import User from "./models/userModel.js";
import Book from "./models/bookModel.js";
import Genre from "./models/genreModel.js";
import Staff from "./models/staffModel.js";

dotenv.config();

await connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Book.deleteMany();
    await Genre.deleteMany();
    await Staff.deleteMany();

    const createdGenres = await Genre.insertMany(genres);
    await User.insertMany(users);

    const createdStaff = await Staff.insertMany(staff);

    const adminStaff = createdStaff[0]._id;

    const sampleBooks = books.map((book) => {
      return { ...book, createdBy: adminStaff, genre: createdGenres[0]._id };
    });

    await Book.insertMany(sampleBooks);

    console.log("---DATA HAS BEEN IMPORTED---");
    process.exit();
  } catch (error) {
    console.log("---IMPORT FAILED---");
    console.log(`ERROR:${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Book.deleteMany();
    await Genre.deleteMany();
    await Staff.deleteMany();
    console.log("---DATA HAS BEEN DESTROYED---");
    process.exit();
  } catch (error) {
    console.log("---DESTROY FAILED---");
    console.log(`ERROR:${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
