import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function Bookingshow() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [firstname, setFirstname] = useState("");
  const [role, setRole] = useState("");
  const [showbookingdata, setShowbookingdata] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  
  let counter = 1;



  useEffect(() => {
    axios
      .get("http://localhost:8081/bookingshow")
      .then((res) => setShowbookingdata(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmitDeleteroom = (id) => {
    Swal.fire({
      title: "ยืนยันการลบ",
      text: "คุณแน่ใจหรือไม่ที่ต้องการลบข้อมูลนี้?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then((res) => {
      if (res.isConfirmed) {
        axios.delete("http://localhost:8081/deleteroom/" + id);
        if (res.data.Status === "OK") {
          Swal.fire({
            icon: "success",
            title: "ลบ",
          });
        } else if (res.data.Error === "Delete fail") {
          Swal.fire({
            icon: "error",
            title: "ลบไม่สำเร็จ",
          });
        }
      }
    });
  };

  return (
    <>

            <table className="w-[720px] md:w-auto divide-y divide-gray-100 mt-5 table-fixed">                
                <thead className="bg-indigo-500 border text-white">
                  <tr>
                    <th
                      scope="col"
                      className="text-base  font-semibold  px-6 py-4 text-left"
                    >
                      #
                    </th>

                    <th
                      scope="col"
                      className="text-base  font-semibold  px-6 py-4 text-left"
                    >
                      ชื่อห้อง
                    </th>
                    <th
                      scope="col"
                      className="text-base  font-semibold  px-6 py-4 text-left"
                    >
                      แผนก
                    </th>
                    <th
                      scope="col"
                      className="text-base  font-semibold  px-6 py-4 text-left"
                    >
                      เบอร์โทร
                    </th>
                    <th
                      scope="col"
                      className="text-base  font-semibold  px-6 py-4 text-left"
                    >
                      จำนวนคนที่เข้าร่วมได้
                    </th>
                    <th
                      scope="col"
                      className="text-base  font-semibold  px-6 py-4 text-left"
                    >
                      รายละเอียด
                    </th>
                    <th
                      scope="col"
                      className="text-base  font-semibold  px-6 py-4 text-left"
                    >
                      วันที่เริ่มจอง
                    </th>
                    <th
                      scope="col"
                      className="text-base  font-semibold  px-6 py-4 text-left"
                    >
                      เวลาที่เริ่ม
                    </th>
                    <th
                      scope="col"
                      className="text-base  font-semibold  px-6 py-4 text-left"
                    >
                      วันที่จบ
                    </th>
                    <th
                      scope="col"
                      className="text-base  font-semibold  px-6 py-4 text-left"
                    >
                      เวลาที่จบ
                    </th>
                    <th
                      scope="col"
                      className="text-base  font-semibold  px-6 py-4 text-left"
                    >
                      สถานะห้อง
                    </th>
                    <th
                      scope="col"
                      className="text-base  font-semibold px-6 py-4 text-left"
                    >
                      อีเมล์
                    </th>
                    <th
                      scope="col"
                      className="text-base  font-semibold  px-6 py-4 text-left"
                    >
                      คนที่จอง
                    </th>
                    <th
                      scope="col"
                      className="text-base  font-semibold  px-6 py-4 text-left"
                    >
                      
                    </th>

                  </tr>
                </thead>
                <tbody>
                  {showbookingdata.map((data, i) => (
                    <tr className="bg-white border" key={i}>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {counter++}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {data.room_name}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {data.agency_name}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {data.telnumber}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {data.people_amount}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {data.discription}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {data.date_booking}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {data.time_booking}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {data.dateend_booking}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {data.timeend_booking}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {data.status_booking}
                      </td>
                      <td className="text-sm text-gray-900 font-light  whitespace-nowrap">
                        {data.email}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {data.firstname}
                      </td>

                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <Link
                            className="bg-amber-100 rounded-xl px-5 py-3"
                            to={`/bookingedit/` + data.id_booking}
                          >
                            <FontAwesomeIcon icon={faUserPen} />
                          </Link>
                          <button
                            className="bg-red-300 rounded-xl px-5 py-3"
                            onClick={() =>
                              handleSubmitDeleteroom(data.id_booking)
                            }
                          >
                            <FontAwesomeIcon icon={faTrashCan} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

    </>
  );
}

export default Bookingshow;
