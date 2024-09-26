const prisma = require("../prisma/prisma");


const register = async (req, res) => {
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
  };