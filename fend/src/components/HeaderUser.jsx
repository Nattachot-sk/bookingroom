import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function HeaderUser({ datauser }) {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [firstname, setFirstname] = useState("");
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
          setRole(res.data.role);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
          navigate("/");
        }
      })
      .then((err) => console.log(err));
  }, []);
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
          setOpendropdown(false);
        }
      })
      .catch((err) => console.log(err));
  };
  const [opendropdown, setOpendropdown] = useState(false);

  return (
    <div className="w-full h-full p-3">
      <div className="grid grid-cols-3 justify-around items-center text-white">
        <div className="col-span-1 flex gap-2">
          <div className="">logo</div>
          <div>ระบบจองห้องประชุม</div>
        </div>
        <div className="col-span-1 ml-10">
          <div className="flex gap-5">
            <div>
              <Link to={"/showroomuser"}>ห้องประชุม</Link>
            </div>
            <div>
              <Link to={"/bookingroomuser"}>จองห้องประชุม</Link>
            </div>
            {/* <div>
                            ติดต่อเรา
                        </div> */}
          </div>
        </div>

        <div className="col-span-1">
          <div>
            {datauser.auth ? (
              <div className="flex gap-5 justify-end pr-10">
                <div className="flex gap-3">
                  {datauser.role === "admin" && (
                    <div>
                      <Link to={"/admin"}>กลับสู่หน้าแอดมิน</Link>
                    </div>
                  )}
                  <div className="">
                    <FontAwesomeIcon icon={faCircleUser} />
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setOpendropdown((prev) => !prev)}
                      className="flex gap-3"
                    >
                      <h3>You are atuhorized {datauser.firstname}</h3>
                      <div className="pt-0">
                        {!opendropdown ? (
                          <FontAwesomeIcon icon={faCaretDown} />
                        ) : (
                          <FontAwesomeIcon icon={faCaretUp} />
                        )}
                      </div>
                    </button>
                    {opendropdown && (
                      <div className="absolute ml-[120px] bg-red-500 w-16 h-8 rounded-lg">
                        <ul className="w-full">
                          <li className="text-black w-full pt-1">
                            <button onClick={handleLogout} className="w-full">
                              <FontAwesomeIcon icon={faRightFromBracket} />
                            </button>
                          </li>
                          <li></li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* <div>
                                        <button onClick={handleLogout}>logout</button>
                                    </div> */}
              </div>
            ) : (
              <div>
                <h3>{datauser.message}</h3>
                <h3>Login Now</h3>
                <Link to={"/"}>login</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderUser;
