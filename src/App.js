import './App.css';
import Players from "./components/Players";
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import Player from "./components/Player";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route exact path="/" element={<Players/>}/>
                    <Route path="/user/:id" element={<Player/>}/>
                    <Route path="*" element={<Players/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
