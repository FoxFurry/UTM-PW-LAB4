import { useState, useEffect } from "react";
import axios from "axios";
import "../user/CreateUser.css";

import {
    Box,
    Button,
    Typography,
    TextField,
    Stack,
} from "@mui/material";

function CreateUser(props) {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post(
                "https://pure-caverns-82881.herokuapp.com/api/v54/users",
                {
                    data: {
                        name: name,
                        surname: surname,
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
                localStorage.setItem("userId", res.data.id);
                props.userId(res.data.id);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <>
            <Typography variant="h4">Create a user</Typography>
            <Box
                component="form"
                sx={{
                    "& .MuiTextField-root": { m: 1, width: "100%" },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <Stack spacing={2} sx={{ width: "70%" }} className="user-form">
                    <Stack spacing={2} sx={{ width: "100%" }} direction="row">
                        <TextField
                            required
                            id="outlined-required"
                            label="Name"
                            placeholder="Name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Surname"
                            placeholder="Surname"
                            value={surname}
                            onChange={(event) => setSurname(event.target.value)}
                        />
                    </Stack>
                    <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
                        Create
                    </Button>
                </Stack>
            </Box>
        </>
    );
}

export default CreateUser;