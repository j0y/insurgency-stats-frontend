import './App.css';
import Matches from "./components/Matches";
import PlayerSearch from "./components/PlayerSearch";

function Home() {
    return (
        <>
            <PlayerSearch />
            <Matches />
        </>
    );
}

export default Home;
