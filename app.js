const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const database = [
  { id: 1, name: "alpha", score: 123 },
  { id: 2, name: "bravo", score: 456 },
  { id: 3, name: "charlie", score: 7890 },
];

// html 파일 불러오기
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// 전체 database 불러오기
app.get("/database", (req, res) => {
  res.send(database);
});

// database의 최대 score data 불러오기
app.get("/max-database", (req, res) => {
  const scores = [];

  for (let i = 0; i < database.length; i++) {
    scores.push(database[i].score);
  }

  const maxScore = Math.max(...scores);
  const data = database.find((el) => el.score === maxScore);

  res.send(data);
});

// C - create, R - read, U - update, D - delete
// 만들기 - POST
// 수정 - PUT, PATCH
// 삭제 - DELETE

// app.get("/database/:name", (req, res) => {
//   const name = req.params.name;
//   database.push({
//     id: database.length + 1,
//     name,
//     score: 0, // score init
//   });

//   res.send("값 추가가 정상적으로 완료되었습니다!");
// });

// Create
app.post("/database", (req, res) => {
  const name = req.body.name;
  database.push({
    id: database.length + 1,
    name,
    score: 0, // score init
  });

  res.send("name이 정상적으로 완료되었습니다!");
});

// Update
app.put("/database", (req, res) => {
  // id와 score를 req로 불러온다
  const [id, score] = [req.body.id, req.body.score];
  // score를 새 score로 변경한다
  database[id - 1].score = Number(score);
  // 메세지 출력
  res.send("score 변경이 정상적으로 완료되었습니다!");
});

// Delete
app.delete("/database", (req, res) => {
  // id 를 가져온다
  const id = req.body.id;
  // id에 해당하는 data를 database 배열에서 잘라낸다
  database.splice(id - 1, 1);
  res.send("해당 유저 id 정보를 성공적으로 삭제했습니다.");
});

app.listen(3000, () => {
  console.log("server on!");
});
