const express = require("express");
const app = express();
const port = 3000;
const numberOfPeople = 100000;
const defaultPageSize = 10;

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

const generateName = () => {
  const n1 = [
    "Bob",
    "John",
    "Mary",
    "Jane",
    "Tom",
    "Jack",
    "Lily",
    "Linda",
    "Peter",
    "Paul",
  ];
  const n2 = [
    "Brown",
    "Smith",
    "Jones",
    "Williams",
    "Taylor",
    "Davies",
    "Evans",
    "Wilson",
    "Thomas",
  ];
  return (
    n1[getRandomInt(0, n1.length - 1)] +
    " " +
    n2[getRandomInt(0, n2.length - 1)]
  );
};

const data = Array.from(Array(numberOfPeople).keys()).map((id) => {
  return {
    id: id ,
    name: generateName(),
    age: getRandomInt(18, 65),
  };
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get("/api/users", (req, res) => {
  const metadata = {
    count: data.length,
    page: !req.query.page ? 1 : req.query.page,
    pageSize: !req.query.pageSize ? defaultPageSize : req.query.pageSize,
  };
  const start = (metadata.page - 1) * metadata.pageSize;
  const end = start + metadata.pageSize;
  const result = data.slice(start, end);

  res.json({
    metadata,
    data: result,
  });
});

app.get("/api/users/:id", (req, res) => {
  const user = data.find((u) => u.id === parseInt(req.params.id));
  res.json(user);
});

app.listen(port, () => {
  console.log(`Welfaire data serverlistening on ${port} port`);
});

