
import Calendar from "../components/Calendar";
import { React, useState , useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import HeaderUser from "../components/HeaderUser";



function Userlogin() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [firstname, setFirstname] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:8081/user")
      .then((res) => {
        if (res.data.Status === "OK") {
          setAuth(true);
          setFirstname(res.data.firstname);
          setRole(res.data.role);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
          navigate("/");
        }
      })
      .then((err) => console.log(err));
  }, []);

  const datalogin = {
    auth,
    firstname,
    message,
    role
  }

  return (
    <div className='h-screen w-full'>
      <div className='h-full w-full flex'>
        {/* <div className='bg-red-200 w-[240px] h-full'>
          sidebar
        </div> */}
        <div className='bg-blue-50  flex-1'>
          <div className='w-full h-[100px]'>
            <header className='w-full h-[55%] bg-indigo-800 '>
              <HeaderUser datauser={datalogin} />
            </header>
            <div className='w-full h-[45%] bg-white'>
              mini header
            </div>
          </div>

          <div className=' w-full h-full  flex justify-center'>
            <div className='w-[90%] h-full  m-5 '>
              <aside className='w-full h-full p-5 bg-white mt-5'>
                <Calendar />
              </aside>
            </div>

          </div>
        </div>

      </div>

    </div>
  )
}

export default Userlogin