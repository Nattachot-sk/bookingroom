import { React, useState, useEffect } from "react";
import { Link, useNavigate , useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import HeaderUser from "../../components/HeaderUser";
import ModalDetailroom from "../../Modals/ModalDetailroom";

function ShowRoomUser() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [firstname, setFirstname] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
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
  console.log(datalogin)

  const [searchRoom, setSearchRoom] = useState("");
  const [showroomdata, setShowroomdata] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [iduser, setIduser] = useState("");


  useEffect(() => {
    axios
      .get("http://localhost:8081/showroom")
      .then((res) => setShowroomdata(res.data))
      .catch((err) => console.log(err));
  }, []);
  
  
  const openDetail = (id) =>{
    setShowModal(true);
    setIduser(id);

    console.log("Room ID:", id)
  }


  return (
    <div className=' h-screen w-full'>
      <div className='h-full  w-full'>
        <div className='bg-blue-50 w-full h-full'>
          <div className='w-full h-[100px]'>
            <header className='w-full h-[55%] bg-indigo-800 '>
              <HeaderUser datauser={datalogin} />
            </header>
            <div className='w-full h-[45%] bg-white flex items-center'>
              <h1 className="ml-[32px] text-gray-800">ห้องประชุม</h1>
              
            </div>
          </div>

          <div className='w-full h-full  flex justify-center '>
            <div className='w-[90%] h-full  m-5 '>
              <aside className='w-full  p-5 bg-white mt-5'>
                <div className="grid grid-cols-3 gap-[50px] px-40  h-[860px] ">
                {showroomdata
                    .filter((data) => {
                      return searchRoom.toLowerCase() === ""
                        ? data
                        : data.room_name.toLowerCase().includes(searchRoom);
                    })
                    .map((data, i) => (
                  <div className="bg-[#e0f2fe] border-2 border-black rounded-lg w-full h-1/2 box-content " key={data.id}>
                  
                      <div className="w-[90%] h-[250px] mx-auto mt-5 rounded-md ">
                        
                        <div className="hidden " >
                        {data.id}
                        </div>
                        
                        <div className="flex justify-center mt-5">
                          <h1>{data.room_name}</h1>
                        </div>
                        
                        <div className="flex justify-center mt-5">
                          <img src={`http://localhost:8081/images/`+ data.images} alt="" className="w-48 h-48"/>
                        </div>
                        
                        
                      </div>
                      
                      <div className="flex justify-center gap-5 mt-10">
                          <button onClick={() => openDetail(data.id)} className="bg-orange-300 px-5 py-3 rounded-lg hover:text-white hover:underline">รายละเอียดห้องประชุม</button>
                          <button className="bg-blue-300 px-5 py-3 rounded-lg hover:text-white hover:underline"><Link to={"/bookingroomuser"} >จองห้องประชุม</Link></button>
                      </div>
                     
                  </div>
                   ))}
                   {showModal && <ModalDetailroom setOpenModal={setShowModal} id={iduser}/>}
                </div>
              </aside>
            </div>
            
          </div>
        </div>

      </div>

    </div>
  )
}

export default ShowRoomUser