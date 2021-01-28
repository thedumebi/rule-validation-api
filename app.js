const express = require("express");
const {
  required_field_error,
  field_type_error,
  invalid_json,
  wrong_data_field,
} = require("./errors");

const app = express();

app.use(express.json({
    verify: (req, res, buf, encoding) => {
        try {
            JSON.parse(buf);
        } catch (error) {
            res.status(400).json({
                message: "Invalid JSON payload passed.",
                status: "error",
                data: null
            });
            throw Error("Invalid JSON payload passed.")
        }
    }
}));

app.get("/", function (req, res) {
  const result = {
    message: "My Rule-Validation API",
    status: "success",
    data: {
      name: "Chiwuzoh Daniel",
      github: "@thedumebi",
      email: "chiwuzohdaniel@gmail.com",
      mobile: "08028611554",
      twitter: "@thedumebi",
    },
  };
  res.send(result);
});

app.post(
  "/validate-rule",
  invalid_json,
  required_field_error,
  field_type_error,
  wrong_data_field,
  function (req, res) {
    const info = req.body;
    const field = info.rule.field;
    const value = info.data[info.rule.field];
    const rule = info.rule.condition;
    const rule_value = info.rule.condition_value;
    const validateResponse = {
      message: `field ${field} successfully validated.`,
      status: "success",
      data: {
        validation: {
          error: false,
          field: field,
          field_value: value,
          condition: rule,
          condition_value: rule_value,
        },
      },
    };
    if (value && rule === "eq") {
      if (rule_value === value) {
        res.status(200).json({ ...validateResponse });
      } else {
        res.status(400).json({
          ...validateResponse,
          status: "error",
          message: `field ${field} failed validation.`,
          data: {
            ...validateResponse.data,
            validation: { ...validateResponse.data.validation, error: true },
          },
        });
      }
    } else if (value && rule === "neq") {
      if (value !== rule_value) {
        res.status(200).json({ ...validateResponse });
      } else {
        res.status(400).json({
          ...validateResponse,
          status: "error",
          message: `field ${field} failed validation.`,
          data: {
            ...validateResponse.data,
            validation: { ...validateResponse.data.validation, error: true },
          },
        });
      }
    } else if (value && rule === "gt") {
      if (value > rule_value) {
        res.status(200).json({ ...validateResponse });
      } else {
        res.status(400).json({
          ...validateResponse,
          status: "error",
          message: `field ${field} failed validation.`,
          data: {
            ...validateResponse.data,
            validation: { ...validateResponse.data.validation, error: true },
          },
        });
      }
    } else if (value && rule === "gte") {
      if (value >= rule_value) {
        res.status(200).json({ ...validateResponse });
      } else {
        res.status(400).json({
          ...validateResponse,
          status: "error",
          message: `field ${field} failed validation.`,
          data: {
            ...validateResponse.data,
            validation: { ...validateResponse.data.validation, error: true },
          },
        });
      }
    } else if (value && rule === "contains") {
      if (value.includes(rule_value)) {
        res.status(200).json({ ...validateResponse });
      } else {
        res.status(400).json({
          ...validateResponse,
          status: "error",
          message: `field ${field} failed validation.`,
          data: {
            ...validateResponse.data,
            validation: { ...validateResponse.data.validation, error: true },
          },
        });
      }
    }
  }
);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function () {
  console.log(`Server started successfully on port ${port}`);
});
