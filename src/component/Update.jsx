import { useLoaderData } from "react-router-dom";

const Update = () => {
    const singleUser = useLoaderData();
    console.log(singleUser);


    const handleUpdate = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        console.log(name, email);
    }

    return (
        <div>
            <h3>Update data of {singleUser.name}</h3>
            <form onSubmit={handleUpdate}>
                <input type="text" name="name" defaultValue={singleUser.name} /> <br />
                <input type="email" name="email" defaultValue={singleUser.email} /><br />
                <input type="submit" value="update" />
            </form>
        </div>
    );
};

export default Update;