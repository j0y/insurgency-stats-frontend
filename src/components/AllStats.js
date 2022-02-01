import {useEffect, useState} from "react";
import {supabase} from "../supabaseClient.js";
import {Link} from "react-router-dom";

const PAGE_LIMIT = 1000;

export default function AllStats() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    async function getUsers() {
        setLoading(true);
        let another = true;
        let page = 0;
        let allUsers = [];

        while (another) {
            const {data, error} = await supabase.from("users")
                .select(`id, name, kills, deaths, fratricide, kd`)
                .order("id")
                .range(page * PAGE_LIMIT, page * PAGE_LIMIT + PAGE_LIMIT - 1)
            if (error) throw error

            allUsers = allUsers.concat(data);

            if (data.length < PAGE_LIMIT) {
                another = false;
            } else {
                page++;
            }
        }
        setLoading(false);
        setUsers(allUsers);
    }

    useEffect(() => {
        getUsers();
    }, []);

    let text = "User\tkills\tdeaths\tfratricide\tkd\n"

    for (let i = 0; i < users.length; i++) {
        text = text + users[i].name + "\t" + users[i].kills + "\t" + users[i].deaths + "\t" + users[i].fratricide + "\t" + users[i].kd + "\n";
    }

    return (
        <>
            <Link
                to={`/`}
            >
                <h2>Back to home page</h2>
            </Link>

            <h2>All Users</h2>
            {loading ? (
                <p>loading...</p>
            ) : (
                <>
                    {users?.length ? (
                        <textarea value={text} readOnly rows={users.length + 5} cols={60}/>
                    ) : (
                        <p>No users currently</p>
                    )}
                </>
            )}
        </>
    );
}