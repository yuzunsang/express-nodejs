const express = require("express");
const app = express();
const port = 3000;

// EJS를 템플릿 엔진으로 설정
app.set("view engine", "ejs");

// 루트 라우트 설정
app.get("/", (req, res) => {
  res.render("index", {
    title: "EJS Example",
    name: "World",
    items: ["item1", "item2", "item3"],
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
