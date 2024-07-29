// GetUsers.js

import { useState, useEffect } from "react";
import {fetchUsers} from "../../services/fetchUsers"

const GetUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null); // State to handle errors
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersData = await fetchUsers();
                setUsers(usersData);
            } catch (err) {
                console.error(err);
                setError("An error occurred while fetching users.");
            }
        };

        fetchData();

        // No cleanup needed since there's no use of AbortController
    }, []); // No dependencies needed for useEffect

    return (
        <article>
            <h2>Users List</h2>
            {error ? (
                <p>{error}</p>
            ) : (
                users.length ? (
                    <ul>
                        {users.map((user, i) => <li key={i}>{user.firstname}</li>)}
                    </ul>
                ) : <p>No users to display</p>
            )}
        </article>
    );
};

export default GetUsers;