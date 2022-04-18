import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../quizzes/Quizzes.css";

import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from "@mui/material";

function Quizzes(props) {
    const [quizzes, setQuizzes] = useState([]);

    const handleLogout = () => {
        localStorage.clear();
        props.logout("");
    };

    useEffect(() => {
        axios
            .get("https://pure-caverns-82881.herokuapp.com/api/v54/quizzes", {
                headers: {
                    "X-Access-Token":
                    process.env.REACT_APP_ACCESS_TOKEN,
                },
            })
            .then((res) => {
                setQuizzes(res.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <>
            <Typography variant="h2">Quizzes</Typography>
            <Button
                size="small"
                onClick={handleLogout}
                sx={{ mt: 1, mr: 1 }}
                type="submit"
                variant="outlined"
            >
                <Link to={`/`}>Logout</Link>
            </Button>

            {quizzes && (
                <div className="quizzes">
                    {quizzes.map((quiz) => (
                        <Card sx={{ width: "49%" }} className="quiz-card" key={quiz.id}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {" " + quiz.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Questions count: {" " + quiz.questions_count}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">
                                    {" "}
                                    <Link to={`/quiz/${quiz.id}`}>Start quiz</Link>
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </div>
            )}
        </>
    );
}

export default Quizzes;