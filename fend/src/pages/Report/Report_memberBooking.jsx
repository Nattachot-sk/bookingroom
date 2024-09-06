import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../../components/Sidebar";

function Report_memberBooking() {
    const [showbookingdata, setShowbookingdata] = useState([]);
    useEffect(() => {
      axios
        .get("http://localhost:8081/bookingshow")
        .then((res) => setShowbookingdata(res.data))
        .catch((err) => console.log(err));
    }, []);
  
    const [searchBooking, setSearchBooking] = useState("");

    let counter = 1;

  return (
 <div className="h-screen flex w-full">
      <div className="w-1/5">
        <Sidebar />
      </div>
      <div className="w-4/5 h-screen">
        <div className="h-screen mt-5">
          <div className="text-center">
            <h1>รายงานการจองห้องประชุม</h1>
          </div>
          <form>
            <div className="relative flex items-center mt-5">
              <label
                htmlFor=""
                className="absolute ml-2 pointer-events-none"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </label>
              <input
                type="text"
                onChange={(e) => setSearchBooking(e.target.value)}
                placeholder="ค้นหา"
                className="flex w-96 rounded-md border-0 p-2 py-2 pl-10  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-xl placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </form>
          <table className="min-w-[720px] md:w-auto divide-y divide-gray-100 mt-5 table-auto">
            <thead className="bg-indigo-500 border text-white">
              <tr>
                <th
                  scope="col"
                  className="text-base  font-semibold  px-6 py-4 text-left"
                >
                  #
                </th>

                <th
                  scope="col"
                  className="text-base  font-semibold  px-6 py-4 text-left"
                >
                  อีเมล์ผู้จอง
                </th>
                <th
                  scope="col"
                  className="text-base  font-semibold  px-6 py-4 text-left"
                >
                  ชื่อผู้จอง
                </th>
                <th
                  scope="col"
                  className="text-base  font-semibold  px-6 py-4 text-left"
                >
                  แผนกผู้จอง
                </th>
                <th
                  scope="col"
                  className="text-base  font-semibold  px-6 py-4 text-left"
                >
                  เบอร์โทร
                </th>
                <th
                  scope="col"
                  className="text-base  font-semibold  px-6 py-4 text-left"
                >
                  ห้องที่จอง
                </th>
                <th
                  scope="col"
                  className="text-base  font-semibold  px-6 py-4 text-left"
                >
                  สถานที่จอง
                </th>
                <th
                  scope="col"
                  className="text-base  font-semibold  px-6 py-4 text-left"
                >
                  วันที่เริ่มจอง
                </th>
                <th
                  scope="col"
                  className="text-base  font-semibold  px-6 py-4 text-left"
                >
                  เวลาที่เริ่ม
                </th>
                <th
                  scope="col"
                  className="text-base  font-semibold  px-6 py-4 text-left"
                >
                  วันที่จบ
                </th>
                <th
                  scope="col"
                  className="text-base  font-semibold  px-6 py-4 text-left"
                >
                  เวลาที่จบ
                </th>
                <th
                  scope="col"
                  className="text-base  font-semibold  px-6 py-4 text-left"
                >
                  อุปกรณ์ที่เอาเข้าร่วม
                </th>

              </tr>
            </thead>
            <tbody>
              {showbookingdata
                .filter((data) => {
                  const searchValue = searchBooking.trim().toLowerCase().split(' ').join('');
                  const room_name = data.room_name.toLowerCase().split(' ').join('');
                  const room_amount = data.room_amount.toLowerCase().split(' ').join('');
                  const room_location = data.room_location.toLowerCase().split(' ').join('');
                  const telnumber = data.telnumber.toLowerCase().split(' ').join('');
                  const people_amount = data.people_amount.toLowerCase().split(' ').join('');
                  const discription = data.discription.toLowerCase().split(' ').join('');
                  const date_booking = data.date_booking.toLowerCase().split(' ').join('');
                  const dateend_booking = data.dateend_booking.toLowerCase().split(' ').join('');
                  const time_booking = data.time_booking.toLowerCase().split(' ').join('');
                  const timeend_booking = data.timeend_booking.toLowerCase().split(' ').join('');

                  const email = data.email.toLowerCase().split(' ').join('');
                  const firstname = data.firstname.toLowerCase().split(' ').join('');
                  const lastname = data.lastname.toLowerCase().split(' ').join('');
                  const agency_name = data.agency_name.toLowerCase().split(' ').join('');
                  const name_acces = data.name_acces.toLowerCase().split(' ').join('');

                  return (
                    searchValue === "" ||
                    room_name.includes(searchValue) ||
                    room_amount.includes(searchValue) ||
                    room_location.includes(searchValue) ||
                    telnumber.includes(searchValue) ||
                    people_amount.includes(searchValue) ||
                    discription.includes(searchValue) ||
                    date_booking.includes(searchValue) ||
                    dateend_booking.includes(searchValue) ||
                    time_booking.includes(searchValue) ||
                    timeend_booking.includes(searchValue) ||
                    email.includes(searchValue) ||
                    firstname.includes(searchValue) ||
                    lastname.includes(searchValue) ||
                    agency_name.includes(searchValue) ||
                    name_acces.includes(searchValue)
                  );
                })
                .map((data, i) => (
                  <tr className="bg-white border" key={i}>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {counter++}
                    </td>
                    <td className="text-sm text-gray-900 font-light  whitespace-nowrap">
                      {data.email}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {data.firstname} {''} {data.lastname}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {data.agency_name}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {data.telnumber}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {data.room_name}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {data.room_location}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {data.date_booking}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {data.time_booking}{"น."}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {data.dateend_booking}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {data.timeend_booking}{"น."}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {data.name_acces}
                    </td> 
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Report_memberBooking