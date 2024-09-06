import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function ModalDetailroom({ setOpenModal, id }) {

    console.log(id)

    const [searchRoom, setSearchRoom] = useState("");
    const [showroomdata, setShowroomdata] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:8081/showroomUser/" + id)
            .then((res) => setShowroomdata(res.data))
            .catch((err) => console.log(err));
    }, []);


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
                                <div className="flex items-center justify-center flex-none w-full h-[50px] mx-auto ">
                                    <div>
                                        <h1 className="font-bold text-xl">รายละเอียดห้องประชุม</h1>
                                    </div>
                                </div>
                            <div className="flex items-center justify-center mx-auto  text-center ">

                                <div className="flex items-center justify-center mx-auto">
                                    {showroomdata
                                        .map((data, i) => (
                                            <div className="block" key={data.id}>

                                                <div className="hidden " >
                                                    {data.id}
                                                </div>

                                                <div className="flex gap-3 mt-5 ">
                                                    <h1>ชื่อห้องประชุม : </h1>
                                                    <h1>{data.room_name}</h1>
                                                </div>
                                                <div className="flex gap-3 mt-5">
                                                    <h1>จำนวนคนที่สามารถเข้าร่วมได้ :</h1>
                                                    <h1>{data.room_amount} คน</h1>
                                                </div>
                                                <div className="flex gap-3 mt-5">
                                                    <h1>สถานที่ห้องประชุม :</h1>
                                                    <h1>{data.room_location} คน</h1>
                                                </div>
                                                <div className="flex gap-3 mt-5">
                                                    <h1 className="mt-2">สถานะห้อง :</h1>
                                                    <h1 className=" bg-green-300 p-2 rounded-xl">เปิดตามปกติ</h1>
                                                </div>
                                                <div className="mt-5 ">
                                                    <img src={`http://localhost:8081/images/` + data.images} alt="" className="w-[300px] h-[300px]" />
                                                </div>

                                                <div className="items-center gap-2 mt-3 sm:flex">

                                                    <Link to={"/bookingroomuser"} className="w-full mt-2 p-2.5 flex-1 text-white bg-green-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2 hover:text-black hover:underline">จองห้องประชุม</Link>

                      <button
                        className="w-full mt-2 p-2.5 flex-1 bg-red-600 text-white rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 hover:text-black hover:underline"
                        onClick={() => setOpenModal(false)}
                      >
                        ปิด
                      </button>
                    </div>
                                            </div>

                                        ))}

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
