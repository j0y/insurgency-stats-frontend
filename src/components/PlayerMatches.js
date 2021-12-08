import {useEffect, useState} from "react";
import {supabase} from "../supabaseClient.js";
import {Link} from "react-router-dom";
import formatDate from "../helpers/date"

const PAGE_LIMIT = 10;

export default function PlayerMatches({id}) {
    const [loading, setLoading] = useState(true);
    const [userMatches, setUserMatches] = useState([]);
    const [page, setPage] = useState(0);

    async function getUserMatches() {
        setLoading(true);
        const {data, error} = await supabase.from("match_user_stats")
            .select(`matches (id, map, started_at, won)`)
            .order('started_at', {ascending: false, foreignTable: 'matches'})
            .eq('user_id', id)
            .range(page * PAGE_LIMIT, page * PAGE_LIMIT + PAGE_LIMIT - 1)
        if (error) throw error
        setLoading(false);
        setUserMatches(data);
    }

    useEffect(() => {
        getUserMatches();
    }, [page]);

    const nextPage = () => {
        setPage(page + 1);
    }
    const previousPage = () => {
        setPage(page - 1);
    }

    if (!id) {
        return <div>{'User id is required'}</div>;
    }

    if (!loading && !userMatches) {
        return <div>{'Can\'t find this users matches'}</div>;
    }


    return (
        <>
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
                        {userMatches.map((match) => (
                            <tr key={match.matches.id}>
                                <td className="left">
                                    <Link
                                        to={`/match/${match.matches.id}`}
                                    >
                                        {match.matches.map}
                                    </Link>
                                </td>
                                <td>{formatDate(match.matches.started_at)}</td>
                                <td>{match.matches.won ? '✓' : ''}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {page > 0 && <button onClick={previousPage}>{'< Previous'}</button>}
                    {userMatches?.length === PAGE_LIMIT && <button onClick={nextPage}>{'Next >'}</button>}
                </>
            )}
        </>
    );
}