const usersData = require("../seed_data/users");
const dogsData = require("../seed_data/dogs");

exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert(usersData);
    })
    .then(() => {
      return knex("dogs").del();
    })
    .then(() => {
      return knex("dogs").insert(dogsData);
    });
};
