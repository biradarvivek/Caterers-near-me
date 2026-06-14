const Caterer = require("../models/Caterer");

const getAllCaterers = async (req, res) => {
  try {
    const { search, maxPrice, sort } = req.query;

    const filter = {};

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (maxPrice) {
      filter.pricePerPlate = {
        $lte: Number(maxPrice),
      };
    }

    let query = Caterer.find(filter);

    if (sort === "priceLow") {
      query = query.sort({ pricePerPlate: 1 });
    }

    if (sort === "priceHigh") {
      query = query.sort({ pricePerPlate: -1 });
    }

    if (sort === "rating") {
      query = query.sort({ rating: -1 });
    }

    const caterers = await query;

    res.status(200).json(caterers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getCatererById = async (req, res) => {
  try {
    const caterer = await Caterer.findById(req.params.id);

    if (!caterer) {
      return res.status(404).json({
        message: "Caterer not found",
      });
    }

    res.status(200).json(caterer);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createCaterer = async (req, res) => {
  try {
    const { name, location, pricePerPlate, cuisines, rating } = req.body;

    if (!name || !location || !pricePerPlate || !cuisines || !rating) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const caterer = await Caterer.create({
      name,
      location,
      pricePerPlate,
      cuisines,
      rating,
    });

    res.status(201).json(caterer);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllCaterers,
  getCatererById,
  createCaterer,
};
