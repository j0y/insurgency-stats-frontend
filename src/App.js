import './App.css';
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import Player from "./components/Player";
import Home from "./Home";
import Match from "./components/Match";
import AllStats from "./components/AllStats";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home />}/>
                    <Route path="/user/:id" element={<Player />}/>
                    <Route path="/match/:id" element={<Match />}/>
                    <Route path="/all_stats" element={<AllStats />}/>
                    <Route path="*" element={<Home />}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
