import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";


const Users = () => {
    const loadedUsers = useLoaderData();
    console.log(loadedUsers);
    const [users, setUsers] = useState(loadedUsers);

    const handleDelete = _id => {
        console.log('delete', _id);
        fetch(`http://localhost:5000/users/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0) {
                    alert('deleted succecfully');
                    const remaining = users.filter(user => user._id !== _id)
                    setUsers(remaining);
                }
            }
            )

    }

    return (
        <div>

            <Link to='/'><button className="text-3xl font-bold underline">Add User</button></Link>

            {
                users.map(user => <p key={user._id}> {user.name}  {user.email} {user._id}
                    <Link to={`/update/${user._id}`}>
                        <button>Update</button>
                    </Link>
                    <button onClick={() => handleDelete(user._id)}>Delete</button> </p>)
            }
        </div>
    );
};

export default Users;