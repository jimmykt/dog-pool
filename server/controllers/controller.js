const model = require("../models/model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  const user = model.getUser(email);

  if (password === user.password) {
    const token = jwt.sign(
      {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number,
        address: user.address,
        city: user.city,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    console.log("yes");

    res.json({ token });
  } else {
    console.log("fail");
    res.status(400).json({
      email: email,
      message: "Invalid credentials",
    });
  }
};

exports.getCurrentUser = (req, res) => {};

/*



 
*/
