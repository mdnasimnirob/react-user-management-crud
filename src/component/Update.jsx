
import { Link, useLoaderData, useNavigate } from "react-router-dom";

const Update = () => {
    const singleUser = useLoaderData();
    const navigate = useNavigate();
    console.log(singleUser._id);



    // const handleUpdate = event => {
    //     event.preventDefault();
    //     const form = event.target;
    //     const name = form.name.value;
    //     const email = form.email.value;
    //     const updateUser = { name, email }
    //     console.log(updateUser);



    //     fetch(`http://localhost:5000/users/${singleUser._id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(updateUser),
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //         })
    // }

    const handleUpdate = async (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoFile = form.elements['photo'].files[0]; // Get file input

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        if (photoFile) {
            formData.append("photo", photoFile);
        }

        fetch(`http://localhost:5000/users/${singleUser._id}`, {
            method: "PUT",
            body: formData, // Sending FormData instead of JSON
        })
            .then(res => res.json())
            .then(data => {

                if (data.modifiedCount > 0) {
                    navigate("/users"); // Navigate to the "/users" route
                }
            })
            .catch(error => console.error("Error updating user:", error));
    };



    return (
        <div className="flex items-center justify-center h-screen  text-start bg-gray-100">
            <div className="bg-white p-5 shadow-lg rounded-lg w-full max-w-md">
                <div className="flex justify-end px-1">
                    <Link to='/users'>x</Link>
                </div>
                <div>
                    <h3 className="text-center m- text-lg">Update data for <span className="font-bold "> {singleUser.name}</span></h3>
                </div>
                <div>

                    <form onSubmit={handleUpdate} encType="multipart/form-data" className='relative'>
                        <div className='flex flex-col'>
                            <label className='mb-2 text-sm font-semibold text-gray-700 block' htmlFor="name">Name</label>
                            <input className='w-full px-2 py-1 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500' placeholder='Your Name' name="name" defaultValue={singleUser.name} id="name" required />
                        </div>

                        <div className='flex flex-col mt-2'>
                            <label className='mb-2 text-sm font-semibold text-gray-700 block' htmlFor="email">Email</label>
                            <input className='w-full px-2 py-1 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500' placeholder='Your Email' type="email" name="email" defaultValue={singleUser.email} id="email" required />
                        </div>
                        <div className='flex flex-col mt-2'>
                            <label className='mb-2 text-sm font-semibold text-gray-700 block' htmlFor="photo">Photo</label>
                            <div className="flex flex-row justify-between space-x-2">
                                <div className="w-11/12">
                                    <input className='w-full px-2 py-1 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500' placeholder='Your Email' type="file" name="photo" id="photo"
                                    />
                                </div>
                                <div className="">
                                    <img className="w-10 h-10 object-cover rounded-full" src={`http://localhost:5000${singleUser.photoUrl}`} alt="" />
                                </div>
                            </div>
                        </div>

                        <div className='text-xl text-center mt-3'>

                            <input className="bg-blue-600 text-white px-4 py-2 rounded-md mt-2 shadow-md text-base" type="submit" value="update" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Update;