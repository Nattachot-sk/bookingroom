import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Showroom() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [firstname, setFirstname] = useState("");
  const [role, setRole] = useState("");
  const [showroomdata, setShowroomdata] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  
  let counter = 1;

  const [searchRoom, setSearchRoom] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8081/showroom")
      .then((res) => setShowroomdata(res.data))
      .catch((err) => console.log(err));
  }, []);
  const startIndex = (page - 1) * limit;
  const displayedProducts = showroomdata.slice(
    startIndex,
    startIndex + limit
  );

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:8081/admin")
      .then((res) => {
        if (res.data.Status === "OK") {
          setAuth(true);
          setFirstname(res.data.firstname);
          setRole(res.data.role);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
          navigate("/");
        }
      })
      .then((err) => console.log(err));
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
  const handleChangeLimit = (event) => {
    setLimit(Number(event.target.value));
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className=" container overflow-hidden">
              <form>
                <div className="relative flex items-center mt-5">
                  <label
                    htmlFor=""
                    className="absolute ml-2 pointer-events-none"
                  >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setSearchRoom(e.target.value)}
                    placeholder="ค้นหา"
                    className="flex w-96 rounded-md border-0 p-2 py-2 pl-10  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-xl placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                      <label htmlFor="limit" className="mr-2 text-white">
                        จำนวนรายการต่อหน้า:
                      </label>
                      <select
                        id="limit"
                        value={limit}
                        onChange={handleChangeLimit}
                        className="px-2 py-1 rounded-md"
                      >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                      </select>
                    </div>
              </form>
              <table className="min-w-auto md:w-auto divide-y divide-gray-100 mt-5 table-auto">
                <thead className="bg-indigo-500 border text-white">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium  px-6 py-4 text-left "
                    >
                      #
                    </th>

                    <th
                      scope="col"
                      className="text-sm font-medium  px-6 py-4 text-left "
                    >
                      ชื่อห้อง
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium  px-6 py-4 text-left "
                    >
                      จำนวนคนที่เข้าร่วมได้
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium  px-6 py-4 text-left "
                    >
                      สถานที่
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium  px-6 py-4 text-left "
                    >
                      รูปห้อง
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium  px-6 py-4 text-left "
                    >
                      สถานะห้อง
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium  px-6 py-4 text-left "
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {displayedProducts
                   .filter((data) => {
                    const searchValue = searchRoom.trim().toLowerCase().split(' ').join('');
                    const room_name = data.room_name.toLowerCase().split(' ').join('');
                    const room_amount = data.room_amount.toLowerCase().split(' ').join('');
                    const room_location = data.room_location.toLowerCase().split(' ').join('');
                
                    return (
                      searchValue === "" ||
                      room_name.includes(searchValue) ||
                      room_amount.includes(searchValue) ||
                      room_location.includes(searchValue)
                    );
                    })
                    .map((data, i) => (
                      <tr className="bg-white border" key={i}>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {counter++}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {data.room_name}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {data.room_amount}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {data.room_location}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <img src={`http://localhost:8081/images/`+ data.images} alt="" className="w-48 h-48"/>
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {data.status_room}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <Link
                              className="bg-amber-100 rounded-xl px-5 py-3"
                              to={`/editroom/` + data.id}
                            >
                              <FontAwesomeIcon icon={faUserPen} />
                            </Link>
                            <button
                              className="bg-red-300 rounded-xl px-5 py-3"
                              onClick={() => handleSubmitDeleteroom(data.id)}
                            >
                              <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Showroom;
