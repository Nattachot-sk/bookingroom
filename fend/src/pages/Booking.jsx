import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Bookingadd from "./Bookingadd";
import Sidebar from "../components/Sidebar";
import Bookingshow from "./Bookingshow";
import Calendar from "../components/Calendar";

function Booking() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [firstname, setFirstname] = useState("");
  const [iduser, setIduser] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

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

  const [dataroom, setDataroom] = useState([]);
  const [dataagency, setDataagency] = useState([]);
  const [dataaccessorie, setDataaccessorie] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/showroom")
      .then((res) => {
        setDataroom(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8081/showagency")
      .then((res) => {
        setDataagency(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8081/showaccess")
      .then((res) => {
        setDataaccessorie(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedAgency, setSelectedAgency] = useState("");
  const [selectedAccessorie, setSelectedAccessorie] = useState("");
  const [discription, setDiscription] = useState("");
  const [telnumber, setTelnumber] = useState("");
  const [peopleamount, setPeopleamount] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [dayend, setDayend] = useState("");
  const [timeend, setTimeend] = useState("");
  const [statusbooking, setStatusbooking] = useState("");

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/bookingInsert", {
        selectedRoom: selectedRoom,
        selectedAgency: selectedAgency,
        discription: discription,
        telnumber: telnumber,
        peopleamount: peopleamount,
        day: day,
        dayend: dayend,
        time: time,
        timeend: timeend,
        statusbooking: statusbooking,
        selectedAccessorie: selectedAccessorie,
        iduser: iduser,
        allday: false
      })
      .then((res) => {
        if (res.data.Status === "AddOK") {
          Swal.fire({
            icon: "success",
            title: "You are signup Successfully!!!",
          });
          setTimeout(function () {
            location.reload(1);
          }, 1000);
        } else if (res.data.Error === "insert fail") {
          Swal.fire({
            icon: "error",
            title: "ไม่สามารถเพิ่มได้",
          });
        }
      })

      .then((err) => console.log(err));
  };

  return (
    <div>
      <div className="flex">
        <Sidebar />

        <div className="h-screen flex-1 overflow-x-hidden">
          <div className="w-full h-14 bg-navy-blue flex  relative pt-3">
            <div className="w-full grid grid-cols-5 gap-4">
              <div className="col-span-4"></div>
              <div className="col-span-1 ">
                {auth ? (
                  <div className="pl-20">
                    <h3 className="text-white">
                      You are authorization {firstname}

                    </h3>
                  </div>
                ) : (
                  <div>
                    <h3>{message}</h3>
                    <h3>Login Now</h3>
                    <Link to={"/"}>login</Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pl-96 w-full">
            <div className="my-5">
              <h1>
                <span className="text-2xl font-bold">จองห้องประชุม</span>
              </h1>
            </div>

            <div className="m-5 ">
              <div className="flex">
                <div className="w-1/2">
                  <form className="mr-10 max-w-xl " onSubmit={handleSubmitBooking}>
                    <div className="textbox">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ห้องประชุม
                      </label>

                      <select
                        className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        multiple={false}
                        value={selectedRoom}
                        onChange={(e) => setSelectedRoom(e.target.value)}
                      >
                        <option value="">โปรดเลือก</option>
                        {dataroom.map((data, i) => (
                          <option key={data.id} value={data.id}>
                            {data.room_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="textbox">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        หน่วยงาน
                      </label>

                      <select
                        className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        value={selectedAgency}
                        onChange={(e) => setSelectedAgency(e.target.value)}
                        multiple={false}
                      >
                        <option value="">โปรดเลือก</option>
                        {dataagency.map((data, i) => (
                          <option key={data.agency_id} value={data.agency_id}>
                            {data.agency_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="textbox">
                      <label htmlFor="discription">รายละเอียด</label>
                      <textarea
                        className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                        type="text"
                        name="discription"
                        required
                        rows="3"
                        placeholder="รายละเอียดการประชุม"
                        onChange={(e) => {
                          setDiscription(e.target.value);
                        }}
                      />
                    </div>

                    <div className="textbox">
                      <label htmlFor="phonenumber">เบอร์โทร</label>
                      <input
                        type="text"
                        placeholder="โปรดกรอกเบอร์โทรติดต่อ"
                        name="telnumber"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        required
                        onChange={(e) => {
                          setTelnumber(e.target.value);
                        }}
                      />
                    </div>

                    <div className="textbox">
                      <label htmlFor="peopleamount">จำนวนคนที่จอง</label>
                      <input
                        type="text"
                        placeholder="โปรดกรอกจำนวนคนที่เข้าร่วม"
                        name="peopleamount"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        required
                        onChange={(e) => {
                          setPeopleamount(e.target.value);
                        }}
                      />
                    </div>

                    <div className="flex gap-2">
                      <div className="textbox w-full">
                        <label htmlFor="daystart">วันที่เริ่มจอง</label>
                        <input
                          type="date"
                          placeholder="Enter your firstname"
                          name="day"
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          required
                          onChange={(e) => {
                            setDay(e.target.value);
                          }}
                        />
                      </div>
                      <div className="textbox w-full">
                        <label htmlFor="lastname">วันที่จบ</label>
                        <input
                          type="date"
                          placeholder="Enter your lastname"
                          name="dayend"
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          required
                          onChange={(e) => {
                            setDayend(e.target.value);
                          }}
                        />
                      </div>
                    </div>



                    <div className="flex gap-2">
                      <div className="textbox w-full">
                        <label htmlFor="daystart">วันที่เริ่มจอง</label>
                        <select
                          className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          multiple={false}
                        >
                          <option value="">โปรดเลือก</option>
                          <option value="8:30">8.30</option>
                          <option value="13:00">13.00</option>

                        </select>
                      </div>
                      <div className="textbox w-full">
                        <label htmlFor="lastname">วันที่จบ</label>
                        <select
                          className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                          value={timeend}
                          onChange={(e) => setTimeend(e.target.value)}
                          multiple={false}
                        >
                          <option value="">โปรดเลือก</option>
                          <option value="12:30">12.30</option>
                          <option value="16:00">16.00</option>

                        </select>
                      </div>

                    </div>

                    <div className="textbox w-full">
                      <label htmlFor="lastname">สถานะห้องประชุม</label>
                      <input
                        type="text"
                        placeholder="Enter your lastname"
                        name="statusbooking"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        required
                        onChange={(e) => {
                          setStatusbooking(e.target.value);
                        }}
                      />
                    </div>

                    <div className="textbox">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        อุปกรณ์
                      </label>

                      <select
                        className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        value={selectedAccessorie}
                        onChange={(e) => setSelectedAccessorie(e.target.value)}
                        multiple={false}
                      >
                        <option value="">โปรดเลือก</option>
                        {dataaccessorie.map((data, i) => (
                          <option key={data.id_acces} value={data.id_acces}>
                            {data.name_acces}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="textbox">
                      <input
                        type="text"
                        name="iduser"
                        defaultValue={iduser}
                        hidden
                      />
                    </div>

                    <button
                      className="px-5 py-3 mt-5 rounded-lg bg-green-600 hover:bg-green-500"
                      type="submit"
                    >
                      ยืนยัน
                    </button>
                  </form>
                </div>

                <div className="w-1/2">
                  <Calendar />
                </div>
              </div>


              <div className="w-full">
                <div className="w-full pr-5">
                <Bookingshow />
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
