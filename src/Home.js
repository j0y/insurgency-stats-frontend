import './App.css';
import Matches from "./components/Matches";
import PlayerSearch from "./components/PlayerSearch";
import {Link} from "react-router-dom";

function Home() {
    return (
        <>
            <Matches />
            <PlayerSearch />
            <br /><br />
            <div>
                <Link
                    to={`/all_stats`}
                >
                    {'All users'}
                </Link>
            </div>
        </>
    );
}

export default Home;
