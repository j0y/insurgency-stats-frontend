import { useEffect, useState } from "react";
import {supabase} from "../supabaseClient.js";

const PAGE_LIMIT = 10;

export default function () {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    async function getUsers() {
        const { data, error } = await supabase.from("users")
            .select()
            .order('kills', { ascending: false })
            .limit(PAGE_LIMIT);
        setUsers(() => data);
    }

    useEffect(() => {
        setLoading(true);
        getUsers();
        setLoading(false);
    }, []);

    return (
        <>
            <h2>Users</h2>
            {loading ? (
                <p>loading...</p>
            ) : (
                <>
                    {users?.length ? (
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
                    ) : (
                        <p>No users currently</p>
                    )}
                </>
            )}
        </>
    );
}