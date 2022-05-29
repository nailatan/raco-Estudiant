const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const server = new express();

const PORT = 1234;

server.use(cors());
server.use(morgan("dev"));
server.use(express.json());

server.get("/", (req, res) => {
  res.send("hola");
});

server.listen(PORT, () => console.log(`Server is live in port ${PORT}`));
