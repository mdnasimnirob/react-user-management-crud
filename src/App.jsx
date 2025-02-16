
import { useEffect, useState } from 'react'
import './App.css'
import { Link, useNavigate } from 'react-router-dom';

function App() {

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [])

  // const handleAddUser = event => {
  //   event.preventDefault();
  //   const form = event.target;
  //   const name = form.name.value;
  //   const email = form.email.value;
  //   const photoFile = form.elements['photo'].files[0];

  //   const user = { name, email, photoFile };
  //   console.log(user);

  //   fetch('http://localhost:5000/users', {
  //     method: 'post',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(user),

  //   })
  //     .then(res => res.json())
  //     .then(data => {

  //       if (data.insertedId) {
  //         alert('user added successfully')
  //       }
  //       console.log(data);
  //       const newUser = [...users, data];
  //       setUsers(newUser);
  //       form.reset();
  //     })

  // }

  const handleAddUser = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(); // Use FormData to handle file upload

    formData.append("name", form.name.value);
    formData.append("email", form.email.value);
    formData.append("photo", form.elements["photo"].files[0]); // Append file

    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        body: formData, // Send formData, no need for headers
      });

      const data = await response.json();

      if (data.insertedId) {
        // alert("User added successfully");
        navigate('/users');

      }

      console.log(data);
      setUsers((prevUsers) => [...prevUsers, data]); // Update state
      form.reset();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };


  return (
    <>

      <div className='flex items-center justify-center h-screen  text-start bg-gray-100'>
        <div className='bg-white p-5 shadow-lg rounded-lg w-full max-w-md'>


          <div>
            <h1 className='text-3xl text-center pb-4'>User management</h1>
          </div>
          <div>
            <form onSubmit={handleAddUser} encType="multipart/form-data" className='relative'>
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


                <input className="bg-blue-600 text-white px-4 py-2 rounded-md mt-2 shadow-md text-base" type="submit" value="Add User " />

              </div>

            </form>
            <div className='flex justify-end '>
              <Link to='/users'>
                <button className="py-2 px-4 text-black bg-gray-200 shadow-lg text-sm rounded-md">
                  All Users
                </button>
              </Link>
            </div>
            {/* <div className="fixed-button fixed  z-10">
              <Link to='/users'>
                <button className="py-2 px-4 text-black bg-gray-200 shadow-lg text-sm rounded-md">
                  All Users
                </button>
              </Link>
            </div> */}
            {/* <  h3 className='bg-gray-200 py-1 px-2 rounded-md shadow-md text-sm '>User length : {users.length}</h3> */}
          </div>

        </div>
      </div>





    </>
  )
}

export default App
