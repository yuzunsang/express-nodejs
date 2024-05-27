const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

// body-parser 미들웨어 설정
app.use(bodyParser.json()); // JSON 형식의 요청 본문을 파싱
app.use(bodyParser.urlencoded({ extended: true })); // URL-encoded 형식의 요청 본문을 파싱

// EJS를 템플릿 엔진으로 설정
app.set("view engine", "ejs");

// 더미 DB
const database = [
  { id: 1, content: "content1" },
  { id: 2, content: "content2" },
  { id: 3, content: "content3" },
];

// 루트 라우트 설정
app.get("/", (req, res) => {
  res.render("index", {
    title: "Main Page",
    name: "World",
    items: ["this", "is", "index"],
  });
});

app.get("/database", (req, res) => {
  res.render("database", {
    title: "Database Route",
    items: database,
  });
});

// 값 추가하기 - get
// app.get("/database/:content", (req, res) => {
//   const content = req.params.content;
//   database.push({
//     id: database.length + 1,
//     content,
//   });

//   res.send("값이 정상적으로 추가되었습니다.");
// });

// 해당 id의 데이터만 가져오기
app.get("/database/:id", (req, res) => {
  const id = req.params.id;
  const filteredData = database.find((el) => el.id === +id);

  res.send(filteredData);
});

app.post("/database", (req, res) => {
  const content = req.body.content;
  database.push({
    id: database.length + 1,
    content,
  });

  res.send("값이 정상적으로 추가되었습니다.");
});

// content 수정하기
app.put("/database", (req, res) => {
  const id = req.body.id;
  const newContent = req.body.content;
  database[+id - 1].content = newContent;

  res.send("값이 정상적으로 수정되었습니다.");
});

// content 삭제하기
app.delete("/database", (req, res) => {
  const id = req.body.id;
  database.splice(+id - 1, 1);

  res.send("값이 정상적으로 삭제되었습니다.");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
