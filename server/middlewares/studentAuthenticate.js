const jwt = require("jsonwebtoken");
const Student = require("../models/studentSchema.js");

// student login authentication using json web token
const studentAuthenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    const rootStudent = await Student.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootStudent) {
      throw new Error("Student not found");
    }

    req.token = token;
    req.rootStudent = rootStudent;
    req.StudentID = rootStudent._id;

    next();
  } catch (error) {
    res.status(401).send("Unauthorized : No token provided");
    console.log(error);
  }
};

module.exports = studentAuthenticate;
