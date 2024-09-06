import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppProvider } from "./utils/AppProvider";

import './index.css'
import './App.css'

{/**Page */}
import Signup from "./pages/Signup";
import User from "./pages/User";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Userlogin from "./pages/Userlogin";

import Room from "./pages/Room";
import Showroom from "./pages/Showroom";
import Editroom from "./pages/Editroom";
import Employees from "./pages/Employees";
import Editmember from "./pages/Editmember";
import Booking from "./pages/Booking";
import Accessorie from "./pages/Accessorie";
import Bookingshow from "./pages/Bookingshow";

{/** Components */}
import Sidebar from "./components/Sidebar";
import Calendar from "./components/Calendar";
import AccessEdit from "./pages/AccessEdit";
import CalendarAfternoon from "./components/CalendarAfternoon";
import CalendarMorning from "./components/CalendarMorning";
import BookingEdit from "./pages/BookingEdit";
import ShowRoomUser from "./pages/User/ShowRoomUser";
import BookingRoomUser from "./pages/User/BookingRoomUser";
import HomepageUser from "./pages/User/HomepageUser";
import Report_employees from "./pages/Report/Report_employees";
import Report_room from "./pages/Report/Report_room";
import Report_booking from "./pages/Report/Report_booking";
import Report_accessories from "./pages/Report/Report_accessories";
import Report_roomPoppular from "./pages/Report/Report_roomPoppular";
import Report_memberPoppular from "./pages/Report/Report_memberPoppular";
import Report_memberBooking from "./pages/Report/Report_memberBooking";
import Agency from "./pages/Agency";
import EditAgency from "./pages/EditAgency";

function App() {
  return (
    <div className="App ">
      <BrowserRouter>
      
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/userlogin" element={<Userlogin />} />

          <Route path="/user" element={<User />} />
          <Route path="/homepageuser" element={<HomepageUser />} />
          <Route path="/" element={<Login />} />
          <Route path="/room" element={<Room />} />
          <Route path="/showroom" element={<Showroom />} />
          <Route path="/editroom/:id" element={<Editroom />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/editmember/:id" element={<Editmember />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/bookingedit/:id" element={<BookingEdit />} />
          <Route path="/agency" element={<Agency />} />
          <Route path="/editagency/:id" element={<EditAgency />} />

          <Route path="/accessorie" element={<Accessorie />} />   
          <Route path="/accesedit/:id" element={<AccessEdit />} />   
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/calendarafternoon" element={<CalendarAfternoon />} />
          <Route path="/calendarmorning" element={<CalendarMorning />} />
          <Route path="/showroomuser" element={<ShowRoomUser />} />
          <Route path="/bookingroomuser" element={<BookingRoomUser />} />

          <Route path="/reportemployees" element={<Report_employees />} />
          <Route path="/reportroom" element={<Report_room />} />
          <Route path="/reportbooking" element={<Report_booking />} />
          <Route path="/reportacces" element={<Report_accessories />} />
          <Route path="/reportroompoppular" element={<Report_roomPoppular />} />
          <Route path="/reportmemberpoppular" element={<Report_memberPoppular />} />
          <Route path="/reportmemberbooking" element={<Report_memberBooking />} />





        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
