import React from 'react';
import HomePage from "./HomePage";
import TaskTracker from "./TaskTracker";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Instructions from "./Instructions";
import NesPage from "./NesPage";
import axios from "axios";
import FlashCardPage from "./FlashCardPage";

const getPlayTime = async () => {
    try {
        const promise = await axios.get(`${process.env.REACT_APP_SERVERDOMAIN}/user/play-time`);
        return promise.data;
    } catch (err) {
        alert(`${err} (Fail to access the server! Try again Later.)`);
        return 0;
    }
};

const App = () => {
    return (
        <Router>
            <header>

            </header>

            <Container className={"bg-warning bg-gradient min-vh-100 d-flex"} fluid>
                <Switch>
                    <Route exact path={"/"}>
                        <HomePage getPlayTime={getPlayTime}/>
                    </Route>

                    <Route exact path={"/task-tracker"}>
                        <TaskTracker/>
                    </Route>

                    <Route exact path={"/flash-card"}>
                        <FlashCardPage />
                    </Route>

                    <Route exact path={"/nes-emulator"}>
                        <NesPage getPlayTime={getPlayTime} />
                    </Route>

                    <Route exact path={"/instructions"}>
                        <Instructions/>
                    </Route>
                </Switch>
            </Container>

            <footer>

            </footer>
        </Router>
    );
};

export default App;
