import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../quiz/Quiz.css";

import {
    FormControl,
    FormLabel,
    FormControlLabel,
    RadioGroup,
    Radio,
    Button,
    Card,
    CardContent,
    Typography,
} from "@mui/material";

function Quiz() {
    const [value, setValue] = useState("");
    const [count, setCount] = useState(0);
    const [quiz, setQuiz] = useState();
    const [score, setScore] = useState(0);
    const [userId, setUserId] = useState();
    const { quizId } = useParams();

    useEffect(() => {
        setUserId(localStorage.getItem("userId"));
        axios
            .get(
                `https://pure-caverns-82881.herokuapp.com/api/v54/quizzes/${quizId}`,
                {
                    params: { user_id: userId },
                    headers: {
                        "X-Access-Token":
                        process.env.REACT_APP_ACCESS_TOKEN,
                    },
                }
            )
            .then((res) => {
                setQuiz(res.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [userId]);

    const handleRadioChange = (event) => {
        setValue(event.target.value);
    };

    const handleSubmit = (event, questionId) => {
        event.preventDefault();

        axios
            .post(
                `https://pure-caverns-82881.herokuapp.com/api/v54/quizzes/${quizId}/submit?`,
                {
                    data: {
                        question_id: questionId,
                        answer: value,
                        user_id: userId,
                    },
                },
                {
                    headers: {
                        "X-Access-Token":
                        process.env.REACT_APP_ACCESS_TOKEN,
                    },
                }
            )
            .then(function (res) {
                if (res.data.correct) setScore((prevState) => prevState + 1);
                if (count < quiz.questions.length) {
                    setCount((prevState) => prevState + 1);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <>
            {quiz && (
                <>
                    {count == quiz.questions.length && (
                        <>
                            <Typography variant="h2">{quiz.title}</Typography>
                            <Typography variant="h3">Your score is: {score}/{quiz.questions.length} </Typography>
                            <Button variant="outlined" href="#outlined-buttons">
                                <Link to="/">Back to quiz list</Link>
                            </Button>
                        </>
                    )}
                </>
            )}
            {quiz && (
                <>
                    {count < quiz.questions.length && (
                        <Card sx={{ width: "100%" }} className="quiz-card" key={quiz.id}>
                            <CardContent>
                                <Typography variant="h2">{quiz.title}</Typography>
                                <hr />
                                <form
                                    onSubmit={(event) =>
                                        handleSubmit(event, quiz.questions[count].id)
                                    }
                                >
                                    <FormControl className="quiz-form">
                                        <FormLabel
                                            id="demo-radio-buttons-group-label"
                                            className="quiz-title"
                                        >
                                            {count}. {quiz.questions[count].question}
                                        </FormLabel>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            name={quiz.question}
                                            onChange={handleRadioChange}
                                            value={value}
                                        >
                                            {quiz.questions[count].answers.map((answer) => (
                                                <FormControlLabel
                                                    value={answer}
                                                    control={<Radio />}
                                                    label={answer}
                                                />
                                            ))}
                                        </RadioGroup>
                                        <Button
                                            sx={{ mt: 1, mr: 1 }}
                                            type="submit"
                                            variant="outlined"
                                        >
                                            {count < quiz.questions.length - 1
                                                ? "Next Question"
                                                : "Finish quiz"}
                                        </Button>
                                    </FormControl>
                                </form>
                            </CardContent>
                        </Card>
                    )}
                </>
            )}
        </>
    );
}

export default Quiz;