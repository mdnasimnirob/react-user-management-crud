
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

        if (data.insertedId) {
          alert('user added successfully')
        }
        console.log(data);
        const newUser = [...users, data];
        setUsers(newUser);
        form.reset();
      })

  }

  return (
    <>

      <div className='flex items-center justify-center h-screen text-start bg-gray-100'>
        <div className='bg-white p-5 shadow-lg rounded-lg w-full max-w-md'>

          <div>
            <h1 className='text-3xl text-center pb-4'>User management</h1>
          </div>
          <div>
            <form onSubmit={handleAddUser}>
              <div className='flex flex-col'>
                <label className='mb-2 text-sm font-semibold text-gray-700 block' htmlFor="name">Name</label>
                <input className='w-full px-2 py-1 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500' placeholder='Your Name' type="text" name="name" id="name" required />
              </div>

              <div className='flex flex-col mt-2'>
                <label className='mb-2 text-sm font-semibold text-gray-700 block' htmlFor="email">Email</label>
                <input className='w-full px-2 py-1 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500' placeholder='Your Email' type="email" name="email" id="email" required />
              </div>
              <div className='flex flex-col mt-2'>
                <label className='mb-2 text-sm font-semibold text-gray-700 block' htmlFor="photo">Photo</label>
                <input className='w-full px-2 py-1 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500' placeholder='Your Email' type="file" name="photo" id="photo" src="" alt="" />
              </div>

              <div className='text-xl text-center mt-3'>
                <input className='py-1 px-2 bg-blue-600 text-white rounded-md' type="submit" value="Add User " />
              </div>
            </form>
          </div>
          <div className='flex flex-row justify-between mt-3'>
            <  h3 className='bg-gray-200 py-1 px-2 rounded-md shadow-lg'>User length : {users.length}</h3>
            <Link to='/users'> <button className='py-1 px-2 text-black bg-gray-200 shadow-lg rounded-md '>All Users</button> </Link>

          </div>
        </div>
      </div>





    </>
  )
}

export default App
