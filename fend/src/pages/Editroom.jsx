import { React, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import axios from "axios";

function Editroom() {
  const [roomname, setRoomname] = useState("");
  const [roomamount, setRoomamount] = useState("");
  const [roomlocation , setRoomlocation] = useState("")
  const [statusroom, setStatusroom] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [firstname, setFirstname] = useState("");
  const [role, setRole] = useState("");
  const [iduser, setIduser] = useState("");

  const [prevroomdata, setPrevroomdata] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:8081/showroom/" + id)
      .then((res) => {
        const RoomData = res.data[0];

        setRoomname(RoomData.room_name);
        setRoomamount(RoomData.room_amount);
        setRoomlocation(RoomData.room_location)
        setStatusroom(RoomData.status_room);
      })
      .catch((err) => console.log(err));
  }, [id]);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:8081/admin")
      .then((res) => {
        if (res.data.Status === "OK") {
          setAuth(true);
          setFirstname(res.data.firstname);
          setIduser(res.data.iduser);
          setRole(res.data.role);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
          navigate("/");
        }
      })
      .then((err) => console.log(err));
  }, []);

  const handleSubmitEditroom = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:8081/editroom/" + id, {
        roomname,
        roomamount,
        roomlocation,
        statusroom,
      })
      .then((res) => {
        if (res.data.Status === "OK") {
          navigate("/room");
          Swal.fire({
            icon: "success",
            title: "แก้ไขสำเร็จ",
          });
        } else if (res.data.Error === "Update fail") {
          Swal.fire({
            icon: "error",
            title: "แก้ไขไม่สำเร็จ",
          });
        }
      });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          {prevroomdata.map((data, i) => (
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Edit room {data.room_name}
            </h2>
          ))}
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="Edit-page">
            <form onSubmit={handleSubmitEditroom}>
              <div className="textbox">
                <label htmlFor="email">ชื่อห้อง</label>
                <input
                  type="text"
                  required
                  placeholder="qwdqwd"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={roomname}
                  onChange={(event) => {
                    setRoomname(event.target.value);
                  }}
                />
              </div>

              <div className="textbox">
                <label htmlFor="email">จำนวนคนที่เข้าร่วมได้</label>
                <input
                  type="text"
                  placeholder="qwdqwd"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={roomamount}
                  required
                  onChange={(event) => {
                    setRoomamount(event.target.value);
                  }}
                />
              </div>
              <div className="textbox">
                <label htmlFor="email">สถานที่</label>
                <input
                  type="text"
                  placeholder="qwdqwd"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={roomlocation}
                  required
                  onChange={(event) => {
                    setRoomlocation(event.target.value);
                  }}
                />
              </div>

              <div className="textbox">
                <label htmlFor="email">สถานะห้องประชุม</label>
                <input
                  type="text"
                  placeholder="qwdqwdq"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={statusroom}
                  required
                  onChange={(event) => {
                    setStatusroom(event.target.value);
                  }}
                />
              </div>
              <div className="w-48 sm:mx-auto sm:w-full sm:max-w-sm mt-5 flex justify-between">
                <button
                  className=" bg-blue-500 hover:bg-blue-400  p-2 rounded-md"
                  type="submit"
                >
                  ยืนยันการแก้ไข
                </button>
                <Link
                  className="bg-red-500  hover:bg-red-300  p-2 rounded-md"
                  to={"/room"}
                >
                  ยกเลิก
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Editroom;
