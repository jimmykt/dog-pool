const model = require("../models/model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const uniqid = require("uniqid");

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

module.exports.getCurrentUser = (req, res) => {
  // If there is no auth header provided
  if (!req.headers.authorization) {
    return res.status(401).send("Please login");
  }

  // Parse the Bearer token
  const authToken = req.headers.authorization.split(" ")[1];

  // Verify the token
  jwt.verify(authToken, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid auth token");
    }

    const user = model.getUser(decoded.email);
    const dog = model.getDog(user.id);

    res.json({
      user: user,
      dog: dog,
    });
  });
};

module.exports.addToPool = (req, res) => {
  const add = ({
    owner_id,
    dog_name,
    photo,
    first_name,
    last_name,
    email,
    phone_number,
    address,
    city,
  } = req.body);
  model.addToPool(add);
  res.json(add);
};

module.exports.removeFromPool = (req, res) => {
  const idToDelete = req.params;
  model.removeFromPool(idToDelete);
  res.json("Deleted");
};

module.exports.getAllPool = (req, res) => {
  const poolData = model.getAllPool();

  res.json(poolData);
};
