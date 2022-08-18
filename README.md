<div align="center">
<h1 align="center">Face Recognition Attendance System</h1>
<h1 align="center"><img align="center" src="./Images/microsoft.png" alt="Logo" width="40" height="40">Microsoft Engage - 2022</h1>

<p align="center">
<a target="_blank" href="https://demo-abd.herokuapp.com/">Link to App</a>
     ·
 <a target="_blank" href="https://youtu.be/0bLLL2Lfb6U">Video Demo</a>
</p>
</div>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#salient-features">Salient Features</a></li>
        <li><a href="#compatible-platforms">Compatible Platforms</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#agile-methodology">Agile Methodology</a>
      <ul>
        <li><a href="#what-is-agile">What is Agile</a></li>
        <li><a href="#how-i-incorporated-agile-methodology-during-the-development-cycle">How I Incorporated Agile Methodology During The Development Cycle</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#points-to-remember-while-testing-the-app">Points to remember while testing the app</a></li>
        <li><a href="#before-installation">Before Installation</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#navigating-through-the-app">Navigating through the App</a></li><ul>
        <li><a href="#home-page-and-about-section">Home page and About Section</a></li>
        <li><a href="#student-and-faculty-registration">Registration</a></li>
        <li><a href="#student-and-faculty-login">Login</a></li>
        <li><a href="#student-and-faculty-profile-page">Profile Page</a></li>
        <li><a href="#generate-code-and-send-email">Generate Code and Send Email</a></li>
        <li><a href="#authenticate-code-and-mark-attendance">Marking Attendance</a></li>
        <li><a href="#view-daily-and-datewise-attendance-sheet">Attendance Sheet</a></li>
        <li><a href="#chatbox-feature">ChatBox</a></li>
      </ul>
    <li><a href="#need-help">Need Help?</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project
* Face Recognition Attendance System built during Microsoft Engage 2022. 
* The project aims to eliminate the current conventional attendance system which is done manually. 
* It detects and matches student face to mark attendance automatically.
* The faculty generates the unique authentication code which is validated on student side to mark attendance.

### Salient Features
* Capturing student image at the time of registration later used to detect face and mark attendance.
* Sending class details email using Nodemailer, editing profile, viewing daily and date-wise attendance sheet as well as the no. of lectures and percentage attendance of each student.
* Sending email automatically to all students absent for the class.
* ChatBox - Feature through which the student and faculty can directly chat with each other implemented using Socket.io
* Dynamic Profile page of Student and faculty showing all their details.

### Compatible Platforms
Laptops, Desktops and Tablet PCs

### Built With
* ![Front-end][front-end-shield]
* ![Back-end][back-end-shield]
* ![Database][database-shield]
* ![Tools][tools-shield]

<!-- AGILE METHODOLOGY -->
## Agile Methodology

### What is Agile

Agile is a development methodology adopted today in the software industry. Agile promotes teamwork, flexible procedures, and sle-organizing teams.

### How I Incorporated Agile Methodology During The Development Cycle

SCRUM is a subset of Agile, a framework for developing software. SCRUM takes advantage of different techniques to achieve goals in Agile. SCRUM promotes an iterative model where the planning is performed on a very short term. The basic time working unit is the sprint. SCRUM teams always reason in sprints and their planning is limited to sprints.

* Sprint 1 (May 4 - May 11): Sprint Planning, Research and Design - Out of the three challenges i.e Face Recognition, Data Analysis and Recommendation System, I decided to build a Face Recognition based Attendance System. I researched about various faceAPI available such as Microsoft Azure, Headtracker, OpenCV, etc. but I decided to stick with JavaScript FaceAPI which is implemented on top of tensorflow.js core API. After that, I searched for tutorials, designed a wireframe including the functionalities I want and designed the UI.

* Sprint 2 (May 12 - May 18): Software development and debugging - Started the development process by taking help from YouTube tutorials. Built a web application using React JS and Node JS and implemented socket.io for the first time. Encountered occasional bugs which I debugged timely. Made required changes in the UI and color scheme to make it more eye pleasing.

* Sprint 3 (May 19 - May 29): Implementing ChatBox Feature - debugging and adding additional features. I decided to implement ChatBox feature after successfully implementing the face recognition functionality. Added Logout functionality, viewing attendance sheets and sending email to the absentees. Finalised the UI of the project and successfully deployed it.

<!-- INSTALLATIONS -->

## Points to remember while testing the app
1. Allow permission for camera.
2. Wait for the models to load to detect face while marking the attendance.
3. Make sure you sit close to the camera with your face clearly visible at the time of marking attendance.
4. Make sure to capture clear image, with face clearly visible at the time of registration of Student.

## Getting Started
```sh
  git clone https://github.com/soumyag123/Face-Recognition-Attendance-System.git
```
```sh
  cd Face-Recognition-Attendance-System
```

## Before Installation
1. Set up your .env file variables in the server folder.
2. Replace the MONGO_URL with your own MongoDB url. Refer to https://medium.com/featurepreneur/how-to-create-a-cluster-in-mongodb-28996662b3ac to create your cluster and set up your database.
3. Replace EMAIL and PASS with your own email id and password you want to use for Nodemailer.
4. Replace OAUTH_CLIENTID, OAUTH_CLIENT_SECRET and OAUTH_REFRESH_TOKEN with your own Google Cloud API Credentials. Refer to https://dev.to/chandrapantachhetri/sending-emails-securely-using-node-js-nodemailer-smtp-gmail-and-oauth2-g3a to create your OAUTH Credentials. 


### Installation
Run the following commands to start the server side.
```sh
  cd server
```
```sh
  npm install 
```
```sh
  npm start
```

Run cd.. to go the main directory.

Run the following commands to start the client side.

```sh
  cd client
```
```sh
  npm install
```
```sh
  npm start
```
Your app is now running on http://localhost:3000


<!-- APP TUTORIAL-->
## Navigating Through The App

## Home Page and About Section

   - Home Page of the website. The project is divided into two modules - Student and Faculty.
   
   <img src="Images/home.png" alt="home page" width="800"/> 
   
   - About Section. The project provides face scanning to mark attendance and is very User friendly.
   
   <img src="Images/about.png" alt="home page" width="800"/>
   
## Student and Faculty Registration

   - Faculty Registration form. The faculty needs to fill in the details and register. The passwords will be validated.
   
   <img src="Images/facultyRegister.png" alt="home page" width="800"/>
   
   - Student Registration form. The student needs to fill the details and capture image which will be stored and used later to mark attendance. The passwords are validated.
   
   <img src="Images/captureImage.png" alt="home page" width="800"/>
   
   - Student can also Retake image if he wants.
   
   <img src="Images/Retake Image.png" alt="home page" width="800"/>
   
## Student and Faculty Login

   - Faculty Login page. The credentials need to match to login and the authentication is done using JSON Web Token.
   
   <img src="Images/FacultyLogin.png" alt="home page" width="800"/>
   
   - Student Login page. The credentials need to match to login and the authentication is done using JSON Web Token.
   
   <img src="Images/studentLogin.png" alt="home page" width="800"/>
   
## Student and Faculty Profile Page

   - Faculty Profile Page showing all the data dynamically. The faculty can also Edit Profile if he wants. He can generate code, view daily and datewise attendance sheet and also chat with the students.
   
   <img src="Images/facultyProfile.png" alt="home page" width="800"/>
   
   - Student Profile Page showing all the data dynamically along with his image. The Student can also Edit Profile if he wants and enter the authentication code to mark attendance as well as chat with the faculty.
   
   <img src="Images/studentProfile.png" alt="home page" width="800"/>
   
## Generate Code and Send Email

   - The faculty can enter the subject and generate unique authentication code for the student to mark attendance. After generating code a Send Email button appears through which he can automatically share the class details to all the students of the department.
   
   <img src="Images/generateCode.png" alt="home page" width="800"/>
   
   - Email sent to all the students of the department through Nodemailer.
   
   <img src="Images/ClassEmail.png" alt="home page" width="800"/>
   
## Authenticate Code and Mark Attendance

   - The student needs to mark the attendance by entering the subject and the code sent by the faculty.
   
   - The student needs to enter correct code.
   
   <img src="Images/validateCode.png" alt="home page" width="800"/>
   
   - The code will be valid for only 2 minutes and the student has to mark attendance. If a student tries to mark attendance after 2 minutes the attendance will not be marked.
   
   <img src="Images/timeExpired.png" alt="home page" width="800"/>
   
   - If a student enters correct code , a webcam will open will will detect and match student face and automatically mark attendance.
   
   <img src="Images/markingAttendance.png" alt="home page" width="800"/>
   
   <img src="Images/attendanceSuccessfull.png" alt="home page" width="800"/>
   
## View Daily and DateWise Attendance Sheet

   - The faculty can view the daily attendance of all the students of the department.
   
   <img src="Images/dailyAttendance.png" alt="home page" width="800"/>
   
   - He can also automatically send an email to all the students who were absent for the class.
   
   <img src="Images/AbsentEmail.png" alt="home page" width="800"/>
   
   - The faculty can view the date-wise attendance, from-date to to-date by entering the subject. It also shows the no. of lectures attended by each student as well as their percentage attendance.
   
   <img src="Images/monthlyAttendance.png" alt="home page" width="800"/>
   
## ChatBox Feature

   - ChatBox feature implemented using Socket.io

   - The faculty can directly chat with any student of his department. A list of all students of the department appears in the ChatBox. The previous chats are retained using MongoDB.
   
   <img src="Images/FacultyChatbox.png" alt="home page" width="800"/>
   
   - Similarly, the student can also directly chat with any faculty of his department. A list of all faculty members of the department appears in the ChatBox. The previous chats are retained using MongoDB.
   
   <img src="Images/Studentchatbox.png" alt="home page" width="800"/>
   
   - The student and the faculty can now chat with each other with previous chats retained.
   
   <img src="Images/chat.png" alt="home page" width="800"/>

## Need Help?

Feel free to contact me on [LinkedIn](https://www.linkedin.com/in/soumya-agarwal20/)

---------

```javascript
if (youEnjoyed) {
    starThisRepository();
}
```

-----------

<!--MARKDOWN LINKS-->
[front-end-shield]: https://img.shields.io/badge/Front--end-React%20JS-blueviolet
[back-end-shield]: https://img.shields.io/badge/Back--end-Node%20JS%2C%20Express%2C%20socket.io-blueviolet
[tools-shield]: https://img.shields.io/badge/Tools-JavaScript%20FaceAPI-blueviolet
[database-shield]: https://img.shields.io/badge/Database-MongoDB-blueviolet
