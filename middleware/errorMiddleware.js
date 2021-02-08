const errorResponse = {
  message: "message",
  status: "error",
  data: null,
};

const requestSchema = {
  rule: Object,
  data: Object ? Object : Array ? Array : String,
};

exports.invalidJson = function (req, res, next) {
  if (req.headers["content-type"] !== "application/json") {
    res
      .status(400)
      .json({ ...errorResponse, message: "Invalid JSON payload passed." });
  } else {
    next();
  }
};

exports.requiredFieldError = function (req, res, next) {
  Object.keys(req.body).length !== 0 &&
    Object.keys(requestSchema).forEach((element, index) => {
      if (!Object.keys(req.body).includes(Object.keys(requestSchema)[index])) {
        res
          .status(400)
          .json({ ...errorResponse, message: `${element} is required.` });
      } else {
        next();
      }
    });
};

exports.fieldTypeError = function (req, res, next) {
  if (
    req.body.rule &&
    Object.getPrototypeOf(req.body.rule) !== Object.prototype
  ) {
    res.status(400).json({
      ...errorResponse,
      message: `rule should be an ${typeof requestSchema.rule()}.`,
    });
  } else {
    next();
  }
};

exports.wrongDataField = function (req, res, next) {
  if (
    req.body.rule.field &&
    !Object.keys(req.body.data).includes(req.body.rule.field)
  ) {
    res.status(400).json({
      ...errorResponse,
      message: `field ${req.body.rule.field} is missing from data.`,
    });
  } else {
    next();
  }
};