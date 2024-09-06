import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function Modaleditmember({ setOpenModal }) {
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
              <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-red-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-red-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="mt-2 text-center sm:ml-4 sm:text-left">
                <div className="singup-page">
                  <h1>Sing up</h1>
                  <form onSubmit={handleSubmit}>
                    <div className="textbox flex items-center justify-between">
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 pr-5">Email</label>
                      <input
                        type="email"
                        placeholder="Enter your password"
                        name="email"
                        required
                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(event) => {
                          setEmail(event.target.value);
                        }}
                      />
                    </div>
                    <div className="textbox">
                      <label htmlFor="password">password</label>
                      <input
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        required
                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                        onChange={(event) => {
                          setPassword(event.target.value);
                        }}
                      />
                    </div>
                    <div className="textbox">
                      <label htmlFor="firstname">firstname</label>
                      <input
                        type="text"
                        placeholder="Enter your firstname"
                        name="firstname"
                        required
                        onChange={(event) => {
                          setFirstname(event.target.value);
                        }}
                      />
                    </div>
                    <div className="textbox">
                      <label htmlFor="lastname">lastname</label>
                      <input
                        type="text"
                        placeholder="Enter your lastname"
                        name="lastname"
                        required
                        onChange={(event) => {
                          setLastname(event.target.value);
                        }}
                      />
                    </div>
                    <div className="textbox">
                      <label htmlFor="department">department</label>
                      <input
                        type="text"
                        placeholder="Enter your department"
                        name="department"
                        required
                        onChange={(event) => {
                          setDepartment(event.target.value);
                        }}
                      />
                    </div>
                    <div className="textbox">
                      <label htmlFor="phonenumber">phonenumber</label>
                      <input
                        type="text"
                        placeholder="Enter your phonenumber"
                        name="phonenumber"
                        required
                        onChange={(event) => {
                          setPhonenumber(event.target.value);
                        }}
                      />
                    </div>
                    <div className="items-center gap-2 mt-3 sm:flex">
                      <button
                        className="w-full mt-2 p-2.5 flex-1 text-white bg-green-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                        type="submit"
                      >
                        ยืนยัน
                      </button>
                      <button
                        className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
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
