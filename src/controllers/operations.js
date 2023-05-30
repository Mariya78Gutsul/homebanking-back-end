const { Operation } = require("../models/operation");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAllOperations = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Operation.find({ owner }, "-createAt -updateAt", {
    skip,
    limit,
  }).populate("owner", "name, email");
  res.json(result);
};

const getOperationById = async (req, res) => {
  const { id } = req.params;
  const result = await Operation.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addOperation = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Operation.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deleteOperation = async (req, res) => {
  const { id } = req.params;
  const result = await Operation.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json({ message: "Operation deleted" });
};

const changeOperation = async (req, res) => {
  if (!Object.keys(req.body).length) {
    throw HttpError(400, "missing fields");
  }
  const { id } = req.params;
  const result = await Operation.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = {
  getAllOperations: ctrlWrapper(getAllOperations),
  getOperationById: ctrlWrapper(getOperationById),
  addOperation: ctrlWrapper(addOperation),
  deleteOperation: ctrlWrapper(deleteOperation),
  changeOperation: ctrlWrapper(changeOperation),
};
