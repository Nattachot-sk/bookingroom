import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function ModalBooking({ setOpenModal, dataday }) {
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState("");
    const [firstname, setFirstname] = useState("");
    const [iduser, setIduser] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios
            .get("http://localhost:8081/user")
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

    const [modalDataDay, setModalDataDay] = useState(dataday);
    useEffect(() => {
        setModalDataDay(dataday);
    }, [dataday]);
const handleSubmitBooking = (e) => {
  e.preventDefault();
  axios
    .post("http://localhost:8081/bookingInsertTest2", {
        selectedRoom: selectedRoom,
        selectedAgency: selectedAgency,
        discription: discription,
        telnumber: telnumber,
        peopleamount: peopleamount,
        day: dataday.dayStart,
        dayend: dataday.dayEnd,
        time: time,
        timeend: timeend,
        statusbooking: 1,
        selectedAccessorie: selectedAccessorie,
        iduser: iduser,
        allday: dataday.allDay
    })
    .then((res) => {
      if (res.data.Status === "AddOK") {
        Swal.fire({
          icon: "success",
          title: "การจองห้องสำเร็จ!!!",
        });
        setOpenModal(false);
      } else if (res.data.Error === "insert fail") {
        Swal.fire({
          icon: "error",
          title: "ไม่สามารถเพิ่มได้",
        });
      } else if (res.data.Error === "Room already booked for the selected time") {
        Swal.fire({
          icon: "warning",
          title: "ห้องถูกจองแล้ว",
        });
      }
    })
    .catch((err) => console.error(err));
};

    return (
        <>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div
                    className="fixed inset-0 w-full h-full bg-black opacity-40"
                    onClick={() => setOpenModal(false)}
                ></div>
                <div className="flex items-center min-h-screen px-4 py-8">
                    <div className="relative w-full max-w-xl p-4 mx-auto bg-white rounded-md shadow-lg ">
                        <div className="mt-3 sm:block">

                            <div className="mt-2 text-center sm:ml-4 sm:text-left">
                                <div className="singup-page">
                                    <div className="flex justify-center mx-auto ">
                                        <h1 className="text-2xl font-bold">จองช่วงเช้า</h1>
                                    </div>

                                    <div className="container m-5 max-w-full">
                                        <form className="mr-10 max-w-xl" onSubmit={handleSubmitBooking}>
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
                                                    name="tel"
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
                                                    type="number"
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
                                                        value={dataday.dayStart}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="textbox w-full hidden">
                                                    <label htmlFor="lastname">วันที่จบ</label>
                                                    <input
                                                        type="date"
                                                        placeholder="Enter your lastname"
                                                        name="dayend"
                                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        value={dataday.dayEnd}
                                                        readOnly
                                                        
                                                    />
                                                </div>

                                            </div>

                                            <div className="flex gap-2">
                                                <div className="textbox w-full">
                                                    <label htmlFor="daystart">เวลาที่เริ่มจอง</label>
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
                                                    <label htmlFor="lastname">เวลาสิ้นสุด</label>
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
                                            {/* 
                                            <div className="textbox">
                                                <label
                                                    htmlFor="email"
                                                    className="block text-sm font-medium leading-6 text-gray-900"
                                                >
                                                    ช่วงเวลาที่จอง
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
                                            </div> */}



                                            {/* <div className="textbox w-full">
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
                                            </div> */}

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

                                            <div className="items-center gap-2 mt-3 sm:flex">
                                                <button
                                                    className="w-full mt-2 p-2.5 flex-1 text-white bg-green-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                                                    type="submit"
                                                >
                                                    ยืนยัน
                                                </button>
                                                <button
                                                    className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                                    onClick={() => setOpenModal(false)}
                                                >
                                                    ยกเลิก
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
