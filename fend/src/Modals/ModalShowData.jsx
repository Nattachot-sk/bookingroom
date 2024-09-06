import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function ModalShowData({ setOpenModal2,  id }) {


    const [showbookingdata, setShowbookingdata] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:8081/showbookingUser/" + id)
            .then((res) => setShowbookingdata(res.data))
            .catch((err) => console.log(err));
    }, []);


    const [searchRoom, setSearchRoom] = useState("");



    return (
        <>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div
                    className="fixed inset-0 w-full h-full bg-black opacity-40"
                    onClick={() => setOpenModal2(false)}
                ></div>
                <div className="flex items-center min-h-screen px-4 py-8">
                    <div className="relative w-full max-w-xl p-4 mx-auto bg-white rounded-md shadow-lg ">
                        <div className="mt-3 sm:block">
                            <div className="flex items-center justify-center flex-none w-full h-[50px] mx-auto ">
                                <div>
                                    <h1 className="font-bold text-xl">รายละเอียดการจอง</h1>
                                </div>
                            </div>
                            <div className="flex items-center justify-center mx-auto  text-center ">

                                <div className="flex items-center justify-center mx-auto">
                                    {showbookingdata
                                        .map((data, i) => (
                                            <div className="block" key={data.id}>
                                                <div className="hidden " >
                                                    {data.id_booking}
                                                </div>
                                                <div className="w-full h-full" >
                                                    <img src={`http://localhost:8081/images/`+ data.images} alt="" className="mx-auto w-[200px] h-[200px]"/>
                                                </div>
                                                <div className="flex gap-3 mt-5 ">
                                                    <h1>ชื่อผู้จอง : </h1>
                                                    <h1>{data.firstname} {data.lastname}</h1>
                                                </div>
                                                <div className="flex gap-3 mt-5 ">
                                                    <h1>ชื่อห้องประชุม : </h1>
                                                    <h1>{data.room_name}</h1>
                                                </div>
                                                <div className="flex gap-3 mt-5 ">
                                                    <h1>แผนก : </h1>
                                                    <h1>{data.agency_name}</h1>
                                                </div>
                                                <div className="flex gap-3 mt-5 ">
                                                    <h1>เบอร์โทร : </h1>
                                                    <h1>{data.telnumber}</h1>
                                                </div>
                                                <div className="flex gap-3 mt-5 ">
                                                    <h1>จำนวนคนที่เข้าร่วม : </h1>
                                                    <h1>{data.people_amount}</h1>
                                                </div>
                                                <div className="flex gap-3 mt-5 ">
                                                    <h1>รายละเอียด : </h1>
                                                    <h1>{data.discription}</h1>
                                                </div>
                                                <div className="flex gap-3 mt-5 ">
                                                    <h1>เวลาที่จอง : </h1>
                                                    <h1>{data.time_booking} {"น."} {"- "} {data.timeend_booking} {"น."}</h1>
                                                </div>
                                                <div className="flex gap-3 mt-5 ">
                                                    <h1>วันที่จอง : </h1>
                                                    <h1>{data.date_booking}</h1>
                                                </div>
                                                <div className="flex gap-3 mt-5 ">
                                                    <h1>อุปกรณ์ : </h1>
                                                    <h1>{data.name_acces}</h1>
                                                </div>

                                                <div className="items-center gap-2 mt-3 sm:flex">
                                                    <button
                                                        className="w-full mt-2 p-2.5 flex-1 bg-red-600 text-white rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 hover:text-black hover:underline"
                                                        onClick={() => setOpenModal2(false)}
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
