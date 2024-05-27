const express = require("express");
const app = express();
const port = 3000;

const database = [
  { id: 1, content: "content1" },
  { id: 2, content: "content2" },
  { id: 3, content: "content3" },
];

// EJS를 템플릿 엔진으로 설정
app.set("view engine", "ejs");

// 루트 라우트 설정
app.get("/", (req, res) => {
  res.render("index", {
    title: "Main Page",
    name: "World",
    items: ["this", "is", "list-item"],
  });
});

app.get("/database", (req, res) => {
  res.render("database", {
    title: "Database Route",
    items: database,
  });
});

// 값 추가하기
app.get("/database/:content", (req, res) => {
  const content = req.params.content;
  database.push({
    id: database.length + 1,
    content,
  });

  res.send("값 추가 정상 작동");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
