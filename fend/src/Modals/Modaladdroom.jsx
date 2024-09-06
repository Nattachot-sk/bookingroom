import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function Modaladdroom({ setOpenModal }) {
  const [addroomname, setAddroomname] = useState("");
  const [addroomamount, setAddroomamount] = useState("");
  const [addstatusroom, setAddstatusroom] = useState("");
  const [addroomlocation, setAddroomlocation] = useState("");

  const [file, setFile] = useState("");

  const [filename, setFilename] = useState("Choose File");

  const handleSubmitAddroom = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('images', file);
    formData.append('addroomname', addroomname);
    formData.append('addroomamount', addroomamount);
    formData.append('addroomlocation', addroomlocation);
    formData.append('addstatusroom', addstatusroom);
    axios
      .post("http://localhost:8081/addroom", formData)
      .then((res) => {
        if (res.data.Status === "AddOK") {
          Swal.fire({
            icon: "success",
            title: "คุณทำการเพิ่มห้องสำเร็จ !!!",
          });
          setOpenModal(false);
          setTimeout(function () {
            location.reload(1);
          }, 1000);
        } else if (res.data.Error === "insert fail") {
          Swal.fire({
            icon: "error",
            title: "ไม่สามารถเพิ่มห้องประชุมได้",
          });
        }
      });
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
                    <h1 className="text-2xl font-bold">เพิ่มห้องประชุม</h1>
                  </div>
                  <form onSubmit={handleSubmitAddroom}>
                    <div className="textbox">
                      <label htmlFor="roomname" className="block text-sm font-medium leading-6 text-gray-900 pr-5">ชื่อห้องประชุม</label>
                      <input
                        type="text"
                        placeholder="โปรดป้อนชื่อห้องประชุม"
                        name="addroomname"
                        className="block w-full rounded-xl border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                        required
                        onChange={(event) => {
                          setAddroomname(event.target.value);
                        }}
                      />
                    </div>
                    <div className="textbox">
                      <label htmlFor="roomamount" className="block text-sm font-medium leading-6 text-gray-900 pr-5">จำนวนคนที่เข้าร่วมได้</label>
                      <input
                        type="text"
                        placeholder="โปรดป้อนจำนวนที่เข้าร่วมได้"
                        name="addroomamount"
                        required
                        className="block w-full rounded-xl border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                        onChange={(event) => {
                          setAddroomamount(event.target.value);
                        }}
                      />
                    </div>
                    <div className="textbox">
                      <label htmlFor="roomamount" className="block text-sm font-medium leading-6 text-gray-900 pr-5">สถานที่ห้องประชุม</label>
                      <input
                        type="text"
                        placeholder="โปรดป้อนสถานที่ห้องประชุม"
                        name="addroomlocation"
                        required
                        className="block w-full rounded-xl border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                        onChange={(event) => {
                          setAddroomlocation(event.target.value);
                        }}
                      />
                    </div>
                    <div className="textbox">
                      <label htmlFor="file_input" className="block mb-2 text-sm font-medium text-gray-900" >Uplode รูปภาพห้องประชุม</label>
                      <input
                        type="file"
                        placeholder="รูปห้องประชุม"
                        name="fileimg"
                        required
                        className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  dark:placeholder-gray-400"
                        onChange={(event) => {
                          setFile(event.target.files[0]);
                        }}
                      />
                    </div>
                    <div className="textbox">
                      <label htmlFor="statusroom" className="block text-sm font-medium leading-6 text-gray-900 pr-5">สถานที่ห้องประชุม</label>
                      <input
                        type="text"
                        placeholder="โปรดป้อนสถานะห้องประชุม"
                        name="addstatusroom"
                        className="block w-full rounded-xl border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                        required
                        onChange={(event) => {
                          setAddstatusroom(event.target.value);
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
