import axios from "axios";

import { useState, useEffect } from "react";

const URL = "http://localhost:3000/api/todo";

function App() {
  const [todoList, setTodoList] = useState([]);

  async function fetchData() {
    const res = await axios.get(URL);
    setTodoList(res.data);

    // fetch(URL)
    //   .then((res) => res.json())
    //   .then((data) => setTodoList(data));
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleFormSubmit(event) {
    event.preventDefault();

    const text = event.target.text.value;
    const done = event.target.done.checked;

    await axios.post(URL, { text, done });
    fetchData();

    // fetch(URL, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ text, done }),
    // }).then(() => fetchData());
  }

  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <form onSubmit={handleFormSubmit}>
        <input name="text" />
        <input name="done" type="checkbox" />
        <input type="submit" value="추가"></input>
      </form>
      <ul>
        {todoList?.map((todo) => {
          return (
            <li key={todo.id}>
              <p>텍스트 : {todo.text}</p>
              <p>진행상황 : {todo.done ? "Done!" : "Not Yet"}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
