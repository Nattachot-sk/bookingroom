const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const salt = 10;
const env =require("dotenv")


const app = express();
env.config()
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(express.static("public"));

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

const db = mysql.createConnection({
  host: `${process.env.HOST}`,
  user: `${process.env.USER}`,
  password: "",
  port:"3305",
  database: `${process.env.DATABASE}`,
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You are not authenticated!" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ Error: "Token is not okay" });
      } else {
        if (decoded.role === "member") {
          req.id_user = decoded.id_user;
          req.firstname = decoded.firstname;
          req.role = decoded.role;
          next();
        } else if (decoded.role === "admin") {
          req.id_user = decoded.id_user;
          req.firstname = decoded.firstname;
          req.role = decoded.role;
          next();
        } else {
          return res.json("not member");
        }
      }
    });
  }
};
const verifyAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You are not authenticated!" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ Error: "Token is not okay" });
      } else {
        if (decoded.role === "admin") {
          req.id_user = decoded.id_user;
          req.firstname = decoded.firstname;
          next();
        } else {
          return res.json("not admin");
        }
      }
    });
  }
};

app.get("/admin", verifyAdmin, (req, res) => {
  return res.json({
    Status: "OK",
    iduser: req.id_user,
    firstname: req.firstname,
    role: req.role,
  });
});

app.get("/user", verifyUser, (req, res) => {
  return res.json({
    Status: "OK",
    iduser: req.id_user,
    firstname: req.firstname,
    role: req.role,
  });
});
app.get("/logout", (req, res) => {
  res.clearCookie("token");

  return res.json({ Status: "OK" });
});

app.post("/register", (req, res) => {
  try {
    const sql =
      "INSERT INTO employees (`email`, `password`,`firstname`,`lastname`,`department`,`phonenumber`,`role`) VALUES(?)";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
      if (err) return res.json({ Error: "Data error Hashing password" });
      const values = [
        req.body.email,
        hash,
        req.body.firstname,
        req.body.lastname,
        req.body.department,
        req.body.phonenumber,
        req.body.role,
      ];
      db.query(sql, [values], (err, results) => {
        if (err) return res.json({ Error: "Inter data error server" });
        return res.json({ Status: "OK" });
      });
    });
  } catch (error) {
    console.log("error", error);
  }
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM employees WHERE email = ?";
  db.query(sql, [req.body.email], (err, data) => {
    if (err) return res.json({ Error: "Login error" });
    if (data.length > 0) {
      const firstname = data[0].firstname;
      const role = data[0].role;
      const id_user = data[0].id_user;
      bcrypt.compare(
        req.body.password.toString(),
        data[0].password,
        (err, response) => {
          if (err) return res.json({ Error: "password compare fail" });
          if (response) {
            const token = jwt.sign(
              { id_user, firstname, role },
              "jwt-secret-key",
              {
                expiresIn: "1d",
              }
            );
            res.cookie("token", token);
            return res.json({ Status: "OK", role });
          } else {
            return res.json({ Error: "รหัสผ่านไม่ถูกต้อง" });
          }
        }
      );
    } else {
      return res.json({ Error: "อีเมล์หรือรหัสผ่านไม่ถูกต้อง" });
    }
  });
});

app.get("/showmember", (req, res) => {
  try {
    const sql = "SELECT * FROM employees";
    db.query(sql, (err, data) => {
      if (err) {
        return res.json({ Error: "Error" });
      }
      return res.json(data);
    });
  } catch (error) {
    console.log("error", error);
  }
});
app.get("/showmemberDESC", (req, res) => {
  try {
    const sql = "SELECT * FROM employees ORDER By id_user DESC";
    db.query(sql, (err, data) => {
      if (err) {
        return res.json({ Error: "Error" });
      }
      return res.json(data);
    });
  } catch (error) {
    console.log("error", error);
  }
});
app.get("/showmemberCount", (req, res) => {
  try {
    const sql = "SELECT COUNT(*) as totalCount FROM employees";
    db.query(sql, (err, Countdata) => {
      if (err) {
        return res.json({ Error: "Error" });
      }
      return res.json({ totalCount: Countdata[0].totalCount });
    });
  } catch (error) {
    console.log("error", error);
  }
});

app.get("/showmember/:id", (req, res) => {
  try {
    const id = req.params.id;
    const sql = "SELECT * FROM employees WHERE id_user = ?";
    db.query(sql, [id], (err, data) => {
      if (err) {
        return res.json({ Error: "Error" });
      }
      return res.json(data);
    });
  } catch (error) {
    console.log("error", error);
  }
});

app.put("/editmember/:id", (req, res) => {
  try {
    const id = req.params.id;
    const sql =
      "UPDATE employees  SET `email` = ? , `password` = ?, `firstname` = ?, `lastname` = ?, `phonenumber` = ?, `department` = ? WHERE id_user = ?";
    db.query(
      sql,
      [
        req.body.email,
        req.body.password,
        req.body.firstname,
        req.body.lastname,
        req.body.phonenumber,
        req.body.department,
        id,
      ],
      (err, data) => {
        if (err) return res.json({ Error: "Update fail" });
        return res.json({ Status: "OK" });
      }
    );
  } catch (error) {
    console.log("error", error);
  }
});

app.delete("/deletemember/:id", (req, res) => {
  try {
    const id = req.params.id;
    const sql = "DELETE FROM employees WHERE id_user = ?";
    db.query(sql, [id], (err, data) => {
      if (err) return res.json({ Error: "Delete fail" });
      return res.json({ Status: "OK" });
    });
  } catch (error) {
    console.log("error", error);
  }
});

{
  /* Room */
}

app.get("/showroom", (req, res) => {
  const sql = "SELECT * FROM room";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json({ Error: "Error" });
    }
    return res.json(data);
  });
});
app.get("/showCountRoom", (req, res) => {
  try {
    const sql = "SELECT COUNT(*) as totalCountRoom FROM room";
    db.query(sql, (err, Countdata) => {
      if (err) {
        return res.json({ Error: "Error" });
      }
      return res.json({ totalCountRoom: Countdata[0].totalCountRoom });
    });
  } catch (error) {
    console.log("error", error);
  }
});

app.get("/showroom/:id", (req, res) => {
  try {
    const id = req.params.id;
    const sql = "SELECT * FROM room WHERE id = ?";
    db.query(sql, [id], (err, data) => {
      if (err) return res.json("error");
      return res.json(data);
    });
  } catch (error) {
    console.log("error", error);
  }
});
app.get("/showroomUser/:id", (req, res) => {
  try {
    const id = req.params.id;
    const sql = "SELECT * FROM room WHERE id = ?";
    db.query(sql, [id], (err, data) => {
      if (err) return res.json("error");
      return res.json(data);
    });
  } catch (error) {
    console.log("error", error);
  }
});

app.post("/addroom", upload.single("images"), (req, res) => {
  try {
    const images = req.file.filename;
    const sql =
      "INSERT INTO room (`room_name`, `room_amount`,`room_location`,`images`,`status_room`) VALUES (?, ?, ?,?, ?)";
    const values = [
      req.body.addroomname,
      req.body.addroomamount,
      req.body.addroomlocation,
      images,
      req.body.addstatusroom,
    ];
    db.query(sql, values, (err, data) => {
      if (err) return res.json({ Error: "insert fail" });
      return res.json({ Status: "AddOK" });
    });
  } catch (error) {
    console.log("error", error);
  }
});

app.put(`/editroom/:id`, (req, res) => {
  try {
    const id = req.params.id;
    const sql =
      "UPDATE room  SET `room_name` = ? , `room_amount` = ? , `room_location` = ? , `status_room` = ? WHERE id = ?";
    db.query(
      sql,
      [
        req.body.roomname,
        req.body.roomamount,
        req.body.roomlocation,
        req.body.statusroom,
        id,
      ],
      (err, data) => {
        if (err) return res.json({ Error: "Update fail" });
        return res.json({ Status: "OK" });
      }
    );
  } catch (error) {
    console.log("error", error);
  }
});

app.delete("/deleteroom/:id", (req, res) => {
  try {
    const id = req.params.id;
    const sql = "DELETE FROM room WHERE id = ?";
    db.query(sql, [id], (err, data) => {
      if (err) return res.json({ Error: "Delete fail" });
      return res.json({ Status: "OK" });
    });
  } catch (error) {
    console.log("error", error);
  }
});

app.get("/showagency", (req, res) => {
  try {
    const sql = "SELECT * FROM agency";
    db.query(sql, (err, data) => {
      if (err) {
        return res.json({ Error: "Error" });
      }
      return res.json(data);
    });
  } catch (error) {
    console.log("error", error);
  }
});
app.get("/showagency/:id", (req, res) => {
  try {
    const id = req.params.id;
    const sql = "SELECT * FROM agency WHERE agency_id = ?";
    db.query(sql, [id], (err, data) => {
      if (err) {
        return res.json({ Error: "Error" });
      }
      return res.json(data);
    });
  } catch (error) {
    console.log("error", error);
  }
});
app.post("/addagency", (req, res) => {
  try {
    const sql = "INSERT INTO agency (`agency_name`) VALUES(?)";
    const values = [req.body.addagencyname];
    db.query(sql, [values], (err, data) => {
      if (err) return res.json({ Error: "insert fail" });
      return res.json({ Status: "AddOK" });
    });
  } catch (error) {
    console.log("error", error);
  }
});
app.put(`/editagency/:id`, (req, res) => {
  try {
    const id = req.params.id;
    const sql = "UPDATE agency  SET `agency_name` = ? WHERE agency_id = ?";
    db.query(sql, [req.body.agencyname, id], (err, data) => {
      if (err) return res.json({ Error: "Update fail" });
      return res.json({ Status: "OK" });
    });
  } catch (error) {
    console.log("error", error);
  }
});
app.delete("/deleteagency/:id", (req, res) => {
  try {
    const id = req.params.id;
    const sql = "DELETE FROM agency WHERE agency_id = ?";
    db.query(sql, [id], (err, data) => {
      if (err) return res.json({ Error: "Delete fail" });
      return res.json({ Status: "OK" });
    });
  } catch (error) {
    console.log("error", error);
  }
});

{
  /**booking */
}

app.get("/bookingshow", (req, res) => {
  try {
    let sql = "SELECT * FROM booking ";
    if (req.query.month) {
      // กรณีมีการระบุเดือนให้เพิ่มเงื่อนไขใน SQL query
      sql += `WHERE MONTH(date_booking) = '${req.query.month}' `;
    }
    sql +=
      "INNER JOIN room ON booking.id = room.id INNER JOIN agency ON booking.agency_id = agency.agency_id INNER JOIN employees ON booking.id_user = employees.id_user INNER JOIN accessorie ON booking.id_acces = accessorie.id_acces ORDER BY id_booking DESC";

    db.query(sql, (err, data) => {
      if (err) {
        return res.json({ Error: "Error" });
      }
      return res.json(data);
    });
  } catch (error) {
    console.log("error", error);
  }
});
app.get("/bookingshowpoppular", (req, res) => {
  try {
    const sql =
      "SELECT room.room_name, COUNT(*) AS usage_count, room.images ,room.room_amount,room.room_location   FROM booking  INNER JOIN room ON booking.id = room.id INNER JOIN agency ON booking.agency_id = agency.agency_id INNER JOIN employees ON booking.id_user = employees.id_user INNER JOIN accessorie ON booking.id_acces = accessorie.id_acces GROUP BY room.room_name ORDER BY usage_count DESC";
    db.query(sql, (err, data) => {
      if (err) {
        return res.json({ Error: "Error" });
      }
      return res.json(data);
    });
  } catch (error) {
    console.log("error", error);
  }
});

app.get("/bookingshowData", (req, res) => {
  try {
    const sql = "SELECT * FROM booking ";
    db.query(sql, (err, data) => {
      if (err) {
        return res.json({ Error: "Error" });
      }
      return res.json(data);
    });
  } catch (error) {
    console.log("error", error);
  }
});

app.get("/showCountBooking", (req, res) => {
  try {
    const sql = "SELECT COUNT(*) as totalCountBooking FROM booking";
    db.query(sql, (err, Countdata) => {
      if (err) {
        return res.json({ Error: "Error" });
      }
      return res.json({ totalCountBooking: Countdata[0].totalCountBooking });
    });
  } catch (error) {
    console.log("error", error);
  }
});

app.get("/bookingMorning", (req, res) => {
  try {
    const sql =
      "SELECT * FROM booking  INNER JOIN room ON booking.id = room.id INNER JOIN agency ON booking.agency_id = agency.agency_id INNER JOIN employees ON booking.id_user = employees.id_user WHERE booking.time_booking = 0 ";

    db.query(sql, (err, data) => {
      if (err) {
        return res.json({ Error: "Error" });
      }
      return res.json(data);
    });
  } catch (error) {
    console.log("error", error);
  }
});
app.get("/bookingAfternoon", (req, res) => {
  try {
    const sql =
      "SELECT * FROM booking  INNER JOIN room ON booking.id = room.id INNER JOIN agency ON booking.agency_id = agency.agency_id INNER JOIN employees ON booking.id_user = employees.id_user WHERE booking.time_booking = 1 ";

    db.query(sql, (err, data) => {
      if (err) {
        return res.json({ Error: "Error" });
      }
      return res.json(data);
    });
  } catch (error) {
    console.log("error", error);
  }
});

app.get("/showbooking/:id", (req, res) => {
  const id = req.params.id;
  try {
    const sql =
      "SELECT * FROM booking INNER JOIN room ON booking.id = room.id INNER JOIN agency ON booking.agency_id = agency.agency_id INNER JOIN employees ON booking.id_user = employees.id_user INNER JOIN accessorie ON booking.id_acces = accessorie.id_acces WHERE id_booking = ?";
    db.query(sql, [id], (err, data) => {
      if (err) {
        return res.json({ Error: "Error" });
      }
      return res.json(data);
    });
  } catch (error) {
    console.log("error", error);
  }
});

app.get("/showbookingUser/:id", (req, res) => {
  const id = req.params.id;
  try {
    const sql =
      "SELECT * FROM booking INNER JOIN room ON booking.id = room.id INNER JOIN agency ON booking.agency_id = agency.agency_id INNER JOIN employees ON booking.id_user = employees.id_user INNER JOIN accessorie ON booking.id_acces = accessorie.id_acces WHERE id_booking = ?";
    db.query(sql, [id], (err, data) => {
      if (err) {
        return res.json({ Error: "Error" });
      }
      return res.json(data);
    });
  } catch (error) {
    console.log("error", error);
  }
});

app.post("/bookingInsert", (req, res) => {
  try {
    const sql =
      "INSERT INTO booking (`id`, `agency_id`,`telnumber`,`people_amount`,`discription`,`date_booking`,`dateend_booking`,`time_booking`,`timeend_booking`,`status_booking`,`id_acces`,`id_user`,`allday`) VALUES(?)";
    const values = [
      req.body.selectedRoom,
      req.body.selectedAgency,
      req.body.telnumber,
      req.body.peopleamount,
      req.body.discription,
      req.body.day,
      req.body.dayend,
      req.body.time,
      req.body.timeend,
      req.body.statusbooking,
      req.body.selectedAccessorie,
      req.body.iduser,
      req.body.allday,
    ];
    db.query(sql, [values], (err, data) => {
      if (err) return res.json({ Error: "insert fail" });
      return res.json({ Status: "AddOK" });
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ Error: "Server error" });
  }
});

app.post("/bookingInsertTest", (req, res) => {
  try {
    const sql =
      "INSERT INTO booking (`id`, `agency_id`,`telnumber`,`people_amount`,`discription`,`date_booking`,`dateend_booking`,`time_booking`,`timeend_booking`,`status_booking`,`id_acces`,`id_user`,`allday`) VALUES(?)";
    const values = [
      req.body.selectedRoom,
      req.body.selectedAgency,
      req.body.telnumber,
      req.body.peopleamount,
      req.body.discription,
      req.body.day,
      req.body.dayend,
      req.body.time,
      req.body.timeend,
      req.body.statusbooking,
      req.body.selectedAccessorie,
      req.body.iduser,
      req.body.allday,
    ];
    db.query(sql, [values], (err, data) => {
      if (err) return res.json({ Error: "insert fail" });
      return res.json({ Status: "AddOK" });
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ Error: "Server error" });
  }
});
app.post("/bookingInsertTest2", async (req, res) => {
  try {
    // Check if the selected room is already booked for the given day and time range
    const checkSql =
      "SELECT COUNT(*) as count FROM booking WHERE id = ? AND date_booking = ? AND ((time_booking <= ? AND timeend_booking > ?) OR (timeend_booking >= ? AND time_booking < ?) OR (time_booking >= ? AND timeend_booking <= ?))";

    const checkValues = [
      req.body.selectedRoom,
      req.body.day,
      req.body.timeend,
      req.body.time,
      req.body.timeend,
      req.body.time,
      req.body.time,
      req.body.timeend,
    ];

    const checkResult = await new Promise((resolve, reject) => {
      db.query(checkSql, checkValues, (err, data) => {
        if (err) reject(err);
        resolve(data[0].count);
      });
    });

    // Check if the room is already booked
    if (checkResult > 0) {
      return res.json({ Error: "Room already booked for the selected time" });
    }

    // If the room is available, proceed with the booking insertion
    const insertSql =
      "INSERT INTO booking (`id`, `agency_id`,`telnumber`,`people_amount`,`discription`,`date_booking`,`dateend_booking`,`time_booking`,`timeend_booking`,`status_booking`,`id_acces`,`id_user`,`allday`) VALUES(?)";

    const insertValues = [
      req.body.selectedRoom,
      req.body.selectedAgency,
      req.body.telnumber,
      req.body.peopleamount,
      req.body.discription,
      req.body.day,
      req.body.dayend,
      req.body.time,
      req.body.timeend,
      req.body.statusbooking,
      req.body.selectedAccessorie,
      req.body.iduser,
      req.body.allday,
    ];

    db.query(insertSql, [insertValues], (err, data) => {
      if (err) return res.json({ Error: "Insert fail" });
      return res.json({ Status: "AddOK" });
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ Error: "Server error" });
  }
});

app.put(`/bookingedit/:id`, (req, res) => {
  try {
    const id = req.params.id;
    const sql =
      "UPDATE booking  SET `id` = ? , `agency_id` = ? , `telnumber` = ?, `people_amount` = ?, `discription` = ?, `date_booking` = ?,`dateend_booking` = ?, `time_booking` = ?, `status_booking` = ?, `id_acces` = ? , `id_user` = ? WHERE id_booking = ?";

    db.query(
      sql,
      [
        req.body.id_room,
        req.body.agency_id,
        req.body.telnumber,
        req.body.people_amount,
        req.body.discription,
        req.body.date_booking,
        req.body.dateend_booking,
        req.body.time_booking,
        req.body.status_booking,
        req.body.id_acces,
        req.body.id_user,
        id,
      ],
      (err, data) => {
        if (err) return res.json({ Error: "Update fail" });
        return res.json({ Status: "OK" });
      }
    );
  } catch (error) {
    console.log("error", error);
  }
});

app.get("/showaccess", (req, res) => {
  try {
    const sql = "SELECT * FROM accessorie";
    db.query(sql, (err, data) => {
      if (err) {
        return res.json({ Error: "Error" });
      }
      return res.json(data);
    });
  } catch (error) {
    console.log("error", error);
  }
});

app.get("/showCountAcces", (req, res) => {
  try {
    const sql = "SELECT COUNT(*) as totalCountAcces FROM accessorie";
    db.query(sql, (err, Countdata) => {
      if (err) {
        return res.json({ Error: "Error" });
      }
      return res.json({ totalCountAcces: Countdata[0].totalCountAcces });
    });
  } catch (error) {
    console.log("error", error);
  }
});

app.get("/showacces/:id", (req, res) => {
  const id = req.params.id;
  try {
    const sql = "SELECT * FROM accessorie WHERE id_acces = ?";
    db.query(sql, [id], (err, data) => {
      if (err) {
        return res.json({ Error: "Error" });
      }
      return res.json(data);
    });
  } catch (error) {
    console.log("error", error);
  }
});

app.post("/addacces", (req, res) => {
  try {
    const sql =
      "INSERT INTO accessorie (`name_acces`, `amount_acces`) VALUES(?)";
    const values = [req.body.addAccesName, req.body.addAccessAmount];
    db.query(sql, [values], (err, data) => {
      if (err) return res.json({ Error: "insert fail" });
      return res.json({ Status: "AddOK" });
    });
  } catch (error) {
    console.log("error", error);
  }
});

app.put(`/accesedit/:id`, (req, res) => {
  try {
    const id = req.params.id;
    const sql =
      "UPDATE accessorie  SET `name_acces` = ? , `amount_acces` = ? WHERE id_acces = ?";
    db.query(
      sql,
      [req.body.nameacces, req.body.amountacces, id],
      (err, data) => {
        if (err) return res.json({ Error: "Update fail" });
        return res.json({ Status: "OK" });
      }
    );
  } catch (error) {
    console.log("error", error);
  }
});

app.delete(`/deleteaccess/:id`, (req, res) => {
  try {
    const id = req.params.id;
    const sql = "DELETE FROM accessorie WHERE id_acces = ?";
    db.query(sql, [id], (err, data) => {
      if (err) return res.json({ Error: "Delete fail" });
      return res.json({ Status: "OK" });
    });
  } catch (error) {
    console.log("error", error);
  }
});

// Report //

app.listen(process.env.PORT , () => {
  console.log("Running...");
});
