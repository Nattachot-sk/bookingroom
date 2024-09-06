import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import axios from "axios";
import Showroom from "./Showroom";
import Sidebar from "../components/Sidebar";
import Modaladdroom from "../Modals/Modaladdroom";

function Room() {
  const [showModal, setShowModal] = useState(false);
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [firstname, setFirstname] = useState("");
  const [role, setRole] = useState("");

  const [addroomname, setAddroomname] = useState("");
  const [addroomamount, setAddroomamount] = useState("");
  const [addroomlocation, setAddroomlocation] = useState("");
  const [addstatusroom, setAddstatusroom] = useState("");
  const navigate = useNavigate();

  const [showroomdata, setShowroomdata] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/showroom")
      .then((res) => setShowroomdata(res.data))
      .catch((err) => console.log(err));
  }, []);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:8081/admin")
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

  const handleSubmitAddroom = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/addroom", {
        addroomname: addroomname,
        addroomamount: addroomamount,
        addroomlocation: addroomlocation,
        addstatusroom: addstatusroom,
      })
      .then((res) => {
        if (res.data.Status === "AddOK") {
          navigate("/room");
          Swal.fire({
            icon: "success",
            title: "You are Add Successfully!!!",
          });
        } else if (res.data.Error === "insert fail") {
          Swal.fire({
            icon: "error",
            title: "ไม่สามารถเพิ่มห้องประชุมได้",
          });
        }
      });
  };
  return (
    <>
      <div className="h-screen flex-1">
        <div className="col-auto">
          <Sidebar />
        </div>

        <div className="w-full h-screen relative">
          <div className="w-full h-14 bg-navy-blue flex  relative pt-3">
            <div className="w-full grid grid-cols-5 gap-4">
              <div className=" col-span-4"></div>
              <div className="col-span-1 container">
                {auth ? (
                  <div className="pl-20">
                    <h3 className="text-white">
                      You are authorization {firstname}
                    </h3>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-white">{message}</h3>
                    <h3 className="text-white">Login Now</h3>
                    <Link to={"/"} className="text-white">
                      login
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="container pl-96 h-screen">
            <div className="my-5">
              <h1>
                <span className="text-2xl font-bold">ห้องประชุม</span>
              </h1>
            </div>

            <div className="container m-5 max-w-full"></div>

            <div className="flex flex-col ">
              <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8 ">

                  <button
                    className="px-4 py-2 text-purple-100 bg-indigo-600 rounded-md"
                    type="button"
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    เพิ่มข้อมูลห้อง
                  </button>
                  {showModal && <Modaladdroom setOpenModal={setShowModal} />}
                </div>
              </div>
            </div>
            <div className="overflow-hidden">
              <Showroom />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Room;
