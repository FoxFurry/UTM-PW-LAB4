import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Quizzes from "./components/quizzes/Quizzes";
import Quiz from "./components/quiz/Quiz";
import CreateUser from "./components/user/CreateUser";

function App() {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, []);

  const handleUser = (event) => {
    setUserId(event);
  };

  return (
      <div className="App">
        <Routes>
          {userId ? (
              <Route path="/" element={<Quizzes logout={handleUser}/>} exact />
          ) : (
              <Route path="/" element={<CreateUser userId={handleUser} />} exact />
          )}
          <Route path="/quiz/:quizId" element={<Quiz />} />
        </Routes>
      </div>
  );
}

export default App;