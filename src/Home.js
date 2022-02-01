import './App.css';
import Matches from "./components/Matches";
import PlayerSearch from "./components/PlayerSearch";
import {Link} from "react-router-dom";

function Home() {
    return (
        <>
            <PlayerSearch />
            <Matches />
            <br /><br />
            <div>
                <Link
                    to={`/all_stats`}
                >
                    {'All stats'}
                </Link>
            </div>
        </>
    );
}

export default Home;
