const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const operationSchema = new Schema(
  {
    balance: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    summa: {
      type: Number,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

operationSchema.post("save", handleMongooseError);

const addOperationSchema = Joi.object({
  balance: Joi.number().required(),
  summa: Joi.number().required(),
  category: Joi.string().required(),
});

const Operation = model("operation", operationSchema);
const schemas = addOperationSchema;

module.exports = { Operation, schemas };
