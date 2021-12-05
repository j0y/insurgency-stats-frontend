import {useEffect, useState} from "react";
import {supabase} from "../supabaseClient.js";
import {Link, useParams} from "react-router-dom";
import formatDate from "../helpers/date"
import WeaponsStatsTable from "./WeaponsStatsTable";

export default function Match() {
    const [loading, setLoading] = useState(true);
    const [loadingStats, setLoadingStats] = useState(true);

    const [match, setMatch] = useState(null);
    const [userStats, setUserStats] = useState([]);
    const [detailsOpen, setDetailsOpen] = useState(null);
    let {id} = useParams();

    async function getMatch() {
        setLoading(true);
        const {data, error} = await supabase.from("matches")
            .select()
            .eq('id', id)
            .single()
        if (error) throw error
        setLoading(false);
        setMatch(data);
    }


    async function getUserStats() {
        setLoadingStats(true);
        const {data, error} = await supabase.from("match_user_stats")
            .select(`user_id, users (name), kills, deaths, weapon_stats`)
            .order('kills', {ascending: false})
            .eq('match_id', id)
        if (error) throw error
        setLoadingStats(false);
        setUserStats(data);
    }

    useEffect(() => {
        getMatch();

    }, []);

    useEffect(() => {
        getUserStats();
    }, [match]);

    if (!id) {
        return <div>{'Can\'t find this match'}</div>;
    }

    if (!loading && !match) {
        return <div>{'Can\'t find this match'}</div>;
    }


    return (
        <>
            <Link
                to={`/`}
            >
                <h2>Back to leaderboard</h2>
            </Link>

            {loading ? (
                <p>loading...</p>
            ) : (
                <>
                    <table>
                        <thead>
                        <tr>
                            <th className="left">{'Map'}</th>
                            <th>{'started'}</th>
                            <th>{'won'}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="left">
                                {match.map}
                            </td>
                            <td>{formatDate(match.started_at)}</td>
                            <td>{match.won ? '✓' : ''}</td>
                        </tr>
                        </tbody>
                    </table>
                    {loadingStats && <p>loading...</p>}
                    {userStats && (
                        <>
                            <h2>Players</h2>
                            <table>
                                <thead>
                                <tr>
                                    <th className="left">{'Player'}</th>
                                    <th>{'kills'}</th>
                                    <th>{'deaths'}</th>
                                    <th />
                                </tr>
                                </thead>
                                <tbody>
                                {userStats.map((user) => (
                                    <>
                                        <tr key={user.user_id}>
                                            <td className="left">
                                                <Link
                                                    to={`/user/${user.user_id}`}
                                                >
                                                    {user.users.name}
                                                </Link>
                                            </td>
                                            <td>{user.kills}</td>
                                            <td>{user.deaths}</td>
                                            <td><button onClick={() => setDetailsOpen(user.user_id)}>Details</button></td>
                                        </tr>
                                        <tr className={detailsOpen === user.user_id ? '' : ' hidden'}>
                                            <td colSpan={4}>
                                                <WeaponsStatsTable weaponStats={user.weapon_stats} />
                                            </td>
                                        </tr>
                                    </>
                                ))}
                                </tbody>
                            </table>
                        </>
                    )}
                </>
            )}
        </>
    );
}