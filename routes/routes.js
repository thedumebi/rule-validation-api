const express = require("express");
const getData = require("../controllers/dataController");
const {
  invalidJson,
  requiredFieldError,
  fieldTypeError,
  wrongDataField,
} = require("../middleware/errorMiddleware");
const ruleValidator = require("../controllers/rulesController");
const router = express.Router();

router.get("/", getData);
router.post(
  "/validate-rule",
  invalidJson,
  requiredFieldError,
  fieldTypeError,
  wrongDataField,
  ruleValidator
);

module.exports = router;
