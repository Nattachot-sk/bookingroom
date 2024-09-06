import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

function User() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [firstname, setFirstname] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();


  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:8081')
    .then(res => {
      if(res.data.Status === "OK") {
        setAuth(true)
        setFirstname(res.data.firstname)
        setRole(res.data.role)
      }else{
        setAuth(false)
        setMessage(res.data.Error)
        navigate('/')
      }
    })
    .then(err => console.log(err))
  }, [])

  const handleLogout = () =>{
    axios.get('http://localhost:8081/logout')
    .then(res => {
      location.reload(true);
    }).catch(err => console.log(err))
  }

  return (
    <>
    
      <div>
        {
          auth ?
          <div>
            <h3>You are atuhorized {firstname}</h3>
            <button onClick={handleLogout}>logout</button>
        
          </div>
          :
          <div>
            <h3>{message}</h3>
            <h3>Login Now</h3>
            <Link to={"/"}>login</Link>
          </div>
            
        }
      </div>
    </>
  )
}

export default User
