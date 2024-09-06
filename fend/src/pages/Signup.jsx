import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [department, setDepartment] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [role, setRole] = useState("member");
  const navigate = useNavigate();

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
          navigate("/");
          Swal.fire({
            icon: "success",
            title: "You are signup Successfully!!!",
          });
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
 <div className="min-w-full min-h-screen flex items-center justify-center  bg-gradient-to-r from-purple-200 to-purple-600">
        <div className=" min-h-128 md:mx-auto grid grid-cols-2 w-3/5 relative ">
          <div className="col-span-1 bg-cover bg-[url('./src/assets/Signup-Background.png')] rounded-l-2xl">
            <div className=""></div>
          </div>
          <div className="col-span-1 bg-white">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                  className="mx-auto h-10 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  สมัครสมาชิก
                </h2>
              </div>

              <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm ">
                  <form onSubmit={handleSubmit}>
                    <div className="textbox">
                      <label htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900 ">อีเมล</label>
                      <input
                        type="email"
                        placeholder="โปรดใส่อีเมล"
                        name="email"
                        required
                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:pl-5  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                        onChange={(event) => {
                          setEmail(event.target.value);
                        }}
                      />
                    </div>
                    <div className="textbox">
                      <label htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900 ">รหัสผ่าน</label>
                      <input
                        type="password"
                        placeholder="โปรดใส่รหัสผ่าน"
                        name="password"
                        required
                        className="block w-full rounded-md border-0  py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:pl-5  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                        onChange={(event) => {
                          setPassword(event.target.value);
                        }}
                      />
                    </div>
                    <div className="textbox">
                      <label htmlFor="firstname"
                        className="block text-sm font-medium leading-6 text-gray-900 ">ชื่อ</label>
                      <input
                        type="text"
                        placeholder="โปรดใส่ชื่อ"
                        name="firstname"
                        required
                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 placeholder:pl-5  focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                        onChange={(event) => {
                          setFirstname(event.target.value);
                        }}
                      />
                    </div>
                    <div className="textbox">
                      <label htmlFor="lastname"
                        className="block text-sm font-medium leading-6 text-gray-900 ">นามสกุล</label>
                      <input
                        type="text"
                        placeholder="โปรดใส่นามสกุล"
                        name="lastname"
                        required
                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 placeholder:pl-5  focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                        onChange={(event) => {
                          setLastname(event.target.value);
                        }}
                      />
                    </div>
                    <div className="textbox">
                      <label htmlFor="department"
                        className="block text-sm font-medium leading-6 text-gray-900">แผนก</label>
                      <input
                        type="text"
                        placeholder="โปรดใส่แผนก"
                        name="department"
                        required
                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 placeholder:pl-5  focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                        onChange={(event) => {
                          setDepartment(event.target.value);
                        }}
                      />
                    </div>
                    <div className="textbox">
                      <label htmlFor="phonenumber"
                        className="block text-sm font-medium leading-6 text-gray-900 ">เบอร์โทรศัพท์</label>
                      <input
                        type="text"
                        placeholder="โปรดใส่เบอร์โทรศัพท์"
                        name="phonenumber"
                        required
                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 placeholder:pl-5  focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                        onChange={(event) => {
                          setPhonenumber(event.target.value);
                        }}
                      />
                    </div>
                    <button className="w-full h-12 mt-3 text-white px-3 py-1.5 text-sm font-semibold leading-6 bg-indigo-600 rounded-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="submit">
                      ยืนยันการสมัคร
                    </button>
                  </form>
                  <div className="flex justify-end ">
                  <p className="mt-10 text-center text-sm text-gray-500">
                  คุณมีบัญชีใช้งานแล้ว?{" "}
                    <Link to={"/"} className="bt-register text-blue-600 hover:underline">
                      เข้าสู่ระบบ
                    </Link>
                    </p>
                  </div>
             

              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  );
}

export default Signup;
