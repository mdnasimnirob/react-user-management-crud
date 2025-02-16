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
                console.log(data);
                if (data.deletedCount > 0) {
                    alert('Deleted successfully');
                    const remaining = users.filter(user => user._id !== _id);
                    setUsers(remaining);
                }
            });
    };

    return (

        <div className="container mx-auto p-4">
            <div className="flex flex-row justify-between items-center">
                <Link to='/'>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4 shadow-md">Add User</button>
                </Link>
                <h3 className='bg-gray-200 py-2 px-3 rounded-md shadow-md mb-4'>User length: {users.length}</h3>
            </div>

            <div className="overflow-x-auto border-gray-600 shadow-md">
                <table className="min-w-full text-center bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="py-3 px-6">#</th>
                            <th className="py-3 px-6">Photo</th>
                            <th className="py-3 px-6">Name</th>
                            <th className="py-3 px-6">Email</th>
                            <th className="py-3 px-6">Actions</th>
                        </tr>
                    </thead>
                    <tbody >
                        {users?.slice().reverse().map((user, index) => (
                            <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3">{index + 1}</td>
                                <td className="py-1 px-6 flex justify-center">
                                    <img
                                        src={`http://localhost:5000${user.photoUrl}`}  // Correct image path
                                        alt={user.name}
                                        className="w-12 h-12 rounded-full object-cover border"
                                    />
                                </td>
                                <td className="py-3 px-6">{user.name}</td>
                                <td className="py-3 px-6">{user.email}</td>
                                <td className="py-3">
                                    <div className="flex space-x-2 justify-center items-center">
                                        <div>
                                            <Link to={`/update/${user._id}`}>
                                                <button className="bg-blue-500 text-white px-3 py-1 rounded-md">Update</button>
                                            </Link>
                                        </div>
                                        <div>
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded-md"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default Users;
