import { React, useState, useEffect } from "react";
import { Link, useNavigate, } from "react-router-dom";

import axios from "axios";
import Sidebar from "../../components/Sidebar";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Report_employees() {

  const [showmemberdata, setShowmemberdata] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/showmemberDESC")
      .then((res) => setShowmemberdata(res.data))
      .catch((err) => console.log(err));
  }, []);
  const [search, setSearch] = useState("");
  
  let counter = 1;
  return (
    <div className="h-screen flex w-full">
      <div className="w-1/5">
        <Sidebar />
      </div>

      <div className="w-4/5">
        <div className="h-screen mt-5">
          <div className="text-center">
            <h1>รายงานผู้ใช้งาน</h1>
          </div>
          <form>
            <div className="relative flex items-center mt-5">
              <label htmlFor="" className="absolute ml-2 pointer-events-none">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </label>
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ค้นหา"
                className="flex w-96 rounded-md border-0 p-2 pl-10  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-xl placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </form>
          <table className="min-w-auto md:w-auto divide-y divide-gray-100 mt-5 table-fixed">
            <thead className="bg-indigo-500 border text-white ">
              <tr>
                <th
                  scope="col"
                  className="text-xl font-semibold px-6 py-4 text-left"
                >
                  #
                </th>

                <th
                  scope="col"
                  className="text-base  font-semibold px-6 py-4 text-left "
                >
                  อีเมล์
                </th>
                <th
                  scope="col"
                  className="text-base  font-semibold  px-6 py-4 text-left "
                >
                  รหัสผ่าน
                </th>
                <th
                  scope="col"
                  className="text-base  font-semibold  px-6 py-4 text-left "
                >
                  ชื่อจริง
                </th>
                <th
                  scope="col"
                  className="text-base  font-semibold  px-6 py-4 text-left "
                >
                  นามสกุล
                </th>
                <th
                  scope="col"
                  className="text-base  font-semibold  px-6 py-4 text-left"
                >
                  เบอร์โทร
                </th>
                <th
                  scope="col"
                  className="text-base  font-semibold  px-6 py-4 text-left "
                >
                  ตำแหน่ง
                </th>
                <th
                  scope="col"
                  className="text-base  font-semibold  px-6 py-4 text-left"
                ></th>
              </tr>
            </thead>
            <tbody className="">
              {showmemberdata
                 .filter((data) => {
                  const searchValue = search.trim().toLowerCase().split(' ').join('');
                  const firstname = data.firstname.toLowerCase().split(' ').join('');
                  const lastname = data.lastname.toLowerCase().split(' ').join('');
                  const email = data.email.toLowerCase().split(' ').join('');
              
                  return (
                    searchValue === "" ||
                    firstname.includes(searchValue) ||
                    lastname.includes(searchValue) ||
                    email.includes(searchValue)
                  );
                })
                .map((data, i) => (
                  <tr className="bg-white border" key={i}>
                    <td className="text-sm text-gray-900 font-medium px-6 py-6 whitespace-nowrap">
                      {counter++}
                    </td>
                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                      {data.email}
                    </td>
                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                      {data.password}
                    </td>
                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                      {data.firstname}
                    </td>
                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                      {data.lastname}
                    </td>
                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                      {data.phonenumber}
                    </td>
                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                      {data.department}
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

export default Report_employees