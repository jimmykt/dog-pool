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
