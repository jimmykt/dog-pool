const uniqid = require("uniqid");
const knex = require("../knexConfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
