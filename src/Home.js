import './App.css';
import Players from "./components/Players";
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import Player from "./components/Player";
import Matches from "./components/Matches";

function Home() {
    return (
        <>
            <Players />
            <Matches />
        </>
    );
}

export default Home;
