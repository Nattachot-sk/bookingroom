import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function Modaladduser({ setOpenModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [department, setDepartment] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [role, setRole] = useState("member");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/register", {
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
        department: department,
        phonenumber: phonenumber,
        role: role,
      })
      .then((res) => {
        if (res.data.Status === "OK") {
          Swal.fire({
            icon: "success",
            title: "You are signup Successfully!!!",
          });
          setOpenModal(false);
          setTimeout(function () {
            location.reload(1);
          }, 1000);
        } else if (res.data.Error === "Inter data error server") {
          Swal.fire({
            icon: "error",
            title: "emailนี้มีผู้ใช้งานแล้ว",
          });
        }
      })

      .then((err) => console.log(err));
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
                    <h1 className="text-2xl font-bold">สมัครสมาชิก</h1>
                  </div>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="textbox my-2">
                      <label htmlFor="email" className="block text-lg font-normal leading-6 text-gray-900 pr-5">อีเมล</label>
                      <input
                        type="email"
                        placeholder="โปรดป้อนอีเมล"
                        name="email"
                        required
                        className="block w-full rounded-xl border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(event) => {
                          setEmail(event.target.value);
                        }}
                      />
                    </div>
                    <div className="textbox my-2">
                      <label htmlFor="password" className="block text-lg font-normal leading-6 text-gray-900 pr-5">รหัสผ่าน</label>
                      <input
                        type="password"
                        placeholder="โปรดป้อนรหัสผ่าน"
                        name="password"
                        required
                        className="block w-full rounded-xl border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                        onChange={(event) => {
                          setPassword(event.target.value);
                        }}
                      />
                    </div>
                    <div className="textbox my-2">
                      <label htmlFor="firstname" className="block text-lg font-normal leading-6 text-gray-900 pr-5">ชื่อจริง</label>
                      <input
                        type="text"
                        placeholder="โปรดป้อนชื่อจริง"
                        name="firstname"
                        required
                        className="block w-full rounded-xl border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                        onChange={(event) => {
                          setFirstname(event.target.value);
                        }}
                      />
                    </div>
                    <div className="textbox my-2">
                      <label htmlFor="lastname" className="block text-lg font-normal leading-6 text-gray-900 pr-5">นามสกุล</label>
                      <input
                        type="text"
                        placeholder="โปรดป้อนนามสกุล"
                        name="lastname"
                        required
                        className="block w-full rounded-xl border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                        onChange={(event) => {
                          setLastname(event.target.value);
                        }}
                      />
                    </div>
                    <div className="textbox my-2">
                      <label htmlFor="department" className="block text-lg font-normal leading-6 text-gray-900 pr-5">แผนก</label>
                      <input
                        type="text"
                        placeholder="โปรดป้อนแผนก"
                        name="department"
                        required
                        className="block w-full rounded-xl border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                        onChange={(event) => {
                          setDepartment(event.target.value);
                        }}
                      />
                    </div>
                    <div className="textbox my-2">
                      <label htmlFor="phonenumber" className="block text-lg font-normal leading-6 text-gray-900 pr-5">เบอร์โทรศัพท์</label>
                      <input
                        type="text"
                        placeholder="โปรดป้อนเบอร์โทรศัพท์"
                        name="phonenumber"
                        required
                        className="block w-full rounded-xl border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                        onChange={(event) => {
                          setPhonenumber(event.target.value);
                        }}
                      />
                    </div>
                    <div className="items-center gap-2 mt-3 sm:flex">
                      <button
                        className="w-full mt-2 p-2.5 flex-1 text-white bg-green-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-300"
                        type="submit"
                      >
                        ยืนยัน
                      </button>
                      <button
                        className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-red-500 duration-300"
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
    </>
  );
}
