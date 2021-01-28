const errorResponse = {
    message: "message",
    status: "error",
    data: null
};
const requestSchema = {
    rule: {},
    data: {} | "" | [],
  };

exports.invalid_json = function(req, res, next) {
    if (req.headers["content-type"] !== "application/json") {
        res.status(400).json({...errorResponse, [errorResponse.message]: "Invalid JSON payload passed."});
    }
    next();
};

exports.required_field_error = function(req, res, next) {
    Object.keys(req.body).length !== 0 && Object.keys(requestSchema).forEach((element, index) => {
        if (!Object.keys(req.body).includes(Object.keys(requestSchema)[index])) {
            res.status(400).json({...errorResponse, [errorResponse.message]: `${element} is required.`});
        }
        next()
    });
};

exports.field_type_error = function(req, res, next) {
    if (req.body.rule && typeof(req.body["rule"]) !== typeof(requestSchema["rule"])) {
        res.status(400).json({...errorResponse, [errorResponse.message]: `rule shouldqq be a|an ${typeof(requestSchema["rule"])}.`});
    }
    next();
};

exports.wrong_data_field = function(req, res, next) {
    if (!Object.keys(req.body.data).includes(req.body.rule.field)) {
        res.status(400).json({...errorResponse, [errorResponse.message]:`field ${req.body.rule.field} is missing from data.`})
    }
    next();
}

exports.successful = (req, res) => {
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
                condition_value: rule_value
            }
        }
    }
    if (rule === "eq") {
        if (rule_value === value) {
            res.status(200).json({...validateResponse});
        }
        res.status(400).json({...validateResponse, [validateResponse.status]: "error", [validateResponse.message]: `field ${field} failed validation.`});
    } else if (rule === "neq") {
        if (value !== rule_value) {
            res.status(200).json({...validateResponse});
        }
        res.status(400).json({...validateResponse, [validateResponse.status]: "error", [validateResponse.message]: `field ${field} failed validation.`});
    } else if (rule === "gt") {
        if (value > rule_value) {
            res.status(200).json({...validateResponse});
        }
        res.status(400).json({...validateResponse, [validateResponse.status]: "error", [validateResponse.message]: `field ${field} failed validation.`});
    } else if (rule === "gte") {
        if (value >= rule_value) {
            console.log("here");
            res.status(200).json({...validateResponse});
        }
        res.status(400).json({...validateResponse, [validateResponse.status]: "error"});
    } else if (rule === "contains") {
        if (value.includes(rule_value)) {
            res.status(200).json({...validateResponse});
        }
        res.status(400).json({...validateResponse, [validateResponse.status]: "error", [validateResponse.message]: `field ${field} failed validation.`});
    }
}
