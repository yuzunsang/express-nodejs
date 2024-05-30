// import axios from "axios";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = 3000;

app.use(cors());
app.use(bodyParser.json()); // JSON 형식의 데이터 파싱
app.use(bodyParser.urlencoded({ extended: true })); // URL-encoded 형식의 데이터 파싱

// dummy DB
let id = 1;
const todoList = [
  {
    id: 1,
    text: "할일 1",
    done: false,
  },
];

app.get("/api/todo", (req, res) => {
  res.json(todoList);
});

app.post("/api/todo", (req, res) => {
  const { text, done } = req.body;
  console.log("text : ", text);
  console.log("done : ", done);

  todoList.push({
    id: ++id,
    text,
    done,
  });

  return res.send("성공적으로 값을 추가했습니다.");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
