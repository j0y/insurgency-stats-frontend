import {useEffect, useState} from "react";
import {supabase} from "../supabaseClient.js";
import {Link, useParams} from "react-router-dom";
import WeaponsStatsTable from "./WeaponsStatsTable";
import PlayerMatches from "./PlayerMatches";
import avatarURL from "../helpers/avatarURL";
import PlayerMedals from "./PlayerMedals";

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
                <h2>Back to home page</h2>
            </Link>

            {loading ? (
                <p>loading...</p>
            ) : (
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
                        <tr key={user.id}>
                            <td><img src={avatarURL(user.avatar_hash)} alt={user.name} /></td>
                            <td className="left">{user.name}</td>
                            <td>{user.kills}</td>
                            <td>{user.deaths}</td>
                            <td>{user.kd}</td>
                        </tr>
                        </tbody>
                    </table>

                    <h2>Medals</h2>
                    <PlayerMedals id={user.id} />
                    <h2>Weapon stats</h2>
                    <WeaponsStatsTable weaponStats={user.all_weapon_stats}/>
                    <h2>Matches</h2>
                    <PlayerMatches id={user.id} />
                </>
            )}
        </>
    );
}