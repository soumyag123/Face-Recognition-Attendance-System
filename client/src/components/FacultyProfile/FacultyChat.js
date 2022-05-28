import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ChatContainer from "../ChatBox/ChatContainer";
import Contacts from "../ChatBox/Contacts";
import Welcome from "../ChatBox/Welcome";
import { io } from "socket.io-client";

const user = "faculty";

const FacultyChat = () => {
  const host = "http://localhost:5000";
  
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(() => {
    const setData = async () => {
      setCurrentUser(await JSON.parse(localStorage.getItem("faculty")));
    };
    setData();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        const department = currentUser.department;
        
        const resp = await fetch("/facultyContacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            department,
          }),
        });

        const data = await resp.json();
        setContacts(data);
        
      }
    };
    fetchData();
  }, [currentUser]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <Container>
        {currentUser !== undefined && contacts.length > 0 && (
          <Contacts
            user={user}
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
        )}
        {currentChat === undefined && currentUser !== undefined ? (
          <Welcome user={user} currentUser={currentUser} />
        ) : (
            <ChatContainer
              user={user}
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  margin-top: 3rem;
  margin-left: 350px;
  background-color: #b9d1d2;
  display: grid;
  grid-template-columns: 30% 70%;
  height: 75vh;
  width: 65vw;
`;

export default FacultyChat;
