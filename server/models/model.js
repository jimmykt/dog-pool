const fs = require("fs");

const usersPath = "./data/usersData.json";
const dogsPath = "./data/dogsData.json";
const poolPath = "./data/poolData.json";

// users
function readUsers() {
  const dogsFile = fs.readFileSync(usersPath);
  return JSON.parse(dogsFile);
}
function writeUsers(data) {
  fs.writeFileSync(usersPath, JSON.stringify(data));
}

// dogs
function readDogs() {
  const dogsFile = fs.readFileSync(dogsPath);
  return JSON.parse(dogsFile);
}
function writeDogs(data) {
  fs.writeFileSync(dogsPath, JSON.stringify(data));
}

// pool
function readPool() {
  const poolFile = fs.readFileSync(poolPath);
  return JSON.parse(poolFile);
}
function writePool(data) {
  fs.writeFileSync(poolPath, JSON.stringify(data));
}

function getAllUsers() {
  const userData = readUsers();
  return userData;
}

function getAllDogs() {
  const dogsData = readDogs();
  return dogsData;
}

module.exports.getUser = (email) => {
  const userData = getAllUsers();
  const found = userData.find((user) => {
    return email === user.email;
  });
  return found;
};

module.exports.getDog = (id) => {
  const dogsData = getAllDogs();
  console.log(id);
  const found = dogsData.find((dog) => {
    return id === dog.owner_id;
  });
  return found;
};

module.exports.addToPool = (add) => {
  const poolData = readPool();
  poolData.push(add);

  writePool(poolData);
};

module.exports.removeFromPool = (remove) => {
  const poolData = readPool();
  console.log(poolData);
  const filteredOut = poolData.filter((object) => object.dog_id != remove.id);
  writePool(filteredOut);
  return remove;
};

module.exports.getAllPool = () => {
  const poolData = readPool();
  return poolData;
};
