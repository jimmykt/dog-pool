//const model = require("../models/model");
const uniqid = require("uniqid");
const knex = require("../knexConfig");

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

  const newUser = {
    first_name,
    last_name,
    email,
    password,
    phone_number,
    address,
    city,
  };

  knex("users")
    .insert(newUser)
    .then(() => {
      console.log("work");
      res.status(201).send("Registered successfully");
    })
    .catch(() => {
      console.log("no reg");

      res.status(400).send("Failed registration");
    });
};

module.exports = {
  addNewUser,
};

/*

CREATE TABLE `dog_pool`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `phone_number` VARCHAR(45) NOT NULL,
  `address` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `dog_name` VARCHAR(45) NOT NULL,
  `dog_info` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));


*/
