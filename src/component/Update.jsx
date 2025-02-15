
import { useLoaderData } from "react-router-dom";

const Update = () => {
    const singleUser = useLoaderData();
    console.log(singleUser._id);



    const handleUpdate = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const updateUser = { name, email }
        console.log(updateUser);



        fetch(`http://localhost:5000/users/${singleUser._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateUser),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }

    return (
        <div className="">
            <div className="">
                <div>
                    <h3>Update data of {singleUser.name}</h3>
                </div>
                <div>
                    <form onSubmit={handleUpdate}>
                        <input type="text" name="name" defaultValue={singleUser.name} id="" /> <br />
                        <input type="email" name="email" defaultValue={singleUser.email} id="" /><br />
                        <input type="submit" value="update" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Update;