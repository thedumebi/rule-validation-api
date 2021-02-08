const express = require("express");
const routes = require("./routes/routes");

const app = express();

app.use(
  express.json({
    verify: (req, res, buf, encoding) => {
      try {
        JSON.parse(buf);
      } catch (error) {
        res.status(400).json({
          message: "Invalid JSON payload passed.",
          status: "error",
          data: null,
        });
        throw Error("Invalid JSON payload passed.");
      }
    },
  })
);

app.use("", routes);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function () {
  console.log(`Server started successfully on port ${port}`);
});
