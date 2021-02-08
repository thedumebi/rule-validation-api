const ruleValidator = async (req, res) => {
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
};

module.exports = ruleValidator;
