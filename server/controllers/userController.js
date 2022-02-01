const uniqid = require("uniqid");
const knex = require("../knexConfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Readable } = require("stream");

module.exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  knex("users")
    .where({ email: email })
    .first()
    .then((user) => {
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);

      if (!isPasswordCorrect) return res.status(400).send("Invalid password");

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      res.json({ token });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
};

exports.getCurrentUser = (req, res) => {
  // If there is no auth header provided
  if (!req.headers.authorization) {
    return res.status(401).send("Please login");
  }
  const authToken = req.headers.authorization.split(" ")[1];

  // Verify the token
  jwt.verify(authToken, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Invalid auth token");
    }
    knex("users")
      .where({ email: decoded.email })
      .first()
      .then((user) => {
        // Respond with the user data
        delete user.password;
        res.json(user);
        // get users dog
        // knex("users")
        //   .where({ owner_id: decoded.id })
        //   .first()
        //   .then((dog) => {
        //     // Respond with the user data
        //     delete user.password;
        //     res.json(user);
        //   });
      });
  });
};

exports.getCurrentDog = (req, res) => {
  const { id } = req.params;
  console.log(id);
  knex("dogs")
    .where({ owner_id: id })
    .first()
    .then((dog) => {
      const stream = Readable.from(dog.photo_file.data.toString());
      dog.photo_file = stream;
      res.json({ dog });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
};
