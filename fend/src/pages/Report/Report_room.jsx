import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import Sidebar from "../../components/Sidebar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";



function Report_room() {

  const [showroomdata, setShowroomdata] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/showroom")
      .then((res) => setShowroomdata(res.data))
      .catch((err) => console.log(err));
  }, []);

  const [searchRoom, setSearchRoom] = useState("");
  
  let counter = 1;

  return (
    <div className="h-screen flex w-full">
      <div className="w-1/5">
        <Sidebar />
      </div>
      <div className="w-4/5">
        <div className="h-screen mt-5">
          <div className="text-center">
            <h1>รายงานห้องประชุม</h1>
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
                onChange={(e) => setSearchRoom(e.target.value)}
                placeholder="ค้นหา"
                className="flex w-96 rounded-md border-0 p-2 py-2 pl-10  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-xl placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </form>
          <table className="min-w-auto md:w-auto divide-y divide-gray-100 mt-5 table-auto">
            <thead className="bg-indigo-500 border text-white">
              <tr>
                <th
                  scope="col"
                  className="text-sm font-medium  px-6 py-4 text-left "
                >
                  #
                </th>

                <th
                  scope="col"
                  className="text-sm font-medium  px-6 py-4 text-left "
                >
                  ชื่อห้อง
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium  px-6 py-4 text-left "
                >
                  จำนวนคนที่เข้าร่วมได้
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium  px-6 py-4 text-left "
                >
                  สถานที่
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium  px-6 py-4 text-left "
                >
                  รูปห้อง
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium  px-6 py-4 text-left "
                >
                  สถานะห้อง
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium  px-6 py-4 text-left "
                ></th>
              </tr>
            </thead>
            <tbody>
              {showroomdata
                .filter((data) => {
                  const searchValue = searchRoom.trim().toLowerCase().split(' ').join('');
                  const room_name = data.room_name.toLowerCase().split(' ').join('');
                  const room_amount = data.room_amount.toLowerCase().split(' ').join('');
                  const room_location = data.room_location.toLowerCase().split(' ').join('');

                  return (
                    searchValue === "" ||
                    room_name.includes(searchValue) ||
                    room_amount.includes(searchValue) ||
                    room_location.includes(searchValue)
                  );
                })
                .map((data, i) => (
                  <tr className="bg-white border" key={i}>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {counter++}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {data.room_name}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {data.room_amount}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {data.room_location}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <img src={`http://localhost:8081/images/` + data.images} alt="" className="w-48 h-48" />
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {data.status_room}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">

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

export default Report_room