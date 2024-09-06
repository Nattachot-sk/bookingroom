import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../../components/Sidebar";

function Report_roomPoppular() {


    const [showbookingdata, setShowbookingdata] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:8081/bookingshowpoppular")
            .then((res) => setShowbookingdata(res.data))
            .catch((err) => console.log(err));
    }, []);
    console.log(showbookingdata)

    let counter = 1;
    const [searchBooking, setSearchBooking] = useState("");
    return (
        <div className="h-screen flex w-full">
            <div className="w-1/5">
                <Sidebar />
            </div>
            <div className="w-4/5 h-screen">
                <div className="h-screen mt-5">
                    <div className="text-center">
                        <h1>รายงานห้องประชุมที่ใช้บ่อย</h1>
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
                                    ชื่อห้องประชุม
                                </th>
                                <th
                                    scope="col"
                                    className="text-base  font-semibold  px-6 py-4 text-left"
                                >
                                    จำนวนที่มีการจอง
                                </th>
                                <th
                                    scope="col"
                                    className="text-base  font-semibold  px-6 py-4 text-left"
                                >
                                    จำนวนคนที่สามารถเข้าร่วมได้
                                </th>
                                <th
                                    scope="col"
                                    className="text-base  font-semibold  px-6 py-4 text-left"
                                >
                                    สถานที่
                                </th>
                                <th
                                    scope="col"
                                    className="text-base  font-semibold  px-6 py-4 text-left"
                                >
                                    รูปห้องประชุม
                                </th>


                            </tr>
                        </thead>
                        <tbody>
                            {showbookingdata

                                .map((data, i) => (
                                    <tr className="bg-white border" key={i}>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {counter++}
                                        </td>

                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {data.room_name}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {data.usage_count}
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
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Report_roomPoppular