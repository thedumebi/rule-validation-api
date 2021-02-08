const getData = async (req, res) => {
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

  res.status(200).json(result);
};

module.exports = getData;
