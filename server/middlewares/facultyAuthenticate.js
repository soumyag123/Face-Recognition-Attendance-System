const jwt = require("jsonwebtoken");
const Faculty = require("../models/facultySchema.js");

// faculty login authentication using json web token

const facultyAuthenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwttoken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    const rootFaculty = await Faculty.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootFaculty) {
      throw new Error("Faculty not found");
    }

    req.token = token;
    req.rootFaculty = rootFaculty;
    req.FacultyID = rootFaculty._id;

    next();
  } catch (error) {
    res.status(401).send("Unauthorized : No token provided");
    console.log(error);
  }
};

module.exports = facultyAuthenticate;
