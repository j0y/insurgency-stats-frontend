import {useEffect, useState} from "react";
import {supabase} from "../supabaseClient.js";
import {Link,} from "react-router-dom";
import avatarURL from "../helpers/avatarURL";

const PAGE_LIMIT = 20;

export default function Players() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);

    async function getUsers() {
        setLoading(true);
        const {data, error} = await supabase.from("users")
            .select(`id, name, kills, deaths, kd, avatar_hash`)
            .order('kills', {ascending: false})
            .range(page * PAGE_LIMIT, page * PAGE_LIMIT + PAGE_LIMIT - 1)
        if (error) throw error
        setLoading(false);
        setUsers(data);
    }

    useEffect(() => {
        getUsers();
    }, [page]);

    const nextPage = () => {
        setPage(page + 1);
    }
    const previousPage = () => {
        setPage(page - 1);
    }

    return (
        <>
            <h2>Users</h2>
            {loading ? (
                <p>loading...</p>
            ) : (
                <>
                    {users?.length ? (
                        <>
                            <table>
                                <thead>
                                <tr>
                                    <th />
                                    <th className="left">{'User'}</th>
                                    <th>{'kills'}</th>
                                    <th>{'deaths'}</th>
                                    <th>{'kd'}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td><img src={avatarURL(user.avatar_hash)} alt={user.name} /></td>
                                        <td className="left">
                                            <Link
                                                to={`/user/${user.id}`}
                                            >
                                                {user.name}
                                            </Link>
                                        </td>
                                        <td>{user.kills}</td>
                                        <td>{user.deaths}</td>
                                        <td>{user.kd}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            {page > 0 && <button onClick={previousPage}>{'< Previous'}</button>}
                            {users?.length === PAGE_LIMIT && <button onClick={nextPage}>{'Next >'}</button>}
                        </>
                    ) : (
                        <p>No users currently</p>
                    )}
                </>
            )}
        </>
    );
}