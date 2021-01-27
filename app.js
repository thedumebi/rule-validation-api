const express = require("express");

const app = express();

app.get("/", function(req, res) {
    const result = {
        message: "My Rule-Validation API",
        status: "success",
        data: {
            name: "Chiwuzoh Daniel",
            github: "@thedumebi",
            email: "chiwuzohdaniel@gmail.com",
            mobile: "08028611554",
            twitter: "@thedumebi"
        }
    }
    res.send(result);
});



let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, function() {
    console.log(`Server started successfully on port ${port}`);
});