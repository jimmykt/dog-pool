const fs = require("fs");

const usersPath = "./data/usersData.json";
const dogsPath = "./data/dogsData.json";

function readUsers() {
  const dogsFile = fs.readFileSync(usersPath);
  return JSON.parse(dogsFile);
}
function writeUsers(data) {
  fs.writeFileSync(usersPath, JSON.stringify(data));
}

function readDogs() {
  const dogsFile = fs.readFileSync(dogsPath);
  return JSON.parse(dogsFile);
}
function writeDogs(data) {
  fs.writeFileSync(dogsPath, JSON.stringify(data));
}

function getAllUsers() {
  const userData = readUsers();
  return userData;
}

module.exports.getAllDogs = () => {
  const dogsData = readDogs();
  return dogsData;
};

module.exports.getUser = (email) => {
  const userData = getAllUsers();
  const found = userData.find((user) => {
    return email === user.email;
  });
  return found;
};

module.exports.getDog = (id) => {
  const dogsData = this.getAllDogs();
  console.log(id);
  const found = dogsData.find((dog) => {
    return id === dog.owner_id;
  });
  return found;
};
