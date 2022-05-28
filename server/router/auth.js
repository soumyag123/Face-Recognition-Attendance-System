const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
require("../db/connection.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const studentAuthenticate = require("../middlewares/studentAuthenticate.js");
const facultyAuthenticate = require("../middlewares/facultyAuthenticate.js");

// GETTING STUDENT AND FACULTY SCHEMA

const Student = require("../models/studentSchema.js");
const Faculty = require("../models/facultySchema.js");
const Attendance = require("../models/attendanceSchema.js");
const Code = require("../models/codeSchema.js");

// nodemailer for sending email

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL,
    pass: process.env.PASS,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});


// STUDENT REGISTRATION

router.post("/register/student", async (req, res) => {
  const {
    name,
    enrollment_no,
    birth_date,
    email,
    department,
    semester,
    gender,
    phone_number,
    password,
    confirm_password,
    image,
  } = req.body;

  if (
    !name ||
    !enrollment_no ||
    !email ||
    !department ||
    !semester ||
    !gender ||
    !phone_number ||
    !password ||
    !confirm_password ||
    !image
  ) {
    return res
      .status(422)
      .json({ message: "Please fill the details properly." });
  }
  try {
    const userExists = await Student.findOne({ enrollment_no: enrollment_no });
    if (userExists) {
      return res.status(422).json({ message: "User Already Exists" });
    } else if (password != confirm_password) {
      return res.status(422).json({ message: "Password not matching" });
    } else {
      const newStudent = new Student({
        name,
        enrollment_no,
        birth_date,
        email,
        department,
        semester,
        gender,
        phone_number,
        password,
        confirm_password,
        image,
      });

      // Hashing password before storing using bcryptjs

      const salt = await bcrypt.genSalt(10);

      newStudent.password = await bcrypt.hash(password, salt);
      newStudent.confirm_password = await bcrypt.hash(confirm_password, salt);

      const studentRegister = await newStudent.save();

      if (studentRegister) {
        return res
          .status(201)
          .json({ message: "Student registered successfully" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

// FACULTY REGISTRATION

router.post("/register/faculty", async (req, res) => {
  const {
    firstname,
    lastname,
    department,
    email,
    gender,
    phone_number,
    password,
    confirm_password,
  } = req.body;

  if (
    !firstname ||
    !lastname ||
    !email ||
    !department ||
    !gender ||
    !phone_number ||
    !password ||
    !confirm_password
  ) {
    return res
      .status(422)
      .json({ message: "Please fill the details properly." });
  }

  try {
    const userExists = await Faculty.findOne({ email: email });

    if (userExists) {
      return res.status(422).json({ message: "User Already Exists" });
    } else if (password != confirm_password) {
      return res.status(422).json({ message: "Password not matching" });
    } else {
      const newFaculty = new Faculty({
        firstname,
        lastname,
        department,
        email,
        gender,
        phone_number,
        password,
        confirm_password,
      });

      // Hashing password before storing using bcryptjs

      const salt = await bcrypt.genSalt(10);

      newFaculty.password = await bcrypt.hash(password, salt);
      newFaculty.confirm_password = await bcrypt.hash(confirm_password, salt);

      const facultyRegister = await newFaculty.save();

      if (facultyRegister) {
        return res
          .status(201)
          .json({ message: "Faculty registered successfully" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

// STUDENT LOGIN

router.post("/login/student", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill the details properly" });
    }

    const studentLogin = await Student.findOne({ email: email });

    if (studentLogin) {
      const matchPassword = await bcrypt.compare(
        password,
        studentLogin.password
      );

      const token = await studentLogin.generateAuthToken();

      // setting up cookies
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!matchPassword) {
        return res.status(400).json({ message: "Invalid Credentials" });
      } else {
        return res.status(200).json({ message: "Login Successfull" });
      }
    } else {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
  }
});

// FACULTY LOGIN

router.post("/login/faculty", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill the details properly" });
    }

    const facultyLogin = await Faculty.findOne({ email: email });

    if (facultyLogin) {
      const matchPassword = await bcrypt.compare(
        password,
        facultyLogin.password
      );

      const token = await facultyLogin.generateAuthToken();

      // setting up cookies
      res.cookie("jwttoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!matchPassword) {
        res.status(400).json({ message: "Invalid Credentials" });
      } else {
        res.status(200).json({ message: "Login Successfull" });
      }
    } else {
      res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
  }
});

// GET STUDENT PROFILE PAGE

router.get("/profile/student", studentAuthenticate, (req, res) => {
  res.send(req.rootStudent);
});

// GET FACULTY PROFILE PAGE

router.get("/profile/faculty", facultyAuthenticate, (req, res) => {
  res.send(req.rootFaculty);
});

// STUDENT LOGOUT PAGE

router.get("/logout/student", (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("Logout successfull");
});

// FACULTY LOGOUT PAGE

router.get("/logout/faculty", (req, res) => {
  res.clearCookie("jwttoken", { path: "/" });
  res.status(200).send("Logout successfull");
});

// saving code generated by faculty to the database

router.post("/saveCode", (req, res) => {
  const { subject, code, date, time } = req.body;

  const data = new Code({ subject, code, date, time });

  const codeData = data.save();

  if (codeData) {
    res.status(201).send({ message: "data saved" });
  } else {
    res.status(400).send({ message: "data failed to save" });
  }
});

// Email through nodemailer : sending subject and class code to all students of the department

router.post("/sendEmail", async (req, res) => {
  const { facultyDepartment, facultyEmail, subject, code, facultyName } =
    req.body;

  const studentData = await Student.find({ department: facultyDepartment });

  studentData.forEach((student) => {
    const receiverEmail = student.email;

    let mailOptions = {
      from: `${facultyName} <${facultyEmail}>`,
      to: receiverEmail,
      subject: `${subject} - CLASS DETAILS`,
      html: `<div>
      <h3>Dear Student, use the following details to mark your attendance.</h3>
      <br>
      <div><h2>Subject : ${subject}</h2></div>
      <div><h2>Class Code : ${code}</h2></div>
      </div>`,
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Email sent successfully");
      }
    });
  });

  res.send({ status: "Email sent" });
});

// marking attendance for student

router.post("/markAttendance", (req, res) => {
  const {
    student_name,
    student_department,
    date,
    student_enrollment_no,
    subject_name,
    attendance_time,
  } = req.body;

  const newData = new Attendance({
    student_name,
    student_department,
    date,
    student_enrollment_no,
    subject_name,
    attendance_time,
  });

  const attendance_data = newData.save();

  if (attendance_data) {
    return res.status(201).send({ message: "attendance marked" });
  }
});

// validation of code entered by student to mark attendance

router.post("/validateCode", async (req, res) => {
  const { subjectEntered, codeEntered, date, time } = req.body;

  const data = await Code.findOne({ date: date, subject: subjectEntered });

  if (data === null) {
    res.status(400).send({ message: "Enter correct code to mark attendance" });
  } else if (data.code !== codeEntered) {
    res.status(400).send({ message: "Enter correct code to mark attendance" });
  } else if (time - data.time > 2) {
    res.status(400).send({ message: "Time Expired to mark attendance" });
  } else {
    res.status(201).send({ message: "Code validated" });
  }
});

// update faculty profile

router.post("/updateFaculty", async (req, res) => {
  const { f_email, user } = req.body;

  const previous_data = await Faculty.findOne({ email: f_email });

  previous_data.firstname = user.firstname;
  previous_data.lastname = user.lastname;
  previous_data.department = user.department;
  previous_data.email = user.email;
  previous_data.gender = user.gender;
  previous_data.phone_number = user.phone_number;
  previous_data.password = user.password;
  previous_data.confirm_password = user.confirm_password;

  const updated_data = await previous_data.save();

  if (updated_data) {
    res.status(201).send({ message: "data updated" });
  } else {
    res.status(400).send({ message: "Failed to update data" });
  }
});

// update student profile

router.post("/updateStudent", async (req, res) => {
  const { s_email, user } = req.body;

  const previous_data = await Student.findOne({ email: s_email });

  previous_data.name = user.name;
  previous_data.enrollment_no = user.enrollment_no;
  previous_data.birth_date = user.birth_date;
  previous_data.email = user.email;
  previous_data.department = user.department;
  previous_data.semester = user.semester;
  previous_data.gender = user.gender;
  previous_data.phone_number = user.phone_number;
  previous_data.password = user.password;
  previous_data.confirm_password = user.confirm_password;
  previous_data.image = user.image;

  const updated_data = await previous_data.save();

  if (updated_data) {
    res.status(201).send({ message: "data updated" });
  } else {
    res.status(400).send({ message: "Failed to update data" });
  }
});

// getting daily attendance sheet data

router.post("/attendanceDaily", async (req, res) => {
  const { subject, date } = req.body;

  const data = await Attendance.find({ date: date, subject_name: subject });

  if (data) {
    res.status(201).send(data);
  }
});

// getting monthly attendance sheet data

router.post("/attendanceMonthly", async (req, res) => {
  let { fromDate, toDate, subject } = req.body;

  const data = await Attendance.find({ subject_name: subject });

  let attendance_data = [];

  fromDate = fromDate.split("-");
  toDate = toDate.split("-");

  let from_date = new Date(fromDate[2], parseInt(fromDate[1]) - 1, fromDate[0]);
  let to_date = new Date(toDate[2], parseInt(toDate[1]) - 1, toDate[0]);

  data.forEach((ele) => {
    let new_date = ele.date.split("-");
    new_date = new Date(new_date[2], parseInt(new_date[1]) - 1, new_date[0]);

    if (new_date >= from_date && new_date <= to_date) {
      attendance_data.push(ele);
    }
  });
  res.status(201).send(attendance_data);
});

// sending email to all absent students

router.post("/sendEmailAbsentees", async (req, res) => {
  const { subject, date, facultydata } = req.body;

  const attendance_data = await Attendance.find({
    date: date,
    subject_name: subject,
  });

  const students = await Student.find({ department: facultydata.department });

  const result = [];

  for (let i = 0; i < students.length; i++) {
    let found = 0;
    for (let j = 0; j < attendance_data.length; j++) {
      if (
        students[i].enrollment_no === attendance_data[j].student_enrollment_no
      ) {
        found = 1;
        break;
      }
    }
    if (found === 0) {
      result.push(students[i]);
    }
  }

  result.forEach((ele) => {
    const receiverEmail = ele.email;

    let mailOptions = {
      from: `${facultydata.firstname + facultydata.lastname} <${
        facultydata.email
      }>`,
      to: receiverEmail,
      subject: `${subject} - ABSENT`,
      html: `<div>
    <h3>Dear Student, you were marked absent for today's class.</h3>
    <br>
    <div><h2>Subject : ${subject}</h2></div>
    <div><h2>Date : ${date}</h2></div>
    </div>`,
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        res.status(400).send({ message: "Failed to send email" });
      } else {
        res.status(201).send({ message: "Email sent successfully" });
      }
    });
  });
});

module.exports = router;
