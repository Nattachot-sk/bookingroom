import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../../components/Sidebar";


function Report_accessories() {

  const [showaccessdata, setShowaccessdata] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/showaccess")
      .then((res) => setShowaccessdata(res.data))
      .catch((err) => console.log(err));
  }, []);
  const [searchAcces, setSearchAcces] = useState("");
  
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

          <div className="overflow-hidden">
            <form>
              <div className="relative flex items-center mt-5">
                <label htmlFor="" className="absolute ml-2 pointer-events-none">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </label>
                <input
                  type="text"
                  onChange={(e) => setSearchAcces(e.target.value)}
                  placeholder="ค้นหา"
                  className="flex w-96 rounded-md border-0 p-2 pl-10  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-xl placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

            </form>
            <table className="min-w-auto md:w-auto divide-y divide-gray-100 mt-5 table-auto">
              <thead className="bg-indigo-500 border text-white">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium  px-6 py-4 text-left"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium  px-6 py-4 text-left "
                  >
                    ฃื่ออุปกรณ์
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium  px-6 py-4 text-left "
                  >
                    จำนวน
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium  px-6 py-4 text-left "
                  >

                  </th>
                </tr>
              </thead>
              <tbody>
                {showaccessdata
                  .filter((data) => {
                    return searchAcces.toLowerCase() === ""
                      ? data
                      : data.name_acces
                        .toLowerCase()
                        .includes(searchAcces);
                  })
                  .map((data, i) => (
                    <tr className="bg-white border" key={i}>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {counter++}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {data.name_acces}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {data.amount_acces}
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
    </div>
  )
}

export default Report_accessories