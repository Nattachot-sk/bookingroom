import { React, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import axios from "axios";

function BookingEdit() {
  const [room_name, setRoom_name] = useState("");
  const [id_room, setId_room] = useState("");
  const [agency_id, setAgency_id] = useState("");
  const [agency_name, setAgency_name] = useState("");
  const [telnumber, setTelnumber] = useState("");
  const [people_amount, setPeople_amount] = useState("");
  const [discription, setDiscription] = useState("");
  const [date_booking, setDate_booking] = useState("");
  const [time_booking, setTime_booking] = useState("");
  const [dateend_booking, setDateend_booking] = useState("");
  const [timeend_booking, setTimeend_booking] = useState("");
  const [status_booking, setStatus_booking] = useState("");
  const [id_acces , setId_acces] = useState("");
  const [name_acces , setName_access] = useState("");
  const [id_user , setId_user] = useState("");
  const [firstnameUser , setFirstnameUser] = useState("");


  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [firstname, setFirstname] = useState("");
  const [role, setRole] = useState("");
  const [iduser, setIduser] = useState("");

  const [prevBookingData, setPrevBookingData] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:8081/showbooking/" + id)
      .then(res => {
        const BookingData = res.data[0];

        setId_room(BookingData.id);
        setRoom_name(BookingData.room_name);
        setAgency_id(BookingData.agency_id);
        setAgency_name(BookingData.agency_name);
        setTelnumber(BookingData.telnumber);
        setPeople_amount(BookingData.people_amount);
        setDiscription(BookingData.discription);
        setDate_booking(BookingData.date_booking);
        setTime_booking(BookingData.time_booking);
        setDateend_booking(BookingData.dateend_booking);
        setTimeend_booking(BookingData.timeend_booking);
        setStatus_booking(BookingData.status_booking);
        setId_acces(BookingData.id_acces );
        setName_access(BookingData.name_acces );
        setId_user(BookingData.id_user);
        setFirstnameUser(BookingData.firstname);
      })
      .catch((err) => console.log(err));
  }, [id]);
  const [selectedRoom2, setSelectedRoom2] = useState("");
  const [selectedAgency2, setSelectedAgency2] = useState("");
  const [selectedAccessorie2, setSelectedAccessorie2] = useState("");
  const [selectedUser2, setSelectedUser2] = useState("");

  const [dataroom2, setDataroom2] = useState([]);
  const [dataagency2, setDataagency2] = useState([]);
  const [dataaccessorie2, setDataaccessorie2] = useState([]);
  const [dataUser2, setDataUser2] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/showroom/")
      .then((res) => {
        setDataroom2(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8081/showagency")
      .then((res) => {
        setDataagency2(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8081/showaccess")
      .then((res) => {
        setDataaccessorie2(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8081/showmember")
      .then((res) => {
        setDataUser2(res.data);
      })
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

  const handleSubmitEditBooking = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:8081/bookingedit/" + id, {
        id_room,
        agency_id,
        telnumber,
        people_amount,
        discription,
        date_booking,
        time_booking,
        dateend_booking,
        timeend_booking,
        status_booking,
        id_acces,
        id_user,
      })
      .then((res) => {
        if (res.data.Status === "OK") {
          navigate("/booking");
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


  const handleChangeRoom = (event) => {
    const selectedValue = event.target.value;
    setRoom_name(room_name);
    setId_room(selectedValue);
    setSelectedRoom2(selectedValue)
  };
  const handleChangeAgency= (event) => {
    const selectedValue = event.target.value;
    setAgency_name(agency_name);
    setAgency_id(selectedValue);
    setSelectedAgency2(selectedValue)
  };
  const handleChangeAcces = (event) => {
    const selectedValue = event.target.value;
    setName_access(name_acces);
    setId_acces(selectedValue);
    setSelectedAccessorie2(selectedValue)
  };
  const handleChangeUser = (event) => {
    const selectedValue = event.target.value;
    setFirstnameUser(firstnameUser);
    setId_user(selectedValue);
    setSelectedUser2(selectedValue)
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
          {prevBookingData.map((data, i) => (
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Edit room {data.nameacces}
            </h2>
          ))}
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="Edit-page">
            <form onSubmit={handleSubmitEditBooking}>
            <div className="textbox flex">

                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ห้องประชุม
                  </label>

                  <select
                    className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    multiple={false}
                    value={id_room}
                    required
                    onChange={handleChangeRoom}
                  >
                  {dataroom2.length > 0 ?
                  
                    dataroom2.map((data, i) => (
                      <option key={data.id} value={data.id} >
                        {data.room_name}
                      </option>
                    )) : ""}
                  </select>

                  
                </div>


                <div className="textbox">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    หน่วยงาน
                  </label>

                  <select className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    value={agency_id}
                    required
                    onChange={handleChangeAgency}
                    multiple={false}
                  >
                    <option value="">
                        โปรดเลือก
                    </option>
                    {dataagency2.length > 0 ?
                    dataagency2.map((data, i) => (
                      <option key={data.agency_id} value={data.agency_id}>
                        {data.agency_name}
                      </option>
                    )) : ""}
                  </select>
                </div>

              
              <div className="textbox">
                <label htmlFor="email">เบอร์</label>
                <input
                  type="text"
                  placeholder="qwdqwd"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={telnumber}
                  required
                  onChange={(event) => {
                    setTelnumber(event.target.value);
                  }}
                />
              </div>
              
              <div className="textbox">
                <label htmlFor="email">จำนวนผู้เข้าประชุม</label>
                <input
                  type="text"
                  placeholder="qwdqwd"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={people_amount}
                  required
                  onChange={(event) => {
                    setPeople_amount(event.target.value);
                  }}
                />
              </div>
              
              <div className="textbox">
                <label htmlFor="email">รายละเอียด</label>
                <textarea
                  type="text"
                  placeholder="qwdqwd"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={discription}
                  required
                  onChange={(event) => {
                    setDiscription(event.target.value);
                  }}
                />
              </div>
              
              <div className="textbox">
                <label htmlFor="email">วันที่จอง</label>
                <input
                  type="date"
                  placeholder="qwdqwd"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={date_booking}
                  required
                  onChange={(event) => {
                    setDate_booking(event.target.value);
                  }}
                />
              </div>
              
              <div className="textbox">
                <label htmlFor="email">เวลาที่จอง</label>
                <input
                  type="time"
                  placeholder="qwdqwd"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={time_booking}
                  required
                  onChange={(event) => {
                    setTime_booking(event.target.value);
                  }}
                />
              </div>
              
              <div className="textbox">
                <label htmlFor="email">วันที่่สิ้นสุดการประชุม</label>
                <input
                  type="date"
                  placeholder="qwdqwd"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={dateend_booking}
                  required
                  onChange={(event) => {
                    setDate_booking(event.target.value);
                  }}
                />
              </div>

              
              <div className="textbox">
                <label htmlFor="email">เวลาสิ้นสุดการประชุม</label>
                <input
                  type="time"
                  placeholder="qwdqwd"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={timeend_booking}
                  required
                  onChange={(event) => {
                    setTimeend_booking(event.target.value);
                  }}
                />
              </div>
              <div className="textbox">
                <label htmlFor="email">สถานะห้องประชุม</label>
                <input
                  type="text"
                  placeholder="qwdqwd"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={status_booking}
                  required
                  onChange={(event) => {
                    setStatus_booking(event.target.value);
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

                  <select className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    value={id_acces}
                    required
                    onChange={handleChangeAcces}
                    multiple={false}
                  >
                    {dataaccessorie2.length > 0 ?
                    dataaccessorie2.map((data, i) => (
                      <option key={data.id_acces} value={data.id_acces}>
                        {data.name_acces}
                      </option>
                    )) : ""}
                  </select>
                </div>
              
                <div className="textbox">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ผู้จอง
                  </label>

                  <select className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    value={id_user}
                    onChange={handleChangeUser}
                    multiple={false}
                    readonly
                  >
                    {dataUser2.length > 0 ?
                    dataUser2.map((data, i) => (
                      <option key={data.id_user} value={data.id_user}>
                        {data.firstname}
                      </option>
                    )) : ""}
                  </select>
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
                  to={"/booking"}
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

export default BookingEdit;
