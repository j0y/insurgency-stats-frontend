import {useEffect, useState} from "react";
import {supabase} from "../supabaseClient.js";
import {Link,} from "react-router-dom";
import avatarURL from "../helpers/avatarURL";

const PAGE_LIMIT = 20;

export default function PlayerSearch() {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [searchString, setSearchString] = useState('');

    async function getUsers() {
        setLoading(true);
        const {data, error} = await supabase.from("users")
            .select(`id, name, avatar_hash`)
            .ilike('name', '%'+searchString+'%')
            .range(page * PAGE_LIMIT, page * PAGE_LIMIT + PAGE_LIMIT - 1)
        if (error) throw error
        setLoading(false);
        setUsers(data);
    }

    useEffect(() => {
        if (searchString.length < 3) {
            setUsers([]);
            return;
        }
        getUsers();
    }, [page, searchString]);

    const nextPage = () => {
        setPage(page + 1);
    }
    const previousPage = () => {
        setPage(page - 1);
    }

    const onInputChange = (e) => {
        setSearchString(e.target.value);
        if (page !== 0) {
            setPage(0);
        }
    }

    return (
        <>
            <h2>User search</h2>
            <input type="text" onChange={onInputChange}/>
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
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            {page > 0 && <button onClick={previousPage}>{'< Previous'}</button>}
                            {users?.length === PAGE_LIMIT && <button onClick={nextPage}>{'Next >'}</button>}
                        </>
                    ) : (
                        <p>No users found</p>
                    )}
                </>
            )}
        </>
    );
}