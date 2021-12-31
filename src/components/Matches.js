import {useEffect, useState} from "react";
import {supabase} from "../supabaseClient.js";
import {Link} from "react-router-dom";
import formatDate from "../helpers/date"

const PAGE_LIMIT = 10;

export default function Matches() {
    const [loading, setLoading] = useState(true);
    const [matches, setMatches] = useState([]);
    const [page, setPage] = useState(0);

    async function getMatches() {
        setLoading(true);
        const {data, error} = await supabase.from("matches")
            .select(`id, started_at, map, won`)
            .order('started_at', {ascending: false})
            .range(page * PAGE_LIMIT, page * PAGE_LIMIT + PAGE_LIMIT - 1)
        if (error) throw error
        setLoading(false);
        setMatches(data);
    }

    useEffect(() => {
        getMatches();
    }, [page]);

    const nextPage = () => {
        setPage(page + 1);
    }
    const previousPage = () => {
        setPage(page - 1);
    }

    return (
        <>
            <h2>Matches</h2>
            {loading ? (
                <p>loading...</p>
            ) : (
                <>
                    {matches?.length ? (
                        <>
                            <table>
                                <thead>
                                <tr>
                                    <th/>
                                    <th className="left">{'Map'}</th>
                                    <th>{'started'}</th>
                                    <th>{'won'}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {matches.map((match) => (
                                    <tr key={match.id}>
                                        <td>
                                            <div className={`map map-${match.map}`} />
                                        </td>
                                        <td className="left">
                                            <Link
                                                to={`/match/${match.id}`}
                                            >
                                                {match.map}
                                            </Link>
                                        </td>
                                        <td>{formatDate(match.started_at)}</td>
                                        <td>{match.won ? '✓' : ''}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            {page > 0 && <button onClick={previousPage}>{'< Previous'}</button>}
                            {matches?.length === PAGE_LIMIT && <button onClick={nextPage}>{'Next >'}</button>}
                        </>
                    ) : (
                        <p>No matches currently</p>
                    )}
                </>
            )}
        </>
    );
}
