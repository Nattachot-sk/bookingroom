import { React, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import axios from "axios";
import Sidebar from "../components/Sidebar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import ModaladdAgency from "../Modals/ModaladdAgency";


function Agency() {
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState("");
    const [firstname, setFirstname] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const { id } = useParams();
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    let counter = 1;

  const [search, setSearch] = useState("");

  const [showagencydata, setShowagencydata] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/showagency")
      .then((res) => setShowagencydata(res.data))
      .catch((err) => console.log(err));
  }, []);
  const startIndex = (page - 1) * limit;
  const displayedProducts = showagencydata.slice(
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
  const handleChangeLimit = (event) => {
    setLimit(Number(event.target.value));
  };
  const handleSubmitDeleteagency = (agency_id) => {
    const id = agency_id;
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
        axios.delete("http://localhost:8081/deleteagency/" + id);
        Swal.fire({
          icon: "success",
          title: "ลบเสร็จสิ้น",
          timer: 2500,
        });
        setTimeout(function () {
          location.reload(1);
        }, 1000);
      } else if (!res.isConfirmed) {
        setTimeout(function () {
          location.reload(1);
        }, 1000);
      }
    });
  };

  return (
    <div className="flex w-full h-screen ">
        <div className="col-auto">
          <Sidebar />
        </div>

        <div className="h-screen flex-1">
          <div className="w-full h-14 bg-navy-blue flex  relative pt-3">
            <div className="w-full grid grid-cols-5 gap-4">
              <div className="col-span-4"></div>
              <div className="col-span-1">
                {auth ? (
                  <div className="pl-20">
                    <h3 className="text-white">
                      You are authorization {firstname}
                    </h3>
                  </div>
                ) : (
                  <div>
                    <h3>{message}</h3>
                    <h3>Login Now</h3>
                    <Link to={"/"}>login</Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className=" pl-96 h-screen ">
            <div className="my-5">
              <h1>
                <span className="text-2xl font-bold">จัดการแผนก</span>
              </h1>
            </div>

            <div className="flex flex-col ">
              <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                <div className="container py-2 inline-block min-w-full sm:px-6 lg:px-8 ">
                  <button
                    className="px-4 py-2 text-purple-100 bg-indigo-600 rounded-md"
                    type="button"
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    เพิ่มข้อมูล
                  </button>
                  {showModal && <ModaladdAgency setOpenModal={setShowModal} />}

                  <div className="w-full h-screen">
                    <form>
                      <div className="relative flex items-center mt-5">
                        <label htmlFor="" className="absolute ml-2 pointer-events-none">
                          <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </label>
                        <input
                          type="text"
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="ค้นหา"
                          className="flex w-96 rounded-md border-0 p-2 pl-10  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-xl placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      
                    </form>
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
                    <table className="min-w-auto md:w-auto divide-y divide-gray-100 mt-5 table-auto">
                      <thead className="bg-indigo-500 border text-white ">
                        <tr>
                          <th
                            scope="col"
                            className="text-xl font-semibold px-6 py-4 text-left"
                          >
                            #
                          </th>

                          <th
                            scope="col"
                            className="text-base  font-semibold px-6 py-4 text-left "
                          >
                            ชื่อแผนก
                          </th>
                          <th
                            scope="col"
                            className="text-base  font-semibold px-6 py-4 text-left "
                          >
                            
                          </th>
                          
                        </tr>
                      </thead>
                      <tbody className="">
                        {displayedProducts
                            .filter((data) => {
                              const searchValue = search.trim().toLowerCase().split(' ').join('');
                              const agency_name = data.agency_name.toLowerCase().split(' ').join('');

                          
                              return (
                                searchValue === "" ||
                                agency_name.includes(searchValue)
                              );
                          })
                          .map((data, i) => (
                            <tr className="bg-white border" key={i}>
                              <td className="text-sm text-gray-900 font-medium px-6 py-6 whitespace-nowrap">
                                {counter++}
                              </td>
                              <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                {data.agency_name}
                              </td>
                              

                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <div className="flex space-x-2">
                                  <Link
                                    className="bg-amber-100 rounded-xl px-5 py-3 "
                                    to={`/editagency/` + data.agency_id}
                                  >
                                    <FontAwesomeIcon icon={faUserPen} />
                                  </Link>
                                  <button
                                    className="bg-red-300 rounded-xl px-5 py-3"
                                    onClick={() =>
                                        handleSubmitDeleteagency(data.agency_id)
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Agency