//const model = require("../models/model");
const uniqid = require("uniqid");
const knex = require("../knexConfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.addNewUser = (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    phone_number,
    address,
    city,
  } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = {
    ...req.body,
    password: hashedPassword,
  };

  knex("users")
    .insert(newUser)
    .then(() => {
      console.log("work"); //
      res.status(201).send("Registered successfully");
    })
    .catch((error) => {
      console.log("no reg"); //
      console.log(error); //

      res.status(400).send("Failed registration");
    });
};

exports.addDog = (req, res) => {
  const newDog = {
    ...req.body,
  };

  knex("dogs")
    .insert(newDog)
    .then(() => {
      console.log("work"); //
      res.status(201).send("Registered successfully");
    })
    .catch((err) => {
      console.log("no cant"); //
      console.log(err); //

      res.status(400).send("Failed registration");
    });
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Please enter the required fields.");
  }
  knex("users")
    .where({ email: email })
    .first()
    .then((user) => {
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);

      if (!isPasswordCorrect) return res.status(400).send("Invalid password");

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
      res.json({ token });
    })
    .catch((err) => {
      console.log("whyyyy??");
      console.log(err);
      res.status(400).send("Invalid credentials");
    });
};

exports.getId = (req, res) => {
  const { email } = req.params;

  // Find the user
  knex("users")
    .where({ email: email })
    .first()
    .then((user) => {
      const data = { id: user.id, email: user.email };

      res.json({ data });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  // If any fields are missing, return
  if (!email || !password) {
    return res.status(400).send("Please enter the required fields.");
  }

  // Find the user
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
      res.status(400).send("Invalid credentials");
    });
};

exports.getCurrentUser = (req, res) => {
  // If there is no auth header provided
  if (!req.headers.authorization) {
    return res.status(401).send("Please login");
  }

  // Parse the Bearer token
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
      });
  });
};

exports.getUserDog = (req, res) => {
  const { id } = req.params;
  console.log(id);

  knex("dogs")
    .where({ owner_id: id })
    .first()
    .then((dog) => {
      res.json(dog);
    });
};
