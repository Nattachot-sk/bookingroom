import axios from "axios";
import React, { useState, useEffect, PureComponent } from "react";
import { Link, useNavigate, redirect } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Room from "./Room";
import Sidebar from "../components/Sidebar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Legend,
  PieChart,
  Pie,
  Area,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
  },
];
const data01 = [
  {
    name: "Group A",
    value: 400,
  },
  {
    name: "Group B",
    value: 300,
  },
  {
    name: "Group C",
    value: 300,
  },
  {
    name: "Group D",
    value: 200,
  },
  {
    name: "Group E",
    value: 278,
  },
  {
    name: "Group F",
    value: 189,
  },
];
const data02 = [
  {
    name: "Group A",
    value: 2400,
  },
  {
    name: "Group B",
    value: 4567,
  },
  {
    name: "Group C",
    value: 1398,
  },
  {
    name: "Group D",
    value: 9800,
  },
  {
    name: "Group E",
    value: 3908,
  },
  {
    name: "Group F",
    value: 4800,
  },
];

function Admin() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [firstname, setFirstname] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const [countUser, setCountUser] = useState(0);
  const [countRoom, setCountRoom] = useState(0);
  const [countBooking, setCountBooking] = useState(0);
  const [countAcces, setCountAcces] = useState(0);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/showmemberCount"
        );
        const jsonData = response.data;

        setCountUser(jsonData.totalCount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/showCountRoom");
        const jsonData = response.data;

        setCountRoom(jsonData.totalCountRoom);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/showCountBooking"
        );
        const jsonData = response.data;

        setCountBooking(jsonData.totalCountBooking);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/showCountBooking"
        );
        const jsonData = response.data;

        setCountBooking(jsonData.totalCountBooking);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/showCountAcces"
        );
        const jsonData = response.data;

        setCountAcces(jsonData.totalCountAcces);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex min-w-full min-h-full font-[IBM] ">
        <div className="col-auto">
          <Sidebar />
        </div>

        <div className=" h-screen flex-1">
          <header className="w-full h-14 bg-navy-blue flex  relative pt-3 ">
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
          </header>

          <aside className="pl-96 pr-10 w-full min-h-screen mr-10">
            <div className="pt-5">
              <h1>
                <span className="text-2xl font-bold">Dashboard</span>
              </h1>
            </div>
            <div className="h-full grid grid-cols-8 grid-rows-6 gap-4 my-5">
              <div className="col-span-2  row-span-1  rounded-lg shadow-md relative bg-indigo-500">
                <div className="flex justify-evenly items-center w-full h-40 relative p-8 ">
                  <div className="relative rounded-full bg-white p-3">
                    <FontAwesomeIcon
                      icon={faUsers}
                      className="w-[30px] h-[30px] flex text-indigo-500"
                    />
                  </div>
                  <div className="block justify-center items-center w-48">
                    <h1 className="text-white font-medium text-xl text-center">
                      จำนวนผู้ใช้
                    </h1>
                    <p className="text-center mt-3 text-white ">{countUser}</p>
                  </div>
                </div>
              </div>
              <div className="col-span-2  row-span-1  rounded-lg shadow-md relative bg-indigo-500">
                <div className="flex justify-evenly items-center w-full h-40 relative p-8 ">
                  <div className="relative rounded-full bg-white p-3">
                    <FontAwesomeIcon
                      icon={faBuilding}
                      className="w-[30px] h-[30px] flex text-indigo-500"
                    />
                  </div>
                  <div className="block justify-center items-center w-48">
                    <h1 className="text-white font-medium text-xl text-center">
                      จำนวนห้อง
                    </h1>
                    <p className="text-center mt-3 text-white ">{countRoom}</p>
                  </div>
                </div>
              </div>
              <div className="col-span-2  row-span-1  rounded-lg shadow-md relative bg-indigo-500">
                <div className="flex justify-evenly items-center w-full h-40 relative p-8 ">
                  <div className="relative rounded-full bg-white p-3">
                    <FontAwesomeIcon
                      icon={faBookmark}
                      className="w-[30px] h-[30px] flex text-indigo-500"
                    />
                  </div>
                  <div className="block justify-center items-center w-48">
                    <h1 className="text-white font-medium text-xl text-center">
                      จำนวนที่จอง
                    </h1>
                    <p className="text-center mt-3 text-white ">
                      {countBooking}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-2  row-span-1  rounded-lg shadow-md relative bg-indigo-500">
                <div className="flex justify-evenly items-center w-full h-40 relative p-8 ">
                  <div className="relative rounded-full bg-white p-3">
                    <FontAwesomeIcon
                      icon={faNewspaper}
                      className="w-[30px] h-[30px] flex text-indigo-500"
                    />
                  </div>
                  <div className="block justify-center items-center w-48">
                    <h1 className="text-white font-medium text-xl text-center">
                      จำนวนอุปกรณ์
                    </h1>
                    <p className="text-center mt-3 text-white ">{countAcces}</p>
                  </div>
                </div>
              </div>
              <div className="col-span-5 row-span-2 p-8  h-50 rounded-lg shadow-md border-2  border-indigo-500">
                <div className="flex">
                  
                  <BarChart width={730} height={250} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pv" fill="#8884d8" />
                    <Bar dataKey="uv" fill="#82ca9d" />
                  </BarChart>
                </div>
              </div>
              <div className="col-span-3 row-span-2 p-8 rounded-lg shadow-md  border-2 border-indigo-500">
                <div className="flex">
                  <PieChart width={730} height={250}>
                    <Pie
                      data={data01}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={50}
                      fill="#8884d8"
                    />
                    <Pie
                      data={data02}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#82ca9d"
                      label
                    />
                  </PieChart>
                </div>
              </div>

              <div className="col-span-5 row-span-2 p-8  h-50 rounded-lg shadow-md  border-2 border-indigo-500">
                <div className="flex">
                  <AreaChart
                    width={730}
                    height={250}
                    data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#8884d8"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#8884d8"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#82ca9d"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#82ca9d"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="uv"
                      stroke="#8884d8"
                      fillOpacity={1}
                      fill="url(#colorUv)"
                    />
                    <Area
                      type="monotone"
                      dataKey="pv"
                      stroke="#82ca9d"
                      fillOpacity={1}
                      fill="url(#colorPv)"
                    />
                  </AreaChart>
                </div>
              </div>
              <div className="col-span-3 row-span-2 p-8  rounded-lg shadow-md  border-2 border-indigo-500">
                <div className="flex">
                <LineChart width={730} height={250} data={data}
  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Line type="monotone" dataKey="pv" stroke="#8884d8" />
  <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
</LineChart>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

export default Admin;
