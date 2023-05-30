const express = require("express");

const ctrl = require("../../controllers/operations");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/operation");

const router = express.Router();

router.get("/", authenticate, ctrl.getAllOperations);

router.get("/:id", authenticate, isValidId, ctrl.getOperationById);

router.post("/", authenticate, validateBody(schemas), ctrl.addOperation);

router.put(
  ("/:id", authenticate, isValidId, validateBody(schemas), ctrl.changeOperation)
);

router.delete("/:id", authenticate, isValidId, ctrl.deleteOperation);

module.exports = router;
