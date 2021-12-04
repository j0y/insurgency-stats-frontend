import { useEffect, useState } from "react";
import {supabase} from "../supabaseClient.js";

export default function () {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    async function getUsers() {
        const { data, error } = await supabase.from("users").select().limit(10);
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
                                <td>{'User'}</td>
                                <td>{'kills'}</td>
                                <td>{'deaths'}</td>
                                <td>{'kd'}</td>
                            </thead>
                            <tbody>
                            {users.map((user) => (
                                <tr>
                                    <td>{user.id}</td>
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