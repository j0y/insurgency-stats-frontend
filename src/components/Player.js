import {useEffect, useState} from "react";
import {supabase} from "../supabaseClient.js";
import {Link, useParams} from "react-router-dom";

export default function Player() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    let {id} = useParams();

    async function getUser() {
        setLoading(true);
        const {data, error} = await supabase.from("users")
            .select()
            .eq('id', id)
            .single()
        if (error) throw error
        setLoading(false);
        setUser(data);
    }

    useEffect(() => {
        getUser();
    }, []);

    if (!id) {
        return <div>{'Can\'t find this user'}</div>;
    }

    if (!loading && !user) {
        return <div>{'Can\'t find this user'}</div>;
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
                            <th className="left">{'User'}</th>
                            <th>{'kills'}</th>
                            <th>{'deaths'}</th>
                            <th>{'kd'}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr key={user.id}>
                            <td className="left">{user.name}</td>
                            <td>{user.kills}</td>
                            <td>{user.deaths}</td>
                            <td>{user.kd}</td>
                        </tr>
                        </tbody>
                    </table>

                    <h2>Weapon stats</h2>
                    <table>
                        <thead>
                        <tr>
                            <th className="left">{'weapon'}</th>
                            <th>{'kills'}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.keys(user.all_weapon_stats).map((weapon, i) => (
                            <tr key={weapon}>
                                <td className="left">
                                    {weapon}
                                </td>
                                <td>{user.all_weapon_stats[weapon]}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </>
            )}
        </>
    );
}