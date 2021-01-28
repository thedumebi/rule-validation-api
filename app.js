const express = require("express");
const { required_field_error, field_type_error, invalid_json, wrong_data_field, start, successful } = require("./errors");

const app = express();

app.use(express.json());

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

app.post("/validate-rule",invalid_json, required_field_error, field_type_error, wrong_data_field, function (req, res) {
  const info = req.body;
  successful(req, res);
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function () {
  console.log(`Server started successfully on port ${port}`);
});
