const express = require("express");
const router = express.Router();
require("../db/connection.js");

// Getting Student, Faculty and Message Schema

const Student = require("../models/studentSchema.js");
const Faculty = require("../models/facultySchema.js");
const Message = require('../models/messageSchema')

// get all students of the same department as faculty as chat contacts of the faculty chatBox

router.post("/facultyContacts", async (req, res) => {

  try {
      const { department } = req.body;

    const students = await Student.find({ department: department }).select([
      "name","email","enrollment_no","_id"
    ]);
    return res.json(students);
      
  } catch (error) {
    console.log(error);
  }
});

// get all students of the same department as faculty as chat contacts of the faculty chatBox

router.post("/studentContacts", async (req, res) => {

  try {
      const { department } = req.body;

    const faculties = await Faculty.find({ department: department }).select([
      "firstname","lastname","email","_id"
    ]);
    return res.json(faculties);
      
  } catch (error) {
    console.log(error);
  }
});

// add messages to the database
router.post("/addFacultyMessage", async (req, res) => {
  try {

    const { from, to, message } = req.body;

    const data = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) {
      return res.json({ msg: "Message added successfully" });
    }
    else {
      return res.json({ msg: "Failed to add message to database" });
    }
    
  } catch (error) {
    console.log(error);
  }
});

// get messages from the database to be displayed in the container

router.post('/getFacultyMessage', async (req, res) => {
  try {
    
    const { from, to } = req.body;

    const messages = await Message.find({
      users: {
        $all: [from, to],
      }
    }).sort({ updatedAt: 1 });


    const projectMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      }
    });
    
    return res.json(projectMessages);

  } catch (error) {
    console.log(error);
  }
});

// add messages to the database
router.post("/addStudentMessage", async (req, res) => {
  try {

    const { from, to, message } = req.body;

    const data = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) {
      return res.json({ msg: "Message added successfully" });
    }
    else {
      return res.json({ msg: "Failed to add message to database" });
    }
    
  } catch (error) {
    console.log(error);
  }
});

// get messages from the database to be displayed in the container

router.post('/getStudentMessage', async (req, res) => {
  try {
    
    const { from, to } = req.body;

    const messages = await Message.find({
      users: {
        $all: [from, to],
      }
    }).sort({ updatedAt: 1 });

    const projectMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      }
    });
    
    return res.json(projectMessages);

  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
