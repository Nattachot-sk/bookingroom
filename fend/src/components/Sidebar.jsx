import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

{
  /** icon*/
}
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faChartPie } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faHouseUser } from "@fortawesome/free-solid-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function Sidebar() {
  const [open, setOpen] = useState(true);
  const [openreport, setOpenreport] = useState(false)
  const handleLogout = () => {
    Swal.fire({
      title: "ยืนยันการออกจากระบบ",
      text: "คุณแน่ใจหรือไม่ที่คุณต้องการออกจากระบบ ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    })
      .then((res) => {
        if (res.isConfirmed) {
          axios.get("http://localhost:8081/logout");
          location.reload(true);
        } else if (!res.isConfirmed) {
          setTimeout(function () {
            location.reload(1);
          }, 1000);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <aside className="fixed h-full z-50 font-[Hind] font-medium">
        <div className="h-screen ">
          <div
            className={` ${open ? "w-80" : "w-24"
              } bg-royal-blue h-screen p-5 relative duration-300`}
          >
            <div className="h-5 flex">
              <button
              className={`absolute cursor-pointer -right-5 top-16 w-[54px] h-[54px] border-dark-purple  hover:bg-blue-gray
              border-2 rounded-full bg-white  ${!open && "rotate-180"}`}
                   onClick={() => setOpen(!open)}
                   >
                   <FontAwesomeIcon icon={faArrowRight} className="w-full h-full"/>
              
              </button>
              
            </div>

            <div className="block gap-x-4 items-center w-[140px] pl-8 mt-2">
              <Link to={"/admin"}>
                <img
                  src="./src/assets/TRUlogo.png"
                  className={`cursor-pointer duration-500 ${!open && "rotate-[360deg] w-20 -m-12"
                    }`}
                />
              </Link>
              <h1
                className={`text-white origin-left font-medium text-lg duration-200 ${!open && "scale-0"
                  }`}
              >
                Admin Page
              </h1>
            </div>
            <ul className="mt-5 grid grid-rows-5  gap-y-3 w-32 relative">
              <li
                className={`text-white origin-left font-medium  p-3 hover:bg-blue-gray hover:text-black rounded-md w-full transition duration-300 ease-in-out hover:translate-x-2   ${!open && "scale-0"
                  }`}
              >
                <Link to={"/admin"} className="w-64  py-3 text-sm">
                  <button className="w-full h-full pl-10 text-left">
                    <FontAwesomeIcon icon={faChartPie} className="pr-5 " />
                    Dashboard
                  </button>

                </Link>
              </li>
              <li
                className={`text-white origin-left font-medium   p-3 hover:bg-blue-gray hover:text-black rounded-md transition duration-300 ease-in-out hover:translate-x-2 ${!open && "scale-0"
                  }`}
              >
                <Link to={"/employees"} className="w-64 py-3 text-sm">
                  <button className="w-full h-full pl-10 text-left">
                    <FontAwesomeIcon icon={faUser} className="pr-5" />
                    จัดการพนักงาน
                  </button>

                </Link>
              </li>
              <li
                className={`text-white origin-left font-medium   p-3 hover:bg-blue-gray hover:text-black rounded-md transition duration-300 ease-in-out hover:translate-x-2 ${!open && "scale-0"
                  }`}
              >
                <Link to={"/room"} className="w-64  text-sm">
                  <button className="w-full h-full pl-10 text-left">
                    <FontAwesomeIcon icon={faHouseUser} className="pr-5" />
                    จัดการห้องประชุม
                  </button>

                </Link>
              </li>
              <li
                className={`text-white origin-left font-medium   p-3 hover:bg-blue-gray hover:text-black rounded-md transition duration-300 ease-in-out hover:translate-x-2 ${!open && "scale-0"
                  }`}
              >
                <Link to={"/agency"} className="w-64  text-sm">
                  <button className="w-full h-full pl-10 text-left">
                    <FontAwesomeIcon icon={faHouseUser} className="pr-5" />
                    จัดการแผนก
                  </button>

                </Link>
              </li>
              <li
                className={`text-white origin-left font-medium   p-3 hover:bg-blue-gray hover:text-black rounded-md transition duration-300 ease-in-out hover:translate-x-2 ${!open && "scale-0"
                  }`}
              >
                <Link to={"/booking"} className="w-64  text-sm">
                  <button className="w-full h-full pl-10 text-left">
                    <FontAwesomeIcon icon={faKey} className="pr-5" />
                    จัดการจองห้องประชุม
                  </button>

                </Link>
              </li>
              <li
                className={`text-white origin-left font-medium   p-3 hover:bg-blue-gray hover:text-black rounded-md transition duration-300 ease-in-out hover:translate-x-2 ${!open && "scale-0"
                  }`}
              >
                <Link to={"/accessorie"} className="w-64  text-sm">
                  <button className="w-full h-full pl-10 text-left">
                    <FontAwesomeIcon icon={faBook} className="pr-5" />
                    จัดการอุปกรณ์
                  </button>

                </Link>
              </li>
              <li
                className={`text-white origin-left font-medium text-sm  p-3 hover:bg-blue-gray hover:text-black rounded-md transition duration-300 ease-in-out  ${!open && "scale-0"
                  }`}
              >
                <div className="relative ">
                  <button onClick={() => setOpenreport((prev) => !prev)}
                    className="w-64 px-10 flex text-sm ">

                    <div className="pt-0">
                      {!openreport ? (
                        <FontAwesomeIcon icon={faBookmark} className="pr-5" />

                      ) : (
                        <FontAwesomeIcon icon={faBookmark} className="pr-5" />
                      )}

                    </div>
                    <div>
                      <p>รายงาน</p>
                    </div>

                  </button>
                  {openreport && (
                    <div className="absolute  w-full h-8 mt-3 rounded-lg">
                      <ul className="w-full h-64 bg-[#bae6fd] rounded-lg overflow-y-scroll ">
                        <li
                          className={`text-white origin-left font-medium text-sm  p-3 hover:bg-indigo-400 hover:text-black rounded-md  ${!open && "scale-0"
                            }`}
                        >
                          <Link to={"/reportemployees"} className="w-64 px-1 text-black ">
                            <button className="w-full h-full text-left">
                              <FontAwesomeIcon icon={faUser} className="pr-5" />
                              รายงานสมาชิก
                            </button>
                          </Link>
                        </li>
                        <li
                          className={`text-white origin-left font-medium text-sm  p-3 hover:bg-indigo-400 hover:text-black rounded-md  ${!open && "scale-0"
                            }`}
                        >
                          <Link to={"/reportroom"} className="w-64 px-1 text-black">
                            <button className="w-full h-full text-left">
                              <FontAwesomeIcon icon={faUser} className="pr-5" />
                              รายงานห้องประชุม
                            </button>
                          </Link>
                        </li>
                        <li
                          className={`text-white origin-left font-medium text-sm  p-3 hover:bg-indigo-400 hover:text-black rounded-md  ${!open && "scale-0"
                            }`}
                        >
                          <Link to={"/reportbooking"} className="w-64 px-1 text-black">
                            <button className="w-full h-full text-left">
                              <FontAwesomeIcon icon={faUser} className="pr-5" />
                              รายงานการจองห้องประชุม
                            </button>
                          </Link>
                        </li>
                        <li
                          className={`text-white origin-left font-medium text-sm  p-3 hover:bg-indigo-400 hover:text-black rounded-md  ${!open && "scale-0"
                            }`}
                        >
                          <Link to={"/reportmemberbooking"} className="w-64 px-1 text-black">
                            <button className="w-full h-full text-left">
                              <FontAwesomeIcon icon={faUser} className="pr-5" />
                              รายงานผู้จอง
                            </button>
                          </Link>
                        </li>
                        <li
                          className={`text-white origin-left font-medium text-sm  p-3 hover:bg-indigo-400 hover:text-black rounded-md  ${!open && "scale-0"
                            }`}
                        >
                          <Link to={"/reportacces"} className="w-64 px-1 text-black ">
                            <button className="w-full h-full text-left">
                              <FontAwesomeIcon icon={faUser} className="pr-5" />
                              รายงานอุปกรณ์
                            </button>
                          </Link>
                        </li>
                        <li
                          className={`text-white origin-left font-medium text-sm  p-3 hover:bg-indigo-400 hover:text-black rounded-md  ${!open && "scale-0"
                            }`}
                        >
                          <Link to={"/reportroompoppular"} className="w-64 px-1 text-black">
                            <button className="w-full h-full text-left">
                              <FontAwesomeIcon icon={faUser} className="pr-5" />
                              รายงานห้องประชุมที่ใช้บ่อย
                            </button>
                          </Link>
                        </li>
                        {/* <li
                          className={`text-white origin-left font-medium text-sm  p-3 hover:bg-indigo-400 hover:text-black rounded-md  ${!open && "scale-0"
                            }`}
                        >
                          <Link to={"/reportmemberpoppular"} className="w-64 px-1 text-black">
                            <button className="w-full h-full text-left">
                              <FontAwesomeIcon icon={faUser} className="pr-5" />
                              รายงานผู้ใช้งานสูงสุด 10 อันดับ
                            </button>
                          </Link>
                        </li> */}
                        


                      </ul>
                    </div>

                  )

                  }
                  

                </div>

              </li>
              <li
                className={`text-white origin-left font-medium   p-3 hover:bg-blue-gray hover:text-black rounded-md transition duration-300 ease-in-out hover:translate-x-2 ${!open && "scale-0"
              }`}
                        >
                          <Link to={"/showroomuser"} className="w-64 px-1 text-indigo-500">
                            <button className="w-full h-full text-left">
                             
                              ไปยังหน้า User
                            </button>
                          </Link>
                        </li>




              <div className="mt-[120px]">
                <li
                  className={`text-rose-600 origin-left font-medium text-lg duration-200   ${!open && "scale-0"
                    }`}
                >
                  <button
                    className="p-2 transition duration-300 ease-in-out hover:translate-x-6 "
                    onClick={handleLogout}
                  >
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    <span className="font-bold p-2 text-xl">Logout</span>
                  </button>
                </li>
              </div>
            </ul>
          </div>

        </div>
      </aside>
    </>
  );
}
export default Sidebar;
