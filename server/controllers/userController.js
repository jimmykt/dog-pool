//const model = require("../models/model");
const uniqid = require("uniqid");
const knex = require("../knexConfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const addNewUser = (req, res) => {
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

  console.log(hashedPassword);
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
    .catch(() => {
      console.log("no reg"); //
      res.status(400).send("Failed registration");
    });
};

const addDog = (req, res) => {
  const { dog_name, birthday, dog_info } = req.body;

  const newDog = {
    ...req.body,
    owner_id: 1,
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

module.exports = {
  addNewUser,
  addDog,
};
