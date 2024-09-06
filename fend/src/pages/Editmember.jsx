import { React, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import axios from "axios";

import Sidebar from "../components/Sidebar";

function Editmember() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [department, setDepartment] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("");
  const [iduser, setIduser] = useState("");

  const { id } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:8081/showmember/" + id)
      .then((res) => {
        const memberData = res.data[0];

        setEmail(memberData.email);
        setPassword(memberData.password);
        setFirstname(memberData.firstname);
        setLastname(memberData.lastname);
        setDepartment(memberData.department);
        setPhonenumber(memberData.phonenumber);
      })
      .catch((err) => console.log(err));
  }, [id]);

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

  const handleSubmiteditmember = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:8081/editmember/" + id, {
        email,
        password,
        firstname,
        lastname,
        department,
        phonenumber,
      })
      .then((res) => {
        if (res.data.Status === "OK") {
          navigate("/employees");
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

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            กำลังแก้ไขไอดีที่ {iduser}
          </h2>
          <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            ชื่อ {firstname}
          </h2>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmiteditmember}>
            <div className="block">
              <div className="textbox">
                <label
                  htmlFor="email"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  อีเมล
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>

              <div className="textbox">
                <label
                  htmlFor="password"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  รหัสผ่าน
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={password}
                  readOnly
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="flex gap-5">
              <div className="textbox">
                <label
                  htmlFor="firstname"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  ชื่อจริง
                </label>
                <input
                  type="text"
                  placeholder="Enter your firstname"
                  name="firstname"
                  required
                  value={firstname}
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(event) => {
                    setFirstname(event.target.value);
                  }}
                />
              </div>
              <div className="textbox">
                <label
                  htmlFor="lastname"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  นามสกุล
                </label>
                <input
                  type="text"
                  placeholder="Enter your lastname"
                  name="lastname"
                  required
                  value={lastname}
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(event) => {
                    setLastname(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="textbox">
              <label
                htmlFor="department"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                แผนก
              </label>
              <input
                type="text"
                placeholder="Enter your department"
                name="department"
                required
                value={department}
                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(event) => {
                  setDepartment(event.target.value);
                }}
              />
            </div>
            <div className="textbox">
              <label
                htmlFor="phonenumber"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                เบอร์โทรศัพท์
              </label>
              <input
                type="text"
                placeholder="Enter your phonenumber"
                name="phonenumber"
                required
                value={phonenumber}
                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(event) => {
                  setPhonenumber(event.target.value);
                }}
              />
            </div>
            <div className="flex justify-between mt-5">
              <button
                className=" bg-blue-500 hover:bg-blue-400  p-2 rounded-md"
                type="submit"
              >
                ยืนยันการแก้ไข
              </button>
              <Link
                className="bg-red-500  hover:bg-red-300  p-2 rounded-md"
                to={"/employees"}
              >
                ยกเลิก
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Editmember;
