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
        res.status(400).json({...errorResponse, message: "Invalid JSON payload passed."});
    }
    next();
};

exports.required_field_error = function(req, res, next) {
    Object.keys(req.body).length !== 0 && Object.keys(requestSchema).forEach((element, index) => {
        if (!Object.keys(req.body).includes(Object.keys(requestSchema)[index])) {
            res.status(400).json({...errorResponse, message: `${element} is required.`});
        }
        next()
    });
};

exports.field_type_error = function(req, res, next) {
    if (req.body.rule && typeof(req.body["rule"]) !== typeof(requestSchema["rule"])) {
        res.status(400).json({...errorResponse, message: `rule should be a|an ${typeof(requestSchema["rule"])}.`});
    }
    next();
};

exports.wrong_data_field = function(req, res, next) {
    if (!Object.keys(req.body.data).includes(req.body.rule.field)) {
        res.status(400).json({...errorResponse, message:`field ${req.body.rule.field} is missing from data.`})
    }
    next();
}

