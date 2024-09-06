import { React, useState , useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';

import momentPlugin  from "@fullcalendar/moment";
import ModalBooking from "../Modals/ModalBooking";
import ModalShowData from "../Modals/ModalShowData";





function CalendarData() {
  const [valuesDay, setValuesDay] = useState({
    dayStart: "",
    dayEnd: "",
    allDay: false
  })


  const [eventsDay , setEventsDay] = useState([])


useEffect(() => {
  axios
    .get("http://localhost:8081/bookingshow")
    .then(res => {
      const dataserver =  res.data[0];
      const dateroom = dataserver.date_booking;


      const eventsData = res.data.map(event => ({
        title:[event.room_name + ' ' + event.time_booking+ "น." + ' ' + event.timeend_booking+"น."],
        start: new Date(event.date_booking + ' ' + event.time_booking),
        end: new Date(event.dateend_booking + ' ' + event.timeend_booking),
        allDay: "false"
      }));
  
      setEventsDay(eventsData);
    })
    .catch((err) => console.log(err));
}, []);


  const handleDateClickShowData = (info) => {
    setShowModal(true);

    setValuesDay({...valuesDay,
      dayStart: info.startStr,
      dayEnd: info.endStr,
      allDay: "false"
    })

    // alert('Date Clicked: ' + arg.dateStr);
  };
  const [showModal, setShowModal] = useState(false);

  const businessHours = {// วันจันทร์ - ศุกร์ เวลาปิดในช่วงบ่าย
    daysOfWeek: [ 1, 2, 3, 4, 5 ], // Monday - Thursday
    startTime: '8.30', // a start time (10am in this example)
    endTime: '12:00', // an end time
  };

  const showData = (id) => {
    console.log("hi")
  }
  
  return (
    <div>
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin,momentPlugin,listPlugin]}
        initialView={"dayGridMonth"}
        events={eventsDay}
        selectable={true}
        eventClick={handleDateClickShowData}
        editable= {true} // ทำให้เหตุการณ์และช่วงเวลาสามารถแก้ไขได้
        eventDurationEditable={true}

        headerToolbar={{
          start: "today prev,next", // will normally be on the left. if RTL, will be on the right
          center: "title",
          end: "dayGridMonth", // will normally be on the right. if RTL, will be on the left
        }}
        height={"90vh"}
        locale= {"th"}

      />
      
      {showModal && <ModalShowData setOpenModal={setShowModal} dataday={valuesDay}/>}
    </div>
  );
}

export default CalendarData;