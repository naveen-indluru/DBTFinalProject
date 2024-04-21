import asyncHandler from "../middlewares/asyncHandler.js";

import Genre from "../models/genreModel.js";

const getGenres = asyncHandler(async (req, res) => {
  const genres = await Genre.find({});
  res.json(genres);
});

export { getGenres };
