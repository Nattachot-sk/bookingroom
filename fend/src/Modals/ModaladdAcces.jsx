import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function ModaladdAcces({ setOpenModal }) {
    const [addAccesName, setAddAccesName] = useState("");
    const [addAccessAmount, setAddrAccessAmount] = useState("");


    const handleSubmitAddAcces = (event) => {
        event.preventDefault();
        axios
          .post("http://localhost:8081/addacces", {
            addAccesName: addAccesName,
            addAccessAmount: addAccessAmount
          })
          .then((res) => {
            if (res.data.Status === "AddOK") {
                Swal.fire({
                    icon: "success",
                    title: "คุณทำการเพิ่มอุปกรณ์สำเร็จ !!!",
                  });
                  setOpenModal(false);
                  setTimeout(function () {
                    location.reload(1);
                  }, 1000);
            } else if (res.data.Error === "insert fail") {
              Swal.fire({
                icon: "error",
                title: "ไม่สามารถเพิ่มอุปกรณ์ได้",
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
                    <h1 className="text-2xl font-bold">เพิ่มอุปกรณ์</h1>
                  </div>
                  <form onSubmit={handleSubmitAddAcces}>
                  <div className="textbox">
              <label htmlFor="roomname" className="block text-lg font-normal leading-6 text-gray-900 pr-5">ชื่ออุปกรณ์</label>
              <input
                type="text"
                placeholder="โปรดป้อนชื่ออุปกรณ์"
                name="addAccesName"
                required
                className="block w-full rounded-xl border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                onChange={(event) => {
                  setAddAccesName(event.target.value);
                }}
              />
            </div>
            <div className="textbox">
              <label htmlFor="roomamount" className="block text-lg font-normal leading-6 text-gray-900 pr-5">จำนวนอุปกรณ์</label>
              <input
                type="number"
                placeholder="โปรดใส่จำนวนอุปกรณ์"
                name="AccessAmount"
                className="block w-full rounded-xl border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                required
                onChange={(event) => {
                  setAddrAccessAmount(event.target.value);
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
