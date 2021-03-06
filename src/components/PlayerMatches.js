import {useEffect, useState} from "react";
import {supabase} from "../supabaseClient.js";
import {Link} from "react-router-dom";
import formatDate from "../helpers/date"
import LoadingIcon from "./LoadingIcon";

const PAGE_LIMIT = 10;

export default function PlayerMatches({id}) {
    const [loading, setLoading] = useState(true);
    const [userMatches, setUserMatches] = useState([]);
    const [page, setPage] = useState(0);

    async function getUserMatches() {
        setLoading(true);
        const {data, error} = await supabase.from("matches")
            .select(`id, map, started_at, won, match_user_stats!inner(user_id)`)
            .order('started_at', {ascending: false})
            .eq('match_user_stats.user_id', id)
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

    const placeholder = [...Array(PAGE_LIMIT)].map((e, i) =>
        <tr>
            <td>
                <div className={`map`}/>
            </td>
            <td className="placeholder" />
            <td className="placeholder" />
            <td/>
        </tr>)

    return (
        <>
            <h2>Matches {loading && <LoadingIcon />}</h2>
            {loading ? (
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
                    {placeholder}
                    </tbody>
                </table>
            ) : (
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
                        {userMatches.map((match) => (
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
                                <td>{match.won ? '???' : ''}</td>
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