
import { useEffect, useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom';

function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [])

  const handleAddUser = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(user);

    fetch('http://localhost:5000/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),

    })
      .then(res => res.json())
      .then(data => {
        setUsers(newUser);
        if (data.insertedId) {
          alert('user added successfully')
        }
        console.log(data);
        const newUser = [...users, data];
        form.reset();
      })

  }

  return (
    <>

      <h1>user management</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <input type="submit" value="user add" />
      </form>



      <h3>user length : {users.length}</h3>
      <Link to='/users'> <button>All Users</button> </Link>


    </>
  )
}

export default App
