const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const server = new express();
const studentRouter = require("./resources/student/student-router");
const diaryRouter = require("./resources/diary/diary-router");
const diaryMongoRouter = require("./resources/diary-mongo/diary-mongo-router");
const dbMongo = require("./db-mongo");
const PORT = 1234;

server.use(cors());
server.use(morgan("dev"));
server.use(express.json());

server.use("/api/student", studentRouter);
server.use("/api/diary", diaryRouter);
server.use("/api/mongo/diary", diaryMongoRouter);

server.get("/", (req, res) => {
  res.send("hola");
});

const connect = async () => {
  await dbMongo.connect();
  server.listen(PORT, () => console.log(`Server is live in port ${PORT}`));
};

connect();
