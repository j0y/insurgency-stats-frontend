import { useEffect, useState } from "react";
import {supabase} from "../supabaseClient.js";

const PAGE_LIMIT = 20;

export default function Players () {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);

    async function getUsers() {
        setLoading(true);
        const { data, error } = await supabase.from("users")
            .select()
            .order('kills', { ascending: false })
            .range(page*PAGE_LIMIT, page*PAGE_LIMIT+PAGE_LIMIT-1)
        if (error) throw error
        setLoading(false);
        setUsers(data);
    }

    useEffect(() => {
        getUsers();
    }, [page]);

    const nextPage = () => {
        setPage(page+1);
    }
    const previousPage = () => {
        setPage(page-1);
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
                                    <th className="left">{'User'}</th>
                                    <th>{'kills'}</th>
                                    <th>{'deaths'}</th>
                                    <th>{'kd'}</th>
                                </tr>
                            </thead>
                            <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="left">{user.name}</td>
                                    <td>{user.kills}</td>
                                    <td>{user.deaths}</td>
                                    <td>{user.kd}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                            {page > 0 && <button onClick={previousPage}>Previous</button>}
                            {users?.length === PAGE_LIMIT && <button onClick={nextPage}>Next</button>}
                        </>
                    ) : (
                        <p>No users currently</p>
                    )}
                </>
            )}
        </>
    );
}