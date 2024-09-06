import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8081/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.Status === "OK") {
          if (res.data.role === "admin") {
            navigate("/admin");
            Swal.fire({
              position: "top",
              icon: "success",
              title: "Admin Login success",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            navigate("/showroomuser");
            Swal.fire({
              position: "top",
              icon: "success",
              title: "User login success",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        } else {
          Swal.fire({
            position: "top",
            icon: "error",
            title: res.data.Error,
            showConfirmButton: false,
          });
        }
      })
      .then((err) => console.log(err));
  };

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8  bg-gradient-to-r from-purple-200 to-purple-100">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            โปรดล็อคอินเข้าสู่ระบบ
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium leading-6 text-gray-900 mt-10"
              >
                อีเมล
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="โปรดป้อนอีเมลของคุณ"
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-lg font-medium leading-6 text-gray-900"
                >
                  รหัสผ่าน
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="โปรดป้อนรหัสผ่านของคุณ"
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-3  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                ยืนยันเข้าสู่ระบบ
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            สมัครการใช้งาน?{" "}
            <Link
              to={"/signup"}
              className="bt-register font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              สมัครสมาชิก
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
